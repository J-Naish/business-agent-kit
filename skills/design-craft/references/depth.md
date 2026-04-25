# Depth and Elevation Guide

Depth conveys hierarchy and overlap visually. Shadows, borders, and background-color shifts express the spatial relationship between elements — what sits in front, what sits behind. A flat design without depth makes it hard to read importance or structural relationships. That said, depth is more refined when used sparingly — heavy shadows weigh a design down.

---

## Elevation Hierarchy

Design elevation in discrete steps. If everything sits at the same height, hierarchy disappears. **Three to five levels** is usually enough:

### A typical hierarchy

- **Level 0 (flat)**: Same plane as the background. Base content, text blocks, lists. No shadow.
- **Level 1 (slight lift)**: Barely raised. Cards, section dividers, input fields. A very faint shadow or a 1px border.
- **Level 2 (raised)**: Clearly lifted. Dropdowns, popovers, tooltips. Multi-layer shadows create natural depth.
- **Level 3 (frontmost)**: At the very top of the stack. Modals, dialogs, anything with an overlay. Large, soft, spread-out shadows plus a background overlay.

### How to decide which level

Which level something belongs to comes down to **how much attention it should command**:

- Always visible but doesn't need attention → Level 0–1
- Appears temporarily in response to user action → Level 2
- Interrupts the user's flow and demands focus → Level 3

---

## Shadow Design

Shadows create depth by casting a darker tone than the background. Which means **they work best on light backgrounds and nearly disappear on dark ones**. In dark mode or on dark surfaces, don't lean on shadows — use borders or background-color stepping instead (see "Depth in Dark Mode," "Depth Through Borders," and "Depth Through Background Color" below). The shadow techniques here mostly apply to light mode and bright backgrounds.

### Multi-layer shadows

Great shadows are built from **multiple layers, not a single value**. A real-world shadow blends a sharp near-shadow with a softer far-shadow. To recreate that:

- **Near shadow**: Small blur (2–4px), slightly higher opacity (0.05–0.1). The crisp shadow directly under the element.
- **Far shadow**: Larger blur (15–40px), lower opacity (0.03–0.08). The soft, diffuse shadow that spreads outward.
- **Ambient**: A very faint shadow in all directions. Creates the sense that the element is floating in air.

Layering two or three of these produces a depth that no single shadow can match.

### Shadow opacity

Restrained opacity reads as more refined:

- **0.02–0.08**: Subtle and elegant. You barely notice it up close, but it lifts the overall feel.
- **0.08–0.15**: Standard depth. Right for cards and dropdowns.
- **0.15–0.3**: Pronounced depth. For modals and floating elements.

Anything past 0.3 is too heavy in almost every context.

### Tinting shadows with brand color

Shadows don't have to be black (`rgba(0,0,0,...)`). A touch of brand color in the shadow turns depth itself into part of the design:

- Brand color is deep navy → shift shadows toward a bluish gray, e.g. `rgba(50,50,93,0.1)`
- Background is warm → warm the shadow too, e.g. `rgba(30,20,10,0.08)`
- Cool blue palette → push shadows toward cooler tones

A neutral black shadow reads as "generic and safe." A tinted shadow reads as "this belongs to this design." For palette construction and brand-color extension, see [color.md](color.md).

---

## Depth Through Borders

Shadows aren't the only way to express depth. Borders are just as effective — and they matter more in dark mode, where shadows fade.

### Ring shadow

A border-like shadow built with `box-shadow: 0px 0px 0px 1px rgba(...)`. Unlike CSS `border`, it doesn't affect element size and sits cleanly against rounded corners. A lot of great designs lean on this technique.

### Border lightness hierarchy

Express elevation through how much lighter a border is than the background. Especially effective on dark backgrounds:

- Level 0: No border (blends with background)
- Level 1: Border slightly lighter than background (5–8% lightness difference)
- Level 2: Border clearly lighter than background (10–15% lightness difference)
- Level 3: Border in an accent or brand color

### When to use borders vs. shadows

