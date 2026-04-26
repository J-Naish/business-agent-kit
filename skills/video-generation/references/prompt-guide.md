# Veo 3.1 Prompt Guide (detailed reference)

How to write prompts that produce strong results from Google's Veo 3.1. Write the prompt in English — the model is tuned for it.

> **Core principle: detail = control.** The more specific your prompt, the more of the result you control. Generic input gives generic output. This guide is a long catalog of the dimensions you can be specific about.

---

## Table of contents

1. [The 5-element formula](#the-5-element-formula)
2. [Subject specification](#subject-specification)
3. [Action and motion](#action-and-motion)
4. [Cinematography](#cinematography)
5. [Lighting and atmosphere](#lighting-and-atmosphere)
6. [Visual style](#visual-style)
7. [Ambiance](#ambiance)
8. [Temporal elements](#temporal-elements)
9. [Cinematic techniques](#cinematic-techniques)
10. [Audio direction (dialogue, SFX, ambient)](#audio-direction-dialogue-sfx-ambient)
11. [Negative prompts](#negative-prompts)
12. [Timestamp prompting](#timestamp-prompting)
13. [Advanced workflows](#advanced-workflows)
14. [Iterative prompt refinement](#iterative-prompt-refinement)
15. [Templates by use case](#templates-by-use-case)
16. [Best-practices cheat sheet](#best-practices-cheat-sheet)

---

## The 5-element formula

The base structure for a well-formed video prompt. Combine the five elements in roughly this order:

```
[Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance]
```

| Element | What it covers | Examples |
|---|---|---|
| **Cinematography** | Camera work, framing | `Medium shot`, `Crane shot`, `Slow pan` |
| **Subject** | The main subject | `a tired corporate worker`, `a golden retriever` |
| **Action** | What's happening / how it moves | `rubbing his temples`, `running through a meadow` |
| **Context** | Setting, environment | `in a cluttered office late at night`, `on a sunlit beach` |
| **Style & Ambiance** | Mood, lighting, era, look | `Retro aesthetic, shot on 1980s color film, slightly grainy` |

### Worked example (official)

```
Medium shot, a tired corporate worker, rubbing his temples in exhaustion,
in front of a bulky 1980s computer in a cluttered office late at night.
The scene is lit by the harsh fluorescent overhead lights and the green
glow of the monochrome monitor. Retro aesthetic, shot as if on 1980s
color film, slightly grainy.
```

The next sections drill into each element of the formula in turn.

---

## Subject specification

Be specific. Detail dominates Veo's behavior — generic nouns produce generic results.

| Generic | Specific |
|---|---|
| `a man` | `a seasoned detective in his late 50s with grey stubble and a worn trench coat` |
| `a dog` | `a playful Golden Retriever puppy with damp fur` |
| `a building` | `a brutalist concrete library with vertical slit windows, weather-stained` |
| `a woman` | `a woman in her twenties with wavy brown hair and light freckles` |

### Multiple subjects

Specify each one and how they relate. Example:

> *"A group of diverse friends laughing around a campfire while a curious fox watches from the shadows."*

### Hyper-specific (when extreme detail matters)

Veo rewards extremely detailed subject descriptions. Verbatim official example:

> *"A hyper-realistic, cinematic portrait of a wise, androgynous shaman of indeterminate age. Their weathered skin is etched with intricate, bioluminescent circuit-like tattoos that pulse with a soft, cyan light. They are draped in ceremonial robes woven from dark moss and shimmering, metallic fiber-optic threads. Their expression is serene and ancient, eyes holding a deep, knowing look."*

For character work that will appear across multiple shots, lock the description in the **first** segment of a timestamp prompt or in a reference image, then refer back as "the detective" / "the shaman" in later segments.

---

## Action and motion

Action is the verb of the video. Specify:

| Category | Examples |
|---|---|
| **Basic movement** | walking, flying, dancing, running, climbing |
| **Interactions** | talking, hugging, cooking, fighting, shaking hands |
| **Emotional expressions** | smiling, frowning, appearing thoughtful, eyes welling |
| **Subtle actions** | a breeze ruffling hair, a gentle nod, fingers tapping |
| **Transformations** | a flower blooming in fast-motion, ice melting, a wall crumbling |

### Choreographed-action example (verbatim)

> *"A gloved hand carefully slices open the spine of an ancient, leather-bound book with a scalpel. The hand then delicately extracts a tiny, metallic data chip hidden within the binding."*

For fast-paced action sequences, write the choreography step by step. Vague action ("they fight") becomes "they exchange three rapid blows, the second one connects, she stumbles backward, recovers, charges again." This level of detail is what Veo needs to make the motion feel intentional.

---

## Cinematography

### Camera movement

| Term | Effect |
|---|---|
| `Static camera` | Camera fixed; dialogue, stable observation |
| `Dolly in / Dolly out` | Camera physically moves toward / away from subject; intimacy or release |
| `Tracking shot` | Camera moves laterally with the subject; motion |
| `Truck left / Truck right` | Sideways camera movement at fixed distance |
| `Pan` / `Tilt` | Horizontal / vertical camera rotation |
| `Slow pan` | Calm, deliberate horizontal sweep |
| `Whip pan` | Extremely fast pan; transition between scenes |
| `Crane shot` | Large vertical camera movement; scale, grandeur |
| `Aerial view` / `Drone shot` | High-altitude perspective; landscape, location reveal |
| `Arc shot` | Circular camera movement around subject |
| `POV shot` | First-person view; immersion |
| `Handheld` | Slight handheld shake; documentary feel, urgency |

#### Crane shot example (official verbatim)

> *"Crane shot starting low on a lone hiker and ascending high above, revealing they are standing on the edge of a colossal, mist-filled canyon at sunrise, epic fantasy style, awe-inspiring, soft morning light."*

### Framing and shot size

| Term | Description |
|---|---|
| `Wide shot` / `Establishing shot` | Full environment; sets the location |
| `Medium shot` | Waist-up; the default for conversation |
| `Two-shot` | Two characters in the same frame |
| `Over-the-shoulder` | Frame from behind one character; conversation reverse |
| `Close-up` | Face fills the frame; expression |
| `Extreme close-up` | Eye, hand, single detail |
| `Low angle` | Looking up; power, intimidation |
| `High angle` | Looking down; vulnerability, isolation |
| `Bird's-eye view` | Straight-down map perspective |
| `Top-down shot` | Cooking, work surfaces, choreography |

### Lens and focus

| Term | Effect |
|---|---|
| `Shallow depth of field` | Background blur; isolates subject |
| `Deep focus` | Everything sharp; environmental detail |
| `Wide-angle lens` | Wide field of view; spaciousness, distortion at edges |
| `Telephoto compression` | Compresses depth; intimate, flattened |
| `Macro lens` | Tiny subjects rendered large |
| `Soft focus` | Gentle, dreamlike feel |
| `Lens flare` | Light catching the lens; drama |
| `Rack focus` | Focus shifts between two planes during the shot |
| `Fisheye distortion` | Extreme barrel distortion; surreal, action-cam |
| `Dolly zoom` (vertigo effect) | Zoom and physical movement in opposite directions; disorienting background warp |

#### Shallow DOF example (official verbatim)

> *"Close-up with very shallow depth of field, a young woman's face, looking out a bus window at the passing city lights with her reflection faintly visible on the glass, inside a bus at night during a rainstorm, melancholic mood with cool blue tones, moody, cinematic."*

---

## Lighting and atmosphere

| Term | Mood |
|---|---|
| `Golden hour` | Warm sunrise / sunset; intimate, hopeful |
| `Blue hour` | Just-after-sunset cool light; quiet, transitional |
| `Natural lighting` | Realistic, untreated |
| `Soft morning sunlight` | Calm, gentle |
| `Harsh midday sun` | Stark, exposed |
| `Dramatic spotlight` | Theatrical, single hard source |
| `Volumetric rays` | Light beams visible through atmosphere |
| `Backlit` / `Silhouette` | Light behind the subject; drama |
| `Rembrandt lighting` | Classical portrait lighting; one cheek lit, triangle on the other |
| `High-key lighting` | Bright, low-contrast; clean, optimistic |
| `Low-key lighting` | Dark, high-contrast; suspense, noir |
| `Neon glow` | Cyberpunk, urban night |
| `Harsh fluorescent` | Office, hospital, convenience store |
| `Dappled sunlight` | Sunlight through leaves |
| `Warm tones` / `Cool blue tones` | Intimacy vs isolation |

### Tone and mood vocabulary

`happy` / `joyful`, `sad` / `melancholic`, `suspenseful` / `tense`, `peaceful` / `serene`, `epic` / `grandiose`, `futuristic`, `vintage` / `retro`, `romantic`, `horror`, `dreamlike`, `austere`, `intimate`, `claustrophobic`, `expansive`.

---

## Visual style

A separate dimension from lighting. Decide the look first, then layer the rest of the prompt against it.

| Mode | Phrasing |
|---|---|
| **Photorealistic** | `photorealistic, cinematic film look, shot on 35mm` |
| **Animation — anime** | `Japanese anime style, cel shading, vivid colors` |
| **Animation — Pixar** | `Pixar-style 3D animation, soft surfaces, expressive characters` |
| **Animation — claymation** | `claymation, visible thumbprints, slight imperfections` |
| **Animation — flat / 2D** | `flat 2D vector animation, bold outlines, limited palette` |
| **Animation — cel-shaded** | `cel-shaded animation, hard shadow lines, bold colors` |
| **Art movements** | `Van Gogh style, swirling impasto`, `Surrealist style`, `Impressionistic, soft brushstrokes` |
| **Specific looks** | `gritty graphic novel`, `watercolor painting, washes and bleeds`, `blueprint schematic, white lines on dark blue`, `1980s VHS aesthetic, scan lines and tracking errors`, `film noir, deep shadows, venetian blind shadows` |

### Visual-style example (verbatim)

> *"A dynamic scene in a vibrant Japanese anime style. A magical girl with silver hair and glowing blue eyes walks in a forest."*

The **first decision** for any prompt is which mode you're in. Photorealism vocabulary (lens, grain, color grading) is wasted on a claymation prompt; anime vocabulary (cel shading, vivid colors) is wasted on photorealism. Pick the lane, then equip the right vocabulary.

---

## Ambiance

The textural and atmospheric layer. Three sub-axes:

### Color palette

`monochromatic`, `vibrant tropical`, `muted earthy`, `cool futuristic blues and cyans`, `warm autumn oranges and ochres`, `pastel cottagecore`, `cyberpunk neon magenta and electric blue`, `noir black-and-white with a single accent color`.

### Atmospheric effects

`fog`, `mist rising from water`, `desert heat haze`, `falling snow`, `swirling embers`, `glowing particles in the air`, `dust motes in sunlight`, `rain streaking the lens`, `steam rising from a manhole`.

### Textural quality

`rough hewn stone`, `polished chrome reflecting the environment`, `soft fabric with visible weave`, `dewdrops on a leaf`, `cracked dry earth`, `wet asphalt`, `weathered wood with grain visible`, `peeling paint`, `iridescent oil-slick surfaces`.

These three axes layer onto any visual style. A scene can be `claymation + warm autumn palette + falling leaves + soft fabric` or `photorealistic + cool blue futuristic palette + glowing particles + polished chrome`.

---

## Temporal elements

Veo can control the flow of time within the clip.

| Term | Effect |
|---|---|
| `slow-motion` | Action in fluid extreme slow motion |
| `fast-paced` / `quick cuts` | High-energy, action-driven |
| `time-lapse` | Sun moving across the sky, traffic accelerating |
| `Hyperlapse` | Time-lapse with a moving camera |
| `Real-time` | Default; one-second-per-second |
| `Stop motion` | Frame-by-frame stutter aesthetic |
| `Pulsating rhythm` | Light or motion synchronized to a beat |
| `Evolution` | A flower bud unfurling, a candle burning down |

### Time-lapse example (verbatim)

> *"A time-lapse of a bustling city skyline as day transitions to night. The camera is static. Watch as the sun sets, casting long shadows across the buildings, and the city lights begin to twinkle on, with car headlights creating streaks of light on the streets below."*

---

## Cinematic techniques

Editing and compositional moves Veo understands when named explicitly.

| Term | Effect |
|---|---|
| `Match cut` | Visual or thematic continuity across a cut (e.g. coffee cup → planet) |
| `Jump cut` | Sharp temporal cut within the same composition; energy or ellipsis |
| `Establishing shot sequence` | Wide → medium → close-up progression |
| `Montage` | Series of brief shots compressing time or theme |
| `Split diopter effect` | Foreground and background simultaneously sharp |
| `Dutch angle` | Tilted horizon; instability, unease |
| `Whip pan transition` | Fast pan used as a cut |

### Jump-cut example (verbatim)

> *"A person sitting in the same position but wearing different outfits, with sharp jump cuts between each outfit change."*

---

## Audio direction (dialogue, SFX, ambient)

Veo 3.1 generates audio synchronized with the video based on prompt cues. Three audio elements compose together.

### Dialogue

Wrap dialogue in quotes. Add the speaker's tone, accent, or delivery for nuance.

```
A woman says, "We have to leave now."
The detective looks up and says in a weary voice, "Of all the offices in this town, you had to walk into mine."
A polished British accent speaks in a serious, urgent tone: "Your story has holes."
She replies with a slight smile, "You were highly recommended."
```

Notes:
- Always quote dialogue with `" "`.
- Add emotion, tone of voice, or accent (`in a weary voice`, `whispered`, `voice tight with fear`, `in a polished British accent`).
- Multiple speakers in the same prompt are fine — name them or reference them by description.

### Sound effects (SFX)

Spell out specific effects. Prefixing with `SFX:` makes the intent unambiguous.

```
SFX: thunder cracks in the distance
SFX: glass shattering on the floor
Engine roaring loudly. Tires screeching on wet pavement.
The rustle of dense leaves, distant exotic bird calls.
SFX: a creaking door, a ticking clock.
```

### Ambient

Set the ambient audio bed. Prefix with `Ambient:` for clarity.

```
Ambient: the quiet hum of a starship bridge
Ambient: the distant chatter of a busy café
Ambient: city traffic and distant sirens
Upbeat background music plays softly.
A swelling, gentle orchestral score begins to play.
```

### Full audio example

```
Misty Pacific Northwest forest, two exhausted hikers discover fresh claw marks
on a tree. The man turns to the woman and says, "That's no ordinary bear."
The woman replies, voice tight with fear, "Then what is it?"
SFX: rough bark scraping, snapping twigs. Ambient: a lone bird chirps in the
distance, wind through pine needles.
```

### Sound design as creative work

Audio isn't an afterthought — pair it with the visual deliberately. A serene drone shot of a meadow becomes ominous when you change `Ambient: gentle wind, birdsong` to `Ambient: low rumbling drone, distant crows`. Use the audio layer to set mood independently of the picture, the way a film composer would.

---

## Negative prompts

### Use noun / adjective lists, not commands

A negative prompt is a list of elements to exclude — written as nouns or adjectives, not as commands.

| Don't write | Write |
|---|---|
| `Don't include walls` | `walls, urban structures` |
| `No blurry images` | `blurry, out of focus` |
| `Remove all text` | `text, watermark, subtitle` |

### Frame exclusions positively when you can

For some content, the cleaner move is to describe the *positive* version of what you want rather than negating the unwanted version:

| Negative-style | Positive-style |
|---|---|
| `no buildings, no roads, no man-made structures` | `a desolate landscape, untouched wilderness, raw nature` |
| `no people, no cars` | `an empty pedestrian street at dawn` |

Use `--negative-prompt` for things that genuinely keep slipping in (text overlays, watermarks, blur, shaky camera) and the positive prompt to define the scene itself.

### Default quality-improving negatives

A general-purpose set of exclusions that helps most clips:

```
blurry, low quality, distorted faces, text overlay, watermark, shaky camera, artifacts
```

Style-specific:
- **Photorealistic** — `cartoon, anime, 3D render, CGI look, oversaturated`
- **Animated / illustrated** — `photorealistic, live action, natural skin texture`
- **Product** — `people, hands, text, logo, cluttered background`

---

## Timestamp prompting

Within an 8-second clip, you can place multiple shots by tagging timestamps. This packs several cuts into one generation — a powerful technique for sequence work.

### Syntax

```
[00:00-00:02] Description of shot 1
[00:02-00:04] Description of shot 2
[00:04-00:06] Description of shot 3
[00:06-00:08] Description of shot 4
```

### Example: explorer sequence (verbatim)

```
[00:00-00:02] Medium shot from behind a young female explorer with a leather
satchel and messy brown hair in a ponytail, as she pushes aside a large jungle
vine to reveal a hidden path.
[00:02-00:04] Reverse shot of the explorer's freckled face, her expression filled
with awe as she gazes upon ancient, moss-covered ruins in the background.
SFX: The rustle of dense leaves, distant exotic bird calls.
[00:04-00:06] Tracking shot following the explorer as she steps into the clearing
and runs her hand over the intricate carvings on a crumbling stone wall.
Emotion: Wonder and reverence.
[00:06-00:08] Wide, high-angle crane shot, revealing the lone explorer standing
small in the center of the vast, forgotten temple complex, half-swallowed by
the jungle. SFX: A swelling, gentle orchestral score begins to play.
```

### Tips

- Vary cinematography between segments to give the clip rhythm.
- SFX and audio cues can be placed per segment.
- Describe character appearance in detail in the first segment; later segments can refer back ("the explorer", "she").
- A 4-shot 8-second sequence is typical. 2- and 3-shot sequences also work for slower pacing.

---

## Advanced workflows

### Workflow 1: First and Last Frame interpolation

Provide a start image and an end image; Veo interpolates the motion between them. Ideal for big camera moves, transformations, and time-of-day transitions.

1. Produce the start image (with a separate image-generation tool).
2. Produce the end image.
3. Run the Veo first-and-last-frame mode to bridge the two.

Verbatim official example:

```
The camera performs a smooth 180-degree arc shot, starting with the
front-facing view of the singer and circling around her to seamlessly
end on the POV shot from behind her on stage. The singer sings "when
you look me in the eyes, I can see a million stars."
```

### Workflow 2: Ingredients to Video (character / asset consistency)

Provide reference images as "ingredients" so the generated clip preserves the look of specific characters, products, or environments. Reference them in the prompt by description.

1. Produce reference images for character, product, environment.
2. Write the scene prompt and reference the inputs.

Verbatim official example:

```
Using the provided images for the detective, the woman, and the office
setting, create a medium shot of the detective behind his desk. He looks
up at the woman and says in a weary voice, "Of all the offices in this
town, you had to walk into mine."
```

For multi-shot series, run multiple generations with the same reference set and a slightly different scene prompt for each shot. The references hold the look constant across cuts.

### Workflow 3: Image-to-Video best practices

- Pick the still that's already closest to the desired final look.
- In the prompt, **describe motion and change** — don't restate what's already in the image.
- Add `portrait` to the prompt when the face should remain prominent.
- For products, prefer `slow rotation`, `gentle parallax`, `subtle camera push-in` over fast moves — they hold the product's look intact.

### Workflow 4: Object add / remove (Veo 2 mode)

Veo 2 supports adding or removing specific objects in an existing video. **Note: Veo 2 generation does not include audio.** Useful for cleaning up backgrounds or inserting specific elements into otherwise-finished footage.

This skill's bundled scripts target Veo 3.1 (with audio); object add/remove via Veo 2 isn't wired up here. Use the Vertex AI console or a direct Veo 2 API call when this capability is needed.

---

## Iterative prompt refinement

Don't try to write a perfect prompt in one pass. Layer detail incrementally.

### Step 1: bare bones (subject + action)

```
A woman walking on a beach.
```

### Step 2: add specificity (expression, demeanor)

```
A woman walking along a beach, content and relaxed, looking toward the
horizon at sunset.
```

### Step 3: add cinematography

```
Tracking shot, a woman walking along a beach, content and relaxed,
looking toward the horizon at sunset.
```

### Step 4: add atmosphere and style

```
Tracking shot, a woman walking along a beach, content and relaxed,
looking toward the horizon at sunset. Warm golden light, gentle waves
lapping at her feet, shallow depth of field. Cinematic, shot on 35mm
film with slight grain.
```

### Step 5: add audio + negatives

```
Tracking shot, a woman walking along a beach, content and relaxed,
looking toward the horizon at sunset. Warm golden light, gentle waves
lapping at her feet, shallow depth of field. Cinematic, shot on 35mm
film with slight grain. Ambient: gentle waves, distant seagulls, soft
wind.
```
+ `--negative-prompt "text, watermark, blurry, shaky camera"`

### Use a chat model to enhance simple prompts

A useful meta-tip from Google: **let a Gemini chat model rewrite a one-line prompt into a full cinematic prompt** before sending it to Veo. Paste your draft into Gemini and ask "rewrite this as a detailed Veo 3.1 prompt with cinematography, lighting, and audio direction." The output is usually a strong starting point that you can edit further.

---

## Templates by use case

### Product showcase

```
[Cinematography]: Slow dolly shot circling around the product
[Subject]: [product name / category]
[Context]: Clean white studio with soft gradient lighting
[Style]: Hyper-realistic, product photography aesthetic, shallow depth of field
[Audio]: Ambient: subtle, elegant electronic music
```

Example:

```
Slow dolly shot circling around a sleek matte-black wireless headphone
on a reflective surface. Clean white studio with soft gradient lighting
from above. Hyper-realistic, product photography aesthetic, shallow
depth of field highlighting the premium materials. Ambient: subtle,
elegant electronic music.
```

### Vertical short-form social (9:16)

```
[Cinematography]: Dynamic handheld or POV shot
[Subject]: [subject]
[Action]: Energetic, attention-grabbing movement
[Style]: Vibrant colors, fast-paced, trending aesthetic
```

### Cinematic landscape

```
[Cinematography]: Aerial drone shot or crane shot
[Subject]: [type of landscape]
[Context]: Time of day, weather, season
[Style]: Cinematic, epic scale, natural color grading
[Audio]: Ambient soundscape + orchestral score
```

Example:

```
Aerial drone shot following a winding river through a dense autumn
forest. The trees are ablaze with red, orange, and gold leaves.
Morning mist rises from the water surface. Cinematic, epic scale,
natural color grading. Ambient: flowing water, rustling leaves.
A gentle orchestral score swells.
```

### Dialogue scene

```
[Cinematography]: Medium shot / two-shot / over-the-shoulder
[Subject]: Characters with specific appearance details
[Action]: Dialogue with emotional cues
[Context]: Setting that reinforces the mood
[Audio]: Quoted dialogue with tone + ambient sounds
```

### Interrogation scene (verbatim official example)

```
A medium shot in a dimly lit interrogation room. The seasoned detective
says: "Your story has holes." The nervous informant, sweating under a
single bare bulb, replies: "I'm telling you everything I know." Ambient:
the low hum of an air conditioner, the occasional drip of water.
```

### Cooking / recipe clip

```
[Cinematography]: Top-down shot / close-up / slow motion
[Subject]: Food preparation steps
[Context]: Kitchen setting with specific lighting
[Style]: Warm, appetizing color grading
[Audio]: SFX of cooking (sizzling, chopping, pouring)
```

### Multi-shot narrative (timestamp prompting)

```
[00:00-00:02] [Shot 1: setup — wide or establishing shot, set the scene]
[00:02-00:04] [Shot 2: subject closer — emotion, reaction]
[00:04-00:06] [Shot 3: action — what's happening]
[00:06-00:08] [Shot 4: payoff — wide reveal, emotional resolution, or punchline]
```

Vary the shot type each segment so the clip has rhythm.

---

## Best-practices cheat sheet

For quick reference while drafting:

1. **Detail = control.** Generic input → generic output. Specifics dominate the result.
2. **Use the 5-element structure.** Cinematography + Subject + Action + Context + Style/Ambiance.
3. **Specify cinematography first.** It's the most powerful single dimension for tone.
4. **Pick a visual-style lane up front** (photorealistic, anime, claymation, etc.). Vocabulary differs per lane.
5. **Define audio explicitly** — quote dialogue, label `SFX:` and `Ambient:` clearly.
6. **Use timestamp prompting** for multi-shot sequences in a single 8-second clip.
7. **Frame negatives positively** where you can; use `--negative-prompt` for stubborn unwanted elements.
8. **Iterate with single changes**, not whole rewrites. Layer one new dimension at a time.
9. **Lock characters** in the first segment / via reference images; refer back to them as "the woman", "the detective".
10. **Let a chat model rewrite weak prompts** into cinematic ones before sending to Veo.
