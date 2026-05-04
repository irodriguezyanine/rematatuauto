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
    desc: 'Vehiculos siniestrados y subastas en curso.',
    href: 'https://vehiculoschocados.cl/',
    cta: 'Ver remates',
  },
  {
    title: 'Catalogo Vedisa',
    desc: 'Inventario oficial y unidades destacadas.',
    href: 'https://catalogo.vedisaremates.cl/',
    cta: 'Abrir catalogo',
  },
  {
    title: 'Vehiculos de ocasion',
    desc: 'Seminuevos y stock listo entre particulares Vedisa.',
    href: 'https://vehiculosdeocasion.cl/',
    cta: 'Ver stock',
  },
] as const

const STEPS = [
  {
    title: 'Cuentanos tu auto',
    body: 'Completa patente y datos: si podemos, completamos modelo y referencias de forma automatica.',
  },
  {
    title: 'Fotos claras',
    body: 'Cuanto mas detalle aportes, mas precisa puede ser la primera conversacion con tu ejecutivo.',
  },
  {
    title: 'Revision comercial',
    body: 'Negocio Vedisa analiza tu caso y agenda el siguiente paso: valor final sujeto a inspeccion donde corresponda.',
  },
  {
    title: 'Remate y publicacion',
    body: 'El vehiculo puede ingresar al circuito Vedisa de remate u otras rutas comerciales definidas con el equipo.',
  },
] as const

