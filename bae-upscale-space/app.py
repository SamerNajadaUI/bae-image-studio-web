"""BAE Upscale: a small job server. POST a photo, it is enlarged in the background, GET the job to read the link."""
import os, io, time, uuid, threading, queue, traceback
import cv2, numpy as np, torch
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.environ.get("BAE_OUT", "/tmp/bae-upscale")
os.makedirs(OUT, exist_ok=True)
CODE = os.environ.get("BAE_CODE", "").strip()
MAX_IN = 2600            # longest side accepted, px
MAX_OUT = 64_000_000     # largest result, pixels
KEEP = 24 * 3600
SCALES = {"2": [2], "4": [4], "8": [4, 2], "10": [4, 2.5], "16": [4, 4]}
torch.set_num_threads(max(1, os.cpu_count() or 2))

_lock = threading.Lock()
_models = {}

def upsampler():
    """Real-ESRGAN general v3: compact, faithful, fast enough for a CPU."""
    if "up" not in _models:
        from realesrgan import RealESRGANer
        from realesrgan.archs.srvgg_arch import SRVGGNetCompact
        net = SRVGGNetCompact(num_in_ch=3, num_out_ch=3, num_feat=64, num_conv=32, upscale=4, act_type="prelu")
        _models["up"] = RealESRGANer(scale=4, model_path=os.path.join(ROOT, "weights", "realesr-general-x4v3.pth"), model=net, tile=320, tile_pad=12, pre_pad=0, half=False, device="cpu")
    return _models["up"]

def restorer():
    if "face" not in _models:
        from gfpgan import GFPGANer
        os.chdir(ROOT)  # facexlib looks for its helper weights in ./gfpgan/weights
        _models["face"] = GFPGANer(model_path=os.path.join(ROOT, "weights", "GFPGANv1.4.pth"), upscale=1, arch="clean", channel_multiplier=2, bg_upsampler=None, device="cpu")
    return _models["face"]

class _Given:
    """Hands GFPGAN a background that was already enlarged, so it is not computed twice."""
    def __init__(self, img): self.img = img
    def enhance(self, img, outscale=None): return self.img, None

def enlarge(img, s, tick):
    out, _ = upsampler().enhance(img, outscale=s)
    tick()
    return out

def process(job):
    img = cv2.imdecode(np.frombuffer(job["data"], np.uint8), cv2.IMREAD_COLOR)
    job.pop("data", None)
    if img is None: raise ValueError("That file isn't an image this server can open.")
    h, w = img.shape[:2]
    if max(h, w) > MAX_IN:
        k = MAX_IN / max(h, w); img = cv2.resize(img, (round(w * k), round(h * k)), interpolation=cv2.INTER_AREA); h, w = img.shape[:2]
    chain = list(SCALES[job["scale"]])
    while (w * h) * np.prod([c * c for c in chain]) > MAX_OUT and len(chain) > 1: chain.pop()
    total = float(np.prod(chain))
    if w * h * total * total > MAX_OUT: raise ValueError("That would be larger than this server can hold. Choose a smaller size.")
    steps = len(chain) + (1 if job["face"] else 0); done = [0]
    def tick(msg=""):
        done[0] += 1; job["progress"] = round(done[0] / (steps + 1), 2); job["note"] = msg
    job["note"] = "Enlarging"
    first = chain[0]
    big = enlarge(img, first, lambda: tick("Enlarged, pass 1"))
    faces = 0
    if job["face"]:
        job["note"] = "Restoring faces"
        r = restorer(); r.upscale = first; r.face_helper.upscale_factor = first; r.bg_upsampler = _Given(big)
        with torch.no_grad():
            cropped, restored_faces, restored = r.enhance(img, has_aligned=False, only_center_face=False, paste_back=True, weight=0.5)
        faces = len(restored_faces or [])
        if restored is not None and faces:
            if restored.shape[:2] != big.shape[:2]: restored = cv2.resize(restored, (big.shape[1], big.shape[0]), interpolation=cv2.INTER_LANCZOS4)
            f = min(1.0, max(0.0, job["fidelity"] / 100.0))  # 1 = keep the plain enlargement, 0 = full restoration
            big = cv2.addWeighted(big, f, restored, 1.0 - f, 0)
        tick("Faces restored")
    for i, s in enumerate(chain[1:], start=2):
        job["note"] = f"Enlarging, pass {i}"
        big = enlarge(big, s, lambda: tick(f"Enlarged, pass {i}"))
    tw, th = round(w * total), round(h * total)
    if big.shape[1] != tw or big.shape[0] != th: big = cv2.resize(big, (tw, th), interpolation=cv2.INTER_AREA if big.shape[1] > tw else cv2.INTER_LANCZOS4)
    g = float(job["grain"])
    if g > 0:  # fine luminance grain keeps skin from looking plastic
        rng = np.random.default_rng(7); n = rng.normal(0, g * 0.22, big.shape[:2]).astype(np.float32)
        big = np.clip(big.astype(np.float32) + n[..., None], 0, 255).astype(np.uint8)
    jid = job["id"]
    cv2.imwrite(os.path.join(OUT, jid + ".jpg"), big, [cv2.IMWRITE_JPEG_QUALITY, 95])
    cv2.imwrite(os.path.join(OUT, jid + ".png"), big, [cv2.IMWRITE_PNG_COMPRESSION, 3])
    job.update(width=tw, height=th, faces=faces, scale_done=total)

