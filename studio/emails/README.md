# Emails

Email templates built with react-email + Tailwind. Export them to HTML for delivery through Gmail API or other email providers.

## Usage

```bash
# Preview (http://localhost:3000)
pnpm run emails:dev

# Export all templates
pnpm run emails:export

# Export one template
pnpm run emails:export example
```

## Adding Templates

Add TSX files to `src/`. Put shared parts in `src/components/`.

```tsx
// src/welcome.tsx
import { Html, Head, Body, Container, Text, Tailwind } from "@react-email/components"

export default function Welcome({ name = "Alex" }) {
  return (
    <Html lang="en">
      <Head />
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto max-w-[600px] p-8">
            <Text>Thanks for signing up, {name}.</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
```

## Notes

- Files in `src/components/` are treated as shared parts and do not appear in the preview sidebar.
- Use the preview **Compatibility** tab to check email client support.
- For broadly distributed emails, prefer PNG / JPG images. SVG and WebP support varies across clients.
- Classic Outlook for Windows has limitations around `border-radius`, `flex`, `gap`, `background-image`, and similar CSS.

## Rendering HTML Programmatically

```typescript
import { render } from "@react-email/render"
import Welcome from "./src/welcome"

const html = await render(<Welcome name="Taylor" />)
```
