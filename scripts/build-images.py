"""
One-off asset pipeline.

Sources are the originals pulled from the old Webador CDN (.src-images/) plus the
local bistro_images/ folder. Everything is cropped to the aspect ratio the layout
actually needs, then written as WebP into public/images/.

Run with:  python scripts/build-images.py
"""
import os
from PIL import Image

SRC_CDN = ".src-images"
SRC_LOCAL = "bistro_images"
OUT = "public/images"

os.makedirs(OUT, exist_ok=True)


def crop_to(im, ratio, anchor=0.5):
    """
    Crop to a target width/height ratio without ever upscaling.

    `anchor` picks which part of the frame survives: 0.5 keeps the centre,
    0 the left/top edge, 1 the right/bottom. The painted wall needs a left
    anchor or the crop cuts the first word off the sentence.
    """
    w, h = im.size
    if w / h > ratio:
        new_w = int(h * ratio)
        x = int((w - new_w) * anchor)
        box = (x, 0, x + new_w, h)
    else:
        new_h = int(w / ratio)
        y = int((h - new_h) * anchor)
        box = (0, y, w, y + new_h)
    return im.crop(box)


def emit(src_dir, src, out_name, ratio=None, max_w=1600, quality=82, anchor=0.5):
    path = os.path.join(src_dir, src)
    im = Image.open(path).convert("RGB")
    if ratio:
        im = crop_to(im, ratio, anchor)
    if im.size[0] > max_w:
        im = im.resize((max_w, round(im.size[1] * max_w / im.size[0])), Image.LANCZOS)
    dst = os.path.join(OUT, out_name)
    im.save(dst, "WEBP", quality=quality, method=6)
    print("%-24s %dx%d  %.0f KB" % (out_name, im.size[0], im.size[1], os.path.getsize(dst) / 1024))


# --- Panel photography (tall crops: these sit under the torn edge) --------------
emit(SRC_CDN,   "image00032-high.jpg",   "hero-plate.webp",     ratio=5 / 6, max_w=1240)
emit(SRC_LOCAL, "bistro_wall_text.jpeg", "about-wall.webp",     ratio=3 / 4, max_w=1000, anchor=0.06)
emit(SRC_CDN,   "image00035-standard.jpg", "sporhet-plate.webp", ratio=3 / 4, max_w=800)

# --- Portrait of the owners -----------------------------------------------------
emit(SRC_CDN, "image-high-jkmo8c.png", "owners.webp", ratio=4 / 3, max_w=1279)

# --- Wide / editorial -----------------------------------------------------------
emit(SRC_LOCAL, "bistro_wall_text.jpeg", "wall-wide.webp", ratio=16 / 9, max_w=1252)
emit(SRC_CDN,   "image00032-high.jpg",   "table-wide.webp", ratio=16 / 9, max_w=1600)

# --- Dish grid (square) ---------------------------------------------------------
emit(SRC_CDN,   "image00028-standard.jpg", "dish-01.webp", ratio=1, max_w=800)
emit(SRC_LOCAL, "food4.jpeg",              "dish-02.webp", ratio=1, max_w=532)
emit(SRC_LOCAL, "food7.jpeg",              "dish-03.webp", ratio=1, max_w=650)
emit(SRC_CDN,   "image00035-standard.jpg", "dish-04.webp", ratio=1, max_w=800)
emit(SRC_LOCAL, "food2.jpeg",              "dish-05.webp", ratio=1, max_w=532)
emit(SRC_LOCAL, "food3.jpeg",              "dish-06.webp", ratio=1, max_w=532)

# --- Catering -------------------------------------------------------------------
emit(SRC_CDN, "catering-high.jpg", "catering.webp", ratio=3 / 4, max_w=720)

# --- Service / atmosphere -------------------------------------------------------
emit(SRC_CDN, "444167241_987838576683364_5973223915273660749_n-standard.jpg",
     "pass.webp", ratio=3 / 2, max_w=799)
