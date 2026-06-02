'use client'

import { motion } from 'framer-motion'
import HeroTile from './HeroTile'
import StatsTile from './StatsTile'
import ActivityTile from './ActivityTile'

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
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 22,
    },
  },
}

export default function BentoEntrance() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <motion.section
        variants={tile}
        className="md:col-span-2"
      >
        <HeroTile />
      </motion.section>

      <motion.section
        variants={tile}
        className="grid grid-cols-2 md:grid-cols-1 gap-4"
      >
        <StatsTile />
        <ActivityTile />
      </motion.section>
    </motion.section>
  )
}
