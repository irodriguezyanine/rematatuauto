export function onlyDigits(s: string): string {
  return s.replace(/\D+/g, '')
}

export function formatKmDots(raw: string): string {
  const d = onlyDigits(raw)
  if (!d) return ''
  return d.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function normalizePatente(raw: string): string {
  return raw
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(/[^A-Z0-9-]/g, '')
}

export function currentYear(): number {
  return new Date().getFullYear()
}

export function yearRange(): number[] {
  const max = Math.max(currentYear(), 2026)
  const out: number[] = []
  for (let y = max; y >= 2005; y--) out.push(y)
  return out
}

export function isEmailValid(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}
