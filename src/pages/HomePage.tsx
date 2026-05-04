import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchAutoredByLicensePlate } from '@/lib/autored'
import { getSupabaseAutoredConfig } from '@/lib/config'
import { normalizePatente, yearRange } from '@/lib/format'
import type { LeadPrefill } from '@/components/LandingForm'
import { TASAR_PATH } from '@/routes'

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

function labelClassName() {
  return 'mb-2 block text-left text-[13px] font-semibold tracking-tight text-slate-700'
}

function HeroQuickLead() {
  const navigate = useNavigate()
  const years = yearRange()
  const supabaseReady = !!getSupabaseAutoredConfig()
  const [patenteRaw, setPatenteRaw] = useState('')
  const [anio, setAnio] = useState(String(years[0]))
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [lookupLoading, setLookupLoading] = useState(false)
  const [lookupHint, setLookupHint] = useState<string | null>(null)
  const lastLookupRef = useRef('')

  const patenteNorm = normalizePatente(patenteRaw)

  useEffect(() => {
    if (patenteNorm.length < 5 || !supabaseReady) {
      lastLookupRef.current = ''
      if (patenteNorm.length < 5) setLookupHint(null)
      setLookupLoading(false)
      return
    }
    if (patenteNorm === lastLookupRef.current) return

    const timer = window.setTimeout(async () => {
      setLookupLoading(true)
      setLookupHint(null)
      const res = await fetchAutoredByLicensePlate(patenteNorm)
      setLookupLoading(false)
      if (!res.ok) {
        lastLookupRef.current = ''
        setLookupHint(
          'No encontramos datos automáticos para esa patente. Puedes completar año, marca y modelo manualmente.',
        )
        return
      }
      lastLookupRef.current = patenteNorm
      setLookupHint('Completamos datos desde la patente. Revísalos y sigue cuando quieras.')
      const d = res.data
      if (d.marca) setMarca(d.marca)
      if (d.modelo) setModelo(d.modelo)
      if (d.ano) setAnio(d.ano)
    }, 650)

    return () => window.clearTimeout(timer)
  }, [patenteNorm, supabaseReady])

  const goFullForm = (data: LeadPrefill) => {
    navigate(TASAR_PATH, { state: { leadPrefill: data } })
  }

  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        goFullForm({
          ...(patenteNorm.length >= 5 ? { patente: patenteNorm } : {}),
          ...(anio ? { anio } : {}),
          ...(marca.trim() ? { marca: marca.trim() } : {}),
          ...(modelo.trim() ? { modelo: modelo.trim() } : {}),
        })
      }}
    >
      <div className="max-w-md">
        <label htmlFor="hero-patente" className={labelClassName()}>
          Patente <span className="font-normal text-slate-500">(opcional)</span>
        </label>
        <input
          id="hero-patente"
          value={patenteRaw}
          onChange={(e) => setPatenteRaw(normalizePatente(e.target.value))}
          placeholder="Ej. ABCD12"
          maxLength={8}
          autoComplete="off"
          spellCheck={false}
          inputMode="text"
          aria-busy={lookupLoading}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] font-semibold uppercase tracking-widest text-slate-900 outline-none placeholder:font-semibold placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/60"
        />
        {(lookupLoading || lookupHint) && (
          <p className={`mt-2 text-xs leading-relaxed ${lookupLoading ? 'text-slate-500' : 'text-cyan-800'}`}>
            {lookupLoading ? 'Consultando patente…' : lookupHint}
          </p>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end">
        <div>
          <label htmlFor="hero-anio" className={labelClassName()}>
            año
          </label>
          <select
            id="hero-anio"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] font-semibold text-slate-900 outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
          >
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="hero-marca" className={labelClassName()}>
            marca
          </label>
          <input
            id="hero-marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            placeholder="Ej. Hyundai"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="hero-modelo" className={labelClassName()}>
            modelo
          </label>
          <input
            id="hero-modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            placeholder="Ej. Tucson"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-6 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800 lg:min-w-[10.5rem]"
          >
            Pedir tasación
          </button>
        </div>
      </div>
    </form>
  )
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
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
            <HeroQuickLead />
            <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
              Si ingresaste patente válida, autocompletamos año, marca y modelo como en el tasador completo. Con{' '}
              <span className="font-semibold text-slate-600">Pedir tasación</span> abres esa página para estado,
              kilometraje, fotos y contacto.
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
            Pasos ordenados para titulares: recopilamos la información esencial, homologamos criterios con el equipo comercial y
            avanzamos hacia tasación confirmada y publicación cuando corresponda.
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
            En la página de tasación completa concentras la información para que el equipo te devuelva la llamada con prioridad
            en horario hábil.
          </p>
          <Link
            to={TASAR_PATH}
            className="mt-9 inline-flex rounded-2xl bg-[#FFC600] px-9 py-4 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/25 transition hover:brightness-105 active:scale-[0.98]"
          >
            Ir al formulario completo
          </Link>
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
          <p className="mt-3 text-center text-[15px] text-slate-600">Respuestas prácticas antes de enviar tus datos.</p>
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
  )
}
