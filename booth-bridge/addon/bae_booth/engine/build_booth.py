"""BAE 3D Booth: build a booth in Blender from one spec (booth.json), in real centimetres.

Run:  python build_booth.py booth.json out_dir [stills|video|all]
(inside Blender's Python, or with the `bpy` module of the same Blender version).

The spec is the single source of truth: the floor size, every wall with its artwork and openings, every piece with its
position measured from the FRONT-LEFT corner (x to the right, y to the back). Nothing is placed by eye.
"""
import bpy, bmesh, json, math, os, sys
from mathutils import Vector

CM = 0.01


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.unit_settings.system = "METRIC"
    sc.unit_settings.length_unit = "CENTIMETERS"
    return sc


def mat_flat(name, hexcol, rough=0.6, emit=0.0, alpha=1.0, metal=0.0):
    m = bpy.data.materials.get(name)
    if m:
        return m
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    h = hexcol.lstrip("#")
    rgb = [pow(int(h[i:i + 2], 16) / 255, 2.2) for i in (0, 2, 4)]
    b.inputs["Base Color"].default_value = (*rgb, 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if emit:
        b.inputs["Emission Color"].default_value = (*rgb, 1)
        b.inputs["Emission Strength"].default_value = emit
    if alpha < 1:
        b.inputs["Alpha"].default_value = alpha
        b.inputs["Transmission Weight"].default_value = 0.9
        b.inputs["Roughness"].default_value = 0.05
        m.blend_method = "BLEND"
    return m


def mat_image(name, path, emit=0.0):
    """An artwork as a material. A picture with transparency (a cut-out star, letters) keeps its shape; `emit` makes it backlit."""
    m = bpy.data.materials.get(name)
    if m:
        return m
    if not path or not os.path.isfile(path):  # a design that was not sent: the wall keeps its colour
        print("missing artwork:", path, flush=True)
        return None
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes["Principled BSDF"]
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = bpy.data.images.load(path)
    tex.extension = "CLIP" if tex.image.depth == 32 else "EXTEND"
    nt.links.new(tex.outputs["Color"], b.inputs["Base Color"])
    b.inputs["Roughness"].default_value = 0.55
    if tex.image.depth == 32:
        nt.links.new(tex.outputs["Alpha"], b.inputs["Alpha"])
        m.blend_method = "BLEND"
    if emit:
        nt.links.new(tex.outputs["Color"], b.inputs["Emission Color"])
        b.inputs["Emission Strength"].default_value = emit
    return m


def box(name, x0, y0, z0, x1, y1, z1, mat, coll=None):
    """A box from two corners, in centimetres."""
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    ob.scale = ((x1 - x0) * CM, (y1 - y0) * CM, (z1 - z0) * CM)
    ob.location = ((x0 + x1) / 2 * CM, (y0 + y1) / 2 * CM, (z0 + z1) / 2 * CM)
    me.materials.append(mat)
    (coll or bpy.context.scene.collection).objects.link(ob)
    return ob


def cyl(name, x, y, z0, z1, r, mat, coll=None, seg=48):
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=seg, radius1=r * CM, radius2=r * CM, depth=(z1 - z0) * CM)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    ob.location = (x * CM, y * CM, (z0 + z1) / 2 * CM)
    me.materials.append(mat)
    for p in me.polygons:
        p.use_smooth = len(p.vertices) == 4
    (coll or bpy.context.scene.collection).objects.link(ob)
    return ob


