# Nano Banana Prompt Guide

How to write prompts that produce strong results from Google's Gemini image models — `gemini-3.1-flash-image-preview` (Nano Banana) and `gemini-3-pro-image-preview` (Nano Banana Pro). Based on Google's official prompting guidance, with example patterns drawn from the cookbook and field practice.

> **TL;DR:** Describe the scene; don't list keywords. Open with a strong verb. Be hyper-specific where it matters (texture, lighting, framing). Use positive framing rather than negative prompts. Iterate conversationally with single-change follow-ups.

---

## The single most important principle

**Describe the scene; don't list keywords.**

Gemini's image models are tuned to deep language understanding. Narrative, descriptive sentences outperform comma-separated keyword chains.

| Weak | Strong |
|---|---|
| `red panda, sticker, kawaii, cute, cel-shading, white background` | `A kawaii-style sticker of a happy red panda wearing a tiny bamboo hat. Cel-shaded with bold, clean outlines. The background must be white.` |
| `cat photo realistic 4k bokeh sunset` | `A close-up portrait of a black cat sitting on a windowsill at golden hour. Captured with an 85mm portrait lens, resulting in a soft, blurred background (bokeh).` |

The rest of this guide is mostly elaborations of this one rule.

---

## Prompt formulas

Five frameworks from Google's official guide cover most of what you'll do with Gemini.

### 1. Text-to-image (no references)

```
[Subject] + [Action] + [Location/context] + [Composition] + [Style]
```

Verbatim example from Google:

> *"A striking fashion model wearing a tailored brown dress, sleek boots, and holding a structured handbag. Posing with a confident, statuesque stance, slightly turned. A seamless, deep cherry red studio backdrop. Medium-full shot, center-framed. Fashion magazine style editorial, shot on medium-format analog film, pronounced grain, high saturation, cinematic lighting effect."*

### 2. Multimodal (with reference images)

```
[Reference images] + [Relationship instruction] + [New scenario]
```

> *"Using the attached napkin sketch as the structure and the attached fabric sample as the texture, transform this into a high-fidelity 3D armchair render. Place it in a sun-drenched, minimalist living room."*

Reference image limits (total, primary + additional): up to **14 (Flash, 10 object + 4 character) / 11 (Pro, 6 object + 5 character)**.

### 3. Real-time information (Google Search grounding)

```
[Source/Search request] + [Analytical task] + [Visual translation]
```

> *"Search for the current weather and date in San Francisco. Use this data to modify the scene (e.g., if raining, make it look grey and rainy). Visualize this in a miniature city-in-a-cup concept embedded within a realistic modern smartphone UI."*

This is uniquely Gemini — the model can fetch fresh facts and render them. Good for live sports recaps, news graphics, weather visuals.

### 4. Text-in-image (with localization)

```
[Scene] + [Quoted text strings, font, placement] + [Optional language directive]
```

> *"A high-end, glossy commercial beauty shot of a sleek, minimalist nude-colored face moisturizer jar on a warm studio background. The lighting is soft and radiant. Next to the product, render three lines of text with this exact styling: top line `GLOW` in flowing elegant Brush Script; middle line `10% OFF` in heavy blocky Impact; bottom line `Your First Order` in thin minimalist Century Gothic. Then translate the text into Korean and Arabic."*

### 5. Creative-director brief

For ad campaigns, editorial work, and anything where art direction matters more than technical correctness, write the prompt as if briefing a photographer or designer. See "Creative-director vocabulary" below.

---

## Best practices

### Start with a strong verb

Open the prompt with what you want the model to *do*: **Generate**, **Create**, **Photograph**, **Render**, **Transform**, **Restyle**, **Compose**. The strong opening verb signals the operation type and gets you better results than starting with a noun phrase.

### Be hyper-specific

A specific noun phrase beats a generic one every time:

| Generic | Hyper-specific |
|---|---|
| Fantasy armor | Ornate elven plate armor, etched with silver leaf patterns, with a high collar and pauldrons shaped like falcon wings |
| Suit jacket | Navy blue tweed jacket with subtle herringbone pattern and leather elbow patches |
| Coffee mug | Minimalist matte-glaze ceramic mug in cream, with a hand-thrown texture and a single thin rust-colored band near the rim |

