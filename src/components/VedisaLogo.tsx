const LOGO_SRC = '/logo-vedisaremates.png'

type VedisaLogoProps = {
  className?: string
  variant?: 'header' | 'footer'
}

/** Logo Vedisa oficial — archivo en /public/logo-vedisaremates.png */
export function VedisaLogo({ className = '', variant = 'header' }: VedisaLogoProps) {
  const wrapper =
    variant === 'footer'
      ? 'inline-flex rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-white/10'
      : 'inline-flex rounded-2xl bg-neutral-950 px-4 py-2.5 shadow-md ring-1 ring-black/10'

  return (
    <div className={`${wrapper} ${className}`.trim()}>
      <img
        src={LOGO_SRC}
        alt="VEDISA REMATES"
        className="h-9 w-auto max-w-[220px] object-contain object-left md:h-11 md:max-w-[260px]"
        width={260}
        height={72}
        loading="eager"
        decoding="async"
      />
    </div>
  )
}
