#!/usr/bin/env python3
"""Genera los recursos estáticos del sitio a partir de archivos locales.

- Fuentes Inter / Inter Display (OFL 1.1) en WOFF, recortadas a latín.
- Logotipo provisorio: "beta" en Inter Display Bold convertido a trazos SVG.
  Se reemplaza cuando exista el vector oficial de la marca.
- Favicon, íconos e imagen para compartir (Open Graph).

Uso: python3 scripts/build-assets.py [carpeta-de-fuentes]
Requiere fontTools y Pillow. Por defecto toma las fuentes de
/usr/share/fonts/opentype/inter (paquete fonts-inter).
"""
import sys
from pathlib import Path

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
FONT_SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("/usr/share/fonts/opentype/inter")

# Latín básico + español + signos tipográficos usados en el sitio.
UNICODES = list(range(0x20, 0x7F)) + [
    0xA0, 0xA1, 0xA9, 0xAB, 0xB0, 0xB7, 0xBB, 0xBF, 0xC1, 0xC9, 0xCD, 0xD1, 0xD3, 0xDA, 0xDC,
    0xE1, 0xE9, 0xED, 0xF1, 0xF3, 0xFA, 0xFC, 0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D,
    0x2026, 0x2192, 0x2212, 0x00D7,
]

FONTS = {
    "inter-400.woff": "Inter-Regular.otf",
    "inter-500.woff": "Inter-Medium.otf",
    "inter-600.woff": "Inter-SemiBold.otf",
    "inter-700.woff": "Inter-Bold.otf",
    "inter-display-600.woff": "InterDisplay-SemiBold.otf",
}

# Isotipo (recreado de la imagen de marca; reemplazar por el vector oficial).
ISO_DARK = [(95, 0), (195, 0), (100, 130), (0, 130)]
ISO_BLUE = [(180, 40), (270, 40), (175, 170), (80, 170)]
INK, BLUE, DEEP, LIGHT = "#0F172A", "#2563EB", "#0B1020", "#F8FAFC"


def build_fonts():
    out = SITE / "assets" / "fonts"
    out.mkdir(parents=True, exist_ok=True)
    for name, src in FONTS.items():
        font = TTFont(FONT_SRC / src)
        opts = Options()
        opts.flavor = "woff"
        opts.layout_features = ["kern", "liga", "calt", "tnum", "ss01"]
        opts.name_IDs = ["*"]
        sub = Subsetter(options=opts)
        sub.populate(unicodes=UNICODES)
        sub.subset(font)
        font.flavor = "woff"
        font.save(out / name)
        print("fuente", name, (out / name).stat().st_size, "bytes")


def wordmark_path(text="beta", tracking=-0.05):
    """Devuelve (path_d, ancho, alto_cap) del texto en Inter Display Bold, en unidades de 1000/em."""
    font = TTFont(FONT_SRC / "InterDisplay-Bold.otf")
    upm = font["head"].unitsPerEm
    cmap = font.getBestCmap()
    gs = font.getGlyphSet()
    hmtx = font["hmtx"]
    scale = 1000 / upm
    ascender = 1000 * 0.78  # línea de base desde arriba, ajustada a la altura de "b"
    x = 0.0
    parts = []
    for ch in text:
        gname = cmap[ord(ch)]
        pen = SVGPathPen(gs, ntos=lambda v: f"{v:.1f}".rstrip("0").rstrip("."))
        # Voltea Y (fuente: Y hacia arriba; SVG: Y hacia abajo) y escala a 1000/em.
        tpen = TransformPen(pen, (scale, 0, 0, -scale, x, ascender))
        gs[gname].draw(tpen)
        parts.append(pen.getCommands())
        x += hmtx[gname][0] * scale + tracking * 1000
    width = x - tracking * 1000
    return " ".join(parts), round(width, 1), ascender


def build_logo():
    d, w, base = wordmark_path()
    out = SITE / "assets" / "img"
    out.mkdir(parents=True, exist_ok=True)
    (out / "wordmark-path.txt").write_text(f"{d}\n", encoding="utf-8")
    # Logo combinado: isotipo de 270x170 + palabra escalada a la altura del isotipo.
    s = 170 / base * 1.0
    gap = 46
    total_w = 270 + gap + w * s
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {total_w:.0f} 170" role="img" aria-label="beta">
<polygon points="{' '.join(f'{x},{y}' for x, y in ISO_DARK)}" fill="{INK}"/>
<polygon points="{' '.join(f'{x},{y}' for x, y in ISO_BLUE)}" fill="{BLUE}"/>
<path transform="translate({270 + gap} 0) scale({s:.4f})" fill="{INK}" d="{d}"/>
</svg>
"""
    (out / "logo.svg").write_text(svg, encoding="utf-8")
    print("logo", f"viewBox 0 0 {total_w:.0f} 170", "palabra", w, "x", base)
    return d, w, base


def poly_scaled(points, s, dx, dy):
    return [(dx + x * s, dy + y * s) for x, y in points]


def build_icons():
    site = SITE
    fav = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -70 310 310">
<rect x="-20" y="-70" width="310" height="310" rx="64" fill="{INK}"/>
<polygon points="{' '.join(f'{x},{y}' for x, y in ISO_DARK)}" fill="{LIGHT}"/>
<polygon points="{' '.join(f'{x},{y}' for x, y in ISO_BLUE)}" fill="{BLUE}"/>
</svg>
"""
    (site / "favicon.svg").write_text(fav, encoding="utf-8")

    def icon(size, radius_ratio=0.2):
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        dr = ImageDraw.Draw(img)
        dr.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * radius_ratio), fill=INK)
        s = size * 0.78 / 270
        dx = (size - 270 * s) / 2
        dy = (size - 170 * s) / 2
        dr.polygon(poly_scaled(ISO_DARK, s, dx, dy), fill=LIGHT)
        dr.polygon(poly_scaled(ISO_BLUE, s, dx, dy), fill=BLUE)
        return img

    big = icon(1024)
    for size, name in [(180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")]:
        big.resize((size, size), Image.LANCZOS).save(site / name)
    big.resize((64, 64), Image.LANCZOS).save(site / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print("íconos listos")


def build_og(word_d):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), DEEP)
    dr = ImageDraw.Draw(img)
    # Pieza grande del isotipo a la derecha, como en el hero.
    s = 2.4
    dr.polygon(poly_scaled([(95, 0), (270, 0), (175, 130), (0, 130)], s, 640, 330), fill="#1D4ED8")
    dr.polygon(poly_scaled(ISO_DARK, 0.62, 80, 86), fill=LIGHT)
    dr.polygon(poly_scaled(ISO_BLUE, 0.62, 80, 86), fill=BLUE)
    word = ImageFont.truetype(str(FONT_SRC / "InterDisplay-Bold.otf"), 112)
    dr.text((268, 64), "beta", font=word, fill=LIGHT)
    head = ImageFont.truetype(str(FONT_SRC / "InterDisplay-SemiBold.otf"), 76)
    dr.text((80, 300), "Sacamos tu marca", font=head, fill=LIGHT)
    dr.text((80, 386), "de beta.", font=head, fill=LIGHT)
    sub = ImageFont.truetype(str(FONT_SRC / "Inter-Medium.otf"), 30)
    dr.text((80, 520), "Diseño y desarrollo web a medida", font=sub, fill="#A9B6D3")
    img.save(SITE / "og-image.png", optimize=True)
    print("og-image.png lista")


if __name__ == "__main__":
    build_fonts()
    d, _, _ = build_logo()
    build_icons()
    build_og(d)
