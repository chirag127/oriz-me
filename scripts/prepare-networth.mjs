// Copies src/data/networth.private.json → public/data/networth.json at build time.
// If the private file is absent (CI / public clone), silently skips — the island
// shows a placeholder and no rupee figures reach the public HTML.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = join(__dirname, '../src/data/networth.private.json')
const dest = join(__dirname, '../public/data/networth.json')

if (existsSync(src)) {
  mkdirSync(dirname(dest), { recursive: true })
  copyFileSync(src, dest)
  console.log('[networth] networth.json copied to public/data/')
} else {
  console.log('[networth] src/data/networth.private.json absent — skipping (no numbers in build)')
}