def art_plane(name, p0, p1, z0, z1, mat, coll, lift=0.4):
    """A flat artwork between two floor points p0 -> p1 (cm), from z0 to z1. The image's LEFT edge is at p0."""
    a, b = Vector((p0[0], p0[1], 0)), Vector((p1[0], p1[1], 0))
    d = (b - a).normalized()
    n = Vector((d.y, -d.x, 0)) * lift  # pushed off the wall toward the viewer
    v = [(a + n) * CM + Vector((0, 0, z0 * CM)), (b + n) * CM + Vector((0, 0, z0 * CM)),
         (b + n) * CM + Vector((0, 0, z1 * CM)), (a + n) * CM + Vector((0, 0, z1 * CM))]
    me = bpy.data.meshes.new(name)
    me.from_pydata(v, [], [(0, 1, 2, 3)])
    uv = me.uv_layers.new(name="UVMap")
    for i, c in enumerate([(0, 0), (1, 0), (1, 1), (0, 1)]):
        uv.data[i].uv = c
    me.materials.append(mat)
    ob = bpy.data.objects.new(name, me)
    coll.objects.link(ob)
    return ob


def wall(w, spec, coll, here):
    """A straight wall from `from` to `to` (cm), thickness inward (to the left of the direction), with openings.
    `art` is seen from the outside (the right-hand side of the direction from -> to is OUTSIDE when outside='right')."""
    (x0, y0), (x1, y1) = w["from"], w["to"]
    L = math.hypot(x1 - x0, y1 - y0)
    H, T = w.get("height", spec["height"]), w.get("thick", 10)
    d = Vector((x1 - x0, y1 - y0, 0)).normalized()
    inward = Vector((-d.y, d.x, 0))
    m_body = mat_flat("Wall body " + w.get("colour", "#D62D20"), w.get("colour", "#D62D20"))
    cuts = sorted(w.get("openings", []), key=lambda o: o["at"])
    segs, cur = [], 0
    for o in cuts:
        if o["at"] > cur:
            segs.append((cur, o["at"], 0, H))
        segs.append((o["at"], o["at"] + o["width"], o["height"], H))  # the header over the opening
        cur = o["at"] + o["width"]
        if o.get("post"):
            pw = o["post"].get("width", 10)
            pc = o["at"] + o["width"] / 2
            segs.append((pc - pw / 2, pc + pw / 2, 0, o["post"].get("height", o["height"])))
    if cur < L:
        segs.append((cur, L, 0, H))
    for k, (s0, s1, z0, z1) in enumerate(segs):
        a = Vector((x0, y0, 0)) + d * s0
        b = Vector((x0, y0, 0)) + d * s1 + inward * T
        ob = box(f'{w["name"]} part {k + 1}', 0, 0, z0, 1, 1, z1, m_body, coll)
        # an oriented box: build it from its real corners
        me = ob.data
        c = [a, Vector((x0, y0, 0)) + d * s1, b, a + inward * T]
        verts = [(p.x * CM, p.y * CM, z0 * CM) for p in c] + [(p.x * CM, p.y * CM, z1 * CM) for p in c]
        bm = bmesh.new()
        vs = [bm.verts.new(v) for v in verts]
        for f in [(0, 1, 2, 3), (7, 6, 5, 4), (0, 4, 5, 1), (1, 5, 6, 2), (2, 6, 7, 3), (3, 7, 4, 0)]:
            bm.faces.new([vs[i] for i in f])
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
        bm.to_mesh(me)
        bm.free()
        ob.scale = (1, 1, 1)
        ob.location = (0, 0, 0)
    # rounded top corners of an opening: the square corner minus a quarter circle, with the artwork on its outside
    m_out = mat_image("Art " + w["name"] + " out", os.path.join(here, w["art"])) if w.get("art") else None
    base = Vector((x0, y0, 0))
    for o in cuts:
        r = o.get("radius", 0)
        if not r:
            continue
        h = o["height"]
        for q, (sc_, sg) in enumerate(((o["at"], 1), (o["at"] + o["width"], -1))):
            pts = [(sc_, h)] + [(sc_ + sg * (r - r * math.cos(math.radians(a_))), h - r + r * math.sin(math.radians(a_))) for a_ in range(90, -1, -6)]
            for kind, t0, t1 in (("body", 0, T), ("art", -0.4, None)):
                if kind == "art" and not m_out:
                    continue
                bm = bmesh.new()
                f0 = [bm.verts.new(tuple((base + d * s_ + inward * t0) * CM + Vector((0, 0, z_ * CM)))) for s_, z_ in pts]
                face = bm.faces.new(f0)
                if t1 is not None:
                    f1 = [bm.verts.new(tuple((base + d * s_ + inward * t1) * CM + Vector((0, 0, z_ * CM)))) for s_, z_ in pts]
                    bm.faces.new(f1)
                    for i in range(len(pts)):
                        j = (i + 1) % len(pts)
                        bm.faces.new([f0[i], f0[j], f1[j], f1[i]])
                    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
                else:
                    uvl = bm.loops.layers.uv.new("UVMap")
                    for lp, (s_, z_) in zip(face.loops, pts):
                        lp[uvl].uv = (s_ / L, z_ / H)
                me = bpy.data.meshes.new(f'{w["name"]} {o.get("name", "opening")} corner {q + 1} {kind}')
                bm.to_mesh(me)
                bm.free()
                me.materials.append(m_body if kind == "body" else m_out)
                coll.objects.link(bpy.data.objects.new(me.name, me))
    for side, key in (("out", "art"), ("in", "art_inside")):
        if not w.get(key):
            continue
        m = mat_image("Art " + w["name"] + " " + side, os.path.join(here, w[key]))
        if not m:
            continue
        a, b = Vector((x0, y0, 0)), Vector((x1, y1, 0))
        if side == "in":
            a, b = b + inward * T, a + inward * T
        # the artwork is cut into the wall's solid parts so openings stay open
        for k, (s0, s1, z0, z1) in enumerate(segs):
            if side == "out":
                p0, p1, u0, u1 = a + d * s0, a + d * s1, s0 / L, s1 / L
            else:
                p0, p1, u0, u1 = a - d * (L - s1), a - d * (L - s0), (L - s1) / L, (L - s0) / L
            ob = art_plane(f'{w["name"]} art {side} {k + 1}', (p0.x, p0.y), (p1.x, p1.y), z0, z1, m, coll)
            uv = ob.data.uv_layers[0].data
            for i, c in enumerate([(u0, z0 / H), (u1, z0 / H), (u1, z1 / H), (u0, z1 / H)]):
                uv[i].uv = c


