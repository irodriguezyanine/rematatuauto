import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { VedisaLogo } from '@/components/VedisaLogo'
import { footerLegalShort, PRIVACY_URL, TERMS_URL } from '@/content/legalCopy'
import { canonicalHrefForPath } from '@/lib/productionDomains'
import { WHATSAPP_HREF } from '@/lib/config'
import { TASAR_PATH } from '@/routes'

export function SiteLayout() {
  const location = useLocation()

  useEffect(() => {
    const href = canonicalHrefForPath(location.pathname)
    if (!href) return
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = href
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/') return
    const id = location.hash.replace('#', '').trim()
    if (!id) return
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }))
  }, [location.pathname, location.hash])

  const hashBase = location.pathname === '/' ? '' : '/'

  return (
    <div className="min-h-screen bg-[#f6f8fa] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 md:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-2 py-0.5 opacity-95 transition hover:opacity-100">
            <VedisaLogo variant="header" />
          </Link>
          <nav className="hidden items-center gap-1 text-[13px] font-semibold text-slate-600 md:flex">
            <a
              href={`${hashBase}#como-funciona`}
              className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Cómo funciona
            </a>
            <Link
              to={TASAR_PATH}
              className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Tasar mi auto
            </Link>
            <a href={`${hashBase}#faq`} className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
              Preguntas
            </a>
            <a
              href={`${hashBase}#legales`}
              className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Legales
            </a>
          </nav>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-600/25 transition hover:brightness-105 hover:shadow-lg sm:inline-flex"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.057-.001c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 0 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.359.194 1.868.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.379l-.361-.215-3.741.983.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.496 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.889-5.335 11.892-11.892a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </header>

      <Outlet />

      <footer id="legales" className="scroll-mt-28 border-t border-slate-800 bg-slate-950 py-16 text-sm text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 md:flex-row md:justify-between md:gap-12 md:px-8">
          <div className="max-w-md">
            <VedisaLogo variant="footer" />
            <div className="mt-8 space-y-4 text-[12px] leading-relaxed">
              {footerLegalShort.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-12 md:justify-end">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-white">Enlaces legales</div>
              <div className="mt-4 space-y-3">
                <a className="block font-semibold hover:text-white" href={TERMS_URL} target="_blank" rel="noopener noreferrer">
                  Términos y condiciones
                </a>
                <a className="block font-semibold hover:text-white" href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
                  Política de privacidad
                </a>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-white">Contacto Vedisa Remates</div>
              <div className="mt-4 space-y-3 text-[13px]">
                <a href="tel:+56989323397" className="block hover:text-white">
                  +56 9 8932 3397
                </a>
                <span className="block">Américo Vespucio 2880, Piso 7, Santiago</span>
                <span className="block">Arturo Prat 6457, Noviciado, Pudahuel</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-14 max-w-6xl border-t border-slate-900/80 px-4 pt-8 text-[11px] text-slate-600 md:px-8">
          Rematatuauto.cl y rematatuauto.com por Vedisa Remates &middot; {new Date().getFullYear()}
        </p>
      </footer>

      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl md:hidden"
        aria-label="Abrir WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.057-.009c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  )
}
