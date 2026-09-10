import { ImageResponse } from 'next/og';

export const alt = 'Pathmika Weerarathna - Full-Stack & AI/ML Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Static card - fine to prerender at build time.
export const dynamic = 'force-static';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0b0e14 0%, #111827 60%, #0b1220 100%)',
          color: '#e5e7eb',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#58a6ff', fontSize: 30 }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: '#3fb950', display: 'flex' }} />
          <div style={{ display: 'flex' }}>pathmikaw.vercel.app</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, color: '#ffffff', letterSpacing: -1 }}>
            Pathmika Weerarathna
          </div>
          <div style={{ display: 'flex', fontSize: 40, color: '#9ca3af' }}>
            Full-Stack Engineer &nbsp;·&nbsp; Mobile &nbsp;·&nbsp; Web &nbsp;·&nbsp; Applied AI/ML
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, color: '#9ca3af' }}>
          <div style={{ display: 'flex', color: '#a371f7' }}>MSc in Artificial Intelligence (Reading)</div>
          <div style={{ display: 'flex' }}>·</div>
          <div style={{ display: 'flex' }}>University of Moratuwa</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
