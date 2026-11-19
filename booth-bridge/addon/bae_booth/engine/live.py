"""BAE 3D Booth, Live: the booth is built inside the Blender the designer has open, and kept in step with the studio.

- Every floor, wall and piece of the spec becomes ONE object, tagged with its key ("wall:Front"), a hash of its spec
  and anchor points. Applying a new spec rebuilds only the elements whose spec changed, removes the ones that are gone,
  and leaves the rest untouched, so a change shows in a second.
- Building is a generator: the add-on runs a few steps per timer tick, so the booth appears piece by piece and
  Blender never freezes.
- Two ways: when the designer moves, turns, scales or deletes an object by hand, watch() writes it back into the spec
  (positions in cm, read from the object's matrix and its anchors) and raises the revision, so the studio's plan and
  the contractor's sheet follow.
- The background render (run_job.py) uses the same assembler, so the render is exactly what was seen live.

Pure bpy: works in the open Blender (called from bpy.app.timers) and in a background Blender.
"""
import hashlib, json, math, os, time

import bpy
from mathutils import Matrix, Vector

try:
    from . import build_booth as B
except ImportError:  # run as a plain script from the engine folder
    import build_booth as B

CM = B.CM
SCENE = "BAE Booth"
KEY, HASH, ANCH, MAT, KIND = "bae_key", "bae_hash", "bae_anchors", "bae_mat", "bae_kind"


# ------------------------------------------------------------------ the scene
def scene(title=None, create=True):
    """The live booth scene in this file (never the designer's own scenes)."""
    sc = bpy.data.scenes.get(SCENE)
    if not sc and create:
        sc = bpy.data.scenes.new(SCENE)
        setup(sc)
    if sc and title:
        sc["bae_title"] = str(title)[:120]
    return sc


def setup(sc):
    sc.unit_settings.system = "METRIC"
    sc.unit_settings.length_unit = "CENTIMETERS"
    for n in ("BAE Floor", "BAE Walls", "BAE Pieces", "BAE Cameras"):
        if n not in sc.collection.children:
            sc.collection.children.link(bpy.data.collections.get(n + " (" + sc.name + ")") or bpy.data.collections.new(n + " (" + sc.name + ")"))
    if not any(o.get("bae_env") for o in sc.objects):
        g = B.box("Ground", -3000, -3000, -3, 3000, 3000, -1, B.mat_flat("Ground", "#E9E6E0", 0.9), sc.collection)
        g["bae_env"] = 1
        g.hide_select = True
        sun = bpy.data.lights.new("BAE Sun", "SUN")
        sun.energy, sun.angle = 1.7, math.radians(14)
        so = bpy.data.objects.new("BAE Sun", sun)
        so.rotation_euler = (math.radians(50), 0, math.radians(-35))
        so["bae_env"] = 1
        sc.collection.objects.link(so)
    if not sc.world or not sc.world.get("bae_env"):
        w = bpy.data.worlds.new("BAE Booth sky")
        w.use_nodes = True
        bg = w.node_tree.nodes.get("Background")
        if bg:
            bg.inputs[0].default_value = (0.95, 0.95, 0.97, 1)
            bg.inputs[1].default_value = 0.5
        w["bae_env"] = 1
        sc.world = w
    try:
        sc.view_settings.view_transform = "Standard"
    except Exception:
        pass
    sc.render.resolution_x, sc.render.resolution_y, sc.render.resolution_percentage = 1600, 900, 100


def coll(sc, n):
    return bpy.data.collections.get(n + " (" + sc.name + ")") or sc.collection


