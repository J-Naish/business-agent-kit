# Avoiding AI-looking design

When AI generates code, it tends to converge on the median of its training data. The result: designs that feel familiar — "I've seen this somewhere" — pretty but unmemorable. The phenomenon has a name, "AI slop": technically correct, design-wise generic.

This reference enumerates the patterns AI most often falls into, with concrete ways out of each. None of these patterns is inherently bad — picked deliberately, they're fine. The problem is when they show up by default, with no thought behind them.

---

## How to use this

Treat this reference not as a "make it weird" prompt but as a **check against unconsciously sliding into the templated middle**.

- If there's an existing brand or `DESIGN.md`, that wins. Don't break their rules to feel distinctive.
- Don't try to differentiate on every dimension. **Pick one or two axes** — that's stronger.
- Avoiding "common choices" isn't the goal. Always know *why* you're avoiding something and *what* you're choosing instead.
- Prefer specificity to weirdness. "Does this feel like *this* project?" is the test.
- At the end, run the verification checks below and look for residual template feel.

---

## Color

### The purple-to-blue gradient

The single most common pattern in AI-generated design. The signature of "AI-looking." Especially common, applied unthinkingly, on hero backgrounds and CTA buttons.

**Way out**: If you're using a gradient, derive it from the brand color. If purple-to-blue isn't the brand color, drop the combination. And before that — ask whether you need a gradient at all. Solid colors are often cleaner.

### A flat, uninflected palette

Tailwind defaults straight out of the box, every color sitting in the same saturation and lightness band. Technically fine, but it's the same palette as every other site.

**Way out**: Vary the saturation across the palette. Accents go high-saturation, backgrounds and neutrals go low. Even just tinting your neutrals with a hint of the brand color shifts the impression. See [color.md](color.md).

### Neon glow / over-luminous effects

`box-shadow` configured as a neon halo around buttons and cards. The lazy shorthand for "futuristic."

**Way out**: Express depth with natural multi-layer shadows or borders, not glow. When you do need a glow (dark-mode focus rings, etc.), keep the opacity low and the touch light. See [depth.md](depth.md).

---

## Typography

### Defaulting to the same fonts

AI tends to land on the same "safe" fonts request after request — Inter, Roboto, Arial, Fraunces, Space Grotesk, Poppins, DM Sans, system stacks. They're all fine fonts. But if the same fonts come out of every project, that's not a design decision — it's default behavior.

**Way out**: Reverse-engineer the font from the brand's tone. Authoritative? Serif. Technical? Mix in monospace. Warm? Rounded sans. The question isn't "which font is universally good?" but "what fits *this* project?" If `DESIGN.md` specifies a font, follow it.

### Bold-everything headings

`font-weight: 700` on every heading. Hierarchy collapses to a binary of Bold and Regular, and the expressive range narrows.

**Way out**: Use weight variation for nuance. Light (300) and Medium (500) headings can carry hierarchy through size, color, and tracking instead. Stripe uses weight 300 for headings — authority without raising voice. See [typography.md](typography.md).

### Default tracking and leading

Display-size text left at default tracking — large text reads as stretched and slack.

**Way out**: Tighten as size grows; loosen as size shrinks. For display sizes, consider `-1px` to `-3px` of negative tracking.

---

## Layout

### Perfect symmetry, top to bottom

Every section centered, every section symmetric, no compositional change as you scroll. Tidy and dull.

**Way out**: Vary composition section by section. Image-and-text alternating left and right, asymmetric grids, switching between left- and center-aligned text. Don't park everything on the centerline; modulate the eye's movement.

**Exception**: Comparison tables, pricing tables, minimalist brand sites, deck title pages — symmetry can be exactly right. The problem is "the entire page in one composition, forever."

### Uniform spacing

Every section gap, every card gap, every inter-element gap the same. No rhythm, no signal as to what's important and where the divisions are.

**Way out**: Modulate the spacing. Big breath after the hero, tight intervals between related sections. Vary size deliberately by section weight and contextual shift. See [layout.md](layout.md).

