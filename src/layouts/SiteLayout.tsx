import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { BrandWordmark } from '@/components/BrandWordmark'
import { VedisaLogo } from '@/components/VedisaLogo'
import { footerLegalShort, PRIVACY_URL, TERMS_URL } from '@/content/legalCopy'
import { canonicalHrefForPath } from '@/lib/productionDomains'
import { WHATSAPP_HREF } from '@/lib/config'
import {
  COMO_FUNCIONA_PATH,
  DUDAS_PATH,
  LEGALES_PATH,
  QUIENES_SOMOS_PATH,
  TASAR_PATH,
} from '@/routes'

export function SiteLayout() {
  const location = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

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

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname, location.hash])

  const navLinkClass =
    'rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-cyan-500/40'

  return (
    <div className="min-h-screen bg-[#f6f8fa] text-slate-900">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Ir al contenido principal
      </a>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:gap-6 md:px-8">
          <BrandWordmark asLink />
          <nav
            className="hidden items-center gap-0.5 text-[13px] font-semibold text-slate-600 lg:flex"
            aria-label="Principal"
          >
            <Link to={COMO_FUNCIONA_PATH} className={navLinkClass}>
              Cómo funciona
            </Link>
            <Link to={QUIENES_SOMOS_PATH} className={navLinkClass}>
              Quiénes somos
            </Link>
            <Link to={TASAR_PATH} className={navLinkClass}>
              Tasar mi auto
            </Link>
            <Link to={DUDAS_PATH} className={navLinkClass}>
              Dudas
            </Link>
            <Link to={LEGALES_PATH} className={navLinkClass}>
              Legales
            </Link>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to={TASAR_PATH}
              className="inline-flex rounded-full bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-slate-900/15 transition hover:bg-slate-800 active:scale-[0.98] sm:px-5 sm:text-sm"
            >
              Tasar gratis
            </Link>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition hover:brightness-105 sm:inline-flex sm:px-5 sm:text-sm"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.057-.001c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 0 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.359.194 1.868.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.379l-.361-.215-3.741.983.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.496 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.889-5.335 11.892-11.892a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 lg:hidden"
              aria-expanded={mobileNavOpen}
              aria-controls="menu-movil"
              onClick={() => setMobileNavOpen((o) => !o)}
            >
              <span className="sr-only">{mobileNavOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                {mobileNavOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div
            id="menu-movil"
            className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden"
            role="dialog"
            aria-label="Navegación"
          >
            <nav className="flex flex-col gap-1 text-[15px] font-semibold text-slate-800">
              <Link to={COMO_FUNCIONA_PATH} className="rounded-xl px-3 py-3 hover:bg-slate-50">
                Cómo funciona
              </Link>
              <Link to={QUIENES_SOMOS_PATH} className="rounded-xl px-3 py-3 hover:bg-slate-50">
                Quiénes somos
              </Link>
              <Link to={TASAR_PATH} className="rounded-xl px-3 py-3 hover:bg-slate-50">
                Tasar mi auto
              </Link>
              <Link to={DUDAS_PATH} className="rounded-xl px-3 py-3 hover:bg-slate-50">
                Dudas frecuentes
              </Link>
              <Link to={LEGALES_PATH} className="rounded-xl px-3 py-3 hover:bg-slate-50">
                Información legal
              </Link>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 font-bold text-white"
              >
                Escribir por WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>

      <div id="contenido-principal" tabIndex={-1}>
        <Outlet />
      </div>

      <footer className="border-t border-slate-800 bg-slate-950 py-16 text-sm text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 md:flex-row md:justify-between md:gap-12 md:px-8">
          <div className="max-w-md">
            <BrandWordmark />
            <p className="mt-4 text-[13px] leading-relaxed text-slate-400">
              Canal para titulares que necesitan vender o rematar con proceso claro y seguimiento comercial. Operación con respaldo
              Vedisa Remates —{' '}
              <Link
                to={QUIENES_SOMOS_PATH}
                className="font-semibold text-cyan-400/90 underline-offset-2 hover:underline"
              >
                conoce al equipo
              </Link>
              .
            </p>
            <div className="mt-8 space-y-4 text-[12px] leading-relaxed opacity-95">
              {footerLegalShort.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-12 md:justify-end">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-white">Enlaces legales</div>
              <div className="mt-4 space-y-3">
                <Link className="block font-semibold hover:text-white" to={LEGALES_PATH}>
                  Información legal del sitio
                </Link>
                <a className="block font-semibold hover:text-white" href={TERMS_URL} target="_blank" rel="noopener noreferrer">
                  Términos y condiciones
                </a>
                <a className="block font-semibold hover:text-white" href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
                  Política de privacidad
                </a>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-white">Contacto</div>
              <div className="mt-4 space-y-3 text-[13px]">
                <a href="tel:+56989323397" className="block font-semibold text-slate-300 hover:text-white">
                  +56 9 8932 3397
                </a>
                <span className="block">Américo Vespucio 2880, Piso 7, Santiago</span>
                <span className="block">Arturo Prat 6457, Noviciado, Pudahuel</span>
              </div>
            </div>
            <div className="max-w-[200px]">
              <div className="text-[11px] font-bold uppercase tracking-wider text-white">Respaldo operativo</div>
              <div className="mt-4">
                <VedisaLogo variant="footer" className="opacity-90" />
              </div>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-14 max-w-6xl border-t border-slate-900/80 px-4 pt-8 text-[11px] text-slate-600 md:px-8">
          rematatuauto.cl y rematatuauto.com son operados por Vedisa Remates &middot; {new Date().getFullYear()}
        </p>
      </footer>

      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-900/30 transition hover:scale-105 active:scale-95 sm:hidden"
        aria-label="Abrir WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.057-.009c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  )
}