# ------------------------------------------------------------------ the elements of a spec
def elements(spec):
    """(key, kind, list name, index, data) for every floor, wall and piece; duplicate names get #2, #3."""
    seen, out = {}, []

    def key(kind, name):
        k = f"{kind}:{name}"
        n = seen.get(k, 0)
        seen[k] = n + 1
        return k if n == 0 else f"{k}#{n + 1}"

    floors = spec.get("floors") or []
    if not floors:
        out.append((key("floor", "Floor"), "floor", None, None, {"name": "Floor", "x": 0, "y": 0, "w": spec["width"], "d": spec["depth"], "colour": "#D9D4CA"}))
    for i, f in enumerate(floors):
        out.append((key("floor", f.get("name", f"Floor {i + 1}")), "floor", "floors", i, f))
    for i, w in enumerate(spec.get("walls") or []):
        out.append((key("wall", w.get("name", f"Wall {i + 1}")), "wall", "walls", i, w))
    for i, p in enumerate(spec.get("pieces") or []):
        out.append((key("piece", p.get("name", f"Piece {i + 1}")), "piece", "pieces", i, p))
    return out


_SIG = {}


def files_sig(data, here):
    """What the design files are (by content), so a new design rebuilds its wall and the same one sent again does not."""
    s = []
    for k in ("art", "art_inside"):
        p = data.get(k)
        if not p:
            continue
        f = os.path.join(here, p)
        if not os.path.isfile(f):
            s.append(f"{p}:-")
            continue
        st = os.stat(f)
        c = _SIG.get(f)
        if not c or c[0] != (st.st_size, st.st_mtime):
            h = hashlib.md5()
            with open(f, "rb") as fh:
                for b in iter(lambda: fh.read(1 << 20), b""):
                    h.update(b)
            c = _SIG[f] = ((st.st_size, st.st_mtime), h.hexdigest()[:12])
        s.append(f"{p}:{c[1]}")
    return s


def _norm(v):
    """214.0 and 214 are the same number (the studio's JSON drops the .0): hash them the same."""
    if isinstance(v, float):
        return int(v) if v.is_integer() else round(v, 4)
    if isinstance(v, dict):
        return {k: _norm(x) for k, x in v.items()}
    if isinstance(v, list):
        return [_norm(x) for x in v]
    return v


def hash_of(kind, data, spec, here):
    extra = [spec.get("height")] if kind == "wall" else []
    raw = json.dumps(_norm([kind, data, extra, files_sig(data, here)]), sort_keys=True, default=str)
    return hashlib.sha1(raw.encode()).hexdigest()[:16]


def tagged(sc):
    return {o[KEY]: o for o in sc.objects if KEY in o}


# ------------------------------------------------------------------ building one element as one object
def _bake(o):
    if o.type == "MESH":
        o.data.transform(o.matrix_basis)
    o.matrix_basis = Matrix.Identity(4)


def _join(objs, name):
    meshes = [o for o in objs if o.type == "MESH"]
    for o in meshes:
        _bake(o)
    if len(meshes) == 1:
        return meshes[0]
    main = meshes[0]
    sc = main.users_scene[0] if main.users_scene else bpy.context.scene
    with bpy.context.temp_override(scene=sc, view_layer=sc.view_layers[0], active_object=main, object=main, selected_objects=meshes, selected_editable_objects=meshes):
        bpy.ops.object.join()
    return main


