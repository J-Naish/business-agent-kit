# Typography guide

Wherever there is text, typography decides quality. Font, size, weight, line height, letter spacing — together they create the impression of "readable," "beautiful," "on-brand." Designing typography is using letterforms to express priority, tone, and brand personality.

---

## Choosing a font family

### Types of fonts and their roles

- **Sans-serif**: Modern, clean, UI-friendly. The most common choice for body text on the web and in apps.
- **Serif**: Authoritative, trustworthy, editorial. Strong when you want headings or long-form text to feel weighty.
- **Monospace**: Code, numerical data, technical readouts. Use it when equal width is functionally required.

### Keep the number of fonts minimal

Stick to **one or two** font families. Three or more, and cohesion starts to break down.

- **One family**: The cleanest option. Build hierarchy through weight and size alone.
- **Two families**: Pairing serif with sans-serif gives an editorial feel. The classic move is serif for headings, sans-serif for body.
- **Plus monospace**: Only when you handle code or technical data — added as a third.

### Custom fonts vs. system fonts

If you can use a **custom font** (proprietary or paid), do. It's one of the strongest levers for brand personality. The same layout in a different font produces a totally different impression.

That said, **standard fonts** (Inter, Noto Sans JP, and other free options) can absolutely deliver high-quality typography when weight, letter spacing, and OpenType features are tuned carefully. How you use a font matters more than which font you pick.

### Notes on Japanese fonts

Japanese has a vast number of glyphs, so file size becomes a real concern when loading webfonts. Consider subsetting (extracting only the characters you need) or using a font delivery service.

When mixing Latin and Japanese fonts, check that the baselines and apparent character sizes align. Japanese fonts tend to have larger visual sizing than Latin ones, which makes mixed-language settings prone to feel off.

---

## Size hierarchy

The heart of typography is **size hierarchy** — using size differences to convey, instantly, what matters most and in what order to read.

### Composing the hierarchy

Most systems use 4–5 levels:

| Level | Role | Approx. size |
|-------|------|--------------|
| Display | Hero, large landing-page headlines | 48px–96px |
| Heading | Section headings, card headings | 24px–40px |
| Body | Paragraphs, descriptions, primary content | 14px–18px |
| Caption / Label | Supporting text, UI labels, metadata | 12px–14px |

Sizes vary by medium and device, but the key is that **adjacent levels are clearly different in size**. A 2px difference between heading and body doesn't function as hierarchy.

### Designing the display size

Display text is **where you build visual impact** — the first impression of a hero section or landing page.

The display size you pick reflects brand attitude:

- **Bold (72px–110px)**: Typography itself is the visual hero. The "type-as-impact" approach.
- **Standard (48px–64px)**: Confident but balanced. The most commonly used range.
- **Restrained (40px and below)**: Pull the type back so photography or video can lead.

### Body size baselines

For body text, **readability comes first**. Pick a size that's comfortable for long-form reading:

- **Web**: 16px as the baseline; 14px–18px range
- **Mobile**: 14px is the floor — anything smaller is hard to read
- **12px and below**: Don't use for body. Reserve for captions and labels.

### Minimum sizes by medium

Viewing distance and context shift by medium, so the floor shifts too. **Respect the floor for the medium you're working in**:

| Medium | Body floor | Supporting text floor | Notes |
|--------|-----------|----------------------|-------|
| Web (desktop) | 14px | 12px | 16px baseline |
| Mobile UI | 14px | 12px | Tap targets need a separate 44px hit area ([layout.md](layout.md)) |
| Slides (1920×1080) | 24px | 18px | For projection, prefer 32px+ for body |
| Print (A4 / documents) | 10–11pt | 8pt | For reading copy, 11–12pt is the baseline |
| Posters / large-format | Distance-dependent | — | If viewed from far away, 36px+ for body-equivalent |
| HTML email | 14–16px | 12px | Leave headroom for client-side scaling |

These are **floors**. Don't design at the floor — pick a size one step above based on density and context. It's safer.

---

## Weight

Weight builds emphasis, but **gradations should be subtle**. Don't think bold/thin binary — think small, deliberate steps.

### How to use weights

- **Regular (400)**: The body baseline. Used for most text.
- **Medium (500)**: Inline emphasis, UI labels, navigation. The difference from regular is small, but applied with intent it works.
- **Semibold (600)**: Headings, section titles. Clear emphasis.
- **Bold (700)**: The strongest emphasis. Use sparingly.

### Don't overuse Bold

Bold (700) is the strongest emphasis you have, but overusing it reads as noise rather than emphasis. Polished typography tends to lean lighter — Light (300) or Medium (500) as the workhorse, with Bold reserved for moments that truly need to stand out. The whole composition feels more refined.

### Number of weight steps

Use **2–3 weights** at most. Beyond four, the differences become hard to read and emphasis gets muddy.

---

## Line height

Line height is one of the biggest levers on readability. Same font, same size — change line height, and the impression shifts dramatically.

### Line height by size

Adjust line height to size: **tighter for large text, looser for small text**.

