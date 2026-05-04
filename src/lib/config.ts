/** Mismos valores que el widget en vehiculoschocados.cl/page/Vender */
export const DEFAULT_FORMSPREE_URL = 'https://formspree.io/f/xkgpdkjr'

export const DEFAULT_CLOUDINARY = {
  cloud: 'dct5mdxy7',
  uploadPreset: 'VedisaRemates',
  folder: 'VedisaRemates',
} as const

export const WHATSAPP_HREF =
  'https://api.whatsapp.com/send/?phone=56989323397&text=' +
  encodeURIComponent('Hola, acabo de cotizar en REMATA TU AUTO y quiero saber más.') +
  '&type=phone_number&app_absent=0'

export function getFormspreeUrl(): string {
  return import.meta.env.VITE_FORMSPREE_URL?.trim() || DEFAULT_FORMSPREE_URL
}

export function getCloudinaryConfig() {
  return {
    cloud: import.meta.env.VITE_CLOUDINARY_CLOUD?.trim() || DEFAULT_CLOUDINARY.cloud,
    uploadPreset:
      import.meta.env.VITE_CLOUDINARY_UNSIGNED_PRESET?.trim() || DEFAULT_CLOUDINARY.uploadPreset,
    folder: import.meta.env.VITE_CLOUDINARY_FOLDER?.trim() || DEFAULT_CLOUDINARY.folder,
  }
}

export function getSupabaseAutoredConfig(): { url: string; anonKey: string } | null {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim()
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
  if (!url || !anonKey) return null
  return { url, anonKey }
}
