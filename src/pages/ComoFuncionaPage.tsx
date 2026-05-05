import { Link } from 'react-router-dom'
import { PROCESS_STEPS } from '@/content/siteContent'
import { WHATSAPP_HREF } from '@/lib/config'
import { TASAR_PATH } from '@/routes'

const STEP_ICONS = [
  // Datos del vehículo
  (props: { className?: string }) => (
    <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.404H15.75M14.25 18.75h-1.875a1.125 1.125 0 01-1.125-1.125v-1.5a1.125 1.125 0 011.125-1.125h4.125a1.125 1.125 0 011.125 1.125v4.125c0 .621-.504 1.125-1.125 1.125H18.75M14.25 18.75h.008v.008H14.25v-.008z"
      />
    </svg>
  ),
  // Fotos
  (props: { className?: string }) => (
    <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9a2.25 2.25 0 012.25-2.25h1.379a2.25 2.25 0 001.935-1.105l.486-.729A2.25 2.25 0 0110.727 4h2.546a2.25 2.25 0 011.935 1.106l.486.729A2.25 2.25 0 0018.75 6.75H19.5a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-16.5A2.25 2.25 0 013 18.75v-9z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 13.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  // Revisión / análisis
  (props: { className?: string }) => (
    <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1.5 3m8.5-3l1.5 3m0 0l3-3m-3 3H9"
      />
    </svg>
  ),
  // Remate / ruta comercial
  (props: { className?: string }) => (
    <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.875a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" />
    </svg>
  ),
] as const

export default function ComoFuncionaPage() {
  return (
    <main className="relative overflow-hidden border-b border-slate-200/80">
      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-cyan-200/45 via-sky-100/25 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-48 h-[380px] w-[380px] rounded-full bg-gradient-to-bl from-[#ffc600]/20 via-amber-100/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[min(100%,56rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200/90 to-transparent" />

      {/* Franja superior */}
      <div className="relative border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 pt-10 md:px-8 md:pt-14">
          <nav className="mb-8" aria-label="Migas de pan">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-4 py-2 text-[13px] font-semibold text-slate-600 shadow-sm transition hover:border-cyan-200/80 hover:bg-cyan-50/40 hover:text-slate-900"
            >
              <span
                className="transition group-hover:-translate-x-0.5"
                aria-hidden
              >
                ←
              </span>
              Volver al inicio
            </Link>
          </nav>

          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-700">Proceso guiado</p>
            <h1 className="mt-4 text-balance text-[1.75rem] font-bold leading-[1.15] tracking-tight text-slate-950 sm:text-3xl md:text-4xl lg:text-[2.35rem]">
              Cómo funciona tu proceso en{' '}
              <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">Remata tu auto</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-slate-600 md:text-[17px]">
              Pasos ordenados para titulares: reunimos información, alineamos expectativas y avanzamos hacia tasación confirmada
              y publicación si el caso calza.
            </p>
          </div>
        </div>
      </div>

      {/* Pasos + línea de tiempo (desktop) */}
      <div className="relative mx-auto max-w-6xl px-4 pb-20 md:px-8 md:pb-28">
        <div
          className="relative mt-14 md:mt-16"
          role="list"
          aria-label="Pasos del proceso"
        >
          {/* Conector horizontal entre círculos (solo lg+) */}
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-[2.25rem] hidden h-[3px] rounded-full bg-gradient-to-r from-cyan-200/80 via-cyan-400/50 to-[#ffc600]/50 lg:block"
            aria-hidden
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = STEP_ICONS[idx] ?? STEP_ICONS[0]
              const stepNum = String(idx + 1).padStart(2, '0')
              return (
                <article
                  key={step.title}
                  role="listitem"
                  className="group relative flex flex-col rounded-[1.35rem] border border-slate-200/90 bg-white/90 p-6 pt-8 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.08)] ring-1 ring-white/80 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-200/70 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.12)]"
                >
                  {/* Barra superior gradiente */}
                  <div
                    className="absolute inset-x-0 top-0 h-1 rounded-t-[1.35rem] bg-gradient-to-r from-cyan-500 via-sky-500 to-[#e6b800]/90 opacity-90 transition group-hover:opacity-100"
                    aria-hidden
                  />

                  <div className="relative z-[1] mb-5 flex items-start justify-between gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-cyan-50/80 text-cyan-700 shadow-inner shadow-white/50 ring-1 ring-cyan-100/80 transition group-hover:from-cyan-50 group-hover:to-sky-50 group-hover:text-cyan-800">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#33C7E3] to-[#0ea5e9] text-sm font-black text-white shadow-lg shadow-cyan-500/35 ring-4 ring-white">
                      {idx + 1}
                    </span>
                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Paso {stepNum}</p>
                  <h2 className="mt-2 text-lg font-bold leading-snug text-slate-900 md:text-xl">{step.title}</h2>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slate-600 md:text-[15px]">{step.body}</p>

                  <div
                    className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-cyan-700/90 opacity-0 transition group-hover:opacity-100"
                    aria-hidden
                  >
                    <span className="inline-block h-1 w-1 rounded-full bg-cyan-500" />
                    Siguiente etapa
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* CTA compuesto */}
        <div className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-[1.75rem] border border-slate-800/10 bg-gradient-to-br from-slate-900 via-slate-900 to-[#0c1222] p-8 text-center shadow-[0_32px_64px_-24px_rgba(15,23,42,0.45)] md:p-10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-30%,rgba(51,199,227,0.22),transparent)]"
            aria-hidden
          />
          <div className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7ee8fc]/95">Listo cuando tú lo estés</p>
            <p className="mx-auto mt-4 max-w-lg text-lg font-semibold leading-snug text-white md:text-xl">
              Completa el formulario con fotos y datos. Te contactamos con propuesta de trabajo en horario hábil.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              <Link
                to={TASAR_PATH}
                className="inline-flex items-center justify-center rounded-2xl bg-[#ffc600] px-8 py-4 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:brightness-105 active:scale-[0.98]"
              >
                Ir al formulario completo
              </Link>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.057-.001c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 0 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.359.194 1.868.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.379l-.361-.215-3.741.983.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.496 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.889-5.335 11.892-11.892a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
            <p className="mt-6 text-[13px] font-medium text-slate-400">
              Respuesta priorizada en horario hábil · Sin costo por enviar tu solicitud desde la web
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
