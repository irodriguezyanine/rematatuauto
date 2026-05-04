/**
 * Elimina fondo oscuro tipo negro manteniendo cian / amarillo / grises del tagline.
 * Run: node scripts/knockout-logo-bg.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const logoPath = path.join(__dirname, '..', 'public', 'logo-vedisaremates.png')
const tmpPath = logoPath + '.tmp.png'

/** Promedio RGB por debajo = pixel de fondo o halo muy oscuro (no toca grises medianos del tagline). */
const AVG_MAX = 54

/** Si el canal más alto está por debajo de esto y el avg es muy bajo, es casi seguro borde negro. */
const MONO_MAXCHANNEL = 75

function isBackgroundPixel(r, g, b) {
  const avg = (r + g + b) / 3
  if (avg < AVG_MAX) return true
  const mx = Math.max(r, g, b)
  if (mx <= MONO_MAXCHANNEL && avg < 62) return true
  return false
}

const buf = await sharp(logoPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { data, info } = buf
const { width, height } = info

for (let i = 0; i < data.length; i += 4) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  if (isBackgroundPixel(r, g, b)) {
    data[i + 3] = 0
  }
}

await sharp(data, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(tmpPath)
fs.renameSync(tmpPath, logoPath)
console.log('Updated', logoPath)
