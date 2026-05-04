const LOGO_SRC = '/logo-vedisaremates.png'

type VedisaLogoProps = {
  className?: string
  variant?: 'header' | 'footer'
}

/** Logo Vedisa oficial — PNG con fondo tratado para transparencia en /public/logo-vedisaremates.png */
export function VedisaLogo({ className = '', variant = 'header' }: VedisaLogoProps) {
  const isFooter = variant === 'footer'

  return (
    <div
      className={`inline-flex items-center ${isFooter ? 'drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)]' : ''} ${className}`.trim()}
    >
      <img
        src={LOGO_SRC}
        alt="VEDISA REMATES"
        className={`h-9 w-auto max-w-[200px] object-contain object-left md:h-10 md:max-w-[240px] ${
          isFooter ? 'brightness-110 contrast-105' : ''
        }`}
        width={260}
        height={72}
        loading="eager"
        decoding="async"
      />
    </div>
  )
}
