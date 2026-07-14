import Image from 'next/image';

/**
 * AboutCards — 3 tarjetas de imágenes bajo el párrafo de "Sobre Mí".
 * En reposo (desktop) se ve solo la foto; al hover aparece un overlay con título
 * + contexto (transición suave, lift/zoom leve). En táctil/móvil el overlay se
 * muestra siempre (para no perder la info). Todo el comportamiento vive en CSS
 * (.about-card* en globals.css) → server component, cero JS extra. Respeta
 * prefers-reduced-motion.
 */
const cards = [
  {
    src: '/about-threadbare.jpg',
    alt: 'Gian con el equipo de Threadbare',
    title: 'Threadbare',
    text: 'Parte del equipo de desarrollo del videojuego, con Endless Studio.',
  },
  {
    src: '/about-logimatix.jpg',
    alt: 'Gian trabajando en automatizaciones de Logimatix',
    title: 'Logimatix',
    text: 'Construyendo las automatizaciones con IA que corren en producción.',
  },
  {
    src: '/about-kchimbo.jpg',
    alt: 'Gian en la final del Startup UTP con Kchimbo',
    title: 'Kchimbo',
    text: 'Finalistas del Startup UTP: 10 000 USD entre más de 300 equipos.',
  },
];

export default function AboutCards() {
  return (
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <figure
          key={c.src}
          className="about-card group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 ring-1 ring-accent-cloud/15"
          style={{
            boxShadow:
              '0 24px 48px -18px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 45px -14px rgba(6,182,212,0.3)',
          }}
        >
          <Image
            src={c.src}
            alt={c.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="about-card__img object-cover"
          />
          {/* Overlay de contexto: oculto en reposo (desktop), visible al hover /
              siempre visible en táctil */}
          <figcaption className="about-card__overlay absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-space-950/92 via-space-950/45 to-transparent p-5 text-left">
            <h3 className="text-lg font-bold text-white">{c.title}</h3>
            <p className="mt-1 text-sm leading-snug text-slate-200">{c.text}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
