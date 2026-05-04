import { useEffect, useState } from 'react'
import { LandingForm, type LeadPrefill } from '@/components/LandingForm'
import { VedisaLogo } from '@/components/VedisaLogo'
import { footerLegalShort, PRIVACY_URL, TERMS_URL } from '@/content/legalCopy'
import { defaultCanonicalHref } from '@/lib/productionDomains'
import { WHATSAPP_HREF } from '@/lib/config'
import { yearRange } from '@/lib/format'

const LINKS = [
  {
    title: 'Remates Vedisa',
    desc: 'Vehículos siniestrados y subastas en curso.',
    href: 'https://vehiculoschocados.cl/',
    cta: 'Ver remates',
  },
  {
    title: 'Catálogo Vedisa',
    desc: 'Inventario oficial y unidades destacadas.',
    href: 'https://catalogo.vedisaremates.cl/',
    cta: 'Abrir catálogo',
  },
  {
    title: 'Vehículos de ocasión',
    desc: 'Seminuevos y stock listo con respaldo Vedisa.',
    href: 'https://vehiculosdeocasion.cl/',
    cta: 'Ver stock',
  },
] as const

const STEPS = [
  {
    title: 'Cuéntanos tu auto',
    body: 'Completa patente y datos: cuando es posible, completamos modelo y referencias de forma automática.',
  },
  {
    title: 'Fotos claras',
    body: 'Cuánto más detalle aportes, más precisa puede ser la primera conversación con tu ejecutivo.',
  },
  {
    title: 'Revisión comercial',
    body: 'El equipo Vedisa analiza tu caso y agenda el siguiente paso; el valor final puede quedar sujeto a inspección presencial cuando corresponda.',
  },
  {
    title: 'Remate y publicación',
    body: 'El vehículo puede ingresar al circuito Vedisa de remate u otras rutas comerciales acordadas con el equipo.',
  },
] as const

