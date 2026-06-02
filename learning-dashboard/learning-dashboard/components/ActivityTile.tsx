'use client'

import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

const WEEKS: number[][] = [
  [1, 0, 3, 2, 0, 4, 1],
  [0, 2, 1, 3, 4, 0, 2],
  [3, 1, 0, 4, 2, 1, 0],
  [2, 4, 3, 0, 1, 3, 2],
  [0, 1, 2, 4, 3, 0, 1],
  [4, 0, 1, 2, 0, 3, 4],
  [1, 3, 4, 0, 2, 1, 0],
  [0, 2, 0, 3, 1, 4, 2],
  [3, 1, 2, 0, 4, 0, 3],
  [2, 0, 1, 3, 0, 2, 1],
]

const levelColor: Record<number, string> = {
  0: '#f0ece6',
  1: '#c7d7f9',
  2: '#93aeef',
  3: '#6084e0',
  4: '#4f46e5',
}

export default function ActivityTile() {
  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative rounded-2xl border border-[#e2ddd6] p-5 bg-white overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 100% 100%, rgba(79,70,229,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative flex items-center gap-2 mb-4">
        <Activity size={16} className="text-[#4f46e5]" />
        <h2 className="text-sm font-semibold text-[#1c1917]">Activity</h2>
        <span className="ml-auto text-xs text-[#78716c]">Last 10 weeks</span>
      </div>

      <div className="relative flex gap-1 overflow-hidden">
        {WEEKS.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((level, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (wi * 7 + di) * 0.005 }}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: levelColor[level] }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="relative mt-3 flex items-center gap-1.5">
        <span className="text-[11px] text-[#78716c]">Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div
            key={l}
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: levelColor[l] }}
          />
        ))}
        <span className="text-[11px] text-[#78716c]">More</span>
      </div>
    </motion.article>
  )
}
