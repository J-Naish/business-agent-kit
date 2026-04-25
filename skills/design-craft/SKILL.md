---
name: design-craft
description: A foundational principles-and-practices skill for any design task. Apply it to anything that has a visual surface — websites, landing pages, app UIs, dashboards, slide decks, PDFs, image creatives, posters, email templates, video. Use whenever the user mentions design, UI, UX, layout, look-and-feel, styling, visuals, color, typography, spacing, or animation, and whenever you write code that determines how a website, app, slide, or image looks.
---

Principles and a practical playbook for producing strong design work. Use this as the basis for every design decision and every artifact you make.

## Workflow

### 1. Clarify the goal

Get clear on what you are actually making.

Start at the top level — is the deliverable a website, a web app, a mobile app, a desktop app, a deck, a creative? Lock that down first.

Then drill in:
- What kind of interface is this?
- What components are involved?
- What pages?

If anything is unclear, ask the user. Pull out requirements and intent until nothing ambiguous is left on the table.

When the brief is vague, or before you start something new, confirm at minimum:

- **Existing assets to reference**: Is there a design system, UI kit, codebase, screenshots, or competitor examples to look at? If not, ask for some.
- **Variations wanted**: How many alternatives do you want side-by-side, for the overall flow or for specific screens?
- **Direction of exploration**: A safe, on-pattern execution? Something more novel in visuals or interaction? A mix?
- **What matters most**: Flow/UX, copy, visuals, or motion — where should the energy go?
- **Tone**: Who is this for, and what should it feel like?

Don't fire off questions and then start working anyway. Wait for answers before moving on.

Rules of thumb for when to ask:

- "Here's a PRD, build me a deck" → ask about audience, tone, length.
- "Build a 10-minute Eng All Hands deck from this PRD" → enough info, no questions needed.
- "Turn this screenshot into an interactive prototype" → ask only if the behavior isn't clear from the image.
- "Make 6 slides about the history of butter" → vague, ask plenty.
- "Prototype this onboarding flow" → ask a lot.
- "Recreate the composer UI from this codebase" → no questions needed.

The newer, larger, or fuzzier the task, the more you ask. For small tweaks or follow-ups, ask less.

### 2. Pull in existing context

Strong design is built on top of existing context, not invented from scratch. Building from zero is a last resort — it's the surest path to a templated, median-of-the-training-data result. Before touching anything, work through this checklist:

