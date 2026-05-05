import { Link } from 'react-router-dom'
import { VedisaLogo } from '@/components/VedisaLogo'

export default function QuienesSomosPage() {
  return (
    <main className="border-b border-slate-200/80 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <nav className="mb-10 text-[13px] font-semibold" aria-label="Migas de pan">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 transition hover:text-slate-950">
            <span aria-hidden>←</span> Volver al inicio
          </Link>
        </nav>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">Quiénes somos</h1>
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
    </main>
  )
}