### Provide context and intent

State *what the image is for*. The model uses this to make countless small decisions about tone, framing, and finish.

> Weak: *"Create a logo."*
> Strong: *"Create a logo for a high-end, minimalist skincare brand. The mark needs to look at home on a small product label and on a billboard."*

### Use positive framing, not negative prompts

Gemini doesn't have a separate negative-prompt channel. Describe what you *want* rather than what to exclude.

| Weak | Strong |
|---|---|
| *"a street, no cars, no people"* | *"an empty pedestrian street at dawn"* |
| *"portrait, no smile, not posed"* | *"a candid, contemplative expression"* |

When you do need to forbid something, state it clearly: *"No watermark. No additional text. No people in the background."*

### Break complex scenes into steps

For prompts with many requirements, write step-by-step instructions:

> *"Generate a children's book illustration of a fox stargazer. Step 1: Establish a meadow at twilight, with tall grass swaying gently. Step 2: Place a small red fox in the foreground, lying on its back. Step 3: Render the night sky overhead with a swirling Milky Way. Style: soft watercolor, warm color palette, gentle painterly brushwork."*

### Iterate, don't rewrite

Gemini supports conversational follow-ups. Refine with single-change prompts:
- *"Make the lighting warmer."*
- *"Move the subject slightly to the left."*
- *"Restore the original background."*

This is faster and produces better results than rewriting a 200-word prompt from scratch.

### The text-first hack

For images with substantial text content, generate the text first as a chat response, then ask for an image incorporating it. Two passes produces more reliable text rendering than trying to nail copy and image in a single prompt.

---

## Creative-director vocabulary

The cookbook's "prompt like a creative director" section is the highest-leverage part of Gemini prompting. Four levers:

### 1. Design the lighting

| Style | Phrasing |
|---|---|
| Studio | *"Three-point softbox setup to evenly light the product, soft shadow bottom-right"* |
| Cinematic | *"Chiaroscuro lighting with harsh, high contrast"* |
| Golden hour | *"Golden hour backlighting creating long shadows and warm rim light"* |
| Editorial | *"Soft north-facing window light, slightly cool, with subtle fall-off"* |
| Neon / night | *"Mixed cool fluorescent interior light spilling onto the street, with magenta neon glow from above"* |

### 2. Choose a camera, lens, and depth of field

Specifying *what kind of camera* an image was "shot" on radically changes the look:

| Hardware | Aesthetic |
|---|---|
| GoPro / fisheye | Immersive, distorted, action-cam feel |
| Fujifilm / X100V | Authentic film color science, gentle warmth |
| 35mm film SLR | Classic photo-journalistic feel |
| Disposable camera | Raw, nostalgic, harsh flash |
| iPhone | Casual, contemporary, slight HDR over-correction |
| Phase One / medium format | High-detail editorial, fashion-shoot look |

Combine with lens vocabulary:
- `low-angle shot with shallow depth of field (f/1.8)` — heroic, intimate
- `wide-angle lens` — vast scale, environmental context
- `macro lens` — intricate texture, near-subject detail
- `telephoto compression` — flattened, intimate distance
- `bird's-eye view` — pattern, overview

### 3. Define color grading and film stock

| Mood | Phrasing |
|---|---|
| Nostalgic / gritty | *"Render as if on 1980s color film, slightly grainy, faded magenta"* |
| Modern / moody | *"Cinematic color grading with muted teal and orange tones"* |
| Editorial / clean | *"Natural color balance, slight cool cast, no aggressive grading"* |
| Warm / homey | *"Warm tungsten color temperature, slight orange shift in shadows"* |

### 4. Emphasize materiality and texture

The single most reliable upgrade for any product or portrait prompt: name the material explicitly.

- *"navy blue tweed"* not *"jacket"*
- *"ornate elven plate armor, etched with silver leaf"* not *"armor"*
- *"matte-glaze ceramic mug with hand-thrown texture"* not *"coffee mug"*
- *"weathered linen with subtle creasing"* not *"shirt"*

