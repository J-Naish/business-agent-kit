# Responsive Design Guide

How to build designs that work as intended at every screen size. Responsive design matters when your work has to ship across multiple devices and viewports. For fixed-size deliverables (a banner image at a specific size, print) or single-device work, you don't need it.

---

## The Mobile-First Principle

Start from the smallest screen. Put only what mobile needs on the page, then add and expand as the screen grows.

Why mobile-first:

- **Content priorities become explicit** — small screens force you to ask "what really matters?" You can't fit everything, so you order by importance.
- **It favors performance** — mobile devices are limited in bandwidth and CPU. Adding from a minimum is lighter than subtracting from the full layout.
- **Expanding is easier than collapsing** — turning one column into two is natural; collapsing three columns into one tends to break.

---

## Thinking About Breakpoints

### Decide by content, not device

Don't anchor to "iPad is 768px." Set breakpoints where content naturally breaks down or gets cramped. Shrink the screen until you feel "this should wrap" or "this column should drop" — that's your breakpoint.

### Common breakpoints

These are widely used as a baseline (e.g., Tailwind CSS):

| Name | Width | Typical device |
|------|-------|----------------|
| sm | 640px | Landscape phone, small tablet |
| md | 768px | Tablet |
| lg | 1024px | Laptop, small desktop |
| xl | 1280px | Desktop |
| 2xl | 1536px | Large desktop |

You don't need to use all of them. For simple layouts, two or three is often enough.

---

## Collapsing Strategy

How each element should change as the screen shrinks:

### Layout

- **Multi-column → single column**: Below 768px, collapse all multi-column layouts into one column as a default.
- **Grids**: Step down from 3-column → 2-column → 1-column.
- **Sidebars**: Show alongside content on desktop; hide or move into a drawer on mobile.

### Navigation

- Horizontal desktop nav → collapse on mobile to a hamburger, slide-in, or full-screen overlay.
- A bottom-fixed tab bar is also a strong option on mobile.

### Typography

- Scale headings fluidly (use `clamp()` to scale smoothly between min and max). For baseline size scales, see [typography.md](typography.md).
- Keep body text at a minimum of `1rem` (14–16px). Anything smaller is hard to read on mobile.

### Images and media

- Images scale proportionally to their container.
- Preserve aspect ratio — don't squash or stretch.
- Swap heavy images for appropriately sized ones on mobile, or lazy-load them.

### Spacing

- Section padding scales down proportionally from desktop to mobile. For the spacing system and base unit, see [layout.md](layout.md).
- Same for inner padding. Around `1rem` is a reasonable mobile target.

---

## Touch Targets

Mobile means tapping. Make sure fingers can hit accurately:

- **Minimum 44x44px** tap area for every interactive element. For button size variations, see [components.md](components.md).
- Space buttons and links generously when they cluster.
- Full-width buttons on mobile work well — easier to hit, more visible.

---

## Preventing Horizontal Overflow

Horizontal scroll on mobile is a critical bug. Always check:

- Every element fits within the viewport width.
- Use relative widths (%, vw, auto), not fixed pixel widths.
- Wrap inherently-wide elements like tables in a horizontally scrollable container.
- Use `max-width: 100%` on images so they don't overflow their parent.

---

## Fluid Design

Aim for designs that flow with screen size, not jump abruptly at breakpoints:

- **Fluid typography**: `clamp()` between min and max sizes for continuous scaling.
- **Fluid spacing**: Scale margins and padding with the viewport too.
- **Content-based sizing**: Use `min()`, `max()`, `fit-content` to size by content rather than fixed values.

Fluid values reduce the number of breakpoints you need and look natural at every size in between.

---

## Container Queries

Style based on the size of a component's parent rather than the viewport. Essential for reusable components:

- The same card component takes one layout in a sidebar (narrow) and another in the main area (wide).
- Viewport-based media queries struggle here; container queries solve it cleanly.
- Components start to "behave correctly wherever they're placed."

---

## Viewport Height

`100vh` causes problems on mobile browsers (the address bar appears and disappears, changing the height):

- Use **`100dvh`** (Dynamic Viewport Height) — accounts for mobile-browser UI.
- For full-screen sections, use `min-height: 100dvh` and avoid `height: 100vh`.

---

## Testing

Resizing the browser window isn't enough. Check at these viewports:

- `375px` — iPhone SE (smallest current device)
- `390px` — iPhone 14
- `768px` — iPad
- `1024px` — small laptop
- `1440px` — desktop

Use simulators, but also test on real hardware when possible. Touch feel, font legibility, and scroll behavior reveal themselves only on a real device.

---

## Common Issues

- **Horizontal overflow**: Content extends past the viewport → check fixed-width values.
- **Fixed widths**: Pixels where relative units belong → swap to % or auto.
- **Viewport height**: 100vh problems → swap to 100dvh.
- **Font size**: Text too small on mobile → keep a 14px floor.
- **Touch targets**: Buttons too small to tap → enforce 44x44px minimum.
- **Image breakage**: Aspect ratio breaks → use `object-fit` and `aspect-ratio`.
