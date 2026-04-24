import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const url = process.argv[2] || 'http://localhost:3000'

const dir = path.join(__dirname, 'temporary screenshots')
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

const existing = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-')).length
const outPath = path.join(dir, `screenshot-${existing + 1}.png`)

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setViewportSize({ width: 1440, height: 900 })
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await page.screenshot({ path: outPath, fullPage: false })
await browser.close()
console.log('Saved:', outPath)
