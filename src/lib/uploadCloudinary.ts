import { getCloudinaryConfig } from '@/lib/config'

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const { cloud, uploadPreset, folder } = getCloudinaryConfig()
  const url = `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloud)}/upload`
  const fd = new FormData()
  fd.append('file', file)
  fd.append('upload_preset', uploadPreset)
  if (folder) fd.append('folder', folder)

  const res = await fetch(url, { method: 'POST', body: fd })
  if (!res.ok) throw new Error('cloudinary')
  const json = (await res.json()) as { secure_url?: string }
  if (!json.secure_url) throw new Error('cloudinary')
  return json.secure_url
}