### The omnipresent 3-column equal grid

Features, pricing tiers, team members — all rendered as the same equal three-up grid.

**Way out**: Match layout to content type. Features as alternating two-column (image + text). Pricing as an unequal grid that elevates one tier. Numbers as oversized typography. Repeating one grid is the main reason a page reads as monotone.

**Exception**: For pricing, team rosters, or feature card lists, where comparability is the point, an equal grid makes sense. The problem is when "comparison grids" leak mechanically into hero and storytelling sections.

---

## Components

### Indiscriminate corner radii

`rounded-xl` or `rounded-2xl` slapped on every component, erasing tonal differences between them.

**Way out**: Build a hierarchy of radii. Small things (buttons, badges) restrained, big things (hero containers, modals) generous. Decide a single tonal stance (sharp / standard / generous) and stay consistent. See [layout.md](layout.md).

### Decoration piled on top of decoration

Cards with border + shadow + gradient background + glow + hover animation, all at once. The impulse to "look rich" overrides the quality of any individual element.

**Way out**: Subtract. The boundary of a card needs *one* of border, shadow, or background contrast — pick one and refine it. That's where quality comes from.

### Rounded container with a colored left border

`border-left: 4px solid <accent>` plus rounded corners plus a tinted background, used for "notes," "tips," "quotes." A staple of AI-generated UI, and instantly readable as templated.

**Way out**: If something needs emphasis, use typographic weight and size, top-and-bottom borders only, or just a background-color shift with no border at all. Reserve the rounded-container-with-left-border combo for cases where it's explicitly defined in the brand's design system.

### Emoji clutter

Headings and bullet items mechanically prefixed with rocket-ship, sparkle, light-bulb, chart emojis. Looks like added "warmth," but pasted on without regard to brand voice — reads as cheap.

**Way out**: Reserve emoji for brands that explicitly use emoji as part of their voice (casual SaaS release notes, etc.). Otherwise, build hierarchy and ornament through icon set, typography, and layout.

### Mixed icon styles

Multiple icon sets or styles in a single design — line and fill mixed, stroke widths inconsistent.

**Way out**: One icon set. Pick line or fill, normalize stroke width. Systematize the sizes too — 16px / 20px / 24px tiers tied to use case.

---

## Motion

### Animating everything

Every element on the page fades in, slides in, or scales. Every scroll triggers movement, and signal disappears into noise.

**Way out**: Concentrate motion on the **hero moments**. Page load on the hero, hover on key CTAs, feedback on state changes — pick the few that count. Restraint multiplies the impact of motion. See [motion.md](motion.md).

### Glacial animations

Fade-ins at `duration: 1s` or longer, stacking up. Aiming for "elegant," landing as "sluggish."

**Way out**: Feedback in 100–150ms. State changes in 200–300ms. Entrances in 300–500ms. Exits at about 75% of entrance time.

---

## Visual assets

### Bad self-made SVG illustrations and icons

When icons, illustrations, product shots, or people photos aren't on hand, the temptation to draw something quickly in SVG. Almost always the form is too crude or the style fails to match the rest of the components, and that one element drags the rest of the design down with it.

**Way out**: If the asset isn't there, **stop at a placeholder**. Colored rectangle, labeled outlined box (`[Product photo]`, `[Hero image]`), pure geometric shape — anything that obviously says "the real thing goes here." Then ask the user for the real assets at the polish stage. **In high-fidelity work, a placeholder is always higher quality than a bad self-made asset.** Keep it as a placeholder until the real thing arrives.

### Data slop (meaningless numbers, stats, badges)

"4.9★", "10,000+ users", "Built with ♥ by X" — unsourced numbers and copy thrown in to fill space, badges and icons strewn around. Used as cheap social-proof signaling, but precisely because they're unsubstantiated, they read as fake.

