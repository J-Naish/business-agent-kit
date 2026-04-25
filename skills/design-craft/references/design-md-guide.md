# Guide to writing DESIGN.md

A reference for how to write each section of a `DESIGN.md`, the rules to follow, the order to work in, and the pitfalls to avoid.

---

## Choosing sections

You **don't have to include every section** of `DESIGN.md`. Include only the ones the goal, scale, and medium of the artifact actually demand.

**Always-include sections (true for nearly any project):**
- **Visual Theme & Atmosphere** — the overall direction. Without it, individual tokens scatter.
- **Color Palette & Roles** — color is the foundation of any design.
- **Typography Rules** — there's almost no design without text.

**Sections to add depending on the artifact:**
- **Component Stylings** — for artifacts that include UI components (websites, apps, email templates).
- **Layout Principles** — for artifacts with non-trivial grid or spacing (multi-section LPs, dashboards).
- **Depth & Elevation** — when shadows or elevation are in play (cards, modals).
- **Responsive Behavior** — when you ship across multiple devices.
- **Do's and Don'ts** — for long-running projects or anything built by multiple people, where rules tend to drift.

**Cases where it isn't needed:**
- Slides or PDFs → Typography + Color + Visual Theme is often enough.
- A single image banner → no `DESIGN.md` needed at all (the principles in `SKILL.md` handle it).
- Small one-off pieces → start minimal and add as needed.

When you can't decide, start with the smallest version and add a section the moment you realize "without a rule here, this is going to drift."

---

## Per-section guide

### 1. Visual Theme & Atmosphere

Capture the mood, density, and aesthetic philosophy in evocative language. Read the project's intent, then settle direction along these axes:

- **Density:** "gallery-like openness" → "everyday-app balance" → "cockpit-grade density"
- **Variance:** "predictable symmetry" → "offset asymmetry" → "artistic chaos"
- **Motion:** "static restraint" → "fluid CSS" → "cinematic choreography"

Combine these into a paragraph describing the overall atmosphere. Example: "An interface of restrained, gallery-like openness, with confidently asymmetric layouts and fluid spring-physics motion. The mood is clinical yet warm — like a well-lit architecture studio where every element earns its place through function."

### 2. Color Palette & Roles

Define every color as **descriptive name + hex + functional role**. Group them:

- **Primary:** background surfaces, text colors, brand color.
- **Accent:** CTAs, active states, focus rings (max one per project; saturation under 80%).
- **Neutral scale:** headings, body, secondary text, metadata, disabled states.
- **Status:** success (greens), error (reds), warning (ambers).
- **Borders & shadows:** border color; shadow hue (neutral, or tinted toward the brand color).

Example entries:
```
- **Canvas White** (#F9FAFB) — primary background surface. Warm-leaning neutral.
- **Charcoal Ink** (#18181B) — primary text. Zinc-950 depth for warmth.
- **Steel Secondary** (#71717A) — body text, descriptions, metadata.
```

**Constraints:**
- Don't mix warm grays and cool grays inside one project.

### 3. Typography Rules

Define font family, size / weight / line-height / tracking hierarchy.

**What to specify:**
- **Display / heading:** font name, weight, tracking, leading, scale.
- **Body:** font name, weight, leading (lean generous), max line length (~65 characters recommended).
- **Monospace:** for code blocks, metadata, timestamps.
- **Scale:** concrete values per size (`clamp()` for fluid scaling preferred).

Express the hierarchy as a table:

| Role | Font | Size | Weight | Line height | Tracking | Notes |
|------|------|------|--------|-------------|----------|-------|

**Also write down the design principles in play:**
- Hierarchy is built from weight and color, not just size.
- Tracking tightens as headline size grows (progressive tracking).
- The rule for when body weight applies vs. when heading weight applies.

### 4. Component Stylings

For each major component, fix shape, color, shadow, and interaction states with concrete values:

**Buttons:**
- Background, text color, padding, corner radius, font size / weight.
- Hover state (background shift; no glows).
- Active state (tactile press: `-1px translateY` or `scale(0.98)`).
- Focus state (ring in the accent color).
- Variants: primary, secondary (ghost / outline), tertiary.

**Cards / containers:**
- Background, border (color, width, opacity), corner radius, shadow (concrete values for multi-layer shadows).
- Inner padding, hover behavior.
- Use elevation only when it conveys hierarchy. In dense layouts, replace it with a `border-top` divider or negative space.

**Inputs / forms:**
- Border, background, text color, placeholder color.
- Label above the input, helper text optional, error text below.
- Focus ring (accent color, offset value).
- Whether floating labels are used or not (preference: keep the label visible at all times, including on focus). If you do use floating labels, state that explicitly with the rationale.

**Navigation:**
- Sticky or not; how the background is treated (blur, opacity).
- Link font / weight / color, hover state.
- CTA button placement.
- How it collapses on mobile.

**Loading states:**
- Prefer skeleton screens (shimmer). Match their dimensions and corner radius to the real content so layout doesn't shift on load.
- If you use a spinner, choose one that fits the brand voice. Skeletons usually win on layout stability and perceived speed.

**Empty states:**
- A composed illustration or icon composition with guidance text.
- "No data" alone is forbidden.

**Error states:**
- Inline and contextual. Underline or border in the accent color. Clear recovery action.

### Translating geometry and shape