const FAQ = [
  {
    q: '¿Tiene costo dejar una solicitud?',
    a: 'No. Usar este formulario como primer contacto es sin cargo para el titular.',
  },
  {
    q: '¿Cuánto demora el contacto inicial?',
    a: 'Priorizamos las solicitudes en horario laboral en Chile. El equipo responde por llamada, correo o WhatsApp según lo que indiques.',
  },
  {
    q: '¿Las cifras que veo son el valor final de remate?',
    a: 'Las referencias en pantalla son orientativas. El valor y las condiciones dependen del análisis comercial cuando se revise el vehículo.',
  },
  {
    q: '¿Puedo ver el auto en bodega?',
    a: 'Si el proceso lo permite, coordina una inspección presencial con tu ejecutivo Vedisa.',
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

function HeroQuickLead({
  onSubmit,
}: {
  onSubmit: (data: LeadPrefill) => void
}) {
  const years = yearRange()
  const [anio, setAnio] = useState(String(years[0]))
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')

  return (
    <form
      className="mt-10 grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({
          ...(anio ? { anio } : {}),
          ...(marca.trim() ? { marca: marca.trim() } : {}),
          ...(modelo.trim() ? { modelo: modelo.trim() } : {}),
        })
        document.getElementById('cotizar')?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <div>
        <label className="mb-2 block text-left text-[11px] font-bold uppercase tracking-wider text-slate-600">Año</label>
        <select
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] font-semibold text-slate-900 outline-none ring-slate-200 focus:ring-2"
        >
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-left text-[11px] font-bold uppercase tracking-wider text-slate-600">Marca</label>
        <input
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          placeholder="Ej. Hyundai"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>
      <div>
        <label className="mb-2 block text-left text-[11px] font-bold uppercase tracking-wider text-slate-600">Modelo</label>
        <input
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          placeholder="Ej. Tucson"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>
      <div className="flex items-end">
        <button
          type="submit"
          className="w-full shrink-0 rounded-2xl bg-slate-900 px-8 py-3.5 text-[15px] font-bold text-white transition hover:bg-slate-800 sm:w-auto"
        >
          Pedir tasación
        </button>
      </div>
    </form>
  )
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [leadPrefill, setLeadPrefill] = useState<LeadPrefill | null>(null)

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
    <div className="min-h-screen bg-[#f6f8fa] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 md:px-8">
          <a href="#" className="flex min-w-0 items-center gap-2 py-0.5 transition opacity-95 hover:opacity-100">
            <VedisaLogo variant="header" />
          </a>
          <nav className="hidden items-center gap-1 text-[13px] font-semibold text-slate-600 md:flex">
            <a href="#como-funciona" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
              Cómo funciona
            </a>
            <a href="#cotizar" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
              Tasar mi auto
            </a>
            <a href="#faq" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
              Preguntas
            </a>
            <a href="#legales" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
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

      <main>
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
          <div className="pointer-events-none absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-cyan-300/25 via-sky-200/15 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -right-32 top-20 h-[360px] w-[360px] rounded-full bg-gradient-to-bl from-amber-200/20 via-yellow-100/15 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[min(100%,64rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200/80 to-transparent" />
          <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-12 md:px-8 md:pb-28 md:pt-16">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
              REMATA TU AUTO · VEDISA REMATES
            </p>
            <h1 className="mx-auto mt-5 max-w-4xl text-center text-[2rem] font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Remata tu vehículo con quien lleva años maximizando el recupero en Chile
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-slate-600 md:text-xl">
              Proceso en línea, transparente y acompañado por ejecutivos comerciales: tasación orientativa, documentación y
              publicación en el ecosistema Vedisa.
            </p>

            <div className="mx-auto mt-14 max-w-3xl rounded-[1.75rem] border border-slate-200/90 bg-white/80 p-6 shadow-[0_24px_80px_-12px_rgba(15,23,42,0.12)] ring-1 ring-white/60 backdrop-blur-sm md:p-9">
              <p className="text-center text-sm font-bold text-slate-800">Completa estos datos como primer paso</p>
              <HeroQuickLead onSubmit={(d) => setLeadPrefill(d)} />
              <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
                Con <span className="font-semibold text-slate-600">Pedir tasación</span> pasas al formulario completo: patente, kilometraje y fotos
                del vehículo.
              </p>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="scroll-mt-28 border-b border-slate-200/80 bg-gradient-to-b from-white via-[#f8fafc] to-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <h2 className="text-center text-[1.65rem] font-bold tracking-tight text-slate-950 md:text-3xl lg:text-[2rem]">
              Cómo avanza tu proceso con Vedisa
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-slate-600 md:text-[16px]">
              Pasos ordenados para titulares: recopilamos la información esencial, homologamos criterios con el equipo
              comercial y avanzamos hacia tasación confirmada y publicación cuando corresponda.
            </p>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
              {STEPS.map((step, idx) => (
                <article
                  key={step.title}
                  className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 pt-14 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-slate-300/90 hover:shadow-[0_20px_40px_-16px_rgba(15,23,42,0.12)]"
                >
                  <span className="absolute left-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#33C7E3] to-[#0ea5e9] text-sm font-bold text-white shadow-lg shadow-cyan-500/30">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-b border-slate-900 bg-gradient-to-br from-[#0f172a] via-[#0c1222] to-[#0f172a] py-14 text-center text-white md:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(51,199,227,0.18),transparent)]" />
          <div className="relative mx-auto max-w-3xl px-4 md:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#5ee6ff]/90">
              Maximizar recupero vehicular
            </p>
            <h2 className="mt-4 text-[1.5rem] font-bold leading-snug md:text-3xl">
              Miles de unidades liquidadas con respaldo documental Vedisa
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
              El formulario siguiente concentra la información necesaria para devolverte la llamada con prioridad durante el día hábil.
            </p>
            <a
              href="#cotizar"
              className="mt-9 inline-flex rounded-2xl bg-[#FFC600] px-9 py-4 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/25 transition hover:brightness-105 active:scale-[0.98]"
            >
              Ir al formulario completo
            </a>
          </div>
        </section>

        <section id="cotizar" className="scroll-mt-24 bg-[#f6f8fa] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <LandingForm
              id="cotizar-form"
              prefill={leadPrefill}
              onPrefillConsumed={() => setLeadPrefill(null)}
            />
          </div>
        </section>

        <section id="referidos" className="scroll-mt-28 border-t border-slate-200/80 bg-white py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">También te puede interesar</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">
              Remates en línea en VehículosChocados.cl, catálogo oficial Vedisa y automotora Vehículos de ocasión.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
              {LINKS.map((item) => (
                <article
                  key={item.href}
                  className="flex flex-col rounded-[1.5rem] border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50 p-8 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.14)]"
                >
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex text-sm font-bold text-[#0891b2] underline decoration-cyan-500/40 underline-offset-4 hover:decoration-cyan-600"
                  >
                    {item.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28 bg-[#f6f8fa] pb-28 pt-16 md:pt-20">
          <div className="mx-auto max-w-2xl px-4 md:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              Preguntas frecuentes
            </h2>
            <p className="mt-3 text-center text-[15px] text-slate-600">
              Respuestas prácticas antes de enviar tus datos.
            </p>
            <div className="mt-11 divide-y divide-slate-200/90 rounded-[1.5rem] border border-slate-200 bg-white px-1 shadow-[0_16px_48px_-20px_rgba(15,23,42,0.1)]">
              {FAQ.map((item, i) => (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left"
                  >
                    <span className="text-[15px] font-semibold text-slate-900">{item.q}</span>
                    <ChevronDown open={openFaq === i} />
                  </button>
                  {openFaq === i && (
                    <p className="px-5 pb-5 text-[14px] leading-relaxed text-slate-600">{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

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
