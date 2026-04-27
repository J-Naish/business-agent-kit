import { chromium } from 'playwright'
import { execSync, spawn } from 'child_process'
import { mkdirSync } from 'fs'
import path from 'path'
import sharp from 'sharp'

const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`

const args = process.argv.slice(2)
const outputFlag = args.find((a) => a.startsWith('--output='))
const group = args.find((a) => !a.startsWith('--'))

const format = (args.includes('--jpeg') ? 'jpeg' : 'png') as 'png' | 'jpeg'
const scaleFlag = args.find((a) => a.startsWith('--scale='))
const scale = scaleFlag ? Number(scaleFlag.split('=')[1]) : 3

async function main() {
  const cwd = process.cwd()
  const outDir = outputFlag ? path.resolve(outputFlag.split('=')[1]) : path.resolve(cwd, 'out')
  mkdirSync(outDir, { recursive: true })

  console.log('Building...')
  execSync('pnpm exec vite build', { stdio: 'inherit', cwd })

  const server = spawn('pnpm', ['exec', 'vite', 'preview', '--port', String(PORT)], { stdio: 'pipe', cwd })

  await new Promise<void>((resolve) => {
    server.stdout?.on('data', (data: Buffer) => {
      if (data.toString().includes('Local')) resolve()
    })
    setTimeout(resolve, 3000)
  })

  const browser = await chromium.launch()
  const page = await browser.newPage({ deviceScaleFactor: scale })

  const galleryQuery = group ? `/?group=${group}` : '/'
  await page.goto(`${BASE_URL}${galleryQuery}`)
  await page.waitForLoadState('networkidle')

  const count = await page.evaluate(() => {
    const el = document.querySelector('[data-image-count]')
    return el ? Number(el.getAttribute('data-image-count')) : 0
  })

  if (count === 0) {
    console.log(group ? `No creatives found in "${group}".` : 'No creatives to export.')
    await browser.close()
    server.kill()
    return
  }

  const label = group ?? 'all'
  console.log(`Exporting ${count} creative(s) from "${label}" as ${format.toUpperCase()} @${scale}x...`)

  for (let i = 0; i < count; i++) {
    const exportQuery = group ? `/?export=${i}&group=${group}` : `/?export=${i}`
    await page.goto(`${BASE_URL}${exportQuery}`)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(300)

    const root = page.locator('[data-export]')
    const box = await root.boundingBox()

    if (box) {
      await page.setViewportSize({ width: Math.ceil(box.width), height: Math.ceil(box.height) })
      await page.waitForTimeout(100)
    }

    const ext = format === 'jpeg' ? 'jpg' : 'png'
    const outPath = path.join(outDir, `creative-${String(i + 1).padStart(2, '0')}.${ext}`)

    const rawBuffer = await root.screenshot({ type: 'png' })

    const targetW = Math.ceil(box!.width)
    const targetH = Math.ceil(box!.height)
    const rawW = targetW * scale

    if (rawW === targetW) {
      let pipeline = sharp(rawBuffer)
      if (format === 'jpeg') {
        pipeline = pipeline.jpeg({ quality: 95 })
      }
      await pipeline.toFile(outPath)
    } else {
      let pipeline = sharp(rawBuffer)
        .resize(targetW, targetH, { kernel: sharp.kernel.lanczos3 })
        .sharpen({ sigma: 0.8, m1: 0.6, m2: 0.4 })

      if (format === 'jpeg') {
        pipeline = pipeline.jpeg({ quality: 95 })
      } else {
        pipeline = pipeline.png()
      }

      await pipeline.toFile(outPath)
    }

    console.log(`  ${outPath}  (${targetW}×${targetH})`)
  }

  console.log(`\nDone! ${count} creative(s) exported to ${outDir}`)

  await browser.close()
  server.kill()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
