import { useEffect, useState } from 'react'
import { LandingForm } from '@/components/LandingForm'
import { VedisaMark } from '@/components/VedisaMark'
import { footerLegalDraft, PRIVACY_URL, TERMS_URL } from '@/content/legalDraft'
import { defaultCanonicalHref } from '@/lib/productionDomains'
import { WHATSAPP_HREF } from '@/lib/config'

const LINKS = [
  {
    title: 'Remates y subastas Vedisa',
    desc: 'Portal principal de licitaciones y lotes en curso.',
    href: 'https://vehiculoschocados.cl/',
    cta: 'Ir a remates',
  },
  {
    title: 'Catalogo oficial',
    desc: 'Inventario Vedisa con filtros, 3D GLO3D y ventas directas.',
    href: 'https://catalogo.vedisaremates.cl/',
    cta: 'Ver catalogo',
  },
  {
    title: 'Vehiculos de ocasion',
    desc: 'Automotora de seminuevos y stock listo para cerrar.',
    href: 'https://vehiculosdeocasion.cl/',
    cta: 'Ir a seminuevos',
  },
] as const

const FAQ = [
  {
    q: 'Cuanto demora una respuesta?',
    a: 'Un ejecutivo comercial revisa cada ingreso prioritariamente durante horario habil.',
  },
  {
    q: 'Es gratis la evaluacion?',
    a: 'Si. La pagina registra tus datos y fotos solo para iniciar una conversacion comercial Vedisa.',
  },
  {
    q: 'Puedo visitar el vehiculo en bodega?',
    a: 'Si. Coordinamos inspeccion presencial segun el tipo de proceso (remate o venta directa).',
  },
  {
    q: 'Son los mismos destinos que antes?',
    a: 'Formspree sigue llegando al mismo lugar que vende tu auto en vehiculoschocados.cl; Cloudinary usa el mismo preset publico Vedisa. Si cambias dominio revisa lista de dominios en Formspree (documentado en docs/DESPLEGUE-Y-DOMINIO.md).',
  },
  {
    q: 'Los textos legales ya estan cerrados?',
    a: 'No. El bloque antes del boton enviar y el pie de esta pagina son borrador marcado REVISION JURIDICA — los PDF o paginas que ya publicaste en vehiculoschocados.cl tienen prevalencia hasta que vueles version final.',
  },
  {
    q: 'Sirve en mas de un dominio?',
    a: 'Si: produccion oficial en rematatuauto.cl y rematatuauto.com al mismo proyecto. Si Formspree restringe origen HTTPS, permite ambos. Canonical y SEO opcional ver docs/DESPLEGUE-Y-DOMINIO.md.',
  },
] as const

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-slate-400 transition ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    const explicit = import.meta.env.VITE_PUBLIC_SITE_URL?.trim()
    const href = explicit ? `${explicit.replace(/\/$/, '')}/` : defaultCanonicalHref()
    if (!href) return
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = href
  }, [])

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <a href="#" className="flex items-center gap-2">
            <VedisaMark />
          </a>
          <nav className="hidden items-center gap-8 text-sm font-bold text-slate-600 md:flex">
            <a href="#cotizar" className="hover:text-cyan-600">
              Cotizar
            </a>
            <a href="#enlaces" className="hover:text-cyan-600">
              Enlaces
            </a>
            <a href="#faq" className="hover:text-cyan-600">
              FAQ
            </a>
            <a href="#aviso-legal" className="hover:text-cyan-600">
              Aviso legal
            </a>
          </nav>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-slate-900 px-4 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800 md:text-sm"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-200/50 via-transparent to-transparent" />
          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#FFC600]/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-10 md:grid-cols-2 md:items-center md:px-6 md:pb-24 md:pt-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/80 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-800 shadow-sm">
                VEDISA REMATES · Chile
              </p>
              <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-slate-950 md:text-5xl lg:text-[3.25rem]">
                Remata tu auto con el respaldo de quienes llevan decadas en subastas.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
                Flujo inspirado en experiencias como Kavak: menos pasos, titulares claros y un solo envio. Autored llena
                marca, modelo y referencias de precio tan pronto ingresas la patente.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Evaluacion sin costo para iniciar el proceso.',
                  'Logistica y vitrina en ecosistema Vedisa.',
                  'Mismas integraciones productivas: Formspree + Cloudinary + Supabase/Autored.',
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] font-semibold text-slate-700">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-[11px] font-black leading-none text-white"
                      aria-hidden
                    >
                      {'\u2713'}
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#cotizar"
                  className="inline-flex rounded-2xl bg-gradient-to-r from-[#33C7E3] to-[#1fa8c7] px-8 py-4 text-sm font-black text-white shadow-xl shadow-cyan-500/30 transition hover:brightness-[1.03]"
                >
                  Comenzar ahora
                </a>
                <a
                  href="tel:+56989323397"
                  className="inline-flex items-center rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-800 hover:border-cyan-300"
                >
                  +56 9 8932 3397
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cyan-300/35 to-[#FFC600]/25 blur-2xl md:-inset-8" />
              <div className="relative rounded-[28px] border border-white bg-white/95 p-6 shadow-2xl backdrop-blur lg:p-10">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Tu patente primero</div>
                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      Autored pre-llena ficha tecnica cuando la patente esta disponible.
                    </p>
                  </div>
                  <span className="rounded-xl bg-emerald-50 px-2 py-1 text-[10px] font-black uppercase text-emerald-800">
                    Autored
                  </span>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="h-14 rounded-2xl bg-gradient-to-br from-slate-100 via-white to-slate-50 px-5 py-5 shadow-inner ring-1 ring-slate-100" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-28 rounded-2xl bg-slate-100/80 shadow-inner ring-1 ring-black/5" />
                    <div className="h-28 rounded-2xl bg-cyan-50/80 shadow-inner ring-1 ring-cyan-100" />
                  </div>
                  <div className="h-36 rounded-[24px] border border-dashed border-cyan-200 bg-cyan-50/40" />
                </div>
                <a
                  href="#cotizar"
                  className="mt-10 flex w-full items-center justify-center rounded-2xl bg-slate-900 py-4 text-sm font-black text-white transition hover:bg-slate-800"
                >
                  Ir al formulario
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="cotizar" className="mx-auto max-w-6xl scroll-mt-28 px-4 pb-24 md:px-6">
          <LandingForm id="cotizar-form" />
        </section>

        <section id="enlaces" className="scroll-mt-28 border-t border-slate-200/80 bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Enlaces de interes</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                Direcciona a tus usuarios entre remate oficial, inventario Vedisa catalogo web y compraventa de seminuevos.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {LINKS.map((item) => (
                <article
                  key={item.href}
                  className="group flex flex-col rounded-[24px] border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-7 shadow-xl shadow-slate-900/[0.04] ring-1 ring-black/[0.02] transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                  <p className="mt-3 grow text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-black text-cyan-600 underline decoration-cyan-300 underline-offset-4 group-hover:decoration-cyan-600"
                  >
                    {item.cta}
                    <span aria-hidden> -&gt;</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28 pb-28">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <h2 className="text-center text-3xl font-black text-slate-900 md:text-4xl">Preguntas frecuentes</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-[15px] text-slate-600">
              Respuestas rapidas antes de registrar tu solicitud.
            </p>
            <div className="mt-10 divide-y divide-slate-100 rounded-[24px] border border-slate-200 bg-white px-5 shadow-xl">
              {FAQ.map((item, i) => (
                <div key={item.q} className="py-1">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[15px] font-bold text-slate-900">{item.q}</span>
                    <ChevronDown open={openFaq === i} />
                  </button>
                  {openFaq === i && <p className="pb-5 text-[14px] leading-relaxed text-slate-600">{item.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="aviso-legal" className="scroll-mt-28 border-t border-slate-200 bg-slate-950 py-14 text-sm text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:justify-between md:px-6">
          <div>
            <VedisaMark light />
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed">
              Produccion oficial en <strong>rematatuauto.cl</strong> y <strong>rematatuauto.com</strong> (mismo deploy).
              Despliegue y DNS en <code className="text-slate-300">docs/DESPLEGUE-Y-DOMINIO.md</code>.
            </p>
            <div className="mt-6 space-y-4 text-[11px] leading-relaxed text-slate-500">
              {footerLegalDraft.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-6 text-[13px] font-semibold">
            <div>
              <div className="font-black uppercase tracking-wider text-white">Documentos oficiales Vedisa</div>
              <div className="mt-4 space-y-2">
                <a className="block hover:text-white" href={TERMS_URL}>
                  Terminos y condiciones
                </a>
                <a className="block hover:text-white" href={PRIVACY_URL}>
                  Politica de privacidad
                </a>
              </div>
            </div>
            <div>
              <div className="font-black uppercase tracking-wider text-white">Contacto</div>
              <div className="mt-4 space-y-2">
                <span className="block">Contact center +56 9 8932 3397</span>
                <span className="block">Americo Vespucio 2880, Piso 7, Santiago</span>
                <span className="block">Exhibicion: Arturo Prat 6457, Pudahuel</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-6xl px-4 text-[11px] text-slate-600 md:px-6">
          Vedisa Remates · {new Date().getFullYear()}
        </p>
      </footer>

      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/25 transition hover:scale-105 md:hidden"
        aria-label="Abrir WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.057-.009c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  )
}
