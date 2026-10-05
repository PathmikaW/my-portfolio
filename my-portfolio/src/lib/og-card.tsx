import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

interface OgCardInput {
  /** Route path shown as the site URL line, e.g. '/blog' */
  path: string;
  title: string;
  subtitle: string;
  /** Optional amber line above the footer, e.g. the latest post */
  highlight?: string;
  footer: string;
}

/*
 * Shared 1200x630 link-preview card. Text only (no emoji or remote images)
 * so it renders at build time without network access.
 */
export function ogCard({ path, title, subtitle, highlight, footer }: OgCardInput) {
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
          background: 'linear-gradient(135deg, #0b0e14 0%, #0f1f17 60%, #0b1a12 100%)',
          color: '#e5e7eb',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#3fb950', fontSize: 30 }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: '#3fb950', display: 'flex' }} />
          <div style={{ display: 'flex' }}>{`pathmikaw.vercel.app${path}`}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, color: '#ffffff', letterSpacing: -1 }}>
            {title}
          </div>
          <div style={{ display: 'flex', fontSize: 38, color: '#9ca3af', lineHeight: 1.3 }}>{subtitle}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {highlight && <div style={{ display: 'flex', fontSize: 26, color: '#ffb000' }}>{highlight}</div>}
          <div style={{ display: 'flex', fontSize: 26, color: '#9ca3af' }}>{footer}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
