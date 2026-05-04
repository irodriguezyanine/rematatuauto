import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LandingForm, type LeadPrefill } from '@/components/LandingForm'

type LocationState = { leadPrefill?: LeadPrefill } | null | undefined

export default function TasacionPage() {
  const { state } = useLocation()
  const incoming = (state as LocationState)?.leadPrefill
  const [prefill, setPrefill] = useState<LeadPrefill | null>(incoming ?? null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="bg-[#f6f8fa] pb-20 pt-10 md:pb-28 md:pt-14">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <nav className="mb-8 text-[13px] font-semibold">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 transition hover:text-slate-950"
          >
            <span aria-hidden>←</span> Volver al inicio
          </Link>
        </nav>
        <LandingForm id="tasacion-form" prefill={prefill} onPrefillConsumed={() => setPrefill(null)} />
      </div>
    </main>
  )
}
