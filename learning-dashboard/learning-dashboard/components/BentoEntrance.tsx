'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

const tile = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 22 },
  },
}

interface Props {
  children: ReactNode
}

/**
 * Wraps the top bento-row children in a staggered entrance animation.
 * Each direct child fades in while translating slightly upward on the Y-axis,
 * using Framer Motion spring physics — no layout shifts, transform-only.
 */
export default function BentoEntrance({ children }: Props) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {/* Wrap every direct child in the per-tile variant */}
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={tile}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={tile}>{children}</motion.div>
      }
    </motion.div>
  )
}
