"""BAE 3D Booth: one job, run in a background Blender (never touches the file you have open).

  blender -b --factory-startup --python run_job.py -- <job_dir>
  (or, with the bpy module:  python run_job.py <job_dir>)

<job_dir>/job.json   {"kind": "build", "spec": {...}, "options": {...}}
<job_dir>/files/     the designs the spec names (tex/front.png ...)
<job_dir>/out/       what comes back: the pictures, small previews, the .blend, result.json

Progress is printed as lines "@@PROGRESS <0-100> <text>" for the add-on to forward.
"""
import json, os, sys, time, traceback

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
args = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
JOB = os.path.abspath(args[0])


def say(pct, text):
    print(f"@@PROGRESS {pct:.0f} {text}", flush=True)


def main():
    import bpy
    import build_booth as B
    import live as L

    job = json.load(open(os.path.join(JOB, "job.json")))
    spec, opt = job["spec"], job.get("options") or {}
    out = os.path.join(JOB, "out")
    os.makedirs(out, exist_ok=True)
    name = "".join(c if c.isalnum() or c in "-_" else "_" for c in str(spec.get("file") or spec.get("name") or "booth"))[:60] or "booth"
    results = []

    say(2, "Building the booth")
    t0 = time.time()
    # the same assembler as the Live mode, so the render is exactly what was seen live
    sc = B.reset()
    L.setup(sc)
    built = L.assemble(sc, spec, os.path.join(JOB, "files"))
    for f in built.get("failed", []):
        print("skipped:", f, flush=True)
    cams = {o["bae_cam"]: o for o in sc.objects if o.get("bae_cam")}
    W, H = int(opt.get("width", 1920)), int(opt.get("height", 1080))
    B.setup_render(sc, W, H, int(opt.get("samples", 64)))
    device = B.use_gpu(sc)
    print("render device:", device, flush=True)
    sc.camera = cams["01_front_left"]

    if opt.get("blend", True):
        say(8, "Saving the Blender file")
        bpy.ops.file.pack_all()
        p = os.path.join(out, name + ".blend")
        bpy.ops.wm.save_as_mainfile(filepath=p, copy=True)
        results.append({"path": name + ".blend", "kind": "blend", "label": "Blender file"})

    views = [v for v in (opt.get("views") or ["01_front_left", "05_inside"]) if v in cams]
    for i, v in enumerate(views):
        say(10 + 85 * i / max(1, len(views)), f"Rendering {v.split('_', 1)[-1].replace('_', ' ')} ({i + 1} of {len(views)}) on {device.split(' (')[0]}")
        sc.camera = cams[v]
        sc.render.image_settings.file_format = "PNG"
        sc.render.filepath = os.path.join(out, v + ".png")
        bpy.ops.render.render(write_still=True)
        results.append({"path": v + ".png", "kind": "still", "view": v, "label": v.split("_", 1)[-1].replace("_", " ")})
        # a small JPEG so the studio can show it at once
        img = bpy.data.images.load(os.path.join(out, v + ".png"))
        pw = 960
        img.scale(pw, max(1, round(H * pw / W)))
        sc.render.image_settings.file_format = "JPEG"
        sc.render.image_settings.quality = 86
        img.save_render(os.path.join(out, v + "_preview.jpg"), scene=sc)
        bpy.data.images.remove(img)
        sc.render.image_settings.file_format = "PNG"
        results.append({"path": v + "_preview.jpg", "kind": "preview", "view": v, "label": "preview"})

    info = {"device": device, "seconds": round(time.time() - t0), "blender": bpy.app.version_string, "views": views, "files": results}
    json.dump(info, open(os.path.join(out, "result.json"), "w"), indent=1)
    say(100, "Done")


try:
    main()
except Exception as e:
    traceback.print_exc()
    # one clear line first, so the studio shows the real reason and not the warnings before it
    tb = traceback.extract_tb(e.__traceback__)
    where = f"{os.path.basename(tb[-1].filename)} line {tb[-1].lineno}" if tb else ""
    print(f"@@ERROR {type(e).__name__}: {e} ({where})", flush=True)
    sys.exit(3)
