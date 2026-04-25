# UX and UI Principles

In dynamic design — websites, applications, dashboards — what matters isn't only how things look, but **how the user experiences them**. The principles below are for designing interfaces where users don't get lost, don't feel friction, and reach their goals.

---

## Information Priority and Progressive Disclosure

Don't show everything at once. Surface only what the user needs right now; reveal detail when asked for it.

- **Show first**: The information and actions the user reaches for most often. This is the star of the screen.
- **Reveal on demand**: Detail settings, additional options, supplementary info. Use accordions, drawers, "see more" to disclose progressively.
- **Keep hidden**: Advanced settings, rarely-used features. Tuck into settings screens or submenus.

Resist the urge to cram. As more information lands on screen, the cognitive weight of each individual item drops.

---

## Reduce Cognitive Load

Don't make the user's brain do extra work. The more thinking required, the more drop-off and the more mistakes.

- **Reduce choices**: Three buttons beat ten. Too many options paralyze (paradox of choice).
- **Don't rely on memory**: Avoid designs that ask the user to remember step 1's input by step 3. Show needed information in place.
- **Follow conventions**: Logo top-left, menu at the top, CTA in a bold color — don't break the patterns users learned elsewhere. Inventing your own controls forces a learning cost.
- **Provide defaults**: A form with sensible defaults is dramatically easier than an empty form.

---

## Designing States

Interfaces have many states beyond "normal." Without designing them, users hit unexpected screens and get confused.

- **Empty state**: What to show when there's no data yet. "No data" alone is unhelpful. Tell the user what to do next.
- **Loading**: What appears during a wait. Skeleton screens, progress bars, spinners. Showing nothing makes the app look frozen.
- **Error**: Communicate exactly what went wrong and how to fix it. Not "an error occurred" but "the email format is invalid." Make recovery explicit.
- **Success / completion**: Feedback that the action succeeded. Save, submit, delete — without acknowledgment, the user is left wondering.
- **Partial states**: Zero search results, end-of-list, lost connection. Has every "what if" been designed for?

For visual treatment of component states (hover, focus, disabled, loading, etc.), see [components.md](components.md).

---

## Feedback and Responsiveness

Every user action gets a response. Action without reaction makes the user wonder "is it broken?" or "did that register?"

- **Immediate feedback**: Hover and click reactions within 100ms. The minimum speed for "the action was received."
- **Show progress**: For long operations, expose progress. Time spent in the dark feels longer than it is.
- **Confirm the result**: After completion, show what changed. A toast on save, a removal animation on delete.

Feedback isn't only visual. **Haptics** and **sound** are also feedback channels. A subtle haptic on confirmation (sent, deleted) tells the user "received" without needing to look. Sound on payment completion or warnings pulls attention more strongly than visuals alone. Overuse becomes annoying — reserve them for moments that genuinely matter.

For visual implementation of feedback, see [motion.md](motion.md) (timing, easing) and [components.md](components.md) (interaction states).

---

## Affordance — Make Interactivity Visible

Buttons must look like buttons, links must look like links, inputs must look like you can type into them. If something interactive doesn't look interactive, users won't find it.

- **Clickable looks clickable**: Buttons get a fill or border; links get an underline or color shift. Designs that are too flat make it impossible to tell what's clickable.
- **Cursor changes**: Use `cursor: pointer` on interactive elements. If the cursor doesn't change, it reads as "not clickable."
- **Visual difference between states**: Selected vs. unselected, on vs. off, expanded vs. collapsed — current state must be instantly readable.

For component patterns that support affordance, see [components.md](components.md).

---

## Flow and Navigation

Keep the steps to a goal short and clear. Never let the user reach a moment of "what should I do next?"

### Task-completion flow

- **Minimize steps**: Sign-up, checkout, settings — interrogate every step. Cut what you can.
- **Show where you are**: In multi-step flows, show current position and remaining steps (steppers, progress bars).
- **Allow undo**: Make it easy to recover from mistakes. "Back" buttons, undo, confirmation dialogs. Warn before irreversible actions like deletion.
- **Provide an exit**: Let users abandon a modal or flow at any time when they change their mind.

### Navigation structure

Beyond individual flows, design how users move through the entire app or site. Bad navigation makes great individual screens irrelevant — users still get lost.

- **Separate primary and secondary**: Keep main navigation (tab bar, top nav) clearly distinct from auxiliary navigation (settings, drawer). Mixing levels destroys priority.
- **Limit items**: Cap bottom nav or tab bars at five. More than that triggers the paradox of choice. Bundle the rest under "More."
- **Keep navigation in the same place across pages**: If position or content shifts page-to-page, users lose orientation. Consistency is what makes navigation trustworthy.
- **Adapt the format to screen size**: Bottom nav or hamburger on mobile; sidebar or top nav on desktop. The same app can switch nav format by viewport.

### Back behavior and state preservation

- "Back" should restore the previous state — scroll position, filters, in-progress text. Resetting everything on back wipes out the user's work.
- Don't clear the navigation stack unprompted. Sending a user to home unexpectedly is disorienting.
- Make key screens reachable by deep link (needed for sharing and notification entry).

### Modals vs. navigation

A modal interrupts a flow; it doesn't replace navigation. Routing the main flow (product list → detail → cart) through modals breaks the user's spatial model. Reserve modals for "temporary detours" — confirmation dialogs, quick input, settings tweaks.

---

## Minimize Interaction Cost

Every action a user takes carries some friction (interaction cost). For the same goal, **the design with lower friction wins**.