def build(spec, here):
    sc = reset()
    W, D, H = spec["width"], spec["depth"], spec["height"]
    C = {n: bpy.data.collections.new(n) for n in ["Floor", "Walls", "Pieces"]}
    for c in C.values():
        sc.collection.children.link(c)
    box("Ground", -3000, -3000, -3, W + 3000, D + 3000, -1, mat_flat("Ground", "#E9E6E0", 0.9), C["Floor"])
    for f in spec.get("floors", [{"name": "Floor", "x": 0, "y": 0, "w": W, "d": D, "colour": "#D9D4CA"}]):
        box(f["name"], f["x"], f["y"], -1, f["x"] + f["w"], f["y"] + f["d"], 0.5, mat_flat("Floor " + f["colour"], f["colour"], 0.5), C["Floor"])
    for w in spec["walls"]:
        wall(w, spec, C["Walls"], here)
    for p in spec["pieces"]:
        col = mat_flat("Piece " + p.get("colour", "#F15A22"), p.get("colour", "#F15A22"), p.get("rough", 0.5), p.get("emit", 0), p.get("alpha", 1), p.get("metal", 0))
        x, y, z = p["x"], p["y"], p.get("z", 0)
        t = p["type"]
        if t == "box":
            box(p["name"], x, y, z, x + p["w"], y + p["d"], z + p["h"], col, C["Pieces"])
        elif t == "cylinder":
            cyl(p["name"], x, y, z, z + p["h"], p["r"], col, C["Pieces"])
        elif t == "table":  # a round top on a stem
            cyl(p["name"] + " top", x, y, p["h"] - 4, p["h"], p["r"], col, C["Pieces"])
            cyl(p["name"] + " stem", x, y, 2, p["h"] - 4, p.get("stem", 4), mat_flat("Brass", "#B8935A", 0.3, metal=1), C["Pieces"])
            cyl(p["name"] + " foot", x, y, 0, 2, p["r"] * 0.6, mat_flat("Brass", "#B8935A", 0.3, metal=1), C["Pieces"])
        elif t == "ring":  # stools around a centre
            for k in range(p["count"]):
                a = 2 * math.pi * k / p["count"] + math.radians(p.get("start", 0))
                cyl(f'{p["name"]} {k + 1}', x + p["ring"] * math.cos(a), y + p["ring"] * math.sin(a), 0, p["h"], p["r"], col, C["Pieces"])
        elif t == "art":  # a flat artwork standing on the floor or on a wall
            m = mat_image("Art " + p["name"], os.path.join(here, p["art"]), p.get("emit", 0))
            if m:
                art_plane(p["name"], p["from"], p["to"], z, z + p["h"], m, C["Pieces"], p.get("lift", 0.6))
    # light: soft sky + one sun
    world = bpy.data.worlds.new("Studio")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs[0].default_value = (0.95, 0.95, 0.97, 1)
    world.node_tree.nodes["Background"].inputs[1].default_value = 0.5
    sc.world = world
    sun = bpy.data.lights.new("Sun", "SUN")
    sun.energy, sun.angle = 1.7, math.radians(14)
    so = bpy.data.objects.new("Sun", sun)
    so.rotation_euler = (math.radians(50), 0, math.radians(-35))
    sc.collection.objects.link(so)
    return sc


