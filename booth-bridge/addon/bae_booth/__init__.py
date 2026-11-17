"""BAE 3D Booth: turns this Mac into the render machine for BAE Studio's 3D Booth.

Install: Edit > Preferences > Add-ons > (arrow menu) > Install from Disk > bae_booth.zip
Then: View3D sidebar (N) > BAE Booth. The first time it shows a 6-digit code: approve it in BAE Studio > 3D Booth.
Jobs run in a separate background Blender, so the file you have open is never touched.
"""
bl_info = {
    "name": "BAE 3D Booth",
    "author": "BAE Studio",
    "version": (1, 0, 0),
    "blender": (4, 2, 0),
    "location": "3D View > Sidebar (N) > BAE Booth",
    "description": "Render machine for BAE Studio's 3D Booth: takes booth jobs from the studio and sends the results back",
    "category": "System",
}

import json, os, sys

import bpy

from . import client as _client

HERE = os.path.dirname(os.path.abspath(__file__))
C = None  # the running client


def config():
    try:
        with open(os.path.join(HERE, "config.json")) as f:
            return json.load(f)
    except Exception:
        return {}


def prefs():
    a = bpy.context.preferences.addons.get(__package__ or __name__)
    return a.preferences if a else None


def online_ok():
    return getattr(bpy.app, "online_access", True)


def start():
    global C
    p = prefs()
    url = (p.bridge_url if p else "") or config().get("bridge_url", "")
    if not url or not online_ok():
        return
    if C and C.base == url.rstrip("/"):
        C.accepting = p.accept_jobs if p else True
        C.keep_awake = p.keep_awake if p else True
        C.start()
        return
    if C:
        C.stop()
    home = bpy.utils.user_resource("CONFIG", path="bae_booth", create=True)
    cmd = [bpy.app.binary_path, "-b", "--factory-startup", "--python", os.path.join(HERE, "engine", "run_job.py"), "--"]
    C = _client.Client(url, home, cmd, name=(p.device_name if p and p.device_name else None), keep_awake=(p.keep_awake if p else True))
    C.accepting = p.accept_jobs if p else True
    C.start()


def _changed(self, context):
    start()


class BAEBOOTH_Prefs(bpy.types.AddonPreferences):
    bl_idname = __package__ or __name__
    bridge_url: bpy.props.StringProperty(name="Bridge address", default=config().get("bridge_url", ""), update=_changed)
    device_name: bpy.props.StringProperty(name="Name of this Mac", default="", description="Shown in BAE Studio. Empty = the computer's name")
    accept_jobs: bpy.props.BoolProperty(name="Take jobs from BAE Studio", default=True, update=_changed)
    keep_awake: bpy.props.BoolProperty(name="Keep the Mac awake while taking jobs", default=True, update=_changed)

    def draw(self, context):
        col = self.layout.column()
        col.prop(self, "bridge_url")
        col.prop(self, "device_name")
        col.prop(self, "accept_jobs")
        col.prop(self, "keep_awake")


class BAEBOOTH_OT_toggle(bpy.types.Operator):
    bl_idname = "bae_booth.toggle"
    bl_label = "Pause / take jobs"
    bl_description = "Stop or start taking jobs from BAE Studio"

    def execute(self, context):
        p = prefs()
        if p:
            p.accept_jobs = not p.accept_jobs
        return {"FINISHED"}


class BAEBOOTH_OT_online(bpy.types.Operator):
    bl_idname = "bae_booth.allow_online"
    bl_label = "Allow online access"
    bl_description = "Blender needs online access to talk to BAE Studio"

    def execute(self, context):
        try:
            context.preferences.system.use_online_access = True
            bpy.ops.wm.save_userpref()
        except Exception as e:
            self.report({"ERROR"}, "Turn it on in Edit > Preferences > System > Network: " + str(e))
            return {"CANCELLED"}
        self.report({"INFO"}, "Online access is on. Restart Blender once.")
        return {"FINISHED"}


class BAEBOOTH_OT_folder(bpy.types.Operator):
    bl_idname = "bae_booth.open_folder"
    bl_label = "Open the jobs folder"

    def execute(self, context):
        bpy.ops.wm.path_open(filepath=bpy.utils.user_resource("CONFIG", path="bae_booth", create=True))
        return {"FINISHED"}


class BAEBOOTH_OT_repair(bpy.types.Operator):
    bl_idname = "bae_booth.pair_again"
    bl_label = "Pair this Mac again"
    bl_description = "Forget the approval and show a new code"

    def execute(self, context):
        if C:
            C.forget()
        return {"FINISHED"}


class BAEBOOTH_PT_panel(bpy.types.Panel):
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = "BAE Booth"
    bl_label = "BAE 3D Booth"

    def draw(self, context):
        L = self.layout
        p = prefs()
        if not online_ok():
            L.label(text="Blender's online access is off.", icon="ERROR")
            L.operator("bae_booth.allow_online", icon="WORLD")
            return
        if not (p and (p.bridge_url or config().get("bridge_url"))):
            L.label(text="No bridge address.", icon="ERROR")
            L.label(text="Download the add-on again from the bridge page.")
            return
        if not C:
            L.label(text="Starting…")
            return
        s = C.state
        icon = {"ready": "CHECKMARK", "working": "RENDER_STILL", "pending": "LOCKED", "offline": "UNLINKED", "error": "ERROR", "paused": "PAUSE"}.get(s["status"], "TIME")
        L.label(text=s["text"], icon=icon)
        if s["status"] == "pending" and s.get("code"):
            box = L.box()
            box.label(text="Approve this code in BAE Studio > 3D Booth:")
            row = box.row()
            row.scale_y = 2.2
            row.alignment = "CENTER"
            row.label(text="   ".join(s["code"][i:i + 3] for i in (0, 3)))
        if s["status"] == "working":
            L.progress(factor=max(0.0, min(1.0, s.get("pct", 0) / 100)), type="BAR", text=f"{s.get('pct', 0):.0f}%")
            L.label(text="Rendering in a separate Blender; keep this one open.")
        if s.get("error") and s["status"] != "working":
            L.label(text=s["error"][:90], icon="INFO")
        L.separator()
        L.operator("bae_booth.toggle", text="Pause" if (p and p.accept_jobs) else "Take jobs", icon="PAUSE" if (p and p.accept_jobs) else "PLAY")
        row = L.row(align=True)
        row.operator("bae_booth.open_folder", text="Jobs folder", icon="FILE_FOLDER")
        row.operator("bae_booth.pair_again", text="Pair again", icon="FILE_REFRESH")


_last = [0.0]


def _tick():
    if C is None:
        start()
    elif C.changed != _last[0]:
        _last[0] = C.changed
        for w in bpy.context.window_manager.windows:
            for a in w.screen.areas:
                if a.type == "VIEW_3D":
                    a.tag_redraw()
    return 1.0


CLASSES = (BAEBOOTH_Prefs, BAEBOOTH_OT_toggle, BAEBOOTH_OT_online, BAEBOOTH_OT_folder, BAEBOOTH_OT_repair, BAEBOOTH_PT_panel)


def register():
    for c in CLASSES:
        bpy.utils.register_class(c)
    bpy.app.timers.register(_tick, first_interval=1.0, persistent=True)


def unregister():
    global C
    if bpy.app.timers.is_registered(_tick):
        bpy.app.timers.unregister(_tick)
    if C:
        C.stop()
        C = None
    for c in reversed(CLASSES):
        bpy.utils.unregister_class(c)