For portraits, name the **skin texture**: *"visible skin texture and micro pores"*, *"natural skin imperfections"*, *"no plastic skin"* — these phrases prevent the over-smoothed plastic-doll look.

---

## Text rendering

Gemini is unusually strong at rendering text inside images, including non-Latin scripts. The official guidance:

1. **Quote the literal text**: `"Happy Birthday"`, `"URBAN EXPLORER"`. The quotes signal what's a directive vs what's a string.
2. **Specify the font**: family, weight, size, color. *"Bold, white, sans-serif font"* or *"Century Gothic 12px"*.
3. **Localize**: write the prompt in English; specify the target language for the rendered text. *"Render this in Japanese"*, *"Translate the text into Korean and Arabic"*.
4. **For complex text designs, use the text-first hack**: ask Gemini in chat to draft the copy first, then request the image with that text.

For best text fidelity (long copy, multi-font compositions, small caption text), use **Pro** (`gemini-3-pro-image-preview`).

### Typography-as-subject

Gemini excels at type-led compositions where text *is* the focal element:

> *"A typographic poster with a solid black background. Bold letters spell `NEW YORK`, filling the center of the frame. The text acts as a cut-out window — a photograph of the New York skyline is visible only inside the letterforms."*

Other patterns: text composed of natural elements (leaves, smoke, water), text wrapping around objects, layered typography with overlapping color blocks.

---

## Image editing

### Inpainting (semantic masking)

You don't need an explicit mask file with Gemini — describe the region in language and tell it what to leave alone:

> *"Using the provided image of a living room, change only the blue sofa to a vintage brown leather Chesterfield. Keep the wall color, art on the walls, rug, and lighting exactly as they are."*

The conversational mask works well for medium-to-large regions. For pixel-precise edits, lean on the OpenAI scripts with their `--mask` argument instead.

### Adding or removing elements

> *"Using the provided image of my cat, add a small knitted wizard hat on its head. Match the original lighting, perspective, and image grain."*

> *"Remove the man from the background of this photo. Reconstruct the wall and shelving naturally behind where he was."*

### Style transfer

Specify the target style precisely (artist, movement, era) and what should stay constant (composition, subject identity).

> *"Transform the provided photograph into the style of Vincent van Gogh's `Starry Night`. Render all elements with swirling, impasto brushstrokes and a deep blue and yellow palette. Preserve the composition and subject identity exactly."*

### Multi-image composition

> *"Create a professional e-commerce fashion photo. Take the blue floral dress from Image 1 and have the woman from Image 2 wear it. Match the studio lighting from Image 1."*

Be explicit about which image controls which dimension (subject, garment, lighting, background).

### Character consistency across views

To produce 360° turnarounds or multi-pose sheets, generate iteratively — feeding the previous output back as a reference for the next angle. State the desired pose in each step:

> *"Using the previous image as a reference for the character's appearance, generate the same character from a side profile, three-quarter view from the right."*

For best results, use **Pro** for character work (up to 5 character refs vs 4 in Flash).

### High-fidelity detail preservation

When editing real people or branded products, enumerate what must not change:

> *"Ensure the woman's face, facial features, and skin tone remain completely unchanged. The brand logo on the bottle must remain pixel-perfect."*

Repeat this preservation list every iteration; drift accumulates fast otherwise.

---

## Common pitfalls

| Pitfall | Symptom | Fix |
|---|---|---|
| Keyword chains | Generic, "stock-photo" output | Rewrite as a sentence describing the scene |
| Using `--no` style negatives | Unwanted element still appears or attention drawn to it | Use positive framing — describe what you want instead |
| Vague subjects | Symmetric, posed, eyes-to-camera defaults | Specify gaze, pose, scale, framing explicitly |
| Plastic / over-smoothed faces | Subject looks AI-generated | Add *"visible skin texture, natural imperfections, no plastic skin"* |
| Too many requirements at once | Some requirements ignored | Use step-by-step instruction or split into iterative passes |
| Wrong text rendered | Garbled or duplicated copy | Quote literal text, specify font, generate text-first, switch to Pro |
| Drifting subject during editing | Identity changes with each iteration | Restate preservation list each turn |
| Trying to use detailed camera specs | Specs ignored or weakly applied | Use composition/look language instead (see "creative-director vocabulary") |