def build_one(sc, kind, data, spec, here, key):
    tmp = bpy.data.collections.new("bae building")
    sc.collection.children.link(tmp)
    try:
        if kind == "floor":
            f = data
            B.box(f.get("name", "Floor"), f["x"], f["y"], -1, f["x"] + f["w"], f["y"] + f["d"], 0.5,
                  B.mat_flat("Floor " + f.get("colour", "#D9D4CA"), f.get("colour", "#D9D4CA"), 0.5), tmp)
        elif kind == "wall":
            B.wall(data, spec, tmp, here)
        else:
            B.piece(data, here, {"Pieces": tmp})
        objs = list(tmp.objects)
        if not objs:
            return None
        o = _join(objs, data.get("name", key))
        # origin at the bottom centre of the footprint, so moving and turning by hand feel natural
        vs = [v.co for v in o.data.vertices]
        lo = Vector((min(v.x for v in vs), min(v.y for v in vs), min(v.z for v in vs)))
        hi = Vector((max(v.x for v in vs), max(v.y for v in vs), max(v.z for v in vs)))
        c = Vector(((lo.x + hi.x) / 2, (lo.y + hi.y) / 2, lo.z))
        o.data.transform(Matrix.Translation(-c))
        o.location = c
        anchors = anchors_of(kind, data, spec)
        o[ANCH] = [x for p in anchors for x in (p[0] * CM - c.x, p[1] * CM - c.y, p[2] * CM - c.z)]
        if kind == "piece" and data.get("rot"):
            o.rotation_euler.z = math.radians(float(data["rot"]))
        o.name = data.get("name", key)
        o.data.name = o.name
        for c_ in list(o.users_collection):
            c_.objects.unlink(o)
        coll(sc, {"floor": "BAE Floor", "wall": "BAE Walls"}.get(kind, "BAE Pieces")).objects.link(o)
        o[KEY], o[KIND] = key, kind
        o[HASH] = hash_of(kind, data, spec, here)
        sc.view_layers[0].update()
        o[MAT] = [x for row in o.matrix_world for x in row]
        return o
    finally:
        for left in list(tmp.objects):
            bpy.data.objects.remove(left, do_unlink=True)
        bpy.data.collections.remove(tmp)


def anchors_of(kind, d, spec):
    """Points (cm) whose new place after a hand move gives the element's new numbers."""
    if kind == "floor":
        return [(d["x"], d["y"], 0), (d["x"] + d["w"], d["y"] + d["d"], 0)]
    if kind == "wall":
        return [(d["from"][0], d["from"][1], 0), (d["to"][0], d["to"][1], 0)]
    t = d.get("type")
    if t == "art":
        return [(d["from"][0], d["from"][1], d.get("z", 0)), (d["to"][0], d["to"][1], d.get("z", 0))]
    if t == "box":
        return [(d["x"] + d["w"] / 2, d["y"] + d["d"] / 2, d.get("z", 0))]
    return [(d["x"], d["y"], d.get("z", 0))]


def remove(o):
    me = o.data if o.type == "MESH" else None
    bpy.data.objects.remove(o, do_unlink=True)
    if me and me.users == 0:
        bpy.data.meshes.remove(me)


def purge():
    """Materials and pictures no object uses any more (a design that was replaced must not come back from the cache)."""
    for m in list(bpy.data.materials):
        if m.users == 0:
            bpy.data.materials.remove(m)
    for im in list(bpy.data.images):
        if im.users == 0 and im.name not in ("Render Result", "Viewer Node"):
            bpy.data.images.remove(im)


# ------------------------------------------------------------------ apply a spec (a generator: one step per element)
def apply_steps(sc, spec, here, report=None):
    """Make the scene match the spec. Yields after each element so the designer sees it grow."""
    els = elements(spec)
    have = tagged(sc)
    want = {k for k, *_ in els}
    gone = [k for k in have if k not in want]
    for k in gone:
        remove(have.pop(k))
    if gone:
        yield ("removed", len(gone))
    purge()
    built, kept, failed = [], 0, []
    for i, (k, kind, lst, idx, data) in enumerate(els):
        h = hash_of(kind, data, spec, here)
        o = have.get(k)
        if o and o.get(HASH) == h:
            kept += 1
            continue
        if o:
            remove(o)
            purge()
        try:
            build_one(sc, kind, data, spec, here, k)
            built.append(data.get("name", k))
        except Exception as e:  # one broken element never stops the booth
            failed.append(f'{data.get("name", k)} ({type(e).__name__}: {e})')
            print("skipped:", failed[-1], flush=True)
        if report:
            report(int(100 * (i + 1) / max(1, len(els))), f"Building {data.get('name', k)}")
        yield ("built", k)
    cameras(sc, spec)
    sc["bae_spec"] = json.dumps(spec)
    sc["bae_rev"] = int(sc.get("bae_rev", 0)) + 1
    sc["bae_last"] = json.dumps({"built": built, "kept": kept, "failed": failed})
    yield ("done", {"built": built, "kept": kept, "failed": failed, "rev": sc["bae_rev"]})