- **Display (48px+)**: 1.0–1.15. Tight tracking gives the block its presence.
- **Heading (24px–40px)**: 1.15–1.3. Not as tight as display, tighter than body.
- **Body (14px–18px)**: 1.4–1.6. This directly determines comfort over long reading.
- **Caption (12px–14px)**: 1.4–1.5. Enough headroom that small text doesn't feel cramped.

### Body line height makes or breaks quality

The standard range for body line height is **1.4–1.6**, but that 0.2 of difference matters:

- **1.4–1.45**: Tight and sharp. Suits dense, technical UIs.
- **1.5–1.6**: Roomy, with breath. Suits long-form and editorial content.

If text feels "vaguely hard to read" or "cramped," check line height first. Often, raising it by 0.1 fixes it — before touching size or font. For vertical rhythm built from line height plus spacing, see [layout.md](layout.md).

---

## Letter spacing (tracking)

Tracking adjusts density and legibility. Tuning it to size and context lifts typography precision substantially.

### Core principle: tighten when large, loosen when small

Fonts are usually designed to look most natural at body sizes (around 14–18px). Move away from there and tuning is needed:

- **Display (48px+)**: **Negative tracking** (tighten). Large type tends to look airy; tightening adds density and force. Around -1px to -3px is typical.
- **Body (14px–18px)**: **Default (normal)** is usually fine. Trust the font's built-in spacing.
- **Caption / label (12px and below)**: **Positive tracking** (loosen). Small type runs together; +0.1px to +0.5px helps.
- **All-caps**: **Positive tracking is a must.** Capitals jam together; +0.5px to +2px is typical.

### Tracking in dark mode

On a dark background, light text appears slightly thicker — an optical halation effect. Slight positive tracking (+0.1px to +0.3px) can improve readability. Not mandatory; some fonts and sizes don't need it.

---

## OpenType features

OpenType features unlock alternate glyphs and behaviors built into a font. Used well, they raise typographic quality a notch.

### Useful features

- **`liga` (ligatures)**: Replace specific letter combinations (fi, fl, etc.) with dedicated glyphs. The text flows more smoothly.
- **`kern` (kerning)**: Optimize spacing between letter pairs. Most browsers enable this by default, but specifying it explicitly is safer.
- **`tnum` (tabular numerals)**: Make numerals equal-width. Numbers in tables and data line up vertically and become easier to compare.
- **`ss01`+ (stylistic sets)**: Font-specific alternate glyph sets. Enabling them can pull more personality out of the font.

### How to use them

Not every font supports every feature. Check what your font actually has, and enable only the features that match your design intent. Don't blanket-enable everything — pick with purpose.

---

## Text legibility

Beautiful typography starts with legibility. A design that hurts readability isn't functioning, no matter how pretty it is.

### Characters per line (measure)

Too many characters per line, and the eye has to travel too far. Too few, and rhythm breaks from constant line-wrapping:

- **English**: 45–75 characters per line is optimal. Around 60 is ideal.
- **Japanese**: 25–40 characters per line. Newspaper columns are a good reference.
- **Control with container width**: Set `max-width` on text so lines don't grow with the viewport. For container-width design, see [layout.md](layout.md).

### Contrast

The contrast ratio between text and background is an accessibility concern:

- **Body**: Minimum 4.5:1 (WCAG AA)
- **Large text (18px+ or 14px bold+)**: Minimum 3:1
- **Placeholders and hint text**: Don't push contrast too low. If it can't be read, it isn't doing anything.

For palette-wide contrast and accessibility, see [color.md](color.md).

### Text alignment

- **Left-aligned** is the most readable (in both Latin and Japanese). A consistent line start gives the eye a stable return point.
- **Center alignment** belongs on headings or short blocks. Centering 3+ lines of text becomes hard to read.
- **Right alignment** is for special cases (numerical right-alignment, intentional design effects).
- **Justified** can work for Japanese long-form text but tends to insert awkward word spacing in Latin scripts.

---

## Don'ts

- **Use 3+ font families** — cohesion collapses
- **Use 4+ weights** — differences blur and hierarchy gets muddy
- **Set body below 12px** — unreadable. 12px is the floor even for captions.
- **Leave display tracking at default** — large type looks airy and stretched
- **Set body with line height under 1.2** — lines feel like they're stacking on each other
- **Use display fonts for body** — distinctive display fonts lose legibility at small sizes
- **Center-align long-form** — switch to left after 3 lines
- **Skip container width and let lines run too long** — past 100 characters per line, on big screens, reading suffers

---

## What to verify

- **Hierarchy is obvious at a glance**: Can you tell heading from body instantly?
- **Body is comfortable to read**: Read three paragraphs — does it tire the eye?
- **Line height feels right**: Not cramped, not stretched — natural rhythm?
- **Tracking feels right**: Display not stretched, small text not crammed?
- **Weight differences are perceptible**: Can you see the differences between the weights you're using?
- **Line length is right**: Not too long, not too short — eye travel comfortable?
- **Font pairings feel cohesive**: Do the two fonts harmonize, or clash?
- **Small sizes still read**: 12–14px text is crisp, not collapsed?
