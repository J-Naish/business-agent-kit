# Color guide

Color shapes the impression of a design more than any other element. Every color should have a purpose — a strategic palette will always beat a chaotic, multi-color free-for-all.

---

## Color strategy fundamentals

### The 60-30-10 rule

Balance is everything when distributing color. Use these proportions as a starting point:

- **Dominant (60%)**: The neutral foundation — backgrounds and base surfaces. White, off-white, light gray, or a dark equivalent in dark mode. It occupies most of the design and provides stability.
- **Secondary (30%)**: Brand or supporting colors. Used on section backgrounds, cards, navigation, and headings to give the design personality and rhythm.
- **Accent (10%)**: High-contrast color reserved for CTAs, links, hover states, badges — anywhere you want the eye to land. Its small footprint is exactly what makes it work.

### Composing the palette

Beyond neutrals, pick at most 1–4 colors. Give each one a clear job:

- **Primary**: Brand color, CTAs, key interactive elements
- **Secondary**: Support, variations, categorization
- **Accent**: Highlights and moments that need extra attention
- **Semantic**: State communication (success, error, warning, info)

---

## Where color earns its keep

Where you use color depends on what you're trying to say:

- **Semantic meaning**: Success (green), error (red), warning (yellow/orange), info (blue)
- **Hierarchy**: Pull attention to what matters — primary actions, links, key labels
- **Categorization**: Distinguish sections, types, or states by color
- **Emotional tone**: Convey warmth, energy, trust, or creativity through color
- **Wayfinding**: Help users navigate and understand structure
- **Delight**: Moments of visual interest and personality

---

## Where to apply color

### Semantic colors

Colors that communicate state. Use them consistently across every project:

- **Success**: Greens (emerald, forest, mint)
- **Error**: Reds and pinks (rose, crimson, coral)
- **Warning**: Oranges and ambers
- **Info**: Blues (sky, ocean, indigo)
- **Neutral**: Gray/slate for inactive states

Use them on status badges, progress indicators, and alerts. For the concrete design of badges and validation, see [components.md](components.md).

### Interactive elements

- **Primary actions**: Brand color on the most important buttons and CTAs
- **Links**: Color clickable text (while preserving accessibility)
- **Icons**: Color key icons for recognition and personality
- **Hover states**: Introduce a color shift on interaction
- **Focus rings**: Brand-aligned colored focus indicators

### Backgrounds and surfaces

- **Tinted backgrounds**: Replace pure gray with a warm- or cool-tinted variant for subtle warmth
- **Section separation**: Subtle background-color shifts to delineate areas
- **Cards & surfaces**: Lightly tint cards and surfaces to add warmth
- **Gradient backgrounds**: Add depth through intentional, subtle gradients — brand-aligned, not the generic purple-to-blue
- **Section separation**: Subtle background-color switches divide areas

### Typography color

- **Colored headings**: Use brand color on section headings (preserve contrast)
- **Highlighted text**: Color for emphasis or category
- **Labels & tags**: Small colored labels for metadata or categorization

### Borders and accents

- **Accent borders**: Add a colored left or top border to cards and sections
- **Underlines**: Colored underlines for emphasis or active states
- **Dividers**: Subtle colored dividers in place of plain gray lines

### Data visualization

- **Charts & graphs**: Encode categories or values with color
- **Heatmaps**: Express density or importance through color intensity
- **Comparison**: Color-code different datasets or time ranges

---

## Working with neutrals

Neutrals (the grays) make up most of the design — but they aren't just gray:

- **Avoid pure gray**: Add a subtle tint (warm or cool) to feel refined
- **Keep temperature consistent**: Warm grays for warm palettes, cool grays for cool palettes. Don't mix temperatures within a single project.
- **Pure black (`#000`) and pure white (`#fff`)**: When a brand color is in play, tinted off-blacks and off-whites usually feel more polished. But for monochrome-led designs, designs that need strong contrast, or anything chasing pure simplicity, pure black and white are the right call. Decide by intent — don't avoid them as a blanket rule.

---

## Building a palette

### The big rule: derive from what already exists

**Do not invent new colors from scratch.** When you need more color, first ask whether you can derive it from the existing brand colors or design system palette.

