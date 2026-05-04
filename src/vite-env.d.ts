/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_URL?: string
  readonly VITE_CLOUDINARY_CLOUD?: string
  readonly VITE_CLOUDINARY_UNSIGNED_PRESET?: string
  readonly VITE_CLOUDINARY_FOLDER?: string
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_PUBLIC_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
