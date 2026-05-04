/** Marca SVG — REMATA TU AUTO by VEDISA REMATES */
import { useId } from 'react'

export function VedisaMark({ className = '', light = false }: { className?: string; light?: boolean }) {
  const uid = useId().replace(/:/g, '')
  const gidGold = `rtv-gold-${uid}`
  const gidCyan = `rtv-cyan-${uid}`
  const titleFill = light ? '#f8fafc' : '#0a1628'

  return (
    <div className={className} aria-label="REMATA TU AUTO by VEDISA REMATES">
      <svg viewBox="0 0 360 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto md:h-12">
        <defs>
          <linearGradient id={gidGold} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD54A" />
            <stop offset="100%" stopColor="#FFC600" />
          </linearGradient>
          <linearGradient id={gidCyan} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5ED4EF" />
            <stop offset="100%" stopColor="#33C7E3" />
          </linearGradient>
        </defs>
        <g transform="translate(8,10)">
          <rect x="0" y="8" width="52" height="30" rx="8" fill={`url(#${gidCyan})`} opacity={light ? 0.35 : 0.15} />
          <path
            d="M8 36 L18 20 L34 20 L44 36 L36 36 L32 28 L20 28 L16 36 Z M24 24 L28 24 L26 20 Z"
            fill={`url(#${gidCyan})`}
          />
          <circle cx="18" cy="38" r="3.5" fill={light ? '#cbd5e1' : '#0a1628'} />
          <circle cx="38" cy="38" r="3.5" fill={light ? '#cbd5e1' : '#0a1628'} />
        </g>
        <text x="72" y="34" fill={titleFill} fontSize="22" fontWeight="800" fontFamily="DM Sans, system-ui">
          REMATA TU AUTO
        </text>
        <text
          x="72"
          y="54"
          fill={`url(#${gidGold})`}
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.18em"
          fontFamily="DM Sans, system-ui"
        >
          BY VEDISA REMATES
        </text>
      </svg>
    </div>
  )
}
