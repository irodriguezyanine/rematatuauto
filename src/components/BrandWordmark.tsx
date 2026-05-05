import { Link } from 'react-router-dom'

type BrandWordmarkProps = {
  className?: string
  /** Si true, envuelve en Link a inicio */
  asLink?: boolean
}

/** Marca principal del sitio: Remata tu auto (Vedisa queda en Quiénes somos / pie). */
export function BrandWordmark({ className = '', asLink = false }: BrandWordmarkProps) {
  const block = (
    <>
      <span className="font-extrabold tracking-tight text-slate-900">
        <span className="text-[1.05rem] sm:text-xl md:text-[1.35rem]">Remata tu </span>
        <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-[1.05rem] text-transparent sm:text-xl md:text-[1.35rem]">
          auto
        </span>
      </span>
      <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:block">
        Vende o remata sin vueltas
      </span>
    </>
  )

  const wrapClass = `inline-flex flex-col items-start gap-0.5 ${className}`.trim()

  if (asLink) {
    return (
      <Link
        to="/"
        className={`min-w-0 rounded-lg py-0.5 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 ${className}`.trim()}
      >
        <span className="inline-flex flex-col items-start gap-0.5">{block}</span>
      </Link>
    )
  }

  return <span className={wrapClass}>{block}</span>
}