Convert technical `border-radius` values and layout numbers into physical descriptions. `DESIGN.md` is a design-language document, not a CSS reference — translate raw values into how they *feel*:

- `rounded-full` / `9999px` → "pill-shaped"
- `rounded-lg` / `12px` → "generously rounded corners"
- `rounded-md` / `8px` → "subtly rounded corners"
- `rounded-sm` / `4px` → "lightly rounded"
- `rounded-none` / `0px` → "sharp, hard-edged corners"

Same for shadow strength, the feel of spacing, the density of the layout — describe in words how it looks and feels, not just the number.

### 5. Layout Principles

**Grid and structure:**
- CSS Grid based. No flexbox percentage math (`calc(33% - 1rem)` and friends).
- Maximum content width (e.g. `max-width: 1400px`, centered).
- Horizontal padding (mobile `1rem`, tablet `2rem`, desktop `4rem`).

**Spacing system:**
- Base unit (e.g. 8px) and scale.
- Vertical rhythm between sections.

**Corner radius scale:**
- Levels by use case (e.g. micro 2px → standard 4px → cards 8px → panels 12px → pill 9999px).

**No element overlap:**
- Every element occupies its own clear spatial zone.
- No content stacking via absolute positioning.

**Full-height sections:**
- Use `min-height: 100dvh`. Never `height: 100vh` (iOS Safari address bar).

### 6. Depth & Elevation

Define shadow levels in a table:

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow | Page backgrounds, inline text |
| Ambient (Level 1) | Subtle shadow | Slightly raised cards, hover hint |
| Standard (Level 2) | Standard shadow | Cards, content panels |
| Elevated (Level 3) | Stronger shadow | Feature cards, dropdowns |
| Deep (Level 4) | Multi-layer shadow | Modals, floating panels |

**Also write the shadow philosophy:**
- Shadow hue (neutral gray, or tinted toward the brand color).
- Multi-layer approach (when do near-layer and far-layer combine).
- Use of negative spread.

### 7. Do's and Don'ts

To preserve design intent, list both explicitly.

**Do, examples:**
- Apply the chosen font's OpenType features to all text.
- Use the specified weight for headings.
- Tint shadows with the brand color.
- Use deep navy, not pure black, for heading text.

**Don't, examples:**
- Don't use bold (700+) for headings.
- Don't use large radii (12px+, pill shapes) on cards or buttons.
- Don't use neutral-gray shadows — always tint with brand color.
- Don't use pure black (`#000000`).
- Don't apply warm accent colors to interactive elements.

### 8. Responsive Behavior

**Breakpoints:**

| Name | Width | Key changes |
|------|-------|-------------|
| Mobile | <640px | Single column, smaller headings, cards stack |
| Tablet | 640–1024px | 2-column grid, medium padding |
| Desktop | 1024–1280px | Full layout, 3-column feature grid |
| Large desktop | >1280px | Centered content, generous margins |

**Mobile-first collapse (< 768px):**
- Every multi-column layout collapses to strict single column. No exceptions.
- No horizontal scroll. Horizontal overflow is a critical failure.

**Type scaling:**
- Headings scale with `clamp()`.
- Body text floors at `1rem`. Never go below `14px`.

**Touch targets:**
- Every interactive element is at least `44px`.
- Generous spacing between clickable items.

**Collapse strategy:**
- Navigation: horizontal links → hamburger menu.
- Feature cards: 3-column → 2-column → single-column stacking.
- Section spacing: scale down proportionally from desktop to mobile.

**Test viewports:**
- Validate on `375px` (iPhone SE), `390px` (iPhone 14), `768px` (iPad), `1024px` (small laptop), `1440px` (desktop).

---

## Writing rules

- **Be descriptive.** Skip generic words like "blue" or "rounded." Reach for "deep-sea cerulean (#0077B6)" or "generously rounded corners" — say what it actually looks like.
- **Be functional.** Every element gets a role. Beyond color name and size, write what it's used for ("primary CTA," "metadata display").
- **Be consistent.** Use the same vocabulary throughout. The same color doesn't get two names in two places.
- **Be precise.** After the descriptive name, include hex, rem, or pixel values in parentheses. You need both the natural-language description and the exact technical value.
- **Be visual.** Write so the reader can reconstruct the design in their head. This is "a description of the design," not "a list of CSS."
- **Communicate the why.** Beyond *what* the decision is, say *why*. Why this color, why this weight, why this spacing.
- **Take a stance.** Make a document that enforces this project's specific aesthetic, not a neutral template.

---

## Order of work

1. **Start with atmosphere** — get the mood of the project before you drill into tokens.
2. **Hunt for patterns** — surface consistent spacing, sizing, and styling patterns.
3. **Name semantically** — name colors by purpose ("Electric Blue — for productivity tools"), not by appearance ("blue").
4. **Honor the hierarchy** — document how visual weight communicates importance.
5. **Encode the prohibitions** — anti-patterns matter as much as the rules. List the things not to do.

---

## Pitfalls to avoid

- Using technical jargon without translation (write "generously rounded corners," not `rounded-xl`).
- Omitting hex codes, or relying only on descriptive names — you need both.
- Forgetting to explain the functional role of an element.
- Atmosphere descriptions that are too vague.
- Skipping the small details — shadows, spacing patterns.
- Ignoring the anti-pattern list — that's what lifts the output to premium.
- Defaulting to "safe" generic design instead of forcing through a curated aesthetic.
