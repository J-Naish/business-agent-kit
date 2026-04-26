# GPT Image 2 Prompt Guide

How to write prompts that produce strong results from OpenAI's `gpt-image-2`. Based on OpenAI's official prompting guide for image-gen models, with concrete examples drawn from the wider community of practitioners.

> **TL;DR:** Write prompts the way a director briefs a photographer. Start with the scene, name the subject, layer in details, end with constraints. Be specific where it matters; let the model handle the rest. Avoid keyword chains — write in plain sentences.

---

## How gpt-image-2 differs from older generators

If you're coming from Stable Diffusion, Midjourney, or DALL·E 2, several habits transfer poorly:

| Old habit | Better with gpt-image-2 |
|---|---|
| Keyword chains: `cat, photorealistic, 4k, masterpiece, hdr, vray` | Sentences: `A close-up portrait of a black cat sitting on a windowsill at golden hour, shot like a 35mm film photograph.` |
| Negative prompts (`--no people, watermark`) | Explicit preservation: `Do not include any people. No watermark. No text.` |
| Tweaking dozens of weights and seeds | Iterative single-change follow-ups in conversation |
| `((emphasis))` and weighting syntax | Plain language: "the focal point is the bottle on the left" |
| Guessing at obscure model-specific magic words | Photography vocabulary, art-direction language, brief-style copy |

The model responds to **art direction**, not search queries.

---

## Core structure

Order matters less than clarity, but a reliable order produces fewer surprises:

```
1. Style / medium       — "Photorealistic 35mm film photograph"
2. Subject              — "an elderly sailor on a small fishing boat"
3. Environment          — "at the harbor at dawn, mist over the water"
4. Lighting & mood      — "soft coastal daylight, honest and unposed"
5. Composition          — "medium close-up at eye level, shallow depth of field"
6. Technical / constraints — "subtle film grain, no retouching, no text"
```

Front-load what matters most in the **first ~50 words** — the model weights early tokens more heavily. Use line breaks or labeled segments instead of dense paragraphs when prompts get long; structure aids debugging.

---

## Write as if documenting reality

For photorealism, the strongest single move is to frame the prompt as if a real photo were being taken:

- *"Photorealistic 35mm film photograph of…"*
- *"iPhone snapshot of…"*
- *"Professional studio product photography of…"*
- *"Documentary-style candid photo of…"*

Then layer concrete texture requests:
- *"visible wrinkles, pores, and sun texture"*
- *"natural skin imperfections, no plastic skin"*
- *"subtle film grain, natural color balance"*
- *"worn materials and everyday detail; no glamorization, no heavy retouching"*

The cookbook's canonical example:

> *"Create a photorealistic candid photograph of an elderly sailor standing on a small fishing boat. He has weathered skin with visible wrinkles, pores, and sun texture… Shot like a 35mm film photograph, medium close-up at eye level… soft coastal daylight, shallow depth of field, subtle film grain, natural color balance. The image should feel honest and unposed."*

For non-photorealistic work, swap the documentary frame for the appropriate one — *"editorial illustration in the style of…"*, *"flat vector mockup of…"*, *"product render on a turntable studio set…"* — and adjust the texture vocabulary accordingly.

---

## Specifying subjects

Be explicit about how a person or object sits in the frame:

- **Body framing** — *"full body visible, feet included"* or *"medium close-up from the chest up"*.
- **Relative scale** — *"child-sized relative to the table"*, *"the bottle takes up roughly one third of the frame"*.
- **Gaze and interaction** — *"looking down at the open book, not at the camera"*.
- **Pose and action** — *"hands naturally gripping the handlebars, weight on the back foot"*.

Vague descriptions invite the model to default to symmetric, posed, eyes-to-camera compositions. Specifics break that default.

### Identity preservation during edits

When editing, explicitly enumerate what must not change. The cookbook calls this **surgical constraint language**:

> *"Do not change her face, facial features, skin tone, body shape, pose, or identity in any way. Preserve her exact likeness."*

Repeat the preservation list on every iteration. Drift accumulates fast across multiple turns; restating invariants is the cheapest way to prevent it.

---

## Composition, framing, lighting

