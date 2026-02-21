#!/usr/bin/env python3
"""Make white and black pixels transparent in PNG icons. Keeps colored parts."""
from PIL import Image
import os

ASSETS = os.path.join(os.path.dirname(__file__), "..", "assets")
# Only pure white and pure black become transparent (keep all drawing/details)
WHITE_MIN = 250
BLACK_MAX = 5

def process(path_in, path_out):
    img = Image.open(path_in).convert("RGBA")
    data = img.getdata()
    out = []
    for item in data:
        r, g, b, a = item
        is_white = r >= WHITE_MIN and g >= WHITE_MIN and b >= WHITE_MIN
        is_black = r <= BLACK_MAX and g <= BLACK_MAX and b <= BLACK_MAX
        if is_white or is_black:
            out.append((r, g, b, 0))
        else:
            out.append(item)
    img.putdata(out)
    img.save(path_out, "PNG")
    print("Saved:", path_out)

def main():
    icons = [
        ("icon-rub.png", "icon-rub-clean.png"),
        ("icon-btc.png", "icon-btc-clean.png"),
        ("icon-usdt.png", "icon-usdt-clean.png"),
    ]
    for name_in, name_out in icons:
        path_in = os.path.join(ASSETS, name_in)
        path_out = os.path.join(ASSETS, name_out)
        if os.path.isfile(path_in):
            process(path_in, path_out)
        else:
            print("Skip (not found):", path_in)

if __name__ == "__main__":
    main()
