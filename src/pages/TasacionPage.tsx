import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LandingForm, type LeadPrefill } from '@/components/LandingForm'

type LocationState = { leadPrefill?: LeadPrefill } | null | undefined

export default function TasacionPage() {
  const { state } = useLocation()
  const incoming = (state as LocationState)?.leadPrefill
  const [prefill, setPrefill] = useState<LeadPrefill | null>(incoming ?? null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="bg-[#f6f8fa] pb-20 pt-10 md:pb-28 md:pt-14">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <nav className="mb-8 text-[13px] font-semibold" aria-label="Migas de pan">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 transition hover:text-slate-950"
          >
            <span aria-hidden>←</span> Volver al inicio
          </Link>
        </nav>

        <header className="mb-10 rounded-2xl border border-slate-200/90 bg-white px-6 py-8 shadow-sm md:px-10 md:py-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-700">Remata tu auto</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            Cierra el proceso: datos del auto, fotos y contacto
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-600">
            Si no pudiste vender por el canal tradicional, estás con un siniestro o necesitas respuesta rápida, este formulario
            concentra todo lo que el equipo necesita para devolverte la llamada con contexto.
          </p>
          <ul className="mt-6 grid gap-3 text-[13px] text-slate-700 sm:grid-cols-3">
            <li className="rounded-xl bg-slate-50 px-4 py-3 font-medium">Sin costo por enviar la solicitud</li>
            <li className="rounded-xl bg-slate-50 px-4 py-3 font-medium">Referencia de precio si hay datos disponibles</li>
            <li className="rounded-xl bg-slate-50 px-4 py-3 font-medium">Prioridad en horario hábil</li>
          </ul>
        </header>

        <LandingForm id="tasacion-form" prefill={prefill} onPrefillConsumed={() => setPrefill(null)} />
      </div>
    </main>
  )
}