| Element | Useful vocabulary |
|---|---|
| Viewpoint | close-up, medium shot, wide shot, top-down, over-the-shoulder |
| Angle | eye-level, low-angle, high-angle, bird's-eye, dutch angle |
| Lighting | soft diffuse, golden hour, harsh midday, rim light, backlight, neon, fluorescent |
| Mood | quiet, intimate, energetic, somber, dreamlike, austere |
| Placement | *"logo top-right"*, *"subject centered with negative space on left"*, *"text running vertically along the right edge"* |

For atmospheric scenes (low-light, rain, neon, fog), spend extra detail on lighting — otherwise the model trades mood for surface detail. Example: *"soft coastal daylight, shallow depth of field, subtle film grain, natural color balance"* keeps the look honest.

A note on cameras: high-level look beats deep camera specs. *"35mm film photograph, medium close-up at eye level"* lands more reliably than `f/1.4 85mm Sony A7R IV ISO 400 1/250s`. The model interprets specific camera specs loosely.

---

## Text inside images

`gpt-image-2` is unusually accurate at rendering text — including non-Latin scripts (Chinese, Japanese, Korean, Arabic, etc.) at ~95%+ fidelity. To get the most out of it:

1. **Quote the literal text** or use ALL CAPS so the model knows what's a directive vs what's a string to render:
   > *Place "GRAND OPENING" centered at the top in large bold sans-serif white text.*

2. **Specify typography**: weight, family (sans/serif/script/mono), kerning, color, placement.

3. **Demand verbatim accuracy** when fidelity matters:
   > *Render this text exactly as written, character by character, with no extra characters or marks.*

4. **Spell tricky brand names letter-by-letter**:
   > *The product name reads "AURORA" — A, U, R, O, R, A.*

5. **Bump quality for dense or small text**: use `--quality high` for infographics, multi-font posters, and small captions. `medium` is fine for hero typography.

6. **Constrain text to one occurrence** when the model otherwise duplicates it:
   > *Ensure the text appears once and is perfectly legible.*

---

## Multi-image inputs

When you pass multiple reference images to `image_to_image.py --images ...`, refer to them by **index and description**, then describe the interaction:

> *"Image 1 is the product photo. Image 2 is the style reference. Apply the style from Image 2 to the product in Image 1, keeping the product's geometry and label legibility unchanged."*

Composition example:

> *"Place the dog from Image 2 into the setting of Image 1, right next to the woman. Use the same lighting, color grading, and composition as Image 1."*

Be explicit about which image controls which dimension (style, subject, layout, lighting). Without that, the model averages.

---

## Constraints, not negatives

`gpt-image-2` doesn't have a separate "negative prompt" channel. Instead, use plain instructions:

- *"No watermark."*
- *"No additional text or logos."*
- *"No people in the background."*
- *"Background must be a plain solid color, no patterns."*

For edits, the strongest pattern is paired:

> *Change only the background. Keep the subject, lighting, color grading, and framing exactly the same. No accessories, text, logos, or watermarks added.*

Restate these constraints every iteration of an edit chain.

---

## Mask-based local edits

`gpt-image-2` supports a `--mask` argument: an alpha-channel PNG matching the primary image's dimensions. Transparent (alpha=0) regions are editable; opaque (alpha=255) regions are locked.

When using a mask, the prompt should describe **only the change inside the masked region**. Don't reiterate the rest of the scene — the mask already protects it.

> *"Add a flamingo standing in the pool."* (with `lounge_mask.png` covering only the pool area)

If results bleed beyond the mask, tighten the mask geometry rather than adding more prompt language.

---

## Quality settings

| `--quality` | When to use |
|---|---|
| `low` | High-volume exploration, drafts, internal previews. Fast and cheap. |
| `medium` | Default for most production work. Good balance of quality and latency. |
| `high` | Dense text, detailed infographics, close-up portraits, identity-sensitive edits, anything above 2560×1440. |
| `auto` (default) | Lets the model pick. Fine for most cases. |

If a result is "almost right but soft," try `--quality high` before rewriting the prompt.

---

## Iteration strategy

Multi-turn editing is one of `gpt-image-2`'s real strengths. The pattern:

1. Start with a clean **base prompt** that produces a reasonable image.
2. Refine with **single-change follow-ups**:
   - *"Make the lighting warmer."*
   - *"Remove the second tree on the right."*
   - *"Restore the original background."*
3. Reference prior context with *"same style as before"* or *"the subject"* — but **re-specify any critical detail that has drifted**.
4. Restate preservation lists on every iteration. The cost is low; the protection against drift is high.