JOBS = {}
Q = queue.Queue()

def worker():
    while True:
        jid = Q.get(); job = JOBS.get(jid)
        if not job: continue
        job["status"] = "working"; job["started"] = time.time()
        try:
            with _lock: process(job)
            job["status"] = "done"; job["progress"] = 1
        except Exception as e:
            traceback.print_exc(); job["status"] = "failed"
            job["error"] = str(e) if isinstance(e, ValueError) else "The image could not be processed. Try a smaller size."
        job.pop("data", None); job["finished"] = time.time()
        now = time.time()
        for k in [k for k, v in JOBS.items() if now - v["created"] > KEEP]:
            JOBS.pop(k, None)
            for ext in (".jpg", ".png"):
                try: os.remove(os.path.join(OUT, k + ext))
                except OSError: pass

threading.Thread(target=worker, daemon=True).start()

app = FastAPI(title="BAE Upscale")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

def guard(code):
    if CODE and (code or "").strip() != CODE: raise HTTPException(401, "Wrong or missing access code.")

def view(job, request):
    base = str(request.base_url).rstrip("/")
    if request.headers.get("x-forwarded-proto") == "https" or ".hf.space" in base: base = base.replace("http://", "https://")
    v = {k: job.get(k) for k in ("id", "status", "progress", "note", "error", "width", "height", "faces", "scale", "name")}
    v["waiting"] = sum(1 for j in JOBS.values() if j["status"] == "queued" and j["created"] < job["created"])
    if job["status"] == "done":
        v["url"] = f"{base}/files/{job['id']}.jpg"; v["png"] = f"{base}/files/{job['id']}.png"
        v["seconds"] = round(job["finished"] - job["started"])
    return v

@app.post("/api/jobs")
async def create(request: Request, file: UploadFile = File(...), scale: str = Form("4"), face: str = Form("1"), fidelity: float = Form(35), grain: float = Form(8), code: str = Form("")):
    guard(code)
    scale = scale.lower().replace("x", "").replace("×", "")
    if scale not in SCALES: raise HTTPException(400, "Scale must be 2, 4, 8, 10 or 16.")
    data = await file.read()
    if not data or len(data) > 40 * 1024 * 1024: raise HTTPException(400, "The file is empty or larger than 40 MB.")
    if sum(1 for j in JOBS.values() if j["status"] in ("queued", "working")) >= 8: raise HTTPException(429, "The server is busy. Try again in a few minutes.")
    jid = uuid.uuid4().hex[:16]
    JOBS[jid] = dict(id=jid, status="queued", progress=0, note="Waiting", created=time.time(), data=data, scale=scale, face=face not in ("0", "false", "no", ""), fidelity=max(0, min(100, fidelity)), grain=max(0, min(60, grain)), name=(file.filename or "image")[:120])
    Q.put(jid)
    return view(JOBS[jid], request)

@app.get("/api/jobs/{jid}")
def status(jid: str, request: Request, code: str = ""):
    guard(code)
    job = JOBS.get(jid)
    if not job: raise HTTPException(404, "No such job. Results are kept for 24 hours, and are lost when the server restarts.")
    return view(job, request)

@app.get("/files/{name}")
def files(name: str):
    if not name.replace(".", "").isalnum() or not name.endswith((".jpg", ".png")): raise HTTPException(404)
    p = os.path.join(OUT, name)
    if not os.path.exists(p): raise HTTPException(404, "This result has expired.")
    return FileResponse(p, media_type="image/png" if name.endswith(".png") else "image/jpeg", headers={"Cache-Control": "public, max-age=86400", "Access-Control-Allow-Origin": "*"})

@app.get("/api/health")
def health(): return {"ok": True, "locked": bool(CODE), "queue": Q.qsize()}

@app.get("/", response_class=HTMLResponse)
def home(): return open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