def assemble(sc, spec, here):
    """The whole booth at once (background renders)."""
    res = None
    for step in apply_steps(sc, spec, here):
        res = step
    return res[1] if res and res[0] == "done" else {}


def cameras(sc, spec):
    for o in [o for o in sc.objects if o.get("bae_cam")]:
        bpy.data.objects.remove(o, do_unlink=True)
    cams = B.make_cameras(sc, spec)
    target = coll(sc, "BAE Cameras")
    for f, o in cams.items():
        o["bae_cam"] = f
        for c_ in list(o.users_collection):
            c_.objects.unlink(o)
        target.objects.link(o)
    if not sc.camera or not sc.camera.get("bae_cam"):
        sc.camera = cams.get("01_front_left")
    return cams


# ------------------------------------------------------------------ what the designer did by hand
def _mat(o):
    return [x for row in o.matrix_world for x in row]


def _moved(o):
    old = o.get(MAT)
    if not old:
        return False
    return any(abs(a - b) > 1e-5 for a, b in zip(old, _mat(o)))


def watch(sc, here=""):
    """Write hand changes back into the spec. Returns the names that changed (empty when nothing did)."""
    if not sc or "bae_spec" not in sc:
        return []
    try:
        spec = json.loads(sc["bae_spec"])
    except Exception:
        return []
    els = elements(spec)
    have = tagged(sc)
    changed, drop = [], {}
    for k, kind, lst, idx, data in els:
        o = have.get(k)
        if o is None:
            if lst:
                drop.setdefault(lst, []).append(idx)
                changed.append(data.get("name", k) + " (deleted)")
            continue
        if not _moved(o):
            continue
        a = list(o.get(ANCH) or [])
        pts = [o.matrix_world @ Vector(a[i:i + 3]) for i in range(0, len(a), 3)]
        cm = [(round(p.x / CM, 1), round(p.y / CM, 1), round(p.z / CM, 1)) for p in pts]
        if kind == "floor" and lst and len(cm) == 2:
            (x0, y0, _), (x1, y1, _) = cm
            data.update(x=min(x0, x1), y=min(y0, y1), w=round(abs(x1 - x0), 1), d=round(abs(y1 - y0), 1))
        elif kind == "wall" and len(cm) == 2:
            data["from"], data["to"] = [cm[0][0], cm[0][1]], [cm[1][0], cm[1][1]]
        elif data.get("type") == "art" and len(cm) == 2:
            data["from"], data["to"] = [cm[0][0], cm[0][1]], [cm[1][0], cm[1][1]]
            data["z"] = round(cm[0][2], 1)
            data["x"], data["y"] = data["from"]
        elif data.get("type") == "box" and cm:
            dims = o.dimensions
            w, d_, h = round(dims.x / CM, 1), round(dims.y / CM, 1), round(dims.z / CM, 1)
            cx, cy, cz = cm[0]
            data.update(w=w, d=d_, h=h, x=round(cx - w / 2, 1), y=round(cy - d_ / 2, 1), z=round(cz, 1))
            rot = round(math.degrees(o.matrix_world.to_euler().z), 1) % 360
            if abs(rot) > 0.05 and abs(rot - 360) > 0.05:
                data["rot"] = rot
            else:
                data.pop("rot", None)
        elif cm:
            data["x"], data["y"] = cm[0][0], cm[0][1]
            if data.get("type") == "cylinder":
                data["z"] = round(cm[0][2], 1)
            if data.get("type") == "ring":
                data["start"] = round((data.get("start", 0) + math.degrees(o.matrix_world.to_euler().z) - math.degrees(_euler_z(o.get(MAT)))) % 360, 1)
        o[MAT] = _mat(o)
        changed.append(data.get("name", k))
    for lst, idxs in drop.items():
        for i in sorted(idxs, reverse=True):
            del spec[lst][i]
    if not changed:
        return []
    # the tags must follow, so the next apply of this same spec does not rebuild what the designer moved
    sc["bae_spec"] = json.dumps(spec)
    have = tagged(sc)
    for k, kind, lst, idx, data in elements(spec):
        o = have.get(k)
        if o is not None:
            o[HASH] = hash_of(kind, data, spec, here)
    sc["bae_rev"] = int(sc.get("bae_rev", 0)) + 1
    return changed


