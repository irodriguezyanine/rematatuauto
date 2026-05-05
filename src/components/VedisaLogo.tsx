const LOGO_SRC = '/logo-vedisaremates.png'

type VedisaLogoProps = {
  className?: string
  variant?: 'header' | 'footer'
}

/** Logo Vedisa oficial — PNG con fondo tratado para transparencia en /public/logo-vedisaremates.png */
export function VedisaLogo({ className = '', variant = 'header' }: VedisaLogoProps) {
  const isFooter = variant === 'footer'

  return (
    <div className={`inline-flex items-center ${className}`.trim()}>
      <img
        src={LOGO_SRC}
        alt="Vedisa Remates — respaldo operativo de Remata tu auto"
        className={`h-10 w-auto max-w-[min(100%,280px)] object-contain object-left sm:h-[2.85rem] md:h-12 md:max-w-[320px] ${
          isFooter ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]' : ''
        }`}
        width={443}
        height={108}
        sizes="(min-width:768px) 320px, 280px"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  )
}