Don't try to fix everything in one giant rewrite. Small surgical changes give you a transcript of what actually moved the needle.

---

## Common pitfalls

| Pitfall | Symptom | Fix |
|---|---|---|
| Overloaded first prompt | Model fixates on a few requirements, drops others | Start simple, add detail iteratively |
| Cinematic vocabulary in realism workflows | Output looks like a movie poster, not a real photo | Drop "cinematic", "epic", "stylized" — use documentary language |
| Detailed camera specs | Specs interpreted loosely or ignored | Use composition language ("medium close-up, shallow DOF") instead |
| Treating negatives as a separate channel | Unwanted elements still appear | Convert into explicit "Do not include / no X" sentences |
| Drift across iterations | Subject morphs, background changes uninvited | Restate preservation list every turn |
| Vague text instructions | Wrong characters, duplicated text | Quote literal text, specify "exactly once", use `--quality high` |

---

## Templates by use case

### Photorealistic portrait

```
Photorealistic 35mm film photograph of [subject description: age, build, clothing, demeanor].
[Setting] at [time of day], [environmental details].
Shot like a candid documentary frame. Medium close-up at eye level.
Soft natural light from [direction], shallow depth of field, subtle film grain.
Visible skin texture, natural imperfections, no plastic skin, no heavy retouching.
The image should feel honest and unposed. No watermark, no text.
```

### Product mockup (white background)

```
Professional studio product photography. [Product description] centered on a plain white background.
Soft studio lighting from above-left, natural soft shadow on the right.
Product label reads "[BRAND NAME]" in [font style].
Sharp focus throughout, catalog-quality finish.
No additional props, no text overlays, no watermark.
```

### Marketing / ad campaign

```
Polished campaign image for [brand], a [brand description].
The shot shows [subject and action] in [setting].
Tagline overlay reads "[TAGLINE]" in [font/placement].
Mood: [energetic / contemplative / aspirational / playful].
Composition: [centered hero / rule-of-thirds / cinematic widescreen].
The image should feel [stylistic descriptor] — modern, tasteful, on-brand.
```

### UI mockup

```
Realistic mobile app UI mockup for [app type and purpose].
Show [specific screen/state] with [list of UI elements].
Layout: clean header, [main content area], [bottom nav or footer].
Typography: [font family], readable at thumbnail size.
The interface should look like a real, well-designed, beautiful app — not a wireframe.
Aspect ratio: [9:19.5 for iPhone / 16:9 for desktop / etc.].
```

### Infographic (text-heavy)

```
Detailed infographic explaining [topic].
Layout: [vertical poster / horizontal flow / grid].
Include: [list of labeled steps, components, or data points].
Title at the top reads "[TITLE]" in [font weight] sans-serif.
Each section labeled with short captions in clean kerning.
Color palette: [primary] and [secondary] on [background].
Style: flat design, technical clarity, no decorative noise.
Use --quality high for legible small text.
```

### Style transfer (`image_to_image.py --images`)

```
Image 1: [description — the subject/scene to keep].
Image 2: [description — the style reference].

Apply the visual style of Image 2 to Image 1.
Keep Image 1's [subject identity / composition / framing] unchanged.
Match Image 2's [palette / brushwork / lighting treatment / texture].
No watermark, no text.
```

### Surgical product extraction

```
Extract the product from the input image and place it on a plain white opaque background.
Preserve product geometry, label legibility, and color exactly.
Soft natural shadow underneath.
Do not restyle, recolor, or retouch the product itself.
Only remove background and lightly polish.
No reflections, no props, no text.
```

### Localized mask edit

```
[Description of the change to make inside the masked region only.]
[Optional: lighting / shadow guidance for matching the rest of the scene.]
```
*The mask handles the rest. Don't restate the whole scene.*

---

## When to reach for the Pro / `--quality high` setting

Default to `--quality auto`. Step up to `high` when any of the following apply:

- The image is **above 2560×1440** in either dimension.
- It contains **dense or small text**, multi-font typography, or non-Latin scripts where character fidelity matters.
- It's a **close-up portrait** where micro-detail (pores, individual hairs, eye reflections) is part of the read.
- It's an **identity-preserving edit** of a real person or product.
- It will be printed or used in a high-fidelity context where compression artifacts will be visible.

For everything else — drafts, social tiles, exploration — `auto` or `medium` is faster, cheaper, and good enough.
