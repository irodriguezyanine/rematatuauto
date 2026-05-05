import { Link } from 'react-router-dom'
import { VedisaLogo } from '@/components/VedisaLogo'
import { TASAR_PATH } from '@/routes'

const VEDISA_PORTALES = [
  {
    title: 'Vedisa Remates',
    href: 'https://www.vedisaremates.cl/',
    description:
      'Portal principal del grupo: presencia institucional, líneas de negocio y punto de contacto con Vedisa Remates en Chile.',
  },
  {
    title: 'Catálogo Vedisa',
    href: 'https://catalogo.vedisaremates.cl/',
    description:
      'Catálogo oficial de stock: unidades disponibles, fichas y acceso al inventario que complementa remates y ventas del ecosistema.',
  },
  {
    title: 'Vehículos de ocasión',
    href: 'https://vehiculosdeocasion.cl/',
    description:
      'Automotora de seminuevos y vehículos de ocasión para quien busca comprar con respaldo del mismo grupo operativo.',
  },
  {
    title: 'Vehículos Chocados',
    href: 'https://www.vehiculoschocados.cl/',
    description:
      'Plataforma de remates en línea orientada a siniestrados y vehículos chocados, con subastas y información para postores.',
  },
  {
    title: 'Remata tu auto',
    href: 'https://www.rematatuauto.com/',
    description:
      'Este canal para titulares: tasación orientativa, solicitud en línea y coordinación con ejecutivos para remate o venta.',
  },
] as const

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
            <p className="mt-4 text-center text-xs text-slate-500">
              También puedes avanzar desde{' '}
              <Link to={TASAR_PATH} className="font-semibold text-cyan-700 underline-offset-2 hover:underline">
                tasar en esta web
              </Link>
              .
            </p>
          </div>
        </div>

        <section className="mt-20 border-t border-slate-200/80 pt-16 md:mt-24 md:pt-20" aria-labelledby="ecosistema-vedisa">
          <h2 id="ecosistema-vedisa" className="text-xl font-bold tracking-tight text-slate-950 md:text-2xl">
            Ecosistema digital Vedisa Remates
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-600">
            Accesos directos a cada portal del grupo. Elige según si vendes, compras en remate, revisas catálogo u ocasión.
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3" role="list">
            {VEDISA_PORTALES.map((portal) => (
              <li key={portal.href}>
                <a
                  href={portal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/40 p-6 shadow-[0_8px_28px_-12px_rgba(15,23,42,0.1)] transition hover:-translate-y-0.5 hover:border-cyan-200/80 hover:shadow-[0_16px_40px_-16px_rgba(15,23,42,0.12)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-slate-900">{portal.title}</h3>
                    <span className="shrink-0 rounded-lg bg-cyan-50 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-cyan-800">
                      Visitar
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-slate-600">{portal.description}</p>
                  <p className="mt-4 break-all text-[12px] font-semibold text-cyan-700 underline decoration-cyan-500/35 underline-offset-4">
                    {portal.href.replace(/^https:\/\//, '')}
                    <span className="ml-1 inline-block text-slate-400 no-underline" aria-hidden>
                      ↗
                    </span>
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
