"""BAE 3D Booth: the part of the add-on that talks to the bridge. Plain Python (no bpy), runs in a background thread.

It pairs this Mac once (the bridge gives a 6-digit code that someone approves in BAE Studio), then asks for jobs,
downloads the designs, runs the job in a background Blender, forwards progress, and sends the results back.
"""
import json, os, queue, shutil, socket, subprocess, sys, threading, time, traceback, urllib.error, urllib.request

PIECE = 512 * 1024


class Client:
    def __init__(self, base_url, home, engine_cmd, name=None, keep_awake=True):
        self.base = base_url.rstrip("/")
        self.home = home  # folder for the pairing file and the jobs
        self.engine_cmd = engine_cmd  # e.g. [blender, "-b", "--factory-startup", "--python", run_job.py, "--"]
        self.name = name or socket.gethostname().split(".")[0] or "Render Mac"
        self.keep_awake = keep_awake
        self.accepting = True
        self.state = {"status": "starting", "text": "Starting", "code": None, "job": None, "pct": 0, "error": None, "device": None}
        self.changed = time.time()
        self._stop = threading.Event()
        self._proc = None
        self._awake = None
        self.thread = None
        # Live: the Blender that is open builds the booth itself (see engine/live.py)
        self.live = False
        self.live_q = queue.Queue()  # jobs for Blender's main thread (the add-on's timer runs them)
        self.live_state = None  # {"rev", "title", "spec"} of the booth in this Blender
        self.live_changed = []
        self.live_sent = ("start", 0)  # (rev, time) last told to the bridge; the first beat always says what is here
        self.live_was = False
        self.live_ok = False  # the bridge knows Live (1.1+); an older bridge gets the old behaviour exactly
        self.live_old = False  # True when the bridge said it does not know Live
        self.live_retry = 0
        self.live_job = None
        self._render = None  # the thread running a background build
        os.makedirs(home, exist_ok=True)

    # ------------------------------------------------------------ state for the panel
    def set(self, **kw):
        self.state.update(kw)
        self.changed = time.time()

    def creds_path(self):
        return os.path.join(self.home, "device.json")

    def creds(self):
        try:
            with open(self.creds_path()) as f:
                c = json.load(f)
            return c if c.get("bridge") == self.base else None
        except Exception:
            return None

    # ------------------------------------------------------------ http
    def call(self, method, path, body=None, raw=None, headers=None, timeout=60, auth=True):
        h = {"user-agent": "bae-booth-addon/1"}
        if headers:
            h.update(headers)
        data = None
        if raw is not None:
            data, h["content-type"] = raw, "application/octet-stream"
        elif body is not None:
            data, h["content-type"] = json.dumps(body).encode(), "application/json"
        c = self.creds() if auth else None
        if c:
            h["authorization"] = "Bearer " + c["secret"]
        req = urllib.request.Request(self.base + path, data=data, method=method, headers=h)
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                b = r.read()
                return r.status, (json.loads(b) if r.headers.get("content-type", "").startswith("application/json") else b)
        except urllib.error.HTTPError as e:
            b = e.read()
            try:
                return e.code, json.loads(b)
            except Exception:
                return e.code, {"error": b[:300].decode("utf-8", "replace")}

    # ------------------------------------------------------------ main loop
    def start(self):
        if self.thread and self.thread.is_alive():
            return
        self._stop.clear()
        self.thread = threading.Thread(target=self.loop, name="bae-booth", daemon=True)
        self.thread.start()

    def stop(self):
        self._stop.set()
        self.kill_job()
        self.awake(False)

    def loop(self):
        wait = 2
        while not self._stop.is_set():
            try:
                wait = self.tick()
            except (urllib.error.URLError, socket.timeout, ConnectionError, TimeoutError) as e:
                self.set(status="offline", text="Can't reach the bridge, trying again", error=str(e)[:200])
                wait = 15
            except Exception as e:
                traceback.print_exc()
                self.set(status="error", text="Something went wrong, trying again", error=str(e)[:300])
                wait = 15
            self._stop.wait(wait)

    def tick(self):
        c = self.creds()
        if not c:
            st, r = self.call("POST", "/d/pair", {"name": self.name, "info": {"platform": sys.platform, "python": sys.version.split()[0]}}, auth=False)
            if st != 200:
                raise RuntimeError(r.get("error") if isinstance(r, dict) else "pairing failed")
            with open(self.creds_path(), "w") as f:
                json.dump({"bridge": self.base, "secret": r["secret"], "device_id": r["device_id"]}, f)
            self.set(status="pending", text="Waiting for approval in BAE Studio", code=r["code"], device=r["device_id"])
            return 3
        st, r = self.call("GET", "/d/hello")
        if st == 401:  # removed in the studio: pair again
            os.remove(self.creds_path())
            self.set(status="pairing", text="Pairing again", code=None)
            return 1
        if r.get("status") == "pending":
            self.set(status="pending", text="Waiting for approval in BAE Studio", code=r.get("code"), device=r.get("id"))
            return 3
        self.live_beat()
        rendering = self._render is not None and self._render.is_alive()
        if not self.accepting and not self.live:
            self.awake(False)
            self.set(status="paused", text="Paused: not taking jobs", code=None)
            return 10
        self.awake(True)
        live = self.live and self.live_ok
        if rendering and not live:
            return 2
        if not self.accepting and not live:
            self.awake(False)
            self.set(status="paused", text="Paused: not taking jobs", code=None)
            return 10
        st, r = self.call("POST", "/d/next?live=1" if (rendering or not self.accepting) else "/d/next")
        job = r.get("job") if isinstance(r, dict) else None
        if not job:
            if not rendering:
                self.set(status="ready", text="Ready: waiting for jobs" if self.accepting else "Live only (not taking renders)", code=None, job=None, pct=0)
            return 1 if live else 4
        if job.get("kind") == "live":
            self.run_live(job)
            return 0.2
        self._render = threading.Thread(target=self.run, args=(job,), name="bae-booth-render", daemon=True)
        self._render.start()
        return 1

    # ------------------------------------------------------------ Live
    def changed_live(self, state, changed):
        """Called on Blender's main thread when the booth changed (a studio change or the designer's own hands)."""
        self.live_state = state
        if changed:
            self.live_changed = (self.live_changed + list(changed))[-40:]

    def live_beat(self):
        """Tell the bridge that Live is on and what the booth is now (the spec only when it changed)."""
        if not self.live:
            if self.live_was:
                try:
                    self.call("POST", "/d/live", {"on": False}, timeout=15)
                except Exception:
                    pass
                self.live_was = False
            return
        if self.live_old and time.time() < self.live_retry:
            return
        s = self.live_state or {}
        rev = s.get("rev")
        if rev == self.live_sent[0] and time.time() - self.live_sent[1] < 5 and self.live_was:
            return
        body = {"on": True, "rev": rev, "title": s.get("title", "")}
        if rev != self.live_sent[0]:
            body["spec"] = s.get("spec")
            body["changed"], self.live_changed = self.live_changed, []
        st, r = self.call("POST", "/d/live", body, timeout=20)
        if st == 200:
            self.live_sent, self.live_was, self.live_ok, self.live_old = (rev, time.time()), True, True, False
        elif st == 404:  # a bridge older than 1.1: no Live until it is updated; ask again in a minute
            self.live_ok, self.live_old, self.live_retry = False, True, time.time() + 60

    def run_live(self, job):
        jid = job["id"]
        o = job.get("options") or {}
        here = os.path.join(self.home, "live", "files")
        out = os.path.join(self.home, "live", "out", jid)
        os.makedirs(here, exist_ok=True)
        os.makedirs(out, exist_ok=True)
        try:
            for f in job.get("files", []):  # designs stay on this Mac: a later change only sends new ones
                p = os.path.join(here, f["path"])
                os.makedirs(os.path.dirname(p), exist_ok=True)
                with open(p + ".part", "wb") as fh:
                    for n in range(f["pieces"]):
                        st, b = self.call("GET", f"/d/file/{f['file_id']}/{n}", timeout=120)
                        if st != 200:
                            raise RuntimeError(f"could not download {f['path']} ({st})")
                        fh.write(b)
                os.replace(p + ".part", p)
            item = {"op": o.get("op", "apply"), "spec": job.get("spec"), "options": o, "title": job.get("title"), "here": here, "out": out,
                    "event": threading.Event(), "result": None, "error": None, "pct": 0, "msg": "Starting"}
            self.live_job = item
            self.live_q.put(item)
            t0, last = time.time(), 0
            while not item["event"].wait(0.5):
                if time.time() - t0 > 170:
                    raise RuntimeError("Blender did not finish in time (is a dialog open in Blender?)")
                if time.time() - last > 2:
                    last = time.time()
                    try:
                        self.call("POST", "/d/progress/" + jid, {"pct": item["pct"], "msg": item["msg"]}, timeout=15)
                    except Exception:
                        pass
            if item["error"]:
                raise RuntimeError(item["error"])
            res = item["result"] or {}
            for f in res.get("files", []):
                self.send(jid, os.path.join(out, f["path"]), f["path"], f.get("label", ""))
            self.live_beat()
            self.call("POST", "/d/done/" + jid, {"ok": True, "result": res})
        except Exception as e:
            traceback.print_exc()
            try:
                self.call("POST", "/d/done/" + jid, {"ok": False, "error": str(e)[:1500]})
            except Exception:
                pass
        finally:
            self.live_job = None
            shutil.rmtree(out, ignore_errors=True)

    # ------------------------------------------------------------ one job
    def run(self, job):
        jid = job["id"]
        self.set(status="working", text="Working on: " + job.get("title", jid), job=job.get("title", jid), pct=0, error=None)
        d = os.path.join(self.home, "jobs", jid)
        shutil.rmtree(d, ignore_errors=True)
        os.makedirs(os.path.join(d, "files"))
        os.makedirs(os.path.join(d, "out"))
        log = []

        def progress(pct, msg, extra=""):
            self.set(pct=pct, text=msg)
            try:
                st, r = self.call("POST", "/d/progress/" + jid, {"pct": pct, "msg": msg, "log": extra}, timeout=20)
            except Exception:
                return False  # a dropped report is not a reason to stop rendering
            if st in (403, 409):  # the job was cancelled or given to another Mac
                return True
            return isinstance(r, dict) and r.get("cancel")

        try:
            # 1. the designs
            for i, f in enumerate(job.get("files", [])):
                progress(1, f"Downloading designs ({i + 1} of {len(job['files'])})")
                p = os.path.join(d, "files", f["path"])
                os.makedirs(os.path.dirname(p), exist_ok=True)
                with open(p, "wb") as fh:
                    for n in range(f["pieces"]):
                        st, b = self.call("GET", f"/d/file/{f['file_id']}/{n}", timeout=120)
                        if st != 200:
                            raise RuntimeError(f"could not download {f['path']} ({st})")
                        fh.write(b)
            with open(os.path.join(d, "job.json"), "w") as fh:
                json.dump({k: job[k] for k in ("kind", "spec", "options") if k in job}, fh)

            # 2. Blender, in the background
            self._proc = proc = subprocess.Popen(self.engine_cmd + [d], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, bufsize=1)
            lines = queue.Queue()
            threading.Thread(target=lambda s=self._proc.stdout: [lines.put(x) for x in s] and None, daemon=True).start()
            # report every few seconds while Blender works, even when it prints nothing for minutes
            # (the first Metal render on a Mac prepares the graphics card silently), so the bridge never thinks this Mac is gone
            last, said, pct, msg, cancelled, t0 = 0, time.time(), 2, "Starting Blender", False, time.time()
            while True:
                try:
                    line = lines.get(timeout=1)
                    log.append(line)
                    said = time.time()
                    if line.startswith("@@PROGRESS"):
                        parts = line.split(" ", 2)
                        pct, msg = float(parts[1]), parts[2].strip() if len(parts) > 2 else msg
                except queue.Empty:
                    if self._proc.poll() is not None and lines.empty():
                        break
                if time.time() - last > 4:
                    quiet = time.time() - said
                    shown = msg + (f" (Blender is preparing, {int(quiet)} s; the first render on this Mac takes a few minutes)" if quiet > 20 else "")
                    if progress(min(pct, 97), shown, ""):
                        cancelled = True
                        self.kill_job()
                        break
                    last = time.time()
            code = self._proc.wait()
            self._proc = None
            if cancelled:
                self.call("POST", "/d/done/" + jid, {"ok": False, "error": "Cancelled"})
                self.set(status="ready", text="Cancelled", job=None)
                return
            if code != 0:
                first = [x[8:].strip() for x in log if x.startswith("@@ERROR")]
                rest = [x for x in log if not x.startswith(("missing artwork", "@@"))]
                raise RuntimeError("Blender stopped with an error: " + (first[-1] if first else "") + "\n" + "".join(rest[-25:]))

            # 3. the results
            res = json.load(open(os.path.join(d, "out", "result.json")))
            files = res.get("files", [])
            order = sorted(files, key=lambda f: {"preview": 0, "still": 1, "blend": 2}.get(f.get("kind"), 3))
            for i, f in enumerate(order):
                progress(97, f"Sending results ({i + 1} of {len(order)})")
                self.send(jid, os.path.join(d, "out", f["path"]), f["path"], f.get("label", ""))
            self.call("POST", "/d/progress/" + jid, {"pct": 99, "msg": "Finishing", "log": "".join(log[-60:])})
            self.call("POST", "/d/done/" + jid, {"ok": True, "result": res})
            self.set(status="ready", text="Finished: " + job.get("title", jid), job=None, pct=100)
            shutil.rmtree(d, ignore_errors=True)
        except Exception as e:
            traceback.print_exc()
            err = str(e)[:1500]
            try:
                self.call("POST", "/d/progress/" + jid, {"pct": 0, "msg": "Failed", "log": "".join(log[-60:])})
                self.call("POST", "/d/done/" + jid, {"ok": False, "error": err})
            except Exception:
                pass
            self.set(status="ready", text="The last job failed", error=err, job=None)

    def send(self, jid, path, name, label):
        size = os.path.getsize(path)
        mime = {"png": "image/png", "jpg": "image/jpeg", "blend": "application/x-blender", "mp4": "video/mp4", "pdf": "application/pdf", "json": "application/json"}.get(name.rsplit(".", 1)[-1].lower(), "application/octet-stream")
        from urllib.parse import urlencode
        with open(path, "rb") as fh:
            off = 0
            while off < size:
                piece = fh.read(PIECE)
                q = urlencode({"path": name, "mime": mime, "bytes": size, "offset": off, "label": label})
                for attempt in range(4):
                    st, r = self.call("POST", f"/d/out/{jid}?{q}", raw=piece, timeout=120)
                    if st == 200:
                        break
                    if st in (401, 403, 409):
                        raise RuntimeError(r.get("error") if isinstance(r, dict) else "refused")
                    time.sleep(2 + attempt * 3)
                else:
                    raise RuntimeError(f"could not send {name}")
                off += len(piece)

    def kill_job(self):
        p = self._proc
        if p and p.poll() is None:
            p.terminate()
            try:
                p.wait(10)
            except Exception:
                p.kill()

    # ------------------------------------------------------------ keep the Mac awake while taking jobs
    def awake(self, on):
        if sys.platform != "darwin" or not self.keep_awake:
            on = False
        if on and not (self._awake and self._awake.poll() is None):
            try:
                self._awake = subprocess.Popen(["caffeinate", "-i", "-w", str(os.getpid())])
            except Exception:
                self._awake = None
        elif not on and self._awake:
            try:
                self._awake.terminate()
            except Exception:
                pass
            self._awake = None

    def forget(self):
        """Pair this Mac again from scratch."""
        try:
            os.remove(self.creds_path())
        except FileNotFoundError:
            pass
        self.set(status="pairing", text="Pairing again", code=None)


if __name__ == "__main__":  # for testing without Blender:  python client.py <bridge_url> <home> <python> <run_job.py>
    base, home, py, rj = sys.argv[1:5]
    c = Client(base, home, [py, rj], name="Test Mac")
    c.start()
    last = None
    while True:
        s = (c.state["status"], c.state["text"], c.state["code"], round(c.state["pct"]))
        if s != last:
            print("STATE", *s, flush=True)
            last = s
        time.sleep(0.5)