Low-friction actions also derive value from staying low-friction — without strong reason, don't change their behavior. Vertical scroll is the most natural action a user performs, almost unconsciously. Scroll-jacking (snapping or animating around scroll's normal behavior) takes a low-friction action and turns it into an unpredictable, high-friction one. Hover is similar: if hover triggers a large popup or page change, the casual feel of hover is gone. **Don't deviate from user expectations on low-friction actions.**

Friction is mostly determined by three factors:
- **Effort**: Physical and cognitive labor required.
- **Unpredictability**: How much the user can anticipate the result.
- **Weight of the result**: How hard the action is to undo, or how big its consequences.

Roughly ordered from low to high friction:

**Friction 1 (passive — almost unconscious)**
- **Looking / reading**: Passive. No decision, no operation.
- **Vertical scroll**: The most habitual active action. Continuous flick of finger or wheel. Result is fully predictable (you see what's below). No failure modes; reversible at any time.
- **Hover**: Just moving the mouse. No commitment; remove the cursor and you're back.

**Friction 2 (light actions with predictable results)**
- **Horizontal scroll**: Less habitual than vertical, but result is predictable (more content sideways). In carousels and galleries, friction stays low — though hidden content may go unnoticed.
- **Simple click / tap (like, checkbox)**: One tap, clear result, often reversible.

**Friction 3 (results carry uncertainty)**
- **In-page switching (tabs, accordions, toggles)**: Click required, content not fully predictable. No page change, but "what's inside" is uncertain.
- **In-page button click**: Carries a decision. "Should I press this?" "What happens if I do?" enters the picture.
- **Dropdown / select**: Choices are hidden; you open and pick. With many options, search load adds up.

**Friction 4 (actions with effort)**
- **Text input**: Switching to keyboard, recalling the right value, risk of typos. Even one field is annoying; multiple fields drive drop-off.
- **Click that triggers a page transition**: Load time, lost context, risk of failed render. If the destination doesn't match expectations, friction compounds.
- **Form submission**: Text input load multiplied by field count. A validation error that demands rework correlates strongly with abandonment.

**Friction 5 (high psychological hurdle)**
- **Account creation / login**: Sharing personal info, setting or recalling passwords. The "is it worth it?" hurdle.
- **Payment / purchase**: Money moves. Hard to reverse.
- **Irreversible actions (delete, send, publish)**: Need confirmation; large blast radius if wrong.

Design implications:

- **If scrolling is enough, don't make them click**: Lay information out vertically on one page rather than splitting with "next" buttons. One scrollable page often beats paginated steps.
- **Reduce page transitions**: Could it be a tab, modal, or inline expansion? When a transition is necessary, make load times as short as possible.
- **Reduce input**: If you can offer a selection, don't ask for typing. Use autocomplete, defaults, and remembered values.
- **Stage commitment**: Don't ask for an account up front. Let users experience the product first; ask once they see the value.
- **Cushion heavy actions with reassurance**: "Cancel anytime" on payment, "30-day undo" on delete. Add information that lightens the weight of commitment.

---

## Accessibility Principles

Accessibility isn't a courtesy to a few users — it's a design principle that lifts the experience for everyone. Contrast ratios ([color.md](color.md)), focus rings ([components.md](components.md)), and reduced motion ([motion.md](motion.md)) are covered in their own references; the cross-cutting principles live here.

- **Don't communicate by color alone**: Errors get red + icon + text. Success gets green + checkmark. Color-blind users can't distinguish state by color alone.
- **Respect heading hierarchy**: h1 → h2 → h3 in order; don't skip levels. Screen readers use the heading tree to map structure. Visual sizing belongs to CSS.
- **Match keyboard tab order to visual order**: Top-left to bottom-right, following the eye. Mismatch between DOM order and visual order disorients keyboard users.
- **Label icon-only buttons**: An icon may be visually clear, but a screen reader only sees "button." Use `aria-label` or alternative text to say what the button does.
- **Survive text resizing**: When users enlarge text via OS settings, the layout must not shatter. Handle it with wrapping or scrolling, not clipping or overlap.

---

## What Not to Do

- **Show all information at once** — cognitive load spikes. Disclose progressively.
- **Skip feedback** — "I don't know what happened" is the worst user state.
- **Invent non-standard UI patterns** — follow what users learned elsewhere. Custom controls are a learning tax.
- **Skip empty / error state design** — "No data" / "An error occurred" is incomplete. Guide the next action.
- **Run irreversible actions without confirmation** — warn before delete, send, publish.
- **Refuse to cut steps** — every unnecessary step is a drop-off point.
- **Open a modal inside a modal** — doubling up on flow interruption is the worst UX.
- **Run main flows through modals** — modals are for temporary detours. Using them for product list → detail → cart breaks spatial understanding.
- **Reshuffle navigation per page** — keep nav consistent across pages. Otherwise users lose orientation.
- **Wipe state on back** — restore scroll position, filters, in-progress input.
- **Communicate by color alone** — color-blind users can't distinguish. Pair with icons or text.
- **Skip heading levels** — h1 → h3 jumps break structure for screen readers.

---

## What to Verify

- **No first-time confusion?** A user who's never seen this screen knows what to do within three seconds.
- **State coverage?** Empty, loading, error, success, partial — all designed.
- **Feedback within 100ms?** Every interaction has a visual response within 100ms.
- **Clear flow?** Steps to the goal are minimal and "what to do next" is always obvious.
- **Reasonable interaction cost?** Could the same goal be reached with a lower-friction action?
- **Conventions respected?** Are you breaking patterns users learned elsewhere?
- **Easy to undo?** Can the user reverse a mistake easily?
- **Consistent navigation?** Same position and structure across pages. "Back" restores prior state.
- **Accessibility?** Not relying on color alone; correct heading order; keyboard order matches visuals.
