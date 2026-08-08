'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  blur?: boolean;
}

export default function Fade({
  children,
  delay = 0,
  duration = 0.8,
  once = true,
  blur = true,
}: FadeProps) {
  const shouldReduceMotion = useReducedMotion();
  const hasBlur = blur && !shouldReduceMotion;

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...(hasBlur ? { filter: "blur(4px)" } : {}),
      }}
      whileInView={{
        opacity: 1,
        ...(hasBlur ? { filter: "blur(0px)" } : {}),
      }}
      viewport={{ once, margin: "0px 0px -50px 0px" }}
      transition={{
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // Premium cubic-bezier transition
        delay: delay,
      }}
      style={{
        willChange: "opacity, filter",
        transform: "translateZ(0)", // Force GPU acceleration layer
      }}
    >
      {children}
    </motion.div>
  );
}