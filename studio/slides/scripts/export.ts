import { chromium } from 'playwright'
import { PDFDocument } from 'pdf-lib'
import { execSync, spawn } from 'child_process'
import { mkdirSync, readFileSync, writeFileSync, unlinkSync } from 'fs'
import path from 'path'
import sharp from 'sharp'

const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`
const SLIDE_W = 1280
const SLIDE_H = 720

const args = process.argv.slice(2)
const useScreenshot = args.includes('--screenshot')
const outputFlag = args.find((a) => a.startsWith('--output='))
const deck = args.find((a) => !a.startsWith('--'))

async function main() {
  if (!deck) {
    console.error('Usage: export <deck-name> [--screenshot] [--output=<dir>]')
    console.error('  default:      page.pdf() (text selectable)')
    console.error('  --screenshot: PNG screenshots → PDF (pixel-perfect)')
    console.error('  --output:     output directory (default: out/slides/<deck-name>)')
    process.exit(1)
  }

  const cwd = process.cwd()
  const outDir = outputFlag ? path.resolve(outputFlag.split('=')[1]) : path.resolve(cwd, 'out/slides', deck)
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
  const page = await browser.newPage({
    viewport: { width: SLIDE_W, height: SLIDE_H },
    deviceScaleFactor: useScreenshot ? (Number(process.env.SCALE) || 3) : 1,
  })

  await page.goto(`${BASE_URL}/${deck}/export`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(500)

  const slideElements = await page.$$('[data-slide]')
  const totalSlides = slideElements.length

  if (totalSlides === 0) {
    console.error(`No slides found for deck "${deck}"`)
    await browser.close()
    server.kill()
    process.exit(1)
  }

  const mode = useScreenshot ? 'screenshot' : 'pdf'
  console.log(`Exporting ${totalSlides} slides from "${deck}" (${mode})...`)

  if (useScreenshot) {
    await exportScreenshot(page, slideElements, outDir, totalSlides)
  } else {
    await exportPdf(page, outDir)
  }

  await browser.close()
  server.kill()
}

async function exportPdf(page: Awaited<ReturnType<Awaited<ReturnType<typeof chromium.launch>>['newPage']>>, outDir: string) {
  const pdfPath = path.join(outDir, `${deck}.pdf`)

  await page.pdf({
    path: pdfPath,
    width: `${SLIDE_W}px`,
    height: `${SLIDE_H}px`,
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  })

  console.log(`\nDone! PDF exported: ${pdfPath}`)
}

async function exportScreenshot(
  page: Awaited<ReturnType<Awaited<ReturnType<typeof chromium.launch>>['newPage']>>,
  slideElements: Awaited<ReturnType<typeof page.$$>>,
  outDir: string,
  totalSlides: number,
) {
  const pngPaths: string[] = []
  const scale = Number(process.env.SCALE) || 3

  for (let i = 0; i < totalSlides; i++) {
    const el = slideElements[i]
    const filename = `${String(i + 1).padStart(2, '0')}.png`
    const filePath = path.join(outDir, filename)

    if (scale > 1) {
      const rawBuffer = await el.screenshot({ type: 'png' })
      await sharp(rawBuffer)
        .resize(SLIDE_W, SLIDE_H, { kernel: sharp.kernel.lanczos3 })
        .sharpen({ sigma: 0.8, m1: 0.6, m2: 0.4 })
        .png()
        .toFile(filePath)
    } else {
      await el.screenshot({ path: filePath })
    }

    pngPaths.push(filePath)
    console.log(`  ${filename}`)
  }

  console.log('Building PDF...')
  const pdf = await PDFDocument.create()

  for (const pngPath of pngPaths) {
    const pngBytes = readFileSync(pngPath)
    const pngImage = await pdf.embedPng(pngBytes)
    const pdfPage = pdf.addPage([SLIDE_W, SLIDE_H])
    pdfPage.drawImage(pngImage, { x: 0, y: 0, width: SLIDE_W, height: SLIDE_H })
  }

  const pdfPath = path.join(outDir, `${deck}.pdf`)
  writeFileSync(pdfPath, await pdf.save())

  for (const pngPath of pngPaths) {
    unlinkSync(pngPath)
  }

  console.log(`\nDone! ${totalSlides} slides exported:`)
  console.log(`  PDF: ${pdfPath}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
