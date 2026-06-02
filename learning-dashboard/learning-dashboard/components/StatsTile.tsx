'use client'

import { motion } from 'framer-motion'
import { Clock, Star } from 'lucide-react'

export default function StatsTile() {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative rounded-2xl border border-[#e2ddd6] p-5 bg-white overflow-hidden flex flex-col gap-4"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(79,70,229,0.08) 0%, transparent 60%)',
        }}
      />

      <h2 className="relative text-sm font-semibold text-[#1c1917]">This Week</h2>

      <div className="relative flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-[#4f46e5]" />
            <span className="text-xs text-[#78716c]">Study time</span>
          </div>
          <span className="text-sm font-semibold text-[#1c1917]">6.5h</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star size={14} className="text-amber-500" />
            <span className="text-xs text-[#78716c]">Lessons done</span>
          </div>
          <span className="text-sm font-semibold text-[#1c1917]">14</span>
        </div>
      </div>
    </motion.article>
  )
}
