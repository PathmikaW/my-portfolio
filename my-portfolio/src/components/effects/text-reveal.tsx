'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function TextReveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p';
}) {
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={revealVariants}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}

export function ScrollSection({
  children,
  className,
  staggerChildren = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
}) {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0, margin: '0px 0px -10% 0px' }}
      variants={containerVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function ScrollItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={revealVariants} className={cn(className)}>
      {children}
    </motion.div>
  );
}
