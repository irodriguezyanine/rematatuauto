import { Link } from 'react-router-dom'
import { footerLegalShort, PRIVACY_URL, TERMS_URL } from '@/content/legalCopy'

export default function LegalesPage() {
  return (
    <main className="border-b border-slate-200/80 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <nav className="mb-10 text-[13px] font-semibold" aria-label="Migas de pan">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 transition hover:text-slate-950">
            <span aria-hidden>←</span> Volver al inicio
          </Link>
        </nav>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">Información legal</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
          Documentos oficiales y aclaraciones sobre el uso de este sitio. Priman siempre los textos publicados en los enlaces
          externos de términos y privacidad.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-8">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Documentos</h2>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              className="inline-flex font-bold text-cyan-800 underline decoration-cyan-500/40 underline-offset-4 hover:decoration-cyan-600"
              href={TERMS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Términos y condiciones (sitio oficial)
            </a>
            <a
              className="inline-flex font-bold text-cyan-800 underline decoration-cyan-500/40 underline-offset-4 hover:decoration-cyan-600"
              href={PRIVACY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de privacidad (sitio oficial)
            </a>
          </div>
        </div>

        <div className="mt-10 space-y-5 text-[13px] leading-relaxed text-slate-600">
          {footerLegalShort.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>
    </main>
  )
}
