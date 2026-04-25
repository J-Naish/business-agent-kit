# Components guide

Components are the parts that make up a design — buttons, cards, inputs, navigation. When these parts follow consistent rules, the whole design feels orderly and trustworthy. Component quality is decided less by the "right way" to build any individual component and more by **end-to-end consistency and complete coverage of interaction states**.

---

## Interaction states

The most important thing in component design is defining every interaction state. Building only the visual default and calling it done is incomplete. Every element a user touches needs:

### The six core states

- **Default**: The resting state. This is what users see longest, so this is the baseline.
- **Hover**: Mouse cursor on the element. Signals "this is interactive." Express it through color shifts, opacity changes, or added shadow.
- **Active / press**: The instant of click or tap. Returns the tactile feel of being pressed. Express it through scale-down (0.95–0.98), darkening, or inset shadow.
- **Focus**: Keyboard navigation (Tab) has landed on this element. Required for accessibility. Express it clearly with a ring.
- **Disabled**: Cannot be operated. Drop opacity (0.4–0.6) or shift color to gray. The look should make "pressing does nothing" obvious.
- **Loading**: Processing. Use a spinner, text change, or opacity pulse to signal "waiting."

### Tips for state design

- **Keep hover restrained**: Big color or scale changes feel noisy. Subtle opacity shifts (0.8–0.9) or a gentle shadow change are usually enough.
- **Active extends hover**: Push the hover change one step further. If hover brightens, active brightens a touch more — or, conversely, dips slightly darker.
- **Don't omit the focus ring**: If you don't like how it looks, that's fine — but focus visibility is an accessibility requirement. Tune the ring's color and style to fit the design while still doing its job.
- **Disabled should look unoperable**: Beyond graying out, prevent interaction itself with `cursor: not-allowed` and `pointer-events: none`.
- **Add transitions**: Don't switch states instantly. A 100–150ms transition smooths things out. Abrupt switches feel sloppy. For timing and easing details, see [motion.md](motion.md).

---

## Buttons

Buttons drive user action. They're also where design quality shows the most directly.

### Variants

Give buttons a clear priority hierarchy. Limit yourself to 2–3 variants on any one screen:

- **Primary**: Most prominent. Brand-color background plus white text, or any high-contrast pairing. Ideally one or two per screen — too many and "primary" loses meaning.
- **Secondary**: Quieter than primary. Border-only, light background, or gray. Often sits next to primary.
- **Ghost / text**: No background, no border, text only. For supporting actions, cancels, "see more" — anything that should fade into the background.

### Sizing

Vary button size by context:

- **Large**: Hero CTAs, form submits. Height 44px–56px.
- **Medium**: General use. Toolbars, in-card actions. Height 36px–44px.
- **Small**: Inline actions, in tables, compact UIs. Height 28px–36px.

Whatever the size, **the touch target should be at least 44×44px**. Even when the visible button is small, give the tap area enough room. For touch targets in responsive design, see [responsive.md](responsive.md).

### Icons in buttons

- When an icon goes left of text, leave an 8px gap between them.
- Icon-only buttons should be square and large enough (36px+) and pair with a tooltip.
- Match the visual weight of icon and text. If the icon is too big or too small, the balance breaks.

---

## Cards

Cards are containers for grouped information. They're a versatile component used across content types.

### What makes up a card

A card's appearance comes from four things:

- **Background color**: Distinguishes it from its surroundings. White on white needs a border or shadow. In dark mode, lean on lightness differences.
- **Border**: A 1px thin border makes the boundary explicit. Keep the color subtle (a gray close to the background). If a shadow already establishes the boundary, the border may not be needed.
- **Shadow**: Adds depth. Subtle shadows (opacity 0.05–0.1) feel refined; stronger shadows draw the eye but feel heavier. For shadow layering and elevation hierarchy, see [depth.md](depth.md).
- **Border radius**: Sets the card's character. 8px–12px is standard. For radius design, see [layout.md](layout.md).

Don't pile all four on. Border + radius, shadow + radius, or background contrast + radius — **simpler combinations feel more refined**.

### Internal structure

- Keep internal padding consistent. 16px–24px is standard.
- Organize information vertically inside: image → title → description → action — a natural top-down flow.
- When buttons or links live inside a card, decide explicitly whether the whole card is clickable or only the buttons inside are. Mixing both creates ambiguous interaction.

### Interactive cards

For clickable cards, signal interactivity on hover:

- Slightly increase shadow
- Slightly shift background color
- Slightly scale up (1.01–1.02)

Keep the change subtle. Loud card hovers turn a whole page noisy.

---

## Inputs and forms

Form elements exist to "let the user enter data." A bad form is a direct cause of drop-off.

### Text inputs

- **Border**: A 1px border defines the field. Same color as the background and you can't see where the input is.
- **Padding**: Generous internal space. Roughly 8px–12px vertical and 12px–16px horizontal.
- **Focus**: On focus, change the border color or add a ring. "I'm typing here" must be unmistakable.
- **Placeholder**: Use a faded text color (40–60% lightness of the main text). But don't go so faded it's unreadable.
- **Label**: Place the label above the input — that's the most readable arrangement. Don't substitute placeholder for label; it disappears on focus.

