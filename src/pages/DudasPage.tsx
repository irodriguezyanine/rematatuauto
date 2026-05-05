import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FAQ_ITEMS } from '@/content/siteContent'
import { TASAR_PATH } from '@/routes'

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

export default function DudasPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <main className="bg-[#f0f2f5] py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 md:px-8">
        <nav className="mb-10 text-[13px] font-semibold" aria-label="Migas de pan">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 transition hover:text-slate-950">
            <span aria-hidden>←</span> Volver al inicio
          </Link>
        </nav>
        <h1 className="text-center text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">Preguntas frecuentes</h1>
        <p className="mt-3 text-center text-[15px] text-slate-600">Antes de enviar tus datos, revisa estas respuestas rápidas.</p>
        <div className="mt-11 divide-y divide-slate-200/90 rounded-[1.5rem] border border-slate-200 bg-white px-1 shadow-[0_16px_48px_-20px_rgba(15,23,42,0.1)]">
          {FAQ_ITEMS.map((item, i) => (
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
    </main>
  )
}
