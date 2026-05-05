import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { VedisaLogo } from '@/components/VedisaLogo'
import { fetchAutoredByLicensePlate } from '@/lib/autored'
import { getSupabaseAutoredConfig } from '@/lib/config'
import { normalizePatente, yearRange } from '@/lib/format'
import type { LeadPrefill } from '@/components/LandingForm'
import { TASAR_PATH } from '@/routes'

const LINKS = [
  {
    title: 'Remates en vivo',
    desc: 'Vehículos siniestrados y subastas con ofertas transparentes.',
    href: 'https://vehiculoschocados.cl/',
    cta: 'Ver remates',
  },
  {
    title: 'Catálogo de stock',
    desc: 'Unidades revisadas e inventario actualizado.',
    href: 'https://catalogo.vedisaremates.cl/',
    cta: 'Abrir catálogo',
  },
  {
    title: 'Vehículos de ocasión',
    desc: 'Seminuevos y opciones listas para retiro.',
    href: 'https://vehiculosdeocasion.cl/',
    cta: 'Ver stock',
  },
] as const

const PAIN_POINTS = [
  {
    title: 'No vendiste por el canal tradicional',
    body: 'Meses en portales, visitas que no cierran o compradores poco serios. Aquí evaluamos tu caso con criterio comercial y siguientes pasos claros.',
    icon: '↗',
  },
  {
    title: 'Necesitas liquidez rápida',
    body: 'Cambio de auto, mudanza, imprevisto o necesidad de efectivo. Priorizamos el contacto en horario hábil para acortar plazos cuando el proceso lo permite.',
    icon: '⚡',
  },
  {
    title: 'Auto chocado o con daños',
    body: 'Siniestro, peritaje pendiente o auto que no conviene reparar. Te orientamos sobre remate y alternativas según documentación y estado real.',
    icon: '⎔',
  },
  {
    title: 'Poco tiempo para publicar y filtrar',
    body: 'Sin energía para fotos, llamadas y negociación. Centralizas datos y fotos una vez; el equipo comercial retoma con una propuesta de trabajo.',
    icon: '✓',
  },
] as const

const TRUST_STATS = [
  { value: '+15', label: 'años de operación en remates y stock', hint: 'Ecosistema chileno de vehículos' },
  { value: '100%', label: 'canal sin costo para dejar tu solicitud', hint: 'Primer contacto desde esta web' },
  { value: '360°', label: 'del dato básico a la publicación', hint: 'Cuando corresponde al circuito comercial' },
] as const

const WHY_BULLETS = [
  'Proceso guiado: menos fricción que publicar solo en clasificados.',
  'Referencias de mercado en pantalla cuando hay datos disponibles (no son precio final).',
  'Un mismo canal sirve para auto que anda, con problemas o bajo siniestro.',
  'WhatsApp y teléfono visibles para quien prefiere hablar antes de enviar el formulario.',
] as const

const STEPS = [
  {
    title: 'Cuéntanos tu auto',
    body: 'Patente (si la tienes), año, marca y modelo. Cuando es posible, autocompletamos desde base de datos.',
  },
  {
    title: 'Fotos que cuentan la historia',
    body: 'Exterior, interior y detalle de daños. Más contexto = menos idas y vueltas en la primera conversación.',
  },
  {
    title: 'Revisión comercial',
    body: 'Analizamos tu caso y agenda. El valor definitivo puede requerir inspección o documentos adicionales.',
  },
  {
    title: 'Ruta de remate o venta',
    body: 'Si corresponde, el vehículo ingresa a canales de remate u otras alternativas acordadas contigo.',
  },
] as const

const TESTIMONIALS = [
  {
    quote: 'Tenía el auto publicado hace meses. En una semana ya tenía propuesta y siguiente paso claro.',
    name: 'Cliente particular',
    meta: 'Santiago, 2025',
  },
  {
    quote: 'Choque total y no sabía si convenía reparar. Me explicaron opciones sin presión.',
    name: 'Titular asegurado',
    meta: 'Región Metropolitana',
  },
  {
    quote: 'Respuesta rápida por WhatsApp. Adjunté fotos y acotamos expectativas desde el inicio.',
    name: 'Vendedor urgente',
    meta: 'Chile',
  },
] as const

