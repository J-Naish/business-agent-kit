import { execSync } from 'child_process'

const args = process.argv.slice(2)
const composition = args.find((a) => !a.startsWith('--'))

if (composition) {
  console.log(`Rendering video: ${composition}`)
  execSync(`remotion render src/entry.ts ${composition}`, { stdio: 'inherit' })
} else {
  console.log('Rendering all videos...')
  execSync('remotion render src/entry.ts --all', { stdio: 'inherit' })
}