def camera(sc, name, eye, look, lens=28, ortho=None):
    cam = bpy.data.cameras.new(name)
    cam.lens = lens
    cam.clip_end = 500
    if ortho:
        cam.type, cam.ortho_scale = "ORTHO", ortho * CM
    ob = bpy.data.objects.new(name, cam)
    ob.location = Vector(eye) * CM
    ob.rotation_euler = (Vector(look) * CM - ob.location).to_track_quat("-Z", "Y").to_euler()
    sc.collection.objects.link(ob)
    return ob


def setup_render(sc, w, h, samples):
    sc.render.engine = "CYCLES"
    sc.cycles.device = "CPU"
    sc.cycles.samples = samples
    sc.cycles.use_denoising = True
    sc.render.resolution_x, sc.render.resolution_y, sc.render.resolution_percentage = w, h, 100
    sc.view_settings.view_transform = "Standard"
    sc.render.film_transparent = False


def use_gpu(sc):
    """Render on the graphics card when there is one (Metal on a Mac). Returns what is used."""
    try:
        prefs = bpy.context.preferences.addons["cycles"].preferences
    except Exception:
        return "CPU"
    for kind in ("METAL", "OPTIX", "CUDA", "HIP", "ONEAPI"):
        try:
            prefs.compute_device_type = kind
            prefs.get_devices()
        except Exception:
            continue
        devs = [d for d in prefs.devices if d.type == kind]
        if devs:
            for d in prefs.devices:
                d.use = d.type == kind
            sc.cycles.device = "GPU"
            return kind + " (" + ", ".join(d.name for d in devs) + ")"
    sc.cycles.device = "CPU"
    return "CPU"


def make_cameras(sc, spec):
    """The standard views of a booth, plus any extra view named in the spec."""
    W, D = spec["width"], spec["depth"]
    cx, cy = W / 2, D / 2
    cams = {
        "01_front_left": camera(sc, "Front left", (-420, -640, 300), (cx - 60, cy, 110), 26),
        "02_front": camera(sc, "Front", (W * 0.33, -900, 190), (W * 0.33, 0, 125), 30),
        "03_back_right": camera(sc, "Back right", (W + 380, D + 640, 320), (cx + 40, cy, 100), 26),
        "04_left_side": camera(sc, "Left side", (-820, cy, 180), (0, cy, 125), 30),
        "05_inside": camera(sc, "Inside", (W * 0.345, D * 0.08, 165), (W * 0.3, D * 0.68, 110), 17),
        "06_top": camera(sc, "Top", (cx, cy, 2000), (cx, cy, 0), ortho=max(W * 1.12, D * 1.12 * 16 / 9)),
    }
    cams["06_top"].rotation_euler = (0, 0, 0)
    for c in spec.get("cameras", []):
        cams[c["file"]] = camera(sc, c["name"], c["eye"], c["look"], c.get("lens", 28))
    return cams


