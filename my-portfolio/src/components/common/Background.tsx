'use client';

import { motion } from 'framer-motion';

// Pre-generate positions, angles, and animation durations to avoid hydration mismatch
const lines = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  left: `${(i % 5) * 20 + 10}%`, // 5 lines per row
  top: `${Math.floor(i / 5) * 20 + 10}%`, // 3 rows
  angle: [319, 57, 117, 85, 43, 352, 349, 278, 228, 255, 183, 22, 181, 299, 239][i], // Fixed angles
  duration: 2 + (i % 3), // Faster durations: 2s to 4s
}));

export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute w-1 h-16 bg-gradient-to-r from-cyan-400 to-magenta-500"
          style={{
            left: line.left,
            top: line.top,
            transform: `rotate(${line.angle}deg)`,
            transformOrigin: 'center',
          }}
          animate={{
            y: [-50, 50],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-200/50 dark:from-gray-900 dark:to-blue-950" />
    </div>
  );
}
