# Assets

Shared static assets for Studio.

## Structure

```
assets/
  logos/          Tech brand SVG logos
  maps/           GeoJSON files
  mockups/        Device mockup SVGs (iPhone, MacBook, Chrome)
  grains/         Noise and grain texture images
  placeholders/   Placeholder images (avatar, landscape, product, abstract)
  textures/       Background texture SVG patterns
```

## Usage

Use the `@studio` alias to reference the Studio root. It is configured in `tsconfig.json` and `vite.config.ts`.

### Logos

```tsx
// Single import
import reactLogo from '@studio/assets/logos/react.svg'
<img src={reactLogo} alt="React" className="w-12 h-12" />

// Bulk import with Vite glob
const logos = import.meta.glob('@studio/assets/logos/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>
```

### Mockups

The screen area is transparent, so screenshots can be placed underneath the frame.

```tsx
import iphoneMockup from '@studio/assets/mockups/iphone.svg'

<div className="relative w-[300px] aspect-423/858">
  {/* Place the screenshot underneath */}
  <img
    src={screenshot}
    alt=""
    className="absolute top-[0.6%] left-[1.9%] w-[96.2%] h-[98.8%] rounded-[2.5rem] object-cover"
  />
  {/* Overlay the mockup frame */}
  <img src={iphoneMockup} alt="" className="relative z-10 w-full h-full" />
</div>
```

Approximate screen positions for each mockup. Adjust after checking the rendered output.

| File | Size | Screen inset (top / left / width / height) | Radius |
|----------|--------|------------------------------------------------|------|
| `iphone.svg` | 423×858 | 0.6% / 1.9% / 96.2% / 98.8% | 2.5rem |
| `macbook.svg` | 2011×1171 | 0.9% / 9.9% / 80.2% / 94.6% | 0.5rem |
| `chrome.svg` | 1440×799 | 9.8% / 0% / 100% / 90.2% | 0 |

### Textures

SVG pattern tiles. Repeat them with CSS `background-image`.

```tsx
import dotsTexture from '@studio/assets/textures/polka-dots.svg'

// As a background pattern
<div
  className="w-full h-full opacity-10"
  style={{ backgroundImage: `url(${dotsTexture})`, backgroundSize: '20px 20px' }}
/>

// As an overlay
<div className="relative">
  <div className="bg-blue-900 p-12">Main content</div>
  <div
    className="absolute inset-0 opacity-5 pointer-events-none"
    style={{ backgroundImage: `url(${dotsTexture})`, backgroundSize: '24px 24px' }}
  />
</div>
```

Adjust pattern density with `backgroundSize`. Smaller values make the pattern denser; larger values make it more sparse.

### Noise / Grain

Noise images. Layer them with `mix-blend-mode` and `opacity` to create a film-grain texture.

```tsx
import noise from '@studio/assets/grains/grain-uniform.jpg'

<div className="relative">
  <div>Main content</div>
  <div
    className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-soft-light"
    style={{ backgroundImage: `url(${noise})` }}
  />
</div>
```

| File | Character |
|----------|------|
| `grain-uniform.jpg` | Light gray with fine, even noise; good for tiling |
| `grain-gradient-light.jpg` | White-to-black gradient with coarse grain |
| `grain-gradient-dark.jpg` | Light top, dark bottom, and even grain |
| `grain-chromatic.jpg` | Dark base with RGB color noise and light leaks |
| `grain-soft-wave.jpg` | Gray base with soft tonal waves and fine grain |
| `grain-dark-stone.jpg` | Coarse dark stone/concrete texture |

### Placeholders

Dummy images for layout checks. Replace them with production images before final delivery.

```tsx
import avatar from '@studio/assets/placeholders/avatar.jpg'
<img src={avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
```

| File | Use |
|----------|------|
| `avatar.jpg` | User avatar or profile image |
| `landscape.jpg` | Hero image or background |
| `product.jpg` | Product image |
| `abstract.jpg` | Abstract decorative image |

### Maps

```tsx
// For D3 or similar map rendering
import worldGeo from '@studio/assets/maps/world.geo.json'
```

## Logos

SVG logos for technology brands and services. File names use kebab-case.

### AI / LLM
anthropic, anthropic-text, chat-gpt, claude, deepseek, gemini, grok, openai-text

### Cloud / Infrastructure
aws, cloudflare, docker, firebase, google-cloud, kubernetes, supabase, terraform, vercel

### Development Tools / Editors
cursor, github, n8n, notion, vscode, zapier

### Frameworks / Libraries
astro, expo, expressjs, hono, nextjs, preact, react, react-router, tailwind, threejs, vue

### Programming Languages
c, cpp, csharp, javascript, python, typescript

### Design / Creative
affinity, after-effects, blender, canva, capcut, figma, framer, illustrator, photoshop, premiere-pro

### Social / Platforms
discord, facebook, instagram, meta, slack, threads, tiktok, x, youtube

### Business / Commerce
amazon, clarity, google-ads, google-analytics, google-apps-script, google-tag-manager, mailchimp, microsoft-365, resend, salesforce, sanity, shopify, stripe, wordpress

### Other
android, apple, big-query, google

## Textures

Background texture SVG patterns. Use them as repeating tiles.

4-point-stars, bamboo, bathroom-floor, brick-wall, circuit-board, diagonal-lines, graph-paper, hexagons, hideout, plus, polka-dots, rain, squares, temple, tiny-checkers, zig-zag

## Adding Assets

- Logos: add SVG files to `logos/` and update the Logos list in this README.
- Maps: add GeoJSON files to `maps/`.
- Mockups: add SVG files to `mockups/`. Keep the screen area transparent.
- Textures: add SVG pattern files to `textures/`.
- Placeholders: add image files to `placeholders/`.