**Way out**: Use numbers and badges only when the project actually has **verified facts** behind them. If not, treat the slot as "a placeholder for a real number that will land here," or replace it with a different composition that doesn't lean on numbers (a photo, a quote, a product shot). Whenever you feel like *adding*, ask first whether you can solve it by *cutting* and using composition instead.

---

## Big-picture tendencies

### Convergence to "safe" design

The biggest problem with AI-generated design isn't that any single element is wrong. It's that **the whole reads as everywhere-design**. White background, Inter font, blue accent, equal three-column grid, everything `rounded-lg` — each individual choice is correct, and together they produce a SaaS template at scale.

**Way out**: Set the starting point as "what does this project want to say?" not "what is safe?" Define the atmosphere, tone, and identity in `DESIGN.md` first, then build inside those constraints. Aim not for "correct" design but for design that feels like *this project*.

### Where templated feel actually comes from

What reads as "templated" comes not from any one element but from the accumulation of multiple safe-default choices. Subvert expectations on at least one or two of font, color, layout, component style, and motion, and you escape that feel. You don't have to make everything weird — one bold choice changes the read of the whole.

---

## Plays for distinctiveness

The most reliable way to avoid AI-looking design isn't "follow the don'ts" — it's **deciding in advance where you'll be distinctive**. Pick one or two of these consciously and the templated feel falls away.

### Differentiate via typography

- Serif or light-weight headings.
- Different fonts for body and headings, in distinct roles.
- Build tone through tracking, leading, and weight — not just size.

References:
- Warm and human-leaning: [../examples/Claude.md](../examples/Claude.md)
- Extreme scale and tension: [../examples/xAI.md](../examples/xAI.md)

### Differentiate via color temperature

- Give neutrals a consistent warm or cool tint.
- Pull accent color from the brand's context.
- Don't go "all colorful" — find tension in a single color set inside an otherwise achromatic palette.

References:
- Warm-leaning, dodging AI feel: [../examples/Mistral.md](../examples/Mistral.md)
- Pushing through almost achromatic: [../examples/Figma.md](../examples/Figma.md)

### Differentiate via composition and layout

- Don't center everything; mix left-alignment and offsets.
- Vary information density and whitespace rhythm by section.
- Separate "comparison grids" from "atmosphere compositions."

References:
- Cinematic whitespace and contrast: [../examples/Apple.md](../examples/Apple.md)
- Industrial dense dark UI: [../examples/Linear.md](../examples/Linear.md)

### Differentiate via decorative restraint

- Of border, shadow, background contrast, gradient — pick one as the lead.
- Reduce the count of decorative elements; raise the precision of the finish.
- Before you add anything, ask whether you can remove something instead.

### Differentiate via concentrated motion

- Don't animate everything; concentrate on a single hero moment.
- Separate UI feedback from motion-as-brand-experience.
- Respect `prefers-reduced-motion`, and reserve impact for moments that earn it.

---

## Verification checks

- **First impression**: Looking at the design, does it feel "ah, this was made by AI"?
- **Distinctiveness**: Is the design generic enough to live on a different project?
- **Font intent**: Is there a "*because of this project*" reason behind the font choice, or is it the default?
- **Color identity**: Does the palette carry the brand's identity, or is it Tailwind defaults?
- **Compositional variation**: Scrolling through, does composition change, or is it the same pattern repeating?
- **Decorative restraint**: Is component decoration at the minimum needed, with nothing in for "richness" alone?
- **Motion concentration**: Is animation concentrated on impactful moments, or is everything moving?

### Quick template-feel check

If multiple of the following are true at once, you are likely sliding toward AI-templated work:

- Inter-style font + blue accent + white background, and stopping there.
- From hero down, center-alignment and equal grids the whole way.
- Every element processed at the same `rounded-lg`-ish radius.
- Border, shadow, gradient, and glow all stacked on the same card.
- Almost every element fading in as you scroll.
- You can't articulate why this font / this color / this composition.

A single hit isn't an automatic fail. Three or more hits is worth a real look at the design.
