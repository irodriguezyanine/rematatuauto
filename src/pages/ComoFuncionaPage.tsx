import { Link } from 'react-router-dom'
import { PROCESS_STEPS } from '@/content/siteContent'
import { TASAR_PATH } from '@/routes'

export default function ComoFuncionaPage() {
  return (
    <main className="border-b border-slate-200/80 bg-gradient-to-b from-white via-[#f8fafc] to-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <nav className="mb-10 text-[13px] font-semibold" aria-label="Migas de pan">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 transition hover:text-slate-950">
            <span aria-hidden>←</span> Volver al inicio
          </Link>
        </nav>
        <h1 className="text-center text-[1.65rem] font-bold tracking-tight text-slate-950 md:text-3xl lg:text-[2rem]">
          Cómo funciona tu proceso en Remata tu auto
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-slate-600 md:text-[16px]">
          Pasos ordenados para titulares: reunimos información, alineamos expectativas y avanzamos hacia tasación confirmada y
          publicación si el caso calza.
        </p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {PROCESS_STEPS.map((step, idx) => (
            <article
              key={step.title}
              className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 pt-14 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/90 hover:shadow-[0_20px_40px_-16px_rgba(15,23,42,0.12)]"
            >
              <span className="absolute left-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#33C7E3] to-[#0ea5e9] text-sm font-bold text-white shadow-lg shadow-cyan-500/30">
                {idx + 1}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{step.title}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{step.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Link
            to={TASAR_PATH}
            className="inline-flex rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800"
          >
            Ir al formulario completo
          </Link>
          <span className="text-sm text-slate-500">Respuesta priorizada en horario hábil</span>
        </div>
      </div>
    </main>
  )
}
