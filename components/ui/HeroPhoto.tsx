import Image from 'next/image';
import { User } from 'lucide-react';

/**
 * HeroPhoto — foto formal con relieve/profundidad acorde a la estética espacial.
 * Si existe public/gian.jpg (comprobado en build) muestra la imagen; si no, un
 * placeholder claro "foto pendiente". Se reemplaza solo al subir el archivo.
 */
export default function HeroPhoto({ hasPhoto }: { hasPhoto: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[440px]">
      {/* Glow de marca detrás (profundidad) */}
      <div
        aria-hidden="true"
        className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-accent-cloud/25 via-transparent to-accent-ai/25 blur-3xl"
      />
      {/* Marco con borde sutil + sombra en capas + glass */}
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/50 shadow-2xl ring-1 ring-accent-cloud/20 backdrop-blur-sm"
        style={{
          boxShadow:
            '0 30px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 60px -10px rgba(6,182,212,0.25)',
        }}
      >
        {hasPhoto ? (
          <Image
            src="/gian.jpg"
            alt="Gian Piero Cano"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 360px, 440px"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-slate-500">
            <div className="rounded-full border border-slate-700/70 bg-slate-800/50 p-6">
              <User className="h-14 w-14" aria-hidden="true" />
            </div>
            <div className="text-center">
              <p className="font-mono text-xs text-slate-400">foto pendiente</p>
              <p className="mt-1 font-mono text-[11px] text-slate-600">public/gian.jpg</p>
            </div>
          </div>
        )}
        {/* Viñeta inferior para integrar con el fondo espacial */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-t from-space-950/40 to-transparent"
        />
      </div>
    </div>
  );
}
