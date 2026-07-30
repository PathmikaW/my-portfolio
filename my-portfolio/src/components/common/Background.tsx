'use client';

import MatrixRain from '@/components/effects/matrix-rain';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white dark:bg-[#0a0f0a]">
      <MatrixRain />
      <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
