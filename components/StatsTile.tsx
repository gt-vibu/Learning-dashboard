'use client'

import { motion } from 'framer-motion'
import { Clock, Star } from 'lucide-react'

export default function StatsTile() {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative rounded-2xl border border-[#1e1e2e] p-5 bg-[#111118] overflow-hidden flex flex-col gap-4"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.2) 0%, transparent 60%)',
        }}
      />

      <h2 className="relative text-sm font-semibold text-[#e8e8f0]">This Week</h2>

      <div className="relative flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-[#8b5cf6]" />
            <span className="text-xs text-[#6b6b8a]">Study time</span>
          </div>
          <span className="text-sm font-semibold text-[#e8e8f0]">6.5h</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star size={14} className="text-yellow-400" />
            <span className="text-xs text-[#6b6b8a]">Lessons done</span>
          </div>
          <span className="text-sm font-semibold text-[#e8e8f0]">14</span>
        </div>
      </div>
    </motion.article>
  )
}
