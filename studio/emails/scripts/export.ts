import { execSync } from 'child_process'

const args = process.argv.slice(2)
const template = args.find((a) => !a.startsWith('--'))

// react-email export supports --dir for the source directory and --outDir for output
// If a specific template is given, export only that file
if (template) {
  console.log(`Exporting email: ${template}`)
  execSync(`email export --dir src --outDir out --files ${template}.tsx`, { stdio: 'inherit' })
} else {
  console.log('Exporting all emails...')
  execSync('email export --dir src --outDir out', { stdio: 'inherit' })
}