const FAQ = [
  {
    q: 'Tiene costo dejar una solicitud?',
    a: 'No. Usar este formulario como primer contacto es sin cargo para el propietario.',
  },
  {
    q: 'Cuanto demora el contacto inicial?',
    a: 'Priorizamos las solicitudes durante horario laboral en Chile. El equipo comercial responde llamada, correo o WhatsApp segun lo que indiques.',
  },
  {
    q: 'Las cifras que veo son valor final de remate?',
    a: 'Las referencias en pantalla son solo orientativas. El valor y condiciones aplicables dependen del negocio vigente cuando se revise el vehiculo.',
  },
  {
    q: 'Puedo ver el auto en bodega?',
    a: 'Si el proceso lo permite, coordina inspeccion presencial con tu ejecutivo Vedisa.',
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
        <label className="mb-2 block text-left text-[11px] font-bold uppercase tracking-wider text-slate-600">Anio</label>
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
          Pedir tasacion
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
    <div className="min-h-screen bg-[#fafbfc] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <a href="#" className="flex items-center">
            <VedisaLogo variant="header" />
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a href="#como-funciona" className="transition hover:text-slate-900">
              Como funciona
            </a>
            <a href="#cotizar" className="transition hover:text-slate-900">
              Tasar mi auto
            </a>
            <a href="#faq" className="transition hover:text-slate-900">
              Preguntas
            </a>
            <a href="#legales" className="transition hover:text-slate-900">
              Legales
            </a>
          </nav>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-50 sm:inline-flex"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <main>
        <section className="relative border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-5xl px-4 pb-16 pt-12 md:px-6 md:pb-24 md:pt-16">
            <p className="text-center text-sm font-semibold text-slate-500">REMATA TU AUTO by VEDISA REMATES</p>
            <h1 className="mx-auto mt-4 max-w-3xl text-center text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 md:text-5xl lg:text-[3.125rem]">
              Remata tu vehiculo con quien lleva anos maximizando el recupero en Chile
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-slate-600 md:text-xl">
              Una experiencia de venta enfocada en claridad como en grandes plataformas digitales, adaptada al negocio de
              autos siniestrados y perdidos con los estandares Vedisa.
            </p>

            <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-slate-100 bg-slate-50/80 p-6 shadow-xl shadow-slate-900/[0.06] md:p-8">
              <p className="text-center text-sm font-bold text-slate-800">Completa estos datos como primer paso</p>
              <HeroQuickLead onSubmit={(d) => setLeadPrefill(d)} />
              <p className="mt-4 text-center text-xs text-slate-500">
                Usa Pedir tasacion para bajar hasta el formulario completo donde ingresaras patente, kilometraje y fotos del
                auto.
              </p>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="scroll-mt-28 border-b border-slate-100 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 md:px-6">
            <h2 className="text-center text-2xl font-bold text-slate-950 md:text-3xl">Como avanza tu proceso con Vedisa</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-slate-600">
              Pensado para lograr menos fricciones y mas conversion: titulares directos y pasos concretos, similar en espiritu al
              flujo de cotizacion de{' '}
              <a href="https://www.kavak.com/cl/vende-tu-auto" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-700 underline decoration-cyan-400/60">
                Kavak — Vende tu auto
              </a>
              .
            </p>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, idx) => (
                <article key={step.title} className="relative rounded-2xl border border-slate-100 bg-[#fafbfc] p-6 pt-12">
                  <span className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#33C7E3] text-sm font-bold text-white">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-100 bg-[#0f172a] py-12 text-center text-white">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#33C7E3]">Maximizar recupero vehicular</p>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">Miles de unidades liquidadas con respaldo documental Vedisa</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
              El formulario siguiente concentra toda la informacion que necesitamos para hacerte volver llamada rapido.
            </p>
            <a
              href="#cotizar"
              className="mt-8 inline-flex rounded-2xl bg-[#FFC600] px-8 py-4 text-sm font-bold text-slate-900 transition hover:brightness-105"
            >
              Ir al formulario completo
            </a>
          </div>
        </section>

        <section id="cotizar" className="scroll-mt-24 bg-[#fafbfc] py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4 md:px-6">
            <LandingForm
              id="cotizar-form"
              prefill={leadPrefill}
              onPrefillConsumed={() => setLeadPrefill(null)}
            />
          </div>
        </section>

        <section id="referidos" className="scroll-mt-28 border-t border-slate-100 bg-white py-20">
          <div className="mx-auto max-w-5xl px-4 md:px-6">
            <h2 className="text-2xl font-bold text-slate-950 md:text-3xl">Tambien te puede interesar</h2>
            <p className="mt-2 max-w-2xl text-[15px] text-slate-600">
              Remates en linea VehiculosChocados.cl, catalogo Vedisa oficial y automotora Vehiculos de ocasion.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {LINKS.map((item) => (
                <article
                  key={item.href}
                  className="flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-lg shadow-slate-900/[0.04] transition hover:-translate-y-0.5 hover:shadow-xl"
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

        <section id="faq" className="scroll-mt-28 pb-24 pt-16">
          <div className="mx-auto max-w-2xl px-4 md:px-6">
            <h2 className="text-center text-2xl font-bold text-slate-950 md:text-3xl">Preguntas frecuentes</h2>
            <p className="mt-3 text-center text-[15px] text-slate-600">Las respuestas practicas antes de enviar tus datos.</p>
            <div className="mt-10 divide-y divide-slate-100 rounded-3xl border border-slate-200 bg-white px-1 shadow-lg">
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

      <footer id="legales" className="scroll-mt-28 border-t border-slate-800 bg-slate-950 py-14 text-sm text-slate-400">
        <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 md:flex-row md:justify-between md:px-6">
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
                  Terminos y condiciones
                </a>
                <a className="block font-semibold hover:text-white" href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
                  Politica de privacidad
                </a>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-white">Contacto Vedisa Remates</div>
              <div className="mt-4 space-y-3 text-[13px]">
                <a href="tel:+56989323397" className="block hover:text-white">
                  +56 9 8932 3397
                </a>
                <span className="block">Americo Vespucio 2880, Piso 7, Santiago</span>
                <span className="block">Arturo Prat 6457, Noviciado, Pudahuel</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-5xl px-4 text-[11px] text-slate-600 md:px-6">
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
