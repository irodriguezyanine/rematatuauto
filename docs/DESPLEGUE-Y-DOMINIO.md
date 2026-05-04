# Despliegue, dominio y checklist de produccion

Este sitio es un SPA (`dist/`). El flujo recomendado es **Vercel** (u otro CDN estatico) con dominio propio.

## Dominios de produccion (oficiales)

La landing se sirve en **dos dominios**:

| Dominio | Uso tipico |
|--------|-------------|
| `rematatuauto.cl` | Publico Chile |
| `rematatuauto.com` | Marca `.com` / internacional percibido |

Lista normalizada en codigo: `src/lib/productionDomains.ts` (incluye variantes **`www`** por si registras ese CNAME tambien).

## 1. Proyecto en Vercel

1. Repo en GitHub/GitLab enlazado a Vercel, **root** = carpeta del proyecto (este repo).
2. **Build command:** `npm run build`
3. **Output directory:** `dist`
4. Cargar variables de entorno (Production): **referencia completa en `.env.example`**.
   - **Navegador (solo `VITE_*`)**: Cloudinary público (`VITE_CLOUDINARY_*`), Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`), Formspree, URL canonica.
   - **No incrustes en el build del SPA** (`sin VITE_`): `AWS_*` para SES/Dynamo etc., `CLOUDINARY_API_*`, `SUPABASE_SERVICE_ROLE_KEY`. Esas sirven solo si agregas en el futuro una **Capa servidor** separada en Vercel (Function), automatizaciones o el mismo proyecto **Supabase** (Secrets Edge Functions para correo).
5. **Canonical SEO (`VITE_PUBLIC_SITE_URL`):**
   - Vacio → en esta build, cada dominio establece `<link rel="canonical">` a **su propia URL** (`.cl` canonico a `.cl`, `.com` a `.com`), para no mezclar referencias cuando conviven los dos igual.
   - Si queres **un solo canonico para Google** y evitar contenido duplicado, define por ejemplo `VITE_PUBLIC_SITE_URL=https://rematatuauto.cl` en Production y opcionalmente en Vercel agrega redirect 301 de `rematatuauto.com` → `rematatuauto.cl`.

## 2. Anadir ambos dominios en Vercel

En **Settings → Domains** del proyecto:

1. Anade `rematatuauto.cl` y `rematatuauto.com` (y `www.` si aplican).
2. Para cada apex, usa los registros **A / ALIAS** o **CNAME** que muestre Vercel hasta que el estado quede validado.

Ambos pueden apuntar al **mismo proyecto** sin cambiar el codigo.

## 3. Formspree

Por defecto se usa el mismo endpoint que vehiculoschocados.cl/page/Vender.

Si tu plan Formspree restringe por dominio (`Allow list` / origen), **permite como minimo**:

- `https://rematatuauto.cl`
- `https://rematatuauto.com`

(y las variantes con `www` si las usaras.)

## 4. HTTPS

Vercel emite certificado cuando el DNS de cada dominio queda validado.

## 5. Correo desde AWS SES (opcional servidor)

Este repositorio compila solo un **SPA**. El envio inicial de leads puede seguir usando **Formspree** que ya notifica por correo desde su infraestructura.

Si quieras **SMTP API Amazon SES** (como en otros proyectos Vedisa), define las variables `AWS_*` y `AWS_SES_*` de `.env.example` en un servidor seguro (**no** como `VITE_*`): Edge Function Supabase, Serverless Function de Vercel, GitHub Actions, etc. SES exige dominio o correo verificado en la region indicada (`AWS_REGION`).

Coexistencia opcional: **DynamoDB** para inventario o sync (variables al final de `.env.example`) solo si ese backend vive en otro proceso o servicio.

## 6. Redirect opcional `.com` → `.cl`

Solo si negocio/SEO definieron un canonico unico en `.cl`. Ejemplo en `vercel.json` (adaptar proyecto):

```json
{
  "redirects": [
    { "source": "/(.*)", "has": [{ "type": "host", "value": "rematatuauto.com" }], "destination": "https://rematatuauto.cl/$1", "permanent": true },
    { "source": "/(.*)", "has": [{ "type": "host", "value": "www.rematatuauto.com" }], "destination": "https://rematatuauto.cl/$1", "permanent": true }
  ]
}
```

Sin este redirect, ambos siguen funcionando como **dos entradas** al mismo SPA.

## 7. Revision juridica

Antes de campanas grandes, hacer revisar los textos en `src/content/legalDraft.ts`, el pie legal y la aceptacion del formulario por asesoria interna/abogacia.

## 8. Smoke test post-deploy

- Envio desde `https://rematatuauto.cl` y desde `https://rematatuauto.com` con fotos de prueba.
- Patente conocida contra `autored-vehicle-info` (secrets AUTORED en Supabase configurados).