- **If a brand or design system exists** → use the colors defined there.
- **If the existing palette is too restrictive** → don't fabricate new colors arbitrarily. Start from an existing color and derive harmonious neighbors in **oklch**, keeping the same tone or saturation band. Because oklch lets you manipulate lightness, chroma, and hue independently, you can shift only the hue while preserving saturation and lightness — making it much easier to keep the palette unified.
- **Only when a new color is genuinely necessary** should you add one — and only with a clear rationale (purpose, tone, brand fit).

The more "kind of nice" colors you add, the more diluted and incoherent the palette becomes, and the more the brand fades.

### When you have a brand color

Derive a full palette from a single brand color:

1. **Set the brand color as primary**
2. **Build out tints (lighter)** — raise the lightness for backgrounds, hover states, and badge backgrounds
3. **Build out shades (darker)** — lower the lightness for active states, dark backgrounds, and text colors
4. **Define a neutral scale** — a grayscale lightly tinted with the brand hue feels unified
5. **Add semantic colors** — success (green), error (red), warning (amber) are defined independently of the brand color

### When there is no brand color

- **Simple, brand-agnostic, or short-lived projects** → just use Tailwind CSS's built-in palettes (slate, gray, zinc, neutral, stone, red, blue, green, etc.). No need to define your own.
- **Projects that are building a brand** → choose a single accent color that suits the project's tone and audience, then build out the palette from there.

---

## Light mode and dark mode

### When dark mode is worth it

Not every project needs a dark mode. Consider it when:

- **The app is used for long stretches** — dashboards, editors, dev tools, anything where users stare at the screen
- **It's used in dark environments** — apps used at night, media players
- **It should follow the OS setting** — native apps, PWAs, daily-driver web apps
- **Users explicitly ask for it**

Skip dark mode for:

- **Landing pages and marketing pages** — short, one-off visits
- **Print-focused materials and PDFs** — anything intended for paper
- **Image creatives, posters** — static designs
- **Small one-off projects** — when the effort isn't justified

### Designing dark-mode color

Dark mode is not a simple inversion of light mode:

- **Background elevation**: In dark mode, lower surfaces are darker and higher ones are slightly lighter. Express elevation through lightness steps like `#0a0a0a` → `#141414` → `#1e1e1e` (see "Depth in dark mode" in [depth.md](depth.md)).
- **Text color**: Pure white (`#fff`) jabs at the eye. Use a slightly muted near-white like `#f7f8f8` or `#e2e4e7`.
- **Accent colors**: The same color from light mode can feel like it's floating on a dark background. Tweak saturation and lightness so it sits naturally on dark.
- **Borders and shadows**: Shadows are barely visible on dark backgrounds. Use translucent white borders (`rgba(255,255,255,0.05)`–`0.08`) or surface lightness differences instead.

---

## Text on colored backgrounds

When placing text on a colored background:

- Don't use gray text — it looks washed out
- Instead, use a darker shade of the background color, or apply transparency to the text
- Always check the contrast ratio

---

## Accessibility

Color accessibility is part of function. Beautiful but invisible color is meaningless:

- **Contrast ratio**: Meet WCAG (4.5:1 for text, 3:1 for UI components). For text legibility more broadly, see [typography.md](typography.md).
- **Don't rely on color alone**: Pair color with icons, labels, patterns, or text
- **Color vision diversity**: Verify red/green combinations work for everyone

---

## Don'ts

- Use every color in the rainbow (limit yourself to 2–4 non-neutral colors)
- Apply color randomly without semantic meaning
- Violate WCAG contrast requirements
- Use color as the sole indicator (accessibility issue)
- Make everything colorful (don't forget subtraction)
- Default to a purple-to-blue gradient (for AI-prone patterns in general, see [anti-ai-aesthetic.md](anti-ai-aesthetic.md))
- Mix warm and cool grays in a single project
- Place gray text on a colored background — it looks faded. Use a darker shade of the background or transparency instead.

---

## What to verify

After adding color, check:

- **Hierarchy**: Is color directing attention appropriately?
- **Clarity of meaning**: Does color help users understand state and category?
- **Appeal**: Does the interface feel warm and inviting?
- **Accessibility**: Do all color combinations meet WCAG?
- **Balance**: Is color purposeful rather than overwhelming?
