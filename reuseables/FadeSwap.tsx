'use client';

import React, { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface FadeSwapProps {
  /** When this value changes, the old content fades out and new content reveals. */
  swapKey: string | number;
  children: ReactNode;
  className?: string;
}

/**
 * Smooth reveal on content swap (category/filter switches):
 * outgoing content fades out, incoming content fades in with a slight rise.
 * Respects prefers-reduced-motion and skips animating the first render.
 */
const FadeSwap: React.FC<FadeSwapProps> = ({ swapKey, children, className }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={swapKey}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeSwap;
