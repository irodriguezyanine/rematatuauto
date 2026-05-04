/**
 * TEXTO LEGAL EN BORRADOR — DEBE SER REVISADO Y APROBADO POR ASESORIA JURIDICA
 * antes de campanas masivas. Los enlaces oficiales de Vedisa prevalecen sobre este resumen.
 */

export const TERMS_URL =
  'https://www.vehiculoschocados.cl/page/Terminosycondiciones' as const
export const PRIVACY_URL =
  'https://www.vehiculoschocados.cl/page/Politicadeprivacidad' as const

export const LEGAL_DRAFT_TAG = '[BORRADOR — REVISION JURIDICA PENDIENTE]' as const

export const footerLegalDraft = [
  `${LEGAL_DRAFT_TAG} La informacion y los precios orientativos (incluye referencias de terceros, p. ej. AUTORED) son meramente informativos y no constituyen oferta vinculante ni promesa de resultado.`,
  `El tratamiento de datos personales se rige por la normativa aplicable en Chile y por la Politica de Privacidad y los Terminos y Condiciones vigentes publicados por Vedisa Remates. El usuario puede ejercer sus derechos conforme dichos instrumentos.`,
  `Las imagenes transmitidas mediante este formulario pueden almacenarse en la nube (p. ej. Cloudinary) con fines operativos y comerciales vinculados a la gestion Vedisa.`,
] as const

export const consentCheckboxLabelDraft =
  'Declaro haber leido la informacion antes del envio y los documentos enlazados de Terminos y Condiciones y Politica de Privacidad de Vedisa Remates; autorizo el contacto por medios proporcionados (correo, telefono, WhatsApp u otros) en relacion con mi solicitud de tasacion/remate.' as const

export const consentHelperDraft =
  'Texto revisable por asesoria legal antes de lanzamiento oficial de campanas.' as const
