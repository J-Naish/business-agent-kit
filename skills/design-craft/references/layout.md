# Layout and spacing guide

Layout and spacing decide the structure of information and the visual rhythm of a design. Same content, different placement and whitespace — the impression of "readable," "organized," "comfortable" shifts dramatically. Great layout is invisible: when viewers can focus entirely on the content, the layout is doing its job.

---

## The base unit of spacing

### The 8px grid

The base unit for spacing is **8px**. Set every margin, padding, and gap as a multiple of 8 and a consistent rhythm emerges. 8 divides cleanly by 4, 2, and 1, so finer tuning is still available.

- **4px**: Fine adjustment. Between text and an icon, between tightly related elements.
- **8px**: The smallest standard interval. Between a label and its field, dense UIs.
- **16px**: Standard padding inside components. Card interiors, around buttons.
- **24px**: Between content blocks. Between paragraphs, between cards.
- **32px**: Within a section. Around subheadings.
- **48px–64px**: Between sections. A clear context shift.
- **80px–120px**: Between large sections. Hero to next section, etc.

### How the scale works

The spacing scale is not uniform. **Small values are dense, large values sparse.** Fine steps where you need precision (4, 8, 12, 16); larger jumps where you don't (48, 64, 80, 120).

This matches perception. The difference between 4px and 8px is visible; the difference between 80px and 84px is not. At larger sizes, coarser steps are enough.

---

## Container and content width

### Capping max width

When content stretches indefinitely on a wide screen, lines of text become too long and reading suffers. Capping max width preserves readability and order.

- **1200px**: A standard maximum used on many websites. Comfortable across most screen sizes.
- **960px–1080px**: Narrower content. Suits text-led pages and editorial layouts.
- **Text content**: Constrain body columns to roughly 600px–720px so line length stays in the right range (for optimal characters per line, see [typography.md](typography.md)).

### Full bleed plus constrained content

A common pattern: backgrounds and images span the full viewport width, while the inner content stays constrained to max width. This makes section divisions clear while preserving readability.

---

## Spacing between sections

Section spacing **sets the page's pace**. Wide gaps let one section own the viewport, producing a gallery-like, unhurried experience. Narrow gaps create dense, fast-flowing experiences.

### Choosing the pace

The right pace depends on the content:

- **Generous (80px–120px)**: One message per screen. Brand sites and landing pages where photography or video lead.
- **Standard (48px–80px)**: Balanced pace. Most SaaS, corporate, and product sites.
- **Dense (32px–48px)**: High information volume, browse-efficient. Dashboards, social feeds, e-commerce listings.

### Don't lean on spacing alone

Section dividers don't have to come from whitespace alone. Combining background-color shifts (white ↔ gray, light ↔ dark), borders, and typographic changes can create clear divisions with less whitespace. In fact, **about 80% of section division comes from background and contrast changes**, with spacing in a supporting role. For background-color design, see [color.md](color.md); for using background color to express depth, see [depth.md](depth.md).

---

## Grids and columns

### Column layout

Column count depends on information density and content type:

- **1 column**: Text-led pages, articles, forms. Most readable, best mobile compatibility.
- **2 columns**: Image + text, main + sidebar. Good for contrast and pairing.
- **3 columns**: Card layouts, feature highlights. The most common desktop grid.
- **4+ columns**: Product listings, galleries, dense data. For wide viewports.

### Gaps (gutters)

Gaps between columns and grid items adjust density:

- **8px–12px**: High density. Data tables, compact card lists.
- **16px–24px**: Standard. Most card grids, feature sections.
- **24px–32px**: Roomy. When each item should breathe, or you want a high-quality feel.

Tighter gaps say "there's a lot here." Wider gaps say "each one matters."

---

## Spacing inside components

### Padding fundamentals

Internal padding gives an element room to breathe. Too tight feels cramped; too loose feels stretched out:

- **Buttons**: 8px–12px vertical, 12px–16px horizontal. Maintain a 44px minimum touch target.
- **Cards**: 16px–24px internal padding. Feature and hero cards: 24px–32px.
- **Input fields**: 8px–12px vertical, 12px–16px horizontal. Don't let text crowd the border.
- **Modals / dialogs**: 24px–32px. Generous space so content doesn't hug the edges.

### Consistency across the same component

Use the same padding across same-type components. If card A is 16px and card B is 24px, they no longer look like the same kind of thing. This is the unification principle in action — same role, same spacing. For per-component recommended padding, see [components.md](components.md).

---

## Vertical rhythm

### What rhythm means

Vertical rhythm is regularity in the spacing between elements as you scroll down a page. When headings, paragraphs, images, and cards line up with consistent rhythm, the whole page reads as "organized."

### Building rhythm

Pick a base interval (the base rhythm) and design every spacing as a multiple of it:

- **Base 24px**: Paragraph spacing 24px, before-heading 48px (×2), section spacing 72px (×3).
- **Base 32px**: Paragraph spacing 32px, before-heading 64px (×2), section spacing 96px (×3).

You don't need perfect multiples. **Just consistently using nearby values produces rhythm.** Consistency matters more than precision.

---

## Designing for density

Layout density — how much information on one screen — is a design decision, not aesthetic preference. It depends on **content and user goal**.

### High density

Users need to compare or scan a lot of information quickly:

- Dashboards, admin panels
- E-commerce listings
- Social feeds
- Data tables

Tighten spacing, shrink cards and list items, maximize information per screen.

### Low density

Users should absorb one message deeply:

- Brand sites, landing pages
- Hero sections
- Product introduction pages
- Portfolios

Open up spacing, let each section own the viewport. One message per screen.

### Mixed within a single page

Density can vary within a page. Hero (low density, one message), feature section (medium density, three-column cards), pricing comparison (high density, table) — switch density to match the role of the content.

---

## Full-viewport sections

A section sized at `100vh` (the full viewport height) treats each section as its own scene. Each scroll reveals a new screen.

### Where it works

- Hero sections
- Showcasing large imagery or visuals
- Narrative storytelling (one scene, one scroll)

### Watch outs

- Use `100dvh` (dynamic viewport height), not `100vh`. It absorbs the address-bar height changes on mobile browsers.
- For content-light sections, use `min-height: 100dvh` so additional content doesn't overflow.
- Making every section full-viewport gets monotonous. Reserve it for moments that earn it.

---

## The meaning of whitespace

Whitespace isn't "empty space" — it's a **purposeful design element**. Understand the jobs it does:

- **Grouping**: Nearby elements read as related (proximity). Tighten space to group, open it to separate.
- **Emphasis**: An element with lots of whitespace around it stands out. Sufficient breathing room around important elements directs the eye.
- **Breathing room**: Too-dense text and images feel oppressive. Appropriate whitespace gives content "breath" and a comfortable read.
- **Quality**: Designs with ample whitespace read as careful and high-quality. Crammed designs read cheap.

Don't think of whitespace as "wasted space." Design it deliberately, as part of the design.

---

## Border radius

Border radius has an outsized effect on impression. The same card at 4px and 16px reads as "sharp and precise" vs. "soft and approachable" — completely different. Radius isn't decoration; it sets the tone of the whole design.

### Sweet spots

A handful of values keep showing up in great designs:

- **2px–4px**: Minimal rounding. Keeps a sharp feel while avoiding the harshness of pure right angles. Common on buttons, inputs, badges.
- **6px–8px**: The most versatile range. Cards, containers, dropdowns — broadly applicable. When in doubt, start here.
- **12px–16px**: Generous rounding. For feature cards, hero elements, containers you want to stand out.
- **20px–32px**: Bold rounding. For large hero containers and special elements.
- **9999px (pill)**: Fully rounded ends. Mainly for buttons, tags, badges.
- **50% (circle)**: For turning a square into a circle — icon buttons, avatars.

### Designing impression with radius

Radius size connects directly to overall tone:

- **Sharp (2px–4px)**: Precise, technical, engineering-flavored. Suits designs led by straight lines and sharp angles.
- **Standard (6px–8px)**: Professional and approachable. The most balanced choice.
- **Generous (12px–20px+)**: Warm, creative, human. Roundness creates a softer atmosphere.

The key: **keep tone unified within a single design.** Sharp buttons (4px) sitting next to generous cards (32px) reads as incoherent.

### Hierarchy of radius

Radius has hierarchy too. **Larger on prominent elements, smaller on minor ones**:

- Hero containers: 16px–32px
- Cards: 8px–12px
- Buttons: 4px–8px (or pill)
- Inputs: 4px–8px
- Badges, tags: 4px–6px (or pill)

When this hierarchy mirrors the spacing hierarchy, overall consistency rises.

### When to use pills

Pill-shaped (9999px) buttons and tags send a strong visual signal. If you use them, **use them consistently**:

- If your primary CTA is a pill, make the difference from secondary buttons clear.
- Mixing pills and standard rounded buttons on the same screen breaks cohesion.
- Reserve pills for CTAs and tags. Don't apply them to cards or containers.

### Nested radii

When a rounded element contains another rounded element (e.g. a rounded button inside a rounded card), **the inner radius should be smaller than the outer**. Outer 12px with inner 12px makes the corners visibly mismatched. With outer 12px, inner 6px–8px feels natural.

A rule of thumb: **inner radius = outer radius − padding** (or thereabouts). This keeps the outer and inner curves visually parallel.

### Don't proliferate radius values

Keep radius variations to **3–5 steps**. When 4px, 7px, 8px, 11px, 13px all show up, it's unclear whether they're intentional or accidental, and the result reads as sloppy. Design clearly distinguishable steps.

---

## Don'ts

- **Spacing without a base unit** — random values like 13px, 17px, 22px break the rhythm. Stay on the 8px grid.
- **Uneven section spacing** — 40px between some sections and 80px between others reads as careless. Unless the variation is intentional, align it.
- **No container max width** — past 100 characters per line on a big screen, reading suffers. Set `max-width`.
- **Borders and cards without padding** — content jammed against the frame feels cramped.
- **Sections separated by whitespace alone** — without backgrounds or borders to back it up, large gaps just look "empty."
- **Stripping too much whitespace on mobile** — dropping below 40% of desktop spacing feels cramped. Use 32px as a rough floor.
- **Mixed radius tone** — sharp buttons (4px) next to generous cards (32px) reads as incoherent.
- **Too many close radius values** — 4px, 6px, 7px, 8px, 10px is too granular and the intent gets lost. Design with clear steps.

---

## What to verify

- **Rhythm is consistent**: As you scroll, do you feel regularity in the spacing?
- **Grouping reads correctly**: Are related elements close, unrelated ones farther apart?
- **Density matches purpose**: Not too generous on dense screens, not too crammed on brand-led ones?
- **Content widths are right**: Lines aren't too long, cards aren't too small?
- **Whitespace has intent**: Does each gap serve grouping, emphasis, or breath?
- **Holds up responsively**: Does spacing not collapse or balloon as the viewport changes? (For responsive design generally, see [responsive.md](responsive.md).)
- **Radius tone is unified**: No sharp and generous elements mixed together?
- **Radius steps are clear**: Are the radius values you're using visibly distinguishable?
