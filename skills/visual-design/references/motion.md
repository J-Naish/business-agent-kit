# Motion and Animation Guide

Principles for animation in dynamic design. Animation is not decoration — it's an expressive tool with purpose. Every motion needs an answer to "why is this moving?"

---

## The Two Purposes of Animation

Every animation comes down to one of two roles. Each one should serve at least one of them; if it serves neither, leave it out. "It feels nice to have some movement" is not a reason.

### 1. Feedback — communicate state changes

Use animation to make state changes visible, so the user can grasp intuitively what just happened:

- **Visualizing state changes**: Button presses, form submissions, data loading, success/error states. Immediate response reassures the user.
- **Expressing spatial relationships**: Show where elements come from and where they go. A modal that slides in from the bottom intuitively reads as "it was hiding below the screen."
- **Smooth transitions**: Show/hide, page changes, tab switches — soften abrupt state changes into a natural flow.

Without feedback, users lose track of "what just happened" and "what caused the current state." Press a button with no response, and you start wondering "did that work?" Save data without a visible change, and you doubt whether it actually saved. Feedback animations dissolve that doubt.

Feedback animations must be **short, light, and never block interaction**. An animation that makes the user wait works against you. For the design of component interaction states (hover, active, focus, etc.), see [components.md](components.md).

### 2. Attention — guide the eye, spark interest

Pull focus to a specific element, steering the user's gaze and curiosity:

- **Visual impact**: Dynamic hero entrances, scroll-linked effects, parallax. The pull of a strong first impression.
- **Rich expression**: Complex animation effects, video, 3D, SVG animation, particle effects. Embodying a brand's world through motion.
- **Crafted detail**: Subtle icon animations, considered loading indicators, creative hover effects. Quality lives in the small things.

Attention animations are **more elaborate, more complex, more expressive** than feedback. But overuse turns into noise — concentrate them on high-impact moments.

---

## An Animation Strategy

Don't scatter animation around. Layer it with intent:

### Hero moment

A single signature animation. Concentrate it where impact matters most — page load, hero section, key interaction. One well-crafted hero animation outweighs ten scattered micro-interactions.

### Feedback layer

Responses to user action. Button hover/click, form validation, state-change visualization. Not every interaction needs one — focus on the places where silence would feel broken.

### Transition layer

Smoothing the move between states. Show/hide, page changes, modal open/close, accordion expand. Turn abrupt switches into natural flow.

### Delight layer

Motion that isn't functionally necessary but enriches the experience. Completion celebrations, floating illustrations on empty states, easter eggs that reward discovery. Use sparingly — overdone, it goes from charming to tired.

---

## Timing and Easing

### Duration guidelines

The right length depends on purpose:

- **100–150ms**: Instant feedback (button press, toggle, hover color change)
- **200–300ms**: State change (menu open/close, tab switch, tooltip)
- **300–500ms**: Layout change (accordion, modal, drawer)
- **500–800ms**: Entrance animation (page load, hero element appear)

**Exits should be faster than entrances** — about 75% of the entrance duration. Users don't care about things that are leaving, so move them out quickly.

### Easing

Avoid the CSS defaults `ease` and `linear`. Reach for easings with natural deceleration. In the physical world, things don't stop instantly — they slow down:

- **ease-out family**: Right for most animations. Starts with momentum, settles naturally.
- **ease-in-out**: Right for elements moving across the screen. Accelerates and decelerates.
- **linear**: Avoid. Feels mechanical and unnatural. Limited to a few cases like progress bars.

Skip bounce and elastic easings. They feel dated and pull attention to the animation itself.

---

## Specific Animation Patterns

### Entrance animations

- **Page load**: Stagger elements (100–150ms delays). Combine fade with slide.
- **Scroll trigger**: Fade in when entering the viewport. Use Intersection Observer.
- **Modal / drawer**: Slide + fade + background overlay.

### Micro-interactions

- **Buttons**: Subtle scale on hover (1.02–1.05) or color shift. Quick scale-down on click (0.95 → 1). For button variations and sizing, see [components.md](components.md).
- **Forms**: Border-color transition on focus. Shake on error, checkmark on success. For form validation design, see [components.md](components.md).
- **Toggles / checkboxes**: Smooth slide and color transition.

### State transitions

- **Show / hide**: Fade + slide. Avoid instant switches.
- **Expand / collapse**: Height transition + icon rotation.
- **Loading**: Skeleton-screen shimmer, progress bars.

### Navigation

- **Page transitions**: Crossfade or shared-element transitions.
- **Tab switches**: Active indicator slide + content fade.
- **Scroll effects**: Parallax, sticky-header state changes.

---

## Performance

A janky animation works against you. Design for 60fps:

- **Animate only `transform` and `opacity`**: These two get GPU acceleration. Animating `width`, `height`, `top`, `left` triggers layout recalculation — avoid.
- **Use `will-change` sparingly**: Only where you truly need it. Overuse wastes memory.
- **Isolate heavy animations**: Keep CPU-heavy persistent animations in small components so they don't trigger parent re-renders.

---

## Accessibility

Every animation must respect `prefers-reduced-motion`. For motion-sensitive users, excessive animation can trigger headaches or nausea.

- When reduced motion is set, disable or substantially simplify animations.
- Make sure essential information is conveyed even without animation.
- Be especially careful with auto-playing animations (loops, scroll-linked effects).

---

## What Not to Do

- **Animate without purpose** — every animation needs a "feedback" or "attention" reason.
- **Animate everything** — animation fatigue exhausts the interface. Concentrate it on key moments.
- **Block interaction during animation** — feedback animations must never get in the way.
- **Spend more than 500ms on feedback** — it feels sluggish. Feedback should be short.
- **Use bounce / elastic easings** — dated, and they make the animation itself the focus.
- **Ignore `prefers-reduced-motion`** — accessibility violation.
- **Animate layout properties** — use `transform` and `opacity` instead.

---

## What to Verify

- **Smooth at 60fps?** No jank on your target devices.
- **Feels natural?** Easing reads as organic, not mechanical.
- **Timing is right?** Not too fast (abrupt), not too slow (sluggish).
- **Reduced motion works?** Animations disable correctly under `prefers-reduced-motion`.
- **Doesn't block interaction?** Users can still operate the UI while animation plays.
- **Adds value?** Would removing this animation make the experience worse? If not, cut it.