---

## Templates by use case

### Photorealistic portrait

```
Generate a photorealistic [shot type] of [hyper-specific subject description].
[Setting and time of day], [environmental detail].
Captured with an [85mm portrait lens / 35mm prime], [depth of field], [lighting setup].
Visible skin texture, natural imperfections, no plastic skin, no heavy retouching.
Color grading: [palette/mood].
The image should feel [tone — honest / candid / editorial / dramatic].
```

### Product mockup / commercial

```
Photograph a [hyper-specific product description] on [background].
[Three-point softbox / natural window / dramatic side] lighting, [shadow direction].
[Lens and angle].
Highlight the [material / finish / surface detail].
Catalog-quality finish, sharp focus throughout.
[Optional: text or label requirements with quoted strings.]
```

### Logo / minimalist mark

```
Create a [logo type — wordmark / emblem / monogram] for [brand description and audience].
[Style direction — minimalist / vintage / playful / luxury].
Typography: [font family and weight].
Color palette: [primary] and [optional secondary].
The logo should work at both small (favicon) and large (signage) sizes.
Background: [solid color]. No additional text or decoration.
```

### Sticker / illustration

```
Create a [style — kawaii / flat-vector / cel-shaded] sticker of [hyper-specific subject].
Bold, clean outlines. [Color palette].
The background must be white. (Transparent backgrounds are not supported — request a solid white background and remove it in post if needed.)
```

### Editorial / fashion

```
Photograph [subject] [pose and demeanor].
[Outfit, hair, props — be hyper-specific about materials].
[Backdrop and setting], [lighting].
Shot on [medium-format analog / 35mm / Fujifilm], [grain/grading].
[Magazine-style descriptor — "fashion magazine style editorial", "campaign image", etc.].
[Composition — medium-full / centered / off-center / rule-of-thirds].
```

### Sequential art / storyboard

```
Make a [N]-panel comic in a [art style — gritty noir / soft watercolor / Studio Ghibli pastel] style.
Panel 1: [scene and action].
Panel 2: [scene and action].
Panel 3: [scene and action].
Maintain [character / palette / line-weight] consistency across all panels.
```

### Minimalist / negative space

```
A minimalist composition featuring [single subject] positioned in the [bottom-right / top-left / etc.].
Vast, empty [off-white / cream / charcoal] canvas dominates the frame.
[Subject details — material, color, scale relative to canvas].
[Soft directional lighting].
Designed to leave room for [text overlay / branding] in the empty area.
```

### Multi-image composition

```
Image 1: [description].
Image 2: [description].
[Image N: ...]

[Strong verb: Combine / Compose / Place / Apply]: [specific instruction about how to combine].
Match [lighting / palette / style] from Image [N].
Keep [identity / geometry / brand element] from Image [N] unchanged.
```

---

## Aspect ratios and resolution

Supported aspect ratios: `1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `16:9`, `21:9`. **Flash also supports** `1:4`, `4:1`, `1:8`, `8:1` for ultra-wide / ultra-tall compositions.

Resolution: `512px`, `1K`, `2K`, `4K`. Use uppercase `K` (lowercase `k` is rejected).

---

## When to reach for Pro

Default to Flash (`gemini-3.1-flash-image-preview`). Switch to Pro (`gemini-3-pro-image-preview`) for:

- **Dense or small text** — multi-font posters, infographic captions, non-Latin scripts where character fidelity matters.
- **Close-up portraits** where micro-detail (pores, individual hairs, eye reflections) is the read.
- **Identity-sensitive edits** of real people or branded products.
- **Character consistency work** (Pro handles 5 character references vs Flash's 4).
- **Anything at 4K** or destined for print.
- **Long, complex prompts with many constraints** — Pro's reasoning handles them more reliably.

For everyday work — drafts, social tiles, exploration, single-subject scenes — Flash is faster, cheaper, and good enough.
