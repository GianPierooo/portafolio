import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { identity } from '@/lib/profile';

/**
 * OG Image dinámica (1200x630) — generada en build con next/og.
 * Base visual: logo GPC (circuito cyan sobre navy) + posicionamiento Cloud + IA.
 */

export const alt = `${identity.name} — ${identity.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const logoData = await readFile(join(process.cwd(), 'public/images/logo.png'));
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={280}
          height={280}
          style={{ borderRadius: '24px' }}
        />

        {/* Texto */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '64px',
            flex: 1,
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 700, color: '#f8fafc', lineHeight: 1.1 }}>
            {identity.name}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              marginTop: 20,
              display: 'flex',
            }}
          >
            <span style={{ color: '#06b6d4' }}>Cloud Engineer</span>
            <span style={{ color: '#64748b', margin: '0 12px' }}>&</span>
            <span style={{ color: '#8b5cf6' }}>AI Solutions Architect</span>
          </div>
          <div style={{ fontSize: 24, color: '#94a3b8', marginTop: 24, lineHeight: 1.4 }}>
            {identity.tagline}
          </div>
          <div style={{ fontSize: 20, color: '#475569', marginTop: 32, fontFamily: 'monospace' }}>
            gpcano.space
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
