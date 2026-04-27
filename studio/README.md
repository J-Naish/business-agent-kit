# Studio

Studio is a web-based production workspace for creating visual and communication assets with React + Tailwind, then exporting them to production formats. It is designed so AI agents can create slides, forms, creatives, emails, and videos through a consistent project structure.

## Setup

```bash
cd studio
pnpm install
```

## Content Types

| Directory | Purpose | Output | Details |
|---|---|---|---|
| [slides/](slides/) | Presentation decks | PDF | [README](slides/README.md) |
| [forms/](forms/) | Business documents such as invoices, quotations, and agreements | PDF | [README](forms/README.md) |
| [creatives/](creatives/) | Image creatives for social, ads, and OGP | PNG / JPEG | [README](creatives/README.md) |
| [emails/](emails/) | Email templates | HTML | [README](emails/README.md) |
| [videos/](videos/) | Motion assets and videos | MP4 | [README](videos/README.md) |

## Preview

```bash
pnpm run slides:dev
pnpm run forms:dev
pnpm run creatives:dev
pnpm run emails:dev
pnpm run videos:dev
```

## Export

```bash
pnpm run slides:export <deck-name>
pnpm run forms:export [document-name]
pnpm run creatives:export [group-name]
pnpm run emails:export [template-name]
pnpm run videos:export [composition-name]
```

When an optional argument is omitted, all items are exported. Slides require a deck name. Outputs are written to each directory's `out/` folder.

## Shared Resources

- **styles.css** — Tailwind, 20 bundled font families, and design tokens defined with `@theme`.
- **[assets/](assets/)** — Logos, maps, device mockups, noise/grain images, placeholders, and background textures. See [README](assets/README.md).