- **Borders win**: When you want a clear edge, on dark backgrounds, in flat designs, or when separating elements with a divider.
- **Shadows win**: When you want a sense of floating, on light backgrounds, for richer depth, or to suggest something sitting on top.
- **Both together**: A ring shadow (border-like) plus a drop shadow (lift). Effective for cards and popovers.

---

## Depth Through Background Color

Express depth purely through differences in surface lightness — no shadows, no borders. The color of the surface itself carries "front" or "back."

### Light mode

On a white canvas, keep raised surfaces white and tint the recessed surface a hair darker:

- Background: `#f5f5f5` (very light gray)
- Card / raised surface: `#ffffff` (white)
- Recessed surface: `#ebebeb` (slightly darker gray)

### Dark mode

On a dark canvas, lift raised surfaces with a touch of brightness:

- Background: `#0a0a0a` (near black)
- Card / raised surface: layer `rgba(255,255,255,0.02)`–`rgba(255,255,255,0.05)` to brighten
- Recessed surface: darker than the background, or sunken with an inset shadow

In dark mode this stepping of background colors often becomes the primary expression of depth. Subtle lightness shifts are the most reliable way to communicate hierarchy when shadows can't be seen. For dark-mode color design overall, see the "Light Mode / Dark Mode" section in [color.md](color.md).

---

## Depth in Dark Mode

Dark mode demands a different toolkit. Dark shadows on a dark background simply don't show, so you need other moves:

### What works

- **Background-color stepping**: As above — express hierarchy through subtle lightness differences.
- **Translucent white borders**: `rgba(255,255,255,0.05)`–`rgba(255,255,255,0.1)` borders read naturally on a dark surface.
- **Inset shadows**: `inset 0px 0px 12px rgba(0,0,0,0.2)` to sink an element. Right for recessed surfaces.
- **Top-edge highlight**: `inset 0px 1px 0px rgba(255,255,255,0.05)` lights only the top edge — like light striking from above. Reminiscent of glass or polished metal, and reads as high quality.
- **Glow / luminescence**: Instead of a shadow, add a faint glow around the element. On a dark background, "light" is more effective than "shadow."

### What to avoid

- Reusing light-mode shadows — even at lower opacity, they look unnatural on dark surfaces.
- Heavy black shadows — they melt into the background and stop functioning as depth.
- Relying on shadows alone — pair them with borders and background-color stepping.

---

## Insets and Recesses

The inverse of elevation — a sense of being pressed in. Use this on input fields, search bars, wells, and anywhere the meaning is "type into me" or "content lives inside."

- **Inset shadow**: `inset 0px 1px 2px rgba(0,0,0,0.05)` casts a faint shadow along the top edge, suggesting the surface is sunken.
- **Darker background**: A surface slightly darker than its surroundings reads as recessed — light isn't reaching it.
- **Inner border**: Place the border inside instead of outside (or use a darker inner shadow).

Combining elevation and recess gives a design dimensionality and structural clarity. For applying these to specific components like inputs and cards, see [components.md](components.md).

---

## What Not to Do

- **A single-layer shadow** — One shadow looks artificial. Layer two or three for natural depth.
- **Opacity that's too high** — Past 0.3 it's heavy almost everywhere. Anchor in 0.05–0.15.
- **Relying only on shadows in dark mode** — They're invisible. Combine borders and background stepping.
- **Too many elevation steps** — Past six steps the differences stop registering. Three to five is plenty.
- **Inconsistent shadow usage** — One card has a drop shadow, another has a border, another uses background contrast. Pick one approach and apply it everywhere.
- **Shadowing every element** — A shadow says "this is floating." If everything floats, hierarchy disappears.

---

## What to Verify

- **Does the hierarchy read?** Can you tell which element is in front and which is behind at a glance?
- **Do the shadows feel natural?** Not too dark, consistent in direction.
- **Does it work in dark mode?** Are shadows getting lost in the background? Are borders or background colors picking up the slack?
- **Are elevation steps distinguishable?** Can you actually see the difference between Level 1 and Level 2?
- **Is it consistent?** Do all elements at the same elevation use the same shadow / border?
- **Is it too heavy?** Are shadows overpowering the design? Try removing them and see if the design still holds.
