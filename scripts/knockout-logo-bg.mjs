/**
 * One-off: make near-black pixels transparent for header/footer on any background.
 * Run: node scripts/knockout-logo-bg.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const logoPath = path.join(__dirname, '..', 'public', 'logo-vedisaremates.png')
const tmpPath = logoPath + '.tmp.png'

// Pixels at or below this (RGB) become fully transparent — keeps cyan/yellow/light blue.
const THRESH = 48

const buf = await sharp(logoPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { data, info } = buf
const { width, height } = info

for (let i = 0; i < data.length; i += 4) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  if (r <= THRESH && g <= THRESH && b <= THRESH) {
    data[i + 3] = 0
  }
}

await sharp(data, { raw: { width, height, channels: 4 } }).png().toFile(tmpPath)
fs.renameSync(tmpPath, logoPath)
console.log('Updated', logoPath)