def _euler_z(flat):
    if not flat:
        return 0.0
    m = Matrix([flat[0:4], flat[4:8], flat[8:12], flat[12:16]])
    return m.to_euler().z


def state(sc):
    if not sc or "bae_spec" not in sc:
        return None
    return {"rev": int(sc.get("bae_rev", 0)), "title": sc.get("bae_title", ""), "spec": json.loads(sc["bae_spec"])}


# ------------------------------------------------------------------ in the designer's window
def show(sc, frame=False):
    """Put the booth scene in the window, in material colours; frame it the first time."""
    wm = bpy.context.window_manager
    for win in wm.windows:
        if win.scene != sc:
            win.scene = sc
        for area in win.screen.areas:
            if area.type != "VIEW_3D":
                continue
            sp = area.spaces.active
            if sp.shading.type in ("SOLID", "WIREFRAME"):
                sp.shading.type = "MATERIAL"
            if frame:
                reg = next((r for r in area.regions if r.type == "WINDOW"), None)
                if reg:
                    try:
                        with bpy.context.temp_override(window=win, area=area, region=reg, scene=sc):
                            bpy.ops.view3d.view_all(center=False)
                    except Exception as e:
                        print("view_all:", e, flush=True)
        break


def snapshot(sc, path, view=None, size=(1600, 900)):
    """A picture of the booth: what the viewport shows (or the named camera), as PNG. Falls back to a quick render."""
    r = sc.render
    old = (r.resolution_x, r.resolution_y, r.resolution_percentage, r.image_settings.file_format, sc.camera)
    r.resolution_x, r.resolution_y, r.resolution_percentage = size[0], size[1], 100
    r.image_settings.file_format = "PNG"
    cam = next((o for o in sc.objects if o.get("bae_cam") == view), None) if view else None
    if cam:
        sc.camera = cam
    how = "viewport"
    try:
        done = False
        for win in bpy.context.window_manager.windows:
            if win.scene != sc:
                continue
            for area in win.screen.areas:
                if area.type != "VIEW_3D":
                    continue
                reg = next((x for x in area.regions if x.type == "WINDOW"), None)
                with bpy.context.temp_override(window=win, area=area, region=reg, scene=sc):
                    bpy.ops.render.opengl(write_still=False, view_context=not cam)
                done = True
                break
            if done:
                break
        if not done:
            raise RuntimeError("no 3D view")
        bpy.data.images["Render Result"].save_render(path, scene=sc)
    except Exception:
        how = "render"
        eng, smp = r.engine, None
        r.engine = "CYCLES"
        smp, sc.cycles.samples = sc.cycles.samples, 12
        if not sc.camera:
            cameras(sc, json.loads(sc.get("bae_spec", "{}")) or {"width": 600, "depth": 400})
        r.filepath = path
        bpy.ops.render.render(write_still=True, scene=sc.name)
        sc.cycles.samples, r.engine = smp, eng
    r.resolution_x, r.resolution_y, r.resolution_percentage, r.image_settings.file_format = old[:4]
    if cam:
        sc.camera = old[4]
    return how


