/** Dominios oficiales de esta landing (hostnames en minusculas, sin puerto). */
export const PRODUCTION_DOMAIN_HOSTS = [
  'rematatuauto.cl',
  'www.rematatuauto.cl',
  'rematatuauto.com',
  'www.rematatuauto.com',
] as const

export function isProductionDomainHost(hostname: string): boolean {
  const h = hostname.trim().toLowerCase()
  return (PRODUCTION_DOMAIN_HOSTS as readonly string[]).includes(h)
}

/**
 * Canonical por defecto: la URL origin actual si el host es uno de los dominios oficiales.
 * Si existe VITE_PUBLIC_SITE_URL en build, ese valor gana siempre (recomendado para unificar SEO).
 */
export function defaultCanonicalHref(): string | null {
  if (typeof window === 'undefined') return null
  const { hostname, origin } = window.location
  if (!isProductionDomainHost(hostname)) return null
  return `${origin.replace(/\/$/, '')}/`
}

/** Canonico para rutas públicas (/ y /tasar, etc.). */
export function canonicalHrefForPath(pathname: string): string | null {
  if (typeof window === 'undefined') return null
  const normalized = pathname === '/' || pathname === '' ? '/' : pathname.startsWith('/') ? pathname : `/${pathname}`

  const explicit = import.meta.env.VITE_PUBLIC_SITE_URL?.trim()
  if (explicit) {
    const base = explicit.replace(/\/$/, '')
    return normalized === '/' ? `${base}/` : `${base}${normalized}`
  }

  const { hostname, origin } = window.location
  if (!isProductionDomainHost(hostname)) return null
  const o = origin.replace(/\/$/, '')
  return normalized === '/' ? `${o}/` : `${o}${normalized}`
}