1. **`DESIGN.md`** (the project's design system) — if it exists, follow its rules for color, typography, component styles, etc.
2. **The existing codebase / UI kit** — components and design tokens already in the repo are your highest-confidence reference for tone. Look for existing implementations, design systems, and UI libraries. When matching existing UI, observe the **visual vocabulary** before writing anything:
   - Copy voice (imperative / descriptive / casual / etc.)
   - Color palette and color temperature
   - How hover / focus / active / disabled states are expressed
   - Animation style and duration
   - Shadow, card, and layout patterns
   - Information density (tight vs. airy)
   Jot down 2–3 lines of observations before you start.
3. **Brand assets** — logos, imagery, fonts. Hunt through the repo for asset folders.
4. **References** (competitors, inspiration screenshots, URLs) — useful for aligning on tone and direction.

If you start designing without any of this, you will almost certainly converge on something generic. If the context you need isn't available, ask for it before starting.

If there is no `DESIGN.md`, decide based on scope:
- Ongoing project, many pages → create one.
- One-off small piece of design → don't bother.
- Unsure → ask the user.

When you do create a `DESIGN.md`, you don't need every section. Include only what the artifact actually needs. See [references/design-md-guide.md](references/design-md-guide.md) for how to write and update it. The [examples/](examples/) directory has design systems modeled on real brands; use them for:
- Reference for `DESIGN.md` format and level of detail.
- Reference for color strategy, typographic hierarchy, shadow systems, etc.
- A starting point — if a sample brand is close to what you're going for, adapt it.

### 3. Put the visual system into words

Before you start making things, write down — briefly — the **visual system** you're going to use. If you keep it all in your head and start moving, judgment drifts mid-piece and the result loses cohesion.

A 5–10 line note at minimum, covering:

- **Layout**: The base layout pattern for section headings, titles, imagery, and body copy.
- **Color**: How background colors are used (which ones, how they switch). One or two background colors max per page or deck.
- **Typography**: Heading-vs-body hierarchy, weight and tracking strategy.
- **Decoration**: Pick one of borders / shadows / background-color contrast to carry the hierarchy.
- **Where you're being distinctive**: Of typography, color, composition, decoration, motion — pick one or two axes to express identity. Just one or two.

If `DESIGN.md` already exists, this note is mostly a matter of filling it in against that. Skip this step and you'll accumulate ad-hoc decisions slide by slide and section by section, and the whole thing will read as scattered.

**Show it early and get alignment**: Like a junior designer running their plan past a manager, share this note (assumptions, context, the visual system you've chosen) early. Get on the same page before going deep. A skeleton you confirm beats a finished comp you have to redo. A first pass full of placeholders is fine — show it fast, get feedback fast.

### 4. Build it

With purpose, context, and visual system locked, start building. Pick the right tools for the medium and work along the principles and quality bars in this skill. Throughout, keep the four design principles in mind: unity, grouping, accent, and visualization.

While you build, also work against [references/anti-ai-aesthetic.md](references/anti-ai-aesthetic.md) — checking that you aren't drifting unconsciously into the templated middle. This isn't a niche reference for when the user explicitly says "don't make it look AI-generated"; treat it as a **standard check against gravitating toward the bland median**.

That said, avoiding common choices isn't the goal in itself. Existing brand, `DESIGN.md`, and product context come first; carve out distinctiveness within those constraints. And you don't need to differentiate on every dimension — one or two of typography, color, composition, decoration, or motion is enough. Use the anti-ai-aesthetic checks both during the work and at the polish stage to ask: "Does this choice have a reason?" and "Does this feel like it belongs to *this* project?"

## Marks of strong design

Across every artifact, aim for these:

- **Immediate legibility**: One look, and you understand what it is. No reading required — structure, meaning, and how to operate it should land instantly. The less thinking it demands, the better.
- **Brand recall**: Looking at the design should bring the brand to mind. When color, logo, tone, and layout patterns are consistent, even a single color swatch or silhouette can summon the brand.
- **No surprises**: The viewer's predictions — "this will probably do X," "that's probably the role of this thing" — should hold. Predictability isn't boring; it builds trust and ease.
- **Guided attention**: Eye and action flow naturally; the user never has to ask "what next?". Layout, visual weight, and choreography deliver information in the right order without the user noticing the work being done.
- **Subtraction**: Design is decided as much by what you cut as by what you put in. Resist the urge to fill space — when you strip the unnecessary, what remains carries weight. No filler copy, dummy sections, or unsourced numbers / icons / stats (data slop) jammed in to cover empty space. If a section feels thin, that's a layout-and-composition problem, not a content-deficit problem.
- **Craft in the details**: The pixel-level alignment, the consistent spacing, the smoothness of a transition — none of these are noticed individually, but together they decide whether the whole feels sloppy or considered.
- **Tonal fit**: The emotional register of the design has to match the context and audience. Functionally correct but tonally off reads as "something's wrong" and undercuts the whole.
- **Ask before adding**: When adding a section, page, line of copy, or piece of decoration *seems* like it would help, propose it instead of doing it. The user knows the audience and goal better. In particular, don't add content just to fill space.
- **A placeholder beats a bad self-made asset**: If you don't have icons, illustrations, photos, or logos, don't fake them. Use a clearly-marked placeholder — a colored rectangle, a labeled box (`[Product photo]`, `[Hero image]`), something obviously standing in — and ask the user for the real asset. A poorly self-made asset drops the quality of the whole piece in one spot. **In high-fidelity work, a placeholder is always higher quality than a bad self-made asset.**

---

## The two dimensions of design

Design rests on two axes: **function** and **art**. They're the foundation, and you should always be balancing them.

### Function

How well the design satisfies the requirements and what capabilities it provides. The user achieves their goal, information lands correctly, no one gets stuck — that's all function.

### Art

Visual beauty, emotional pull, a distinct point of view. The capacity to move people and stick in memory.

### How to balance them

Function and art aren't strict tradeoffs — you can hit both at a high level. But push one too far and the other suffers:

- **Too much art**: Function breaks down. Beautiful but unusable, or the message doesn't land.
- **Function only**: Art evaporates. Usable but flavorless, forgettable.

### Priorities in real work

In commercial design you don't pursue art at the expense of function. **Function is the floor**, and most of the time it dominates.

But "function is enough" is the wrong stance. Use function as the foundation, then continually look for places where art lifts the work. As you build, ask both: "Does this work?" and "Is this expressive?" — and check that you haven't slid too far one way.

If you want to push art at some real cost to function, see [references/artistry.md](references/artistry.md).

---

## Two categories of design

The medium fundamentally changes how you assemble a design. Before you start, decide which of these you're working in.

### Static design

Decks, slides, PDFs, image creatives, posters, print. **Mediums where motion isn't available.**

You have one frame (or a few) to land everything: through eye-flow, information priority, and use of whitespace. No timeline to lean on, so a single still has to carry the whole thing.

### Dynamic design

Websites, applications, dashboards. **Mediums where motion and interaction are available.**

Whether you actually use a lot of motion is a separate question — what matters is that the *option* is there. That's the deep difference from static design. Transitions, hover, scroll-linking, state changes — anything that uses time, anything that reveals progressively.

In dynamic design, **how the user experiences it** matters as much as the composition. Progressive disclosure, cognitive load, state design, feedback, flows, minimizing interaction cost → [references/ux-ui.md](references/ux-ui.md).

---

## The four design principles

These four apply equally whether the design leans functional or artistic.

### 1. Unity

Things with the same role get the same treatment. Same font, same size, same color, same layout, same component shape — if the role is the same, the expression is the same.

When unity breaks, viewers wonder "wait, are these different things?" When it holds, things of the same kind are recognized as such instantly. Unity is what creates order and trust across the whole design.

### 2. Grouping

A coherent unit of information should have a clear boundary. The viewer should be able to see "this set of stuff is one thing, ending here."

Methods vary — cards, section headings, whitespace, rules, background-color shifts. The method is secondary; what matters is that the boundary lands. Without it, viewers can't tell what belongs to what, and comprehension breaks down.

### 3. Accent

Vary weight to control reading order. Size, weight, color, whitespace — use them to say "this is the important part" and "start here."

Without contrast, the viewer can't find the entry point and the message doesn't surface. The reason a strong design reads at a glance is precisely because the accents are placed correctly.

### 4. Visualization

Reinforce ideas that don't travel well in pure text or numbers with visual elements. Images, icons, charts, diagrams — anything that conveys meaning by being seen.

The aim is "understandable without reading." Charts for data, icons for features, diagrams for concepts. The right visual dramatically increases both speed and accuracy of comprehension.

---

## The building blocks of design

The main components that compose a design. You won't read every reference every time — pull in what the artifact calls for.

- **Color** — brand color, backgrounds, text, accents, status (success / error / warning), and the hues of borders and shadows. Every color has a role; the palette has to feel of-a-piece → [references/color.md](references/color.md)
- **Typography** — font family, size hierarchy (display → heading → body → caption), weight, line-height, letter-spacing. Quality of typography decides quality of any design that contains text → [references/typography.md](references/typography.md)
- **Layout & spacing** — grid, container width, the system of spacing between elements. Pick a base unit (e.g. 8px) and use consistent intervals to create rhythm and order → [references/layout.md](references/layout.md)
- **Components** — buttons, cards, inputs, navigation, badges, etc. Define shape, color, padding, corner radius, shadow, and interaction states (hover / focus / active / disabled) → [references/components.md](references/components.md)
- **Depth & elevation** — express hierarchy via shadow, border, or background brightness shifts. Design distinct levels: flat → slightly raised → card → modal → ... → [references/depth.md](references/depth.md)
- **Responsive** (only if you need to deploy across multiple devices and sizes) — the strategy for adapting to screen size. Breakpoints, column collapse, type scaling, touch targets → [references/responsive.md](references/responsive.md)
- **Motion & interaction** (dynamic only) — animation, transitions, hover effects, scroll-linking. Motion must serve a purpose; never animate purely for decoration → [references/motion.md](references/motion.md)

---

## Reference guide by task

You don't need to load every reference every time. Pull what fits the artifact.

| Artifact | Building blocks | Principles & extras |
|----------|-----------------|---------------------|
| LP / Website | color, typography, layout, components, depth | ux-ui, responsive, motion as needed |
| Web app / Dashboard | color, typography, layout, components, depth | ux-ui, plus responsive / motion as needed |
| Slides / PDF / Decks | color, typography, layout | — |
| Image creative / Poster | color, typography, layout | — |
| Email template | color, typography, layout, components | responsive as needed |
| Video | color, typography, layout | motion as needed |
