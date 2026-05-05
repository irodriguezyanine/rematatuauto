import { useCallback, useRef } from 'react'
import { GOOGLE_STYLE_REVIEWS } from '@/content/googleStyleReviews'

function GoogleStars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="Calificación 5 de 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className="h-4 w-4 text-[#fbbc04]"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  )
}

export function GoogleReviewsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollByCards = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-review-card]')
    const w = card ? card.offsetWidth + 16 : 340
    el.scrollBy({ left: dir * w * 1.5, behavior: 'smooth' })
  }, [])

  return (
    <section
      className="border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/40 to-white py-16 md:py-20"
      aria-labelledby="reviews-carousel-title"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Opiniones de clientes</p>
            <h2 id="reviews-carousel-title" className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              Lo que comentan quienes vendieron con nosotros
            </h2>
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-slate-600">
              Ejemplos ilustrativos con formato similar a reseñas <span className="font-semibold text-slate-800">Google</span>{' '}
              (5 estrellas). No constituyen opiniones verificadas en plataformas externas. Para opiniones públicas reales, puedes{' '}
              <a
                href="https://www.google.com/search?q=Vedisa+Remates"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-cyan-700 underline decoration-cyan-500/40 underline-offset-2 hover:decoration-cyan-600"
              >
                revisar Vedisa Remates en Google
              </a>
              .
            </p>
          </div>
          <div className="flex shrink-0 gap-2 md:pb-1">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              aria-label="Ver reseñas anteriores"
            >
              <span aria-hidden className="text-lg leading-none">
                ‹
              </span>
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              aria-label="Ver reseñas siguientes"
            >
              <span aria-hidden className="text-lg leading-none">
                ›
              </span>
            </button>
          </div>
        </div>

        <div className="relative mt-10 -mx-4 md:-mx-8">
          <div
            className="pointer-events-none absolute bottom-0 left-0 top-0 z-[1] w-8 bg-gradient-to-r from-white via-white/90 to-transparent md:w-16 md:from-slate-50/90"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 top-0 z-[1] w-8 bg-gradient-to-l from-white via-white/90 to-transparent md:w-16 md:from-slate-50/90"
            aria-hidden
          />

          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-4 pb-4 pt-1 scrollbar-thin md:px-8"
            style={{ scrollbarWidth: 'thin' }}
            role="region"
            aria-roledescription="carrusel"
            aria-label="Reseñas de clientes"
            tabIndex={0}
          >
            {GOOGLE_STYLE_REVIEWS.map((r) => {
              const initial = r.name.trim().charAt(0).toUpperCase()
              return (
                <article
                  key={`${r.name}-${r.timeAgo}`}
                  data-review-card
                  className="w-[min(100%,300px)] shrink-0 snap-center rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.1)] sm:w-[min(100%,320px)] md:p-6"
                >
                  <div className="flex gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${r.avatarClass}`}
                      aria-hidden
                    >
                      {initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="truncate text-[15px] font-medium text-slate-900">{r.name}</span>
                      </div>
                      <p className="text-[12px] text-slate-500">{r.timeAgo}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <GoogleStars />
                    <span className="text-[12px] font-semibold text-slate-700">5,0</span>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-slate-700">{r.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
