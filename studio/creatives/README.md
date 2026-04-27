# Creatives

Create image creatives such as social posts, ad banners, and OGP images with React + Tailwind, then export them as PNG or JPEG.

## Usage

```bash
# Preview. Click thumbnails to switch assets; use group tabs to filter.
pnpm run creatives:dev

# Export all creatives
pnpm run creatives:export

# Export a group
pnpm run creatives:export example

# JPEG output / scale override
pnpm run creatives:export --jpeg
pnpm run creatives:export --scale=2   # Default is 3x
```

## Adding Creatives

Add TSX files to `src/<group-name>/`. Export `meta` to define the asset size.

```tsx
// src/campaign/banner.tsx
import { OGP } from '../presets'

export const meta = OGP  // { width: 1200, height: 630, label: 'OGP' }

export default function Banner() {
  return (
    <div
      className="flex items-center justify-center bg-blue-600"
      style={{ width: meta.width, height: meta.height }}
    >
      <h1 className="text-5xl font-bold text-white">Banner</h1>
    </div>
  )
}
```

Custom size:

```tsx
export const meta = { width: 800, height: 600, label: 'Custom' }
```

## Presets

| Constant | Size | Use |
|---|---|---|
| `OGP` | 1200×630 | OGP |
| `OGP_SQUARE` | 1200×1200 | OGP square |
| `IG_SQUARE` | 1080×1080 | Instagram feed |
| `IG_PORTRAIT` | 1080×1350 | Instagram portrait |
| `IG_STORY` | 1080×1920 | Instagram story |
| `X_POST` | 1200×675 | X post |
| `X_HEADER` | 1500×500 | X header |
| `YT_THUMBNAIL` | 1280×720 | YouTube thumbnail |
| `YT_BANNER` | 2560×1440 | YouTube banner |
| `GDN_LEADERBOARD` | 728×90 | GDN leaderboard |
| `GDN_RECTANGLE` | 300×250 | GDN rectangle |
| `GDN_LARGE_RECTANGLE` | 336×280 | GDN large rectangle |
| `GDN_SKYSCRAPER` | 160×600 | GDN skyscraper |
| `HD` | 1920×1080 | Full HD |
| `A4_LANDSCAPE` | 1754×1240 | A4 landscape (150dpi) |
