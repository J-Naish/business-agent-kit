# Videos

Create videos with Remotion and render them to MP4.

## Usage

```bash
# Preview in Remotion Studio
pnpm run videos:dev

# Render all compositions
pnpm run videos:export

# Render one composition
pnpm run videos:export my-video
```

## Adding Compositions

1. Create a video component in `src/`.
2. Register it in `src/compositions.ts`.

```tsx
// src/MyVideo.tsx
import { AbsoluteFill, useCurrentFrame } from 'remotion'

export function MyVideo() {
  const frame = useCurrentFrame()
  return (
    <AbsoluteFill className="bg-blue-600 flex items-center justify-center">
      <h1 className="text-6xl font-bold text-white" style={{ opacity: frame / 30 }}>
        Hello
      </h1>
    </AbsoluteFill>
  )
}
```

```typescript
// src/compositions.ts
import type { CompositionEntry } from './types'
import { MyVideo } from './MyVideo'
import { HD } from './presets'

export const compositions: CompositionEntry[] = [
  { id: 'my-video', component: MyVideo, durationInFrames: 150, ...HD },
]
```

## Presets

| Constant | Size | fps | Use |
|---|---|---|---|
| `HD` | 1920×1080 | 30 | Full HD 16:9 |
| `HD_60` | 1920×1080 | 60 | Full HD 60fps |
| `HD_VERTICAL` | 1080×1920 | 30 | Vertical 9:16 |
| `HD_720` | 1280×720 | 30 | HD 720p |
| `SQUARE` | 1080×1080 | 30 | Square 1:1 |
| `UHD_4K` | 3840×2160 | 30 | 4K UHD |
| `YT_STANDARD` | 1920×1080 | 30 | YouTube |
| `YT_SHORTS` | 1080×1920 | 30 | YouTube Shorts |
| `IG_REELS` | 1080×1920 | 30 | Instagram Reels |
| `IG_FEED_SQUARE` | 1080×1080 | 30 | Instagram feed square |
| `IG_FEED_PORTRAIT` | 1080×1350 | 30 | Instagram feed portrait |
| `IG_FEED_LANDSCAPE` | 1080×566 | 30 | Instagram feed landscape |
| `IG_STORY` | 1080×1920 | 30 | Instagram story |
| `TIKTOK` | 1080×1920 | 30 | TikTok |
| `X_LANDSCAPE` | 1920×1080 | 30 | X landscape |
| `X_PORTRAIT` | 1080×1920 | 30 | X portrait |
| `X_SQUARE` | 1080×1080 | 30 | X square |
| `FB_FEED` | 1080×1080 | 30 | Facebook feed |
| `FB_REELS` | 1080×1920 | 30 | Facebook Reels |
| `FB_IN_STREAM` | 1920×1080 | 30 | Facebook in-stream |
| `GOOGLE_LANDSCAPE` | 1920×1080 | 30 | Google Ads landscape |
| `GOOGLE_PORTRAIT` | 1080×1920 | 30 | Google Ads portrait |
| `GOOGLE_SQUARE` | 1080×1080 | 30 | Google Ads square |
| `GOOGLE_BUMPER` | 1920×1080 | 30 | Google bumper ad (6s) |
