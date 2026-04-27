# Slides

Create 16:9 presentation slides at 1280×720px with React + Tailwind, then export them to PDF.

## Usage

```bash
# Preview. Switch decks with tabs; move between slides with the arrow keys.
pnpm run slides:dev

# PDF export with selectable text
pnpm run slides:export <deck-name>

# Screenshot PDF for pixel-perfect output. Default scale is 3x.
pnpm run slides:export <deck-name> --screenshot

# Scale override
SCALE=4 pnpm run slides:export <deck-name> --screenshot
```

## Adding Slides

Add TSX files to `src/<deck-name>/`. Slides are ordered alphabetically by file name.

```
src/
  my-deck/
    01-cover.tsx
    02-agenda.tsx
    03-content.tsx
```

```tsx
// src/my-deck/01-cover.tsx
import { Slide } from '../Slide'

export default function Cover() {
  return (
    <Slide className="flex items-center justify-center bg-slate-900">
      <h1 className="text-5xl font-bold text-white font-geist">Title</h1>
    </Slide>
  )
}
```

### Slide Component

| prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Slide content |
| `className` | `string` | `''` | Tailwind classes for background, layout, and styling |

## Using Logos

```tsx
import logo from '@studio/assets/logos/react.svg'

<img src={logo} alt="" className="w-12 h-12" />
```
