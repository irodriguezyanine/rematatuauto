import { type FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { AutoredVehicleInfo } from '@/lib/autored'
import { fetchAutoredByLicensePlate, formatClPeso } from '@/lib/autored'
import { consentCheckboxLabel, PRIVACY_URL, TERMS_URL } from '@/content/legalCopy'
import { getFormspreeUrl, getSupabaseAutoredConfig, WHATSAPP_HREF } from '@/lib/config'
import {
  formatKmDots,
  isEmailValid,
  normalizePatente,
  onlyDigits,
  yearRange,
} from '@/lib/format'
import { uploadImageToCloudinary } from '@/lib/uploadCloudinary'

export type LeadPrefill = {
  patente?: string
  anio?: string
  marca?: string
  modelo?: string
}

type FieldErrors = Partial<
  Record<'patente' | 'estado' | 'marca' | 'modelo' | 'anio' | 'kilometraje' | 'nombre' | 'telefono' | 'email', string>
>

const ESTADOS = [
  { value: '', label: 'Selecciona el estado…' },
  { value: 'Funciona', label: 'Funciona (andando)' },
  { value: 'Funciona con problemas', label: 'Funciona con problemas' },
  { value: 'No funciona', label: 'No funciona (no anda)' },
] as const

function buildComentarios(
  user: string,
  ar: AutoredVehicleInfo | null,
  consentLogLine: string | null,
): string {
  const u = user.trim()
  const lines: string[] = []
  if (u) lines.push(u)
  if (ar && ar.precio_vedisa != null) {
    lines.push(
      `Referencia orientativa de remate (previa inspección, canal Remata tu auto / Vedisa): ${formatClPeso(ar.precio_vedisa)}`,
    )
  }
  if (consentLogLine) lines.push(consentLogLine)
  return lines.join('\n\n').trim()
}

type LandingFormProps = {
  id: string
  prefill?: LeadPrefill | null
  onPrefillConsumed?: () => void
}

export function LandingForm({ id, prefill, onPrefillConsumed }: LandingFormProps) {
  const years = useMemo(() => yearRange(), [])
  const supabaseReady = !!getSupabaseAutoredConfig()

  const [patente, setPatente] = useState('')
  const [estado, setEstado] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [anio, setAnio] = useState(String(years[0]))
  const [kilometraje, setKilometraje] = useState('')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [comentarios, setComentarios] = useState('')

  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [uploadPhase, setUploadPhase] = useState<string | null>(null)
  const [photoError, setPhotoError] = useState(false)

  const [autoredLoading, setAutoredLoading] = useState(false)
  const [autoredHint, setAutoredHint] = useState<string | null>(null)
  const [autoredData, setAutoredData] = useState<AutoredVehicleInfo | null>(null)

  const [errors, setErrors] = useState<FieldErrors>({})
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [consentError, setConsentError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const lastLookupRef = useRef('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const photoUrlsHidden = uploadedUrls.filter(Boolean).join('\n')

  useEffect(() => {
    if (!prefill || Object.keys(prefill).length === 0) return
    if (prefill.patente) setPatente(normalizePatente(prefill.patente))
    if (prefill.anio) setAnio(prefill.anio)
    if (prefill.marca) setMarca(prefill.marca)
    if (prefill.modelo) setModelo(prefill.modelo)
    onPrefillConsumed?.()
  }, [prefill, onPrefillConsumed])

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f))
    setPreviews(urls)
    return () => urls.forEach((u) => URL.revokeObjectURL(u))
  }, [files])

  useEffect(() => {
    const p = normalizePatente(patente)
    if (p.length < 5 || !supabaseReady) {
      lastLookupRef.current = ''
      return
    }
    if (p === lastLookupRef.current) return

    const t = window.setTimeout(async () => {
      setAutoredLoading(true)
      setAutoredHint(null)
      const res = await fetchAutoredByLicensePlate(p)
      setAutoredLoading(false)
      if (!res.ok) {
        setAutoredData(null)
        setAutoredHint('No encontramos datos automáticos para esta patente. Completa marca y modelo a mano.')
        return
      }
      lastLookupRef.current = p
      setAutoredData(res.data)
      setAutoredHint('Completamos algunos campos con tu patente. Verifícalos antes de enviar.')
      const d = res.data
      if (d.marca) setMarca(d.marca)
      if (d.modelo) setModelo(d.modelo)
      if (d.ano) setAnio(d.ano)
    }, 650)

    return () => window.clearTimeout(t)
  }, [patente, supabaseReady])

  const onPatenteInput = (v: string) => {
    setPatente(normalizePatente(v))
    lastLookupRef.current = ''
  }

  const validate = useCallback((): boolean => {
    const e: FieldErrors = {}
    const pat = normalizePatente(patente)
    if (!pat) e.patente = 'Ingresa la patente.'
    if (!estado) e.estado = 'Selecciona el estado del vehículo.'
    if (!marca.trim()) e.marca = 'Ingresa la marca.'
    if (!modelo.trim()) e.modelo = 'Ingresa el modelo.'
    const y = parseInt(anio, 10)
    if (!Number.isFinite(y) || y < 2005 || y > years[0]) e.anio = 'Año no válido.'
    const km = onlyDigits(kilometraje)
    if (!km) e.kilometraje = 'Ingresa el kilometraje.'
    if (!nombre.trim()) e.nombre = 'Tu nombre es obligatorio.'
    if (!telefono.trim()) e.telefono = 'Teléfono / WhatsApp obligatorio.'
    if (!isEmailValid(email)) e.email = 'Correo no válido.'
    if (!consentAccepted) setConsentError('Debes aceptar términos y autorización de contacto para continuar.')
    else setConsentError(null)
    setErrors(e)
    const fieldsOk = Object.keys(e).length === 0
    return fieldsOk && consentAccepted
  }, [
    patente,
    estado,
    marca,
    modelo,
    anio,
    kilometraje,
    nombre,
    telefono,
    email,
    years,
    consentAccepted,
  ])

  const uploadAll = useCallback(async (list: File[]) => {
    if (list.length === 0) {
      setUploadedUrls([])
      return
    }
    setPhotoError(false)
    const urls: string[] = new Array(list.length)
    for (let i = 0; i < list.length; i++) {
      setUploadPhase(`Subiendo fotos ${i + 1} / ${list.length}`)
      try {
        urls[i] = await uploadImageToCloudinary(list[i]!)
      } catch {
        setPhotoError(true)
        setUploadPhase(null)
        throw new Error('upload')
      }
    }
    setUploadedUrls(urls)
    setUploadPhase(null)
  }, [])

  const onPickFiles = (list: FileList | null) => {
    if (!list?.length) {
      setFiles([])
      setUploadedUrls([])
      return
    }
    const arr = Array.from(list).slice(0, 10)
    setFiles(arr)
    setUploadedUrls([])
    void uploadAll(arr)
  }

  const removePhotoAt = (idx: number) => {
    const nf = files.filter((_, i) => i !== idx)
    setFiles(nf)
    void uploadAll(nf)
  }

  const resetForm = () => {
    setPatente('')
    setEstado('')
    setMarca('')
    setModelo('')
    setAnio(String(years[0]))
    setKilometraje('')
    setNombre('')
    setTelefono('')
    setEmail('')
    setComentarios('')
    setFiles([])
    setUploadedUrls([])
    setAutoredData(null)
    setAutoredHint(null)
    setErrors({})
    setConsentAccepted(false)
    setConsentError(null)
    setSuccess(false)
    lastLookupRef.current = ''
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    try {
      if (files.length && uploadedUrls.filter(Boolean).length !== files.length) {
        await uploadAll(files)
      }

      const fd = new FormData()
      fd.append('patente', normalizePatente(patente))
      fd.append('estado', estado)
      fd.append('marca', marca.trim())
      fd.append('modelo', modelo.trim())
      fd.append('anio', anio.trim())
      fd.append('kilometraje', onlyDigits(kilometraje))
      fd.append('nombre', nombre.trim())
      fd.append('telefono', telefono.trim())
      fd.append('email', email.trim())
      fd.append(
        'comentarios',
        buildComentarios(
          comentarios,
          autoredData,
          'El usuario aceptó términos, política de privacidad y contacto comercial en rematatuauto (Remata tu auto).',
        ),
      )
      fd.append('photo_urls', photoUrlsHidden)

      const res = await fetch(getFormspreeUrl(), {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error('formspree')
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      alert('No se pudo enviar el formulario. Revisa tu conexión e intenta nuevamente.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <section className="mx-auto max-w-lg rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-900/10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Listo: solicitud recibida</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
          Gracias por usar <strong>Remata tu auto</strong>. Un ejecutivo se pondrá en contacto contigo para continuar con la
          tasación y los siguientes pasos.
        </p>
        <p className="mt-2 text-[13px] text-slate-500">
          Si es urgente, abre WhatsApp con el botón de abajo y menciona que ya enviaste el formulario.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={resetForm}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
          >
            Enviar otra solicitud
          </button>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:brightness-[1.02]"
          >
            Continuar por WhatsApp
          </a>
        </div>
      </section>
    )
  }

  return (
    <section id={id} className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/[0.06] md:p-10">
        <div className="mb-10 text-center md:text-left">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-700">Formulario completo</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Tasación y contacto — prioridad en horario hábil
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
            Con estos datos el equipo prepara tu caso: tradicional, urgente o con daños. Las cifras en pantalla son referenciales
            hasta revisión comercial o inspección.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-[13px] font-semibold tracking-tight text-slate-700">Patente</label>
              <input
                value={patente}
                onChange={(e) => onPatenteInput(e.target.value)}
                placeholder="ABCD12"
                className={`mt-2 w-full rounded-2xl border px-4 py-3 text-lg font-bold uppercase tracking-widest text-slate-900 shadow-sm outline-none transition placeholder:font-semibold placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-300 focus:ring-2 focus:ring-cyan-200 sm:max-w-md ${
                  errors.patente ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
                }`}
                maxLength={8}
                autoComplete="off"
              />
              {errors.patente && <p className="mt-2 text-sm font-semibold text-red-600">{errors.patente}</p>}
              {!supabaseReady && (
                <p className="mt-2 text-xs text-slate-500">
                  Si no ves sugerencias automáticas al escribir la patente, completa marca y modelo manualmente.
                </p>
              )}
              {supabaseReady && (
                <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  {autoredLoading && (
                    <>
                      <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
                      Buscando datos del vehículo…
                    </>
                  )}
                  {!autoredLoading && autoredHint && <span className="font-medium text-cyan-800">{autoredHint}</span>}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Estado del vehículo</label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className={`mt-2 w-full rounded-2xl border px-4 py-3 text-[15px] font-semibold text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-cyan-100 ${
                  errors.estado ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
                }`}
              >
                {ESTADOS.map((o) => (
                  <option key={o.value || 'empty'} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              {errors.estado && <p className="mt-2 text-sm font-semibold text-red-600">{errors.estado}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-semibold tracking-tight text-slate-700">Año</label>
              <select
                value={anio}
                onChange={(e) => setAnio(e.target.value)}
                className={`mt-2 w-full rounded-2xl border px-4 py-3 text-[15px] font-semibold text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-cyan-100 ${
                  errors.anio ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
                }`}
              >
                {years.map((y) => (
                  <option key={y} value={String(y)}>
                    {y}
                  </option>
                ))}
              </select>
              {errors.anio && <p className="mt-2 text-sm font-semibold text-red-600">{errors.anio}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-semibold tracking-tight text-slate-700">Marca</label>
              <input
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Ej. Nissan"
                className={`mt-2 w-full rounded-2xl border px-4 py-3 text-[15px] shadow-sm outline-none focus:ring-2 focus:ring-cyan-100 ${
                  errors.marca ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
                }`}
              />
              {errors.marca && <p className="mt-2 text-sm font-semibold text-red-600">{errors.marca}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-semibold tracking-tight text-slate-700">Modelo</label>
              <input
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                placeholder="Ej. Qashqai"
                className={`mt-2 w-full rounded-2xl border px-4 py-3 text-[15px] shadow-sm outline-none focus:ring-2 focus:ring-cyan-100 ${
                  errors.modelo ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
                }`}
              />
              {errors.modelo && <p className="mt-2 text-sm font-semibold text-red-600">{errors.modelo}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Kilometraje</label>
              <input
                value={kilometraje}
                onChange={(e) => setKilometraje(formatKmDots(e.target.value))}
                onBlur={() => setKilometraje(formatKmDots(kilometraje))}
                inputMode="numeric"
                placeholder="85.000"
                className={`mt-2 w-full rounded-2xl border px-4 py-3 text-[15px] shadow-sm outline-none focus:ring-2 focus:ring-cyan-100 ${
                  errors.kilometraje ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
                }`}
              />
              {errors.kilometraje && <p className="mt-2 text-sm font-semibold text-red-600">{errors.kilometraje}</p>}
            </div>
          </div>

          {autoredData?.precio_vedisa != null && (
            <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50/90 to-white px-5 py-5 shadow-sm shadow-cyan-900/5">
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-900">Referencia orientativa de remate</p>
              <p className="mt-2 text-[13px] font-medium leading-snug text-slate-800 md:text-[14px]">
                Aproximación previa a inspección o revisión documental. No es oferta ni precio final.
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Misma referencia que usa el canal comercial Vedisa Remates; sujetá a cambios según estado real del vehículo.
              </p>
              <div className="mt-4 rounded-xl bg-white px-5 py-4 shadow-md ring-1 ring-slate-100">
                <div className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  {formatClPeso(autoredData.precio_vedisa)}
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <h3 className="border-b border-slate-100 pb-2 text-sm font-bold uppercase tracking-[0.12em] text-slate-400">
                Tus datos de contacto
              </h3>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Nombre completo</label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={`mt-2 w-full rounded-2xl border px-4 py-3 text-[15px] shadow-sm outline-none focus:ring-2 focus:ring-cyan-100 ${
                  errors.nombre ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
                }`}
              />
              {errors.nombre && <p className="mt-2 text-sm font-semibold text-red-600">{errors.nombre}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Teléfono / WhatsApp</label>
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                inputMode="tel"
                placeholder="+56 9 XXXX XXXX"
                className={`mt-2 w-full rounded-2xl border px-4 py-3 text-[15px] shadow-sm outline-none focus:ring-2 focus:ring-cyan-100 ${
                  errors.telefono ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
                }`}
              />
              {errors.telefono && <p className="mt-2 text-sm font-semibold text-red-600">{errors.telefono}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.cl"
                className={`mt-2 w-full rounded-2xl border px-4 py-3 text-[15px] shadow-sm outline-none focus:ring-2 focus:ring-cyan-100 ${
                  errors.email ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
                }`}
              />
              {errors.email && <p className="mt-2 text-sm font-semibold text-red-600">{errors.email}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Comentarios (opcional)</label>
              <textarea
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                rows={4}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] shadow-sm outline-none focus:ring-2 focus:ring-cyan-100"
                placeholder="Ej. choque en portón trasero, deuda TAG, prendario, pérdida total declarada, prisa por vender…"
              />
            </div>
          </div>

          <div>
            <h3 className="border-b border-slate-100 pb-2 text-sm font-bold uppercase tracking-[0.12em] text-slate-400">
              Fotos del vehículo
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Entre 3 y 10 imágenes: frente, laterales, interior y zoom en daños. Esto acorta idas y vueltas y mejora la primera
              respuesta.
            </p>
            <div
              className="mt-4"
              role="presentation"
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDrop={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onPickFiles(e.dataTransfer.files)
              }}
            >
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/80 px-4 py-10 text-center transition hover:border-cyan-400 hover:bg-cyan-50/40"
              >
                <span className="mb-3 text-3xl text-cyan-500" aria-hidden>
                  +
                </span>
                <span className="text-sm font-bold text-slate-800">Selecciona o arrastra fotos aquí</span>
                <span className="mt-2 text-xs text-slate-500">Hasta 10 archivos · JPG o PNG</span>
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => onPickFiles(e.target.files)}
            />
            {uploadPhase && <p className="mt-3 text-sm font-semibold text-cyan-800">{uploadPhase}</p>}
            {photoError && (
              <p className="mt-3 text-sm font-bold text-red-600">
                No pudimos subir una o más fotos. Intenta de nuevo o continúa sin adjuntos.
              </p>
            )}
            {files.length > 0 && (
              <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {files.map((f, i) => (
                  <div key={`${f.name}-${i}`} className="relative aspect-square overflow-hidden rounded-xl border bg-slate-100">
                    <img src={previews[i] ?? ''} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhotoAt(i)}
                      className="absolute right-1 top-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-black/55 text-xs font-bold text-white transition hover:bg-black/70"
                      aria-label="Eliminar foto"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">
            <p className="text-[12px] font-bold uppercase tracking-wide text-slate-600">Protección de datos</p>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
              Los datos de mercado son referenciales. Los documentos vinculantes están en nuestros{' '}
              <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-800 underline">
                Términos y Condiciones
              </a>{' '}
              y{' '}
              <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-800 underline">
                Política de Privacidad
              </a>
              .
            </p>
            <label className="mt-5 flex cursor-pointer gap-3 text-left">
              <input
                type="checkbox"
                checked={consentAccepted}
                onChange={(e) => {
                  setConsentAccepted(e.target.checked)
                  setConsentError(null)
                }}
                className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-[13px] leading-relaxed text-slate-800">{consentCheckboxLabel}</span>
            </label>
            {consentError && <p className="mt-3 text-sm font-bold text-red-600">{consentError}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting || (!!uploadPhase && files.length > 0)}
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 text-base font-bold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Enviando…' : 'Enviar y que me contacten'}
          </button>
          <p className="-mt-4 text-center text-xs text-slate-500">
            Sin costo por este envío. Te contactamos según los datos que indicaste.
          </p>
        </form>
      </div>
    </section>
  )
}