def main():
    spec_path, out, what = sys.argv[1:4]
    here = os.path.dirname(os.path.abspath(spec_path))
    spec = json.load(open(spec_path))
    os.makedirs(out, exist_ok=True)
    sc = build(spec, here)
    W, D, H = spec["width"], spec["depth"], spec["height"]
    cx, cy = W / 2, D / 2
    cams = {
        "01_front_left": camera(sc, "Front left", (-420, -640, 300), (cx - 60, cy, 110), 26),
        "02_front": camera(sc, "Front", (330, -900, 190), (330, 0, 125), 30),
        "03_back_right": camera(sc, "Back right", (W + 380, D + 640, 320), (cx + 40, cy, 100), 26),
        "04_left_side": camera(sc, "Left side", (-820, cy, 180), (0, cy, 125), 30),
        "05_inside": camera(sc, "Inside", (345, 40, 165), (300, 330, 110), 17),
        "06_top": camera(sc, "Top", (cx, cy, 2000), (cx, cy, 0), ortho=max(W * 1.12, D * 1.12 * 16 / 9)),
    }
    cams["06_top"].rotation_euler = (0, 0, 0)
    for c in spec.get("cameras", []):  # extra views named in the spec
        cams[c["file"]] = camera(sc, c["name"], c["eye"], c["look"], c.get("lens", 28))
    # one camera that walks around the booth: the reference clip for the video model
    orb = camera(sc, "Orbit", (cx, -1050, 300), (cx, cy, 110), 26)
    frames = spec.get("orbit_frames", 144)
    sc.frame_start, sc.frame_end = 1, frames
    sc.render.fps = spec.get("orbit_fps", 24)
    R = math.hypot(cy + 1050, 0)  # the camera walks an arc in front of the booth, always aimed at its centre
    for f in range(1, frames + 1):
        t = (f - 1) / max(1, frames - 1)
        a = math.radians(-42 + 84 * (t * t * (3 - 2 * t)))  # ease in and out
        eye = Vector((cx + R * math.sin(a), cy - R * math.cos(a), 300)) * CM
        orb.location = eye
        orb.rotation_euler = (Vector((cx, cy, 110)) * CM - eye).to_track_quat("-Z", "Y").to_euler()
        orb.keyframe_insert("location", frame=f)
        orb.keyframe_insert("rotation_euler", frame=f)
    sc.camera = cams["01_front_left"]
    bpy.ops.file.pack_all()
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(out, spec.get("file", "booth") + ".blend"))
    if what in ("stills", "all"):
        setup_render(sc, 1920, 1080, 40)
        only = sys.argv[4].split(",") if len(sys.argv) > 4 else None  # optional: render just these views
        for k, c in cams.items():
            if only and k not in only:
                continue
            sc.camera = c
            sc.render.filepath = os.path.join(out, k + ".png")
            bpy.ops.render.render(write_still=True)
            print("rendered", k, flush=True)
    if what in ("video", "all"):
        setup_render(sc, 768, 432, 6)
        sc.camera = orb
        sc.render.image_settings.file_format = "FFMPEG"
        sc.render.ffmpeg.format = "MPEG4"
        sc.render.ffmpeg.codec = "H264"
        sc.render.ffmpeg.constant_rate_factor = "MEDIUM"
        sc.render.filepath = os.path.join(out, "reference_orbit.mp4")
        bpy.ops.render.render(animation=True)
        print("rendered video", flush=True)


if __name__ == "__main__":
    main()
