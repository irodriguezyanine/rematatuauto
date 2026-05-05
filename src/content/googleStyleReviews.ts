/**
 * Textos de ejemplo con estilo reseña tipo Google (ilustrativos).
 * No sustituyen reseñas verificadas públicas.
 */

export type GoogleStyleReview = {
  name: string
  timeAgo: string
  text: string
  /** Color de avatar (iniciales), estilo Google */
  avatarClass: string
}

/** Todas calificadas como 5 estrellas en la UI (segmento “solo 5 ★”). */
export const GOOGLE_STYLE_REVIEWS: GoogleStyleReview[] = [
  {
    name: 'Patricio Fuentes',
    timeAgo: 'hace 3 semanas',
    text: 'Rematé mi Chevrolet Sail 2016 con ellos. Respuesta el mismo día y proceso claro de principio a fin. Muy recomendables.',
    avatarClass: 'bg-violet-600',
  },
  {
    name: 'Marcela Rojas',
    timeAgo: 'hace 1 mes',
    text: 'Llevaba meses en Yapo sin resultado. Acá me guiaron bien y cerramos en una semana. Gracias al equipo.',
    avatarClass: 'bg-rose-500',
  },
  {
    name: 'Rodrigo Espinoza',
    timeAgo: 'hace 2 meses',
    text: 'Mi Mazda 3 2019 salió por remate sin vueltas. Ejecutivo siempre disponible por WhatsApp.',
    avatarClass: 'bg-blue-600',
  },
  {
    name: 'Daniela Castro',
    timeAgo: 'hace 5 días',
    text: 'Profesionales y transparentes. Me explicaron cada etapa antes de firmar nada.',
    avatarClass: 'bg-emerald-600',
  },
  {
    name: 'Felipe Muñoz',
    timeAgo: 'hace 1 semana',
    text: 'Tenía un Kia Rio 2014 chocado. Coordinación con la grúa y todo resuelto. Cinco estrellas.',
    avatarClass: 'bg-amber-600',
  },
  {
    name: 'Catalina Núñez',
    timeAgo: 'hace 2 semanas',
    text: 'Rápidos y serios. Me quité un peso de encima con el auto que no andaba.',
    avatarClass: 'bg-teal-600',
  },
  {
    name: 'Andrés Valdés',
    timeAgo: 'hace 4 meses',
    text: 'Vendí mi Hyundai Tucson 2017. La tasación fue acorde al mercado y sin letra chica.',
    avatarClass: 'bg-indigo-600',
  },
  {
    name: 'Javiera Soto',
    timeAgo: 'hace 3 días',
    text: 'Excelente servicio. Contestaron todas mis dudas de seguro y pérdida total.',
    avatarClass: 'bg-pink-600',
  },
  {
    name: 'Cristian Araya',
    timeAgo: 'hace 6 meses',
    text: 'Toyota Hilux 2013 rematada sin drama. Para quien necesita liquidez, es el canal.',
    avatarClass: 'bg-orange-600',
  },
  {
    name: 'Francisca Morales',
    timeAgo: 'hace 2 días',
    text: 'Muy buena experiencia. Todo digital y después un llamado humano para cerrar.',
    avatarClass: 'bg-cyan-600',
  },
  {
    name: 'Nicolás Parra',
    timeAgo: 'hace 3 meses',
    text: 'Mi Nissan NP300 2018 en excelente estado; proceso ágil y pago sin atrasos.',
    avatarClass: 'bg-lime-700',
  },
  {
    name: 'Valentina Reyes',
    timeAgo: 'hace 1 año',
    text: 'Los recomiendo. Hice el formulario un domingo y el lunes ya tenía contacto.',
    avatarClass: 'bg-fuchsia-600',
  },
  {
    name: 'Gonzalo Herrera',
    timeAgo: 'hace 2 semanas',
    text: 'Peugeot 208 2015 vendido con Vedisa Remates. Cero presión, solo información.',
    avatarClass: 'bg-sky-600',
  },
  {
    name: 'Camila Díaz',
    timeAgo: 'hace 4 semanas',
    text: 'Trato impecable. Venía de un mal arriendo con otro comprador y acá todo fluyó.',
    avatarClass: 'bg-red-600',
  },
  {
    name: 'Matías Olivares',
    timeAgo: 'hace 5 meses',
    text: 'Volkswagen Golf 2012 con alto kilometraje. Igual lo tomaron y remataron bien.',
    avatarClass: 'bg-violet-700',
  },
  {
    name: 'Paula Garrido',
    timeAgo: 'hace 1 semana',
    text: 'Muy claros con los plazos y la documentación. Volvería a usar el servicio.',
    avatarClass: 'bg-green-700',
  },
  {
    name: 'Sebastián Lira',
    timeAgo: 'hace 8 meses',
    text: 'Ford Ranger 2016 en régimen de remate. Equipo conoce el negocio, se nota.',
    avatarClass: 'bg-blue-700',
  },
  {
    name: 'Constanza Bravo',
    timeAgo: 'hace 12 días',
    text: 'Me ayudaron con un auto de herencia que no sabía cómo mover. Gracias.',
    avatarClass: 'bg-rose-600',
  },
  {
    name: 'Eduardo Ramírez',
    timeAgo: 'hace 7 meses',
    text: 'BMW 320i 2011 — dudé al principio, pero el seguimiento fue de primer nivel.',
    avatarClass: 'bg-slate-600',
  },
  {
    name: 'Macarena Vega',
    timeAgo: 'hace 3 semanas',
    text: 'Rápido y sin costo para dejar los datos. Eso para mí fue clave.',
    avatarClass: 'bg-purple-600',
  },
  {
    name: 'Ignacio Pérez',
    timeAgo: 'hace 4 días',
    text: 'Suzuki Swift 2017 rematado. Fotos por WhatsApp y listo, sin ir tres veces a la misma parte.',
    avatarClass: 'bg-amber-700',
  },
  {
    name: 'Teresa Lagos',
    timeAgo: 'hace 9 meses',
    text: 'Empresa seria. Mi esposo y yo quedamos muy conformes con la venta del auto.',
    avatarClass: 'bg-teal-700',
  },
  {
    name: 'Benjamín Silva',
    timeAgo: 'hace 2 meses',
    text: 'Mercedes-Benz Vito 2014 para trabajo. Cerramos en tiempo récord.',
    avatarClass: 'bg-indigo-700',
  },
  {
    name: 'Antonia Carrasco',
    timeAgo: 'hace 6 días',
    text: 'Me gustó que no prometieran milagros; todo fue realista y cumplieron.',
    avatarClass: 'bg-pink-500',
  },
  {
    name: 'Héctor Martínez',
    timeAgo: 'hace 11 meses',
    text: 'Chery Tiggo 2019 en stock. Buen canal cuando necesitas salir del auto ya.',
    avatarClass: 'bg-orange-700',
  },
  {
    name: 'Renata Jiménez',
    timeAgo: 'hace 3 semanas',
    text: 'Súper. Desde Antofagasta coordinamos todo remoto sin problemas.',
    avatarClass: 'bg-emerald-700',
  },
  {
    name: 'Tomás Fernández',
    timeAgo: 'hace 1 mes',
    text: 'Citroën C3 2018 — tenía detalle estético y no fue excusa para bajar el trato.',
    avatarClass: 'bg-cyan-700',
  },
  {
    name: 'Lorena Contreras',
    timeAgo: 'hace 4 meses',
    text: 'Atención humana; no me sentí como número de ticket. Recomendado.',
    avatarClass: 'bg-lime-800',
  },
  {
    name: 'Diego Sepúlveda',
    timeAgo: 'hace 2 semanas',
    text: 'Honda CR-V 2015 familia grande. Rematamos y pudimos comprar otro auto.',
    avatarClass: 'bg-fuchsia-700',
  },
  {
    name: 'Soledad Henríquez',
    timeAgo: 'hace 5 semanas',
    text: 'Claridad total en honorarios y pasos. Eso hoy no es común. Agradezco.',
    avatarClass: 'bg-sky-700',
  },
  {
    name: 'Álvaro Meza',
    timeAgo: 'hace 10 meses',
    text: 'Subaru Forester 2016 4x4. Buena tasación y remate transparente en línea.',
    avatarClass: 'bg-red-700',
  },
  {
    name: 'Pilar Ojeda',
    timeAgo: 'hace 8 días',
    text: 'Muy buenos. Resolvieron dudas de contador y notario sin ponerme en aprietos.',
    avatarClass: 'bg-violet-500',
  },
]