### Validation

- **Error**: Switch the border to a red, and show the error message below the field. Be specific in the message ("email format is invalid," not "please fill in this field"). For semantic-color choices, see [color.md](color.md).
- **Success**: Only when needed. Confirm with a checkmark icon or green border.
- **Real-time validation**: Erroring while users are still typing is annoying. The standard is to validate when the field loses focus (onBlur).

### Other form elements

- **Select (dropdown)**: Match height, padding, and border to text inputs so they don't go uneven when placed side by side.
- **Checkbox / radio**: 16px–20px is a good size. Use 8px–12px between control and label, and extend the click area to the entire row including the label.
- **Toggle switch**: On/off must be clearly distinguished by color. Make transitions a smooth 150–200ms.

---

## Navigation

Navigation tells users "where you are and where you can go." It's the most stable element on the page.

### Header navigation

The most common arrangement: **logo on the left, menu in the center or right of the logo, CTA on the far right**.

- **Sticky header**: Pinned to the top while scrolling. Always within reach. Adding background blur lets the content below show through while preserving legibility.
- **Background change**: When scrolling starts, add a background color or shadow to clearly separate the header from the content.

### Active state

The active state — showing the current page or section — matters. Users should always know "where I am":

- Change text color (to the primary color or bold)
- Show an underline or indicator
- Subtly shift the background color

### Mobile navigation

Decide ahead of time how navigation collapses on narrow screens:

- **Hamburger menu**: The most common pattern. Tap the menu icon and a full-screen or slide-in menu opens.
- **Bottom tab bar**: The mobile-app standard. Four or five tabs pinned to the bottom, where the thumb naturally lands.

---

## Badges and status

Badges are small components that communicate state or attribute briefly.

### Design fundamentals

- **Keep it compact**: 1–3 words. Long text doesn't suit a badge.
- **Express meaning with color**: Success (green), error (red), warning (yellow/orange), info (blue), neutral (gray). Don't rely on color alone — pair with text or icons.
- **Border radius**: 4px–6px or pill (9999px). Sharp corners rarely suit such a small element.

### Dots / indicators

A small circle (6px–10px) without text to convey state — online/offline, new notification, presence. A minimal visual signal when text isn't needed.

---

## Modals and overlays

Modals concentrate user attention on a specific piece of content. They interrupt normal flow, so use them deliberately.

### Composition

- **Overlay (backdrop)**: A semi-transparent layer that darkens the content behind. Black at 40–60% works. Allow click-outside to close.
- **Modal body**: Centered, with generous padding (24px–32px). Use a slightly larger radius than surrounding components (12px–16px) to mark it as special.
- **Close button**: Top-right. Also support clicking outside the modal and pressing Esc.

### Don't overuse

A modal is an interruption. Reserve it for confirmations, important input forms, and operations that genuinely need focus. Modals users didn't ask for — "announcements," "sale info" — degrade the experience.

---

## Component consistency

### Same role, same style

If a button looks one way on page A and another on page B, users get confused. Components with the same role should look and behave identically wherever they appear. This is "unification" from the four design principles, applied directly.

### Sizing consistency

When inputs, buttons, and selects sit side by side, mismatched heights look careless. Standardize the heights of form elements.

### Shadow consistency

Use shadow consistently across the design. One card uses `box-shadow`, another substitutes a border, another relies on background contrast — that mix should be avoided. Pick one way to express depth and apply it everywhere.

### Spacing consistency

Internal padding, label-to-field spacing, gaps between buttons — don't decide these per-component. Anchor them to a shared spacing scale (e.g. the 8px grid).

---

## Don'ts

- **Skip state definition** — Building only the default and forgetting hover or focus is incomplete. Skipping focus, especially, is an accessibility violation.
- **Too many button variants** — Primary, secondary, and ghost cover most cases. Five or more is excessive.
- **Pile every decoration on a card** — Border + shadow + background contrast + gradient gets heavy fast. Pick a simple combination.
- **Use placeholder as label** — It vanishes on focus and users lose the prompt.
- **Overuse modals** — Unwanted interruption hurts the experience. Reserve them for moments that genuinely need focus.
- **Mismatched heights or styles between components** — Misaligned input and button heights, scattered shadow handling. Aligning them is what quality looks like.

---

## What to verify

- **All interaction states are defined**: Hover, active, focus, disabled, loading — nothing skipped.
- **Button priority is clear**: Can you tell primary from secondary at a glance?
- **Form-element heights line up**: Inputs, buttons, and selects placed side by side share one height.
- **Card boundaries are clear**: Cards don't dissolve into the background. Border, shadow, or background-color difference distinguishes them.
- **Focus ring is visible**: Tab through the page — can you always see what's focused?
- **Components are consistent across the product**: Same component types look and behave the same across pages.
- **Validation works well**: Errors say specifically what's wrong. Error display doesn't break layout.
