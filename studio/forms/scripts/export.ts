import { chromium } from 'playwright'
import { execSync, spawn } from 'child_process'
import { mkdirSync } from 'fs'
import path from 'path'

const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`

const args = process.argv.slice(2)
const outputFlag = args.find((a) => a.startsWith('--output='))
const group = args.find((a) => !a.startsWith('--'))

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
  const page = await browser.newPage()

  const query = group ? `?export&group=${group}` : '?export'
  await page.goto(`${BASE_URL}/${query}`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(500)

  const filename = group ? `${group}.pdf` : 'document.pdf'
  const pdfPath = path.join(outDir, filename)

  await page.pdf({
    path: pdfPath,
    width: '794px',
    height: '1123px',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  })

  console.log(`\nDone! PDF exported: ${pdfPath}`)

  await browser.close()
  server.kill()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
