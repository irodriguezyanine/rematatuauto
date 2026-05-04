import { getSupabaseAutoredConfig } from '@/lib/config'

export type AutoredVehicleInfo = {
  marca: string | null
  modelo: string | null
  ano: string | null
  version: string | null
  color: string | null
  precio_retoma: number | null
  precio_publicacion: number | null
  precio_vedisa: number | null
}

export async function fetchAutoredByLicensePlate(
  licensePlate: string,
): Promise<{ ok: true; data: AutoredVehicleInfo } | { ok: false; error: string }> {
  const cfg = getSupabaseAutoredConfig()
  if (!cfg) {
    return { ok: false, error: 'Consulta por patente no configurada (variables Supabase).' }
  }
  const trimmed = licensePlate.trim().toUpperCase()
  if (trimmed.length < 5) {
    return { ok: false, error: 'Patente demasiado corta.' }
  }

  const endpoint = `${cfg.url.replace(/\/$/, '')}/functions/v1/autored-vehicle-info?licensePlate=${encodeURIComponent(trimmed)}`

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cfg.anonKey}`,
        apikey: cfg.anonKey,
        Accept: 'application/json',
      },
    })
    const json = (await res.json()) as AutoredVehicleInfo & { error?: string }

    if (!res.ok) {
      const msg =
        typeof json?.error === 'string' ? json.error : 'No encontramos datos para esta patente.'
      return { ok: false, error: msg }
    }

    return {
      ok: true,
      data: {
        marca: json.marca ?? null,
        modelo: json.modelo ?? null,
        ano: json.ano ?? null,
        version: json.version ?? null,
        color: json.color ?? null,
        precio_retoma:
          json.precio_retoma != null && Number.isFinite(Number(json.precio_retoma))
            ? Number(json.precio_retoma)
            : null,
        precio_publicacion:
          json.precio_publicacion != null && Number.isFinite(Number(json.precio_publicacion))
            ? Number(json.precio_publicacion)
            : null,
        precio_vedisa:
          json.precio_vedisa != null && Number.isFinite(Number(json.precio_vedisa))
            ? Number(json.precio_vedisa)
            : null,
      },
    }
  } catch {
    return { ok: false, error: 'No pudimos consultar Autored. Revisa tu conexión.' }
  }
}

export function formatClPeso(n: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(Math.round(n))
}