const FAQ = [
  {
    q: '¿Sirve si mi auto está muy dañado?',
    a: 'Sí. Muchas solicitudes son por siniestro o daño importante. La viabilidad y el valor dependen del estado documentado y, a veces, de inspección.',
  },
  {
    q: '¿Tiene costo dejar una solicitud?',
    a: 'No. Completar el formulario como primer contacto es sin cargo para el titular.',
  },
  {
    q: '¿Cuánto demora el contacto inicial?',
    a: 'Atendemos con prioridad en horario laboral chileno. Puedes elegir llamada, correo o WhatsApp según lo que indiques.',
  },
  {
    q: '¿La cifra en pantalla es lo que voy a recibir?',
    a: 'Las referencias son orientativas. El monto y condiciones finales se confirman en el análisis comercial y/o inspección cuando aplique.',
  },
  {
    q: '¿Qué pasa si no tengo la patente a mano?',
    a: 'Puedes completar año, marca y modelo manualmente. La patente ayuda a autocompletar datos, pero no siempre es obligatoria en el primer paso del inicio.',
  },
  {
    q: '¿Puedo visitar el vehículo en bodega?',
    a: 'Cuando el proceso lo permite, coordinas una visita o inspección con tu ejecutivo.',
  },
  {
    q: '¿Reemplaza esto a un comprador particular?',
    a: 'Es una alternativa cuando el canal tradicional no entrega resultado o necesitas velocidad y un respaldo operativo.',
  },
  {
    q: '¿Mis datos y fotos están protegidos?',
    a: 'Tratamos la información conforme a la normativa vigente y la política publicada en los enlaces legales de esta página.',
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
          'No encontramos datos automáticos para esa patente. Completa año, marca y modelo manualmente.',
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
          Patente <span className="font-normal text-slate-500">(opcional en este paso)</span>
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
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] font-semibold uppercase tracking-widest text-slate-900 shadow-sm outline-none placeholder:font-semibold placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/70"
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
            Año
          </label>
          <select
            id="hero-anio"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] font-semibold text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-cyan-100"
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
            Marca
          </label>
          <input
            id="hero-marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            placeholder="Ej. Hyundai"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="hero-modelo" className={labelClassName()}>
            Modelo
          </label>
          <input
            id="hero-modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            placeholder="Ej. Tucson"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-slate-900/20 transition hover:brightness-110 active:scale-[0.99] lg:min-w-[11rem]"
          >
            Continuar al formulario
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
        <div className="pointer-events-none absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-cyan-300/30 via-sky-200/20 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-20 h-[360px] w-[360px] rounded-full bg-gradient-to-bl from-amber-200/25 via-yellow-100/20 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[min(100%,64rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-12 md:px-8 md:pb-28 md:pt-16">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
            Tasación orientativa · Remate · Chile
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl text-center text-[2rem] font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-[3.15rem]">
            ¿No lograste vender tu auto por el canal tradicional?
            <span className="mt-2 block text-[1.35rem] font-bold leading-snug text-slate-700 sm:text-2xl md:text-[1.75rem] md:leading-snug">
              Te ayudamos a rematar o vender con proceso claro — incluso si está chocado o necesitas liquidez rápida.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-slate-600 md:text-xl">
            Dejas tus datos una sola vez: fotos, estado del vehículo y contacto. Un ejecutivo retoma para darte el siguiente paso
            sin humo.
          </p>
          <ul className="mx-auto mt-8 flex max-w-3xl flex-col gap-2.5 text-left text-[14px] font-medium text-slate-700 sm:mx-auto sm:max-w-xl">
            <li className="flex gap-2">
              <span className="mt-0.5 text-cyan-600" aria-hidden>
                ●
              </span>
              <span>Sin costo por enviar tu solicitud desde esta página.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-cyan-600" aria-hidden>
                ●
              </span>
              <span>Ideal si el auto lleva semanas en portales o no sabes qué hacer tras un choque.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-cyan-600" aria-hidden>
                ●
              </span>
              <span>Referencia de precio en pantalla cuando hay datos (siempre sujeta a revisión).</span>
            </li>
          </ul>

          <div className="mx-auto mt-14 max-w-3xl rounded-[1.75rem] border border-slate-200/90 bg-white/90 p-6 shadow-[0_24px_80px_-12px_rgba(15,23,42,0.14)] ring-1 ring-white/60 backdrop-blur-sm md:p-9">
            <p className="text-center text-sm font-bold uppercase tracking-wide text-slate-800">
              Empieza con patente o con año y modelo
            </p>
            <p className="mt-2 text-center text-xs text-slate-500">
              En menos de dos minutos pasas al formulario completo: estado, kilometraje, fotos y medio de contacto.
            </p>
            <HeroQuickLead />
            <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
              Si ingresaste una patente válida, autocompletamos datos como en el tasador completo. El botón abre la página para
              terminar el envío.
            </p>
          </div>
        </div>
      </section>

      <section id="por-que" className="scroll-mt-28 border-b border-slate-200/80 bg-slate-50/80 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="max-w-3xl text-[1.65rem] font-bold tracking-tight text-slate-950 md:text-3xl">
            Pensado para quien ya probó todo lo demás
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600 md:text-[16px]">
            Si alguna de estas situaciones te suena, estás en el lugar correcto. No prometemos magia: sí un canal serio y seguimiento
            comercial.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PAIN_POINTS.map((item) => (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:border-cyan-200/80 hover:shadow-[0_16px_40px_-16px_rgba(15,23,42,0.14)]"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-lg text-cyan-700">
                  {item.icon}
                </span>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Confianza y alcance</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {TRUST_STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50/50 to-white px-6 py-8 text-center shadow-sm"
              >
                <div className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">{s.value}</div>
                <p className="mt-3 text-[14px] font-semibold leading-snug text-slate-800">{s.label}</p>
                <p className="mt-2 text-xs text-slate-500">{s.hint}</p>
              </div>
            ))}
          </div>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-3 md:grid-cols-2">
            {WHY_BULLETS.map((t) => (
              <li
                key={t}
                className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-[13px] leading-relaxed text-slate-700"
              >
                <span className="font-bold text-cyan-600">+</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-28 border-b border-slate-200/80 bg-gradient-to-b from-white via-[#f8fafc] to-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-center text-[1.65rem] font-bold tracking-tight text-slate-950 md:text-3xl lg:text-[2rem]">
            Cómo funciona tu proceso en Remata tu auto
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-slate-600 md:text-[16px]">
            Pasos ordenados para titulares: reunimos información, alineamos expectativas y avanzamos hacia tasación confirmada y
            publicación si el caso calza.
          </p>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {STEPS.map((step, idx) => (
              <article
                key={step.title}
                className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 pt-14 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/90 hover:shadow-[0_20px_40px_-16px_rgba(15,23,42,0.12)]"
              >
                <span className="absolute left-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#33C7E3] to-[#0ea5e9] text-sm font-bold text-white shadow-lg shadow-cyan-500/30">
                  {idx + 1}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{step.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <Link
              to={TASAR_PATH}
              className="inline-flex rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800"
            >
              Ir directo al formulario completo
            </Link>
            <span className="text-sm text-slate-500">Respuesta priorizada en horario hábil</span>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">Historias breves</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[15px] text-slate-600">
            Casos típicos (anonimizados) de quienes necesitaban cerrar el capítulo del auto.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.quote}
                className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-slate-50/40 p-7 shadow-sm"
              >
                <p className="flex-1 text-[14px] leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 border-t border-slate-200/80 pt-4">
                  <cite className="not-italic">
                    <span className="block text-sm font-bold text-slate-900">{t.name}</span>
                    <span className="text-xs text-slate-500">{t.meta}</span>
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-slate-900 bg-gradient-to-br from-[#0f172a] via-[#0c1222] to-[#0f172a] py-14 text-center text-white md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(51,199,227,0.22),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 md:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#5ee6ff]/90">Siguiente paso</p>
          <h2 className="mt-4 text-[1.5rem] font-bold leading-snug md:text-3xl">
            Miles de unidades han pasado por circuitos de remate y stock profesional
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
            Completa el formulario: cuanto más preciso seas con fotos y estado, más útil será la primera devolución del equipo.
          </p>
          <Link
            to={TASAR_PATH}
            className="mt-9 inline-flex rounded-2xl bg-[#FFC600] px-9 py-4 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/25 transition hover:brightness-105 active:scale-[0.98]"
          >
            Completar tasación ahora
          </Link>
        </div>
      </section>

      <section id="quienes-somos" className="scroll-mt-28 border-t border-slate-200/80 bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">Quiénes somos</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                <strong className="text-slate-800">Remata tu auto</strong> es la puerta de entrada para titulares que quieren
                rematar o vender sin enredarse. Operativamente, el proceso se apoya en{' '}
                <strong className="text-slate-800">Vedisa Remates</strong>: empresa chilena con años trabajando remates,
                inventario y canales digitales del segmento automotriz (incluyendo plataformas de vehículos siniestrados y stock
                publicado).
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                Lo que ves en esta web es un foco en tu necesidad — liquidar, resolver un siniestro o acelerar una venta — con el
                respaldo logístico y comercial de quien ya mueve alto volumen en el mercado.
              </p>
              <ul className="mt-8 space-y-3 text-[14px] text-slate-700">
                <li className="flex gap-2">
                  <span className="text-cyan-600">—</span>
                  Equipos que conocen tanto autos usados como siniestrados.
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-600">—</span>
                  Proceso documentado y alineado a términos legales publicados.
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-600">—</span>
                  Conexión natural con remates en línea, catálogo y automotora asociada.
                </li>
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white p-8 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.2)] md:p-10">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Respaldo operativo</p>
              <div className="mt-4">
                <VedisaLogo variant="header" />
              </div>
              <p className="mt-6 text-[13px] leading-relaxed text-slate-600">
                Vedisa Remates concentra la experiencia de remate y comercialización que hoy nutre este canal. Al enviar tu
                solicitud, te contacta un ejecutivo del equipo Vedisa siguiendo los estándares del grupo.
              </p>
              <a
                href="tel:+56989323397"
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl border-2 border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-900 transition hover:border-cyan-300 hover:bg-cyan-50/30"
              >
                Llamar: +56 9 8932 3397
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="referidos" className="scroll-mt-28 border-t border-slate-200/80 bg-slate-50/50 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">También te puede interesar</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            Otros canales del mismo ecosistema: remates en línea, catálogo y unidades de ocasión.
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
                  className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#0891b2] underline decoration-cyan-500/40 underline-offset-4 hover:decoration-cyan-600"
                >
                  {item.cta}
                  <span aria-hidden>↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-28 bg-[#f0f2f5] pb-28 pt-16 md:pt-20">
        <div className="mx-auto max-w-2xl px-4 md:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">Preguntas frecuentes</h2>
          <p className="mt-3 text-center text-[15px] text-slate-600">Antes de enviar tus datos, revisa estas respuestas rápidas.</p>
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
          <p className="mt-10 text-center text-sm text-slate-600">
            ¿Sigues con dudas?{' '}
            <Link to={TASAR_PATH} className="font-bold text-cyan-700 underline-offset-2 hover:underline">
              Ve al formulario
            </Link>{' '}
            o escríbenos por WhatsApp desde el encabezado.
          </p>
        </div>
      </section>
    </main>
  )
}