# ------------------------------------------------------------------ the runner the add-on drives from its timer
class Runner:
    """Takes live jobs from the client (a queue), runs them a few steps per tick on Blender's main thread."""

    def __init__(self, jobs):
        self.jobs = jobs  # queue.Queue of dicts made by client.run_live
        self.cur = None
        self.gen = None
        self.last_watch = 0
        self.on_change = None  # function(state, changed) -> the client sends it to the bridge

    def step(self, budget=0.04):
        """Returns the seconds until the next call."""
        t0 = time.time()
        if self.cur is None:
            try:
                self.cur = self.jobs.get_nowait()
            except Exception:
                self.cur = None
            if self.cur is not None:
                try:
                    self.begin(self.cur)
                except Exception as e:
                    self.finish(error=f"{type(e).__name__}: {e}")
        if self.cur is not None and self.gen is not None:
            try:
                while time.time() - t0 < budget:
                    kind, val = next(self.gen)
                    if kind == "done":
                        self.after_apply(val)
                        break
            except StopIteration:
                self.finish(result={})
            except Exception as e:
                import traceback
                traceback.print_exc()
                self.finish(error=f"{type(e).__name__}: {e}")
            return 0.02
        if self.cur is not None:
            return 0.02
        if time.time() - self.last_watch > 0.8:
            self.last_watch = time.time()
            sc = scene(create=False)
            if sc:
                ch = watch(sc, sc.get("bae_here", ""))
                if ch and self.on_change:
                    self.on_change(state(sc), ch)
        return 0.25

    def begin(self, job):
        op = job.get("op", "apply")
        sc = scene(job.get("title"), create=(op == "apply"))
        if bpy.context.mode != "OBJECT":  # the designer was editing a mesh: leave Edit Mode first, or joining fails
            try:
                bpy.ops.object.mode_set(mode="OBJECT")
            except Exception:
                pass
        if op == "apply":
            if sc.get("bae_spec"):  # first catch what the designer just did, so it is reported, then the studio's spec wins
                ch = watch(sc, sc.get("bae_here", ""))
                if ch and self.on_change:
                    self.on_change(state(sc), ch)
            spec = job["spec"]
            job["first"] = not tagged(sc) or sc.get("bae_title_built") != job.get("title")
            sc["bae_here"] = job["here"]
            sc["bae_title_built"] = job.get("title") or ""
            show(sc)

            def rep(p, m):
                job["pct"], job["msg"] = p, m
            self.gen = apply_steps(sc, spec, job["here"], rep)
            return
        if not sc:
            raise RuntimeError("There is no booth in this Blender yet. Send one with op apply first.")
        if op == "scene":
            ch = watch(sc, sc.get("bae_here", ""))
            self.finish(result={"state": state(sc), "changed": ch})
        elif op == "snapshot":
            o = job.get("options") or {}
            path = os.path.join(job["out"], "live_view.png")
            how = snapshot(sc, path, o.get("view"))
            self.finish(result={"files": [{"path": "live_view.png", "label": "live view", "kind": "preview"}], "how": how, "rev": int(sc.get("bae_rev", 0))})
        elif op == "focus":
            show(sc, frame=True)
            self.finish(result={"ok": True})
        else:
            raise RuntimeError("op must be apply, snapshot, scene or focus")

    def after_apply(self, val):
        job = self.cur
        sc = scene(create=False)
        show(sc, frame=job.get("first"))
        res = dict(val)
        if (job.get("options") or {}).get("snapshot", True):
            path = os.path.join(job["out"], "live_view.png")
            try:
                res["how"] = snapshot(sc, path, (job.get("options") or {}).get("view"))
                res["files"] = [{"path": "live_view.png", "label": "live view", "kind": "preview"}]
            except Exception as e:
                res["snapshot_error"] = str(e)
        if self.on_change:
            self.on_change(state(sc), [])
        self.finish(result=res)

    def finish(self, result=None, error=None):
        job, self.cur, self.gen = self.cur, None, None
        if job is None:
            return
        job["result"], job["error"] = result, error
        ev = job.get("event")
        if ev:
            ev.set()
