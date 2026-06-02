'use client'

import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

// fixed data — no Math.random() so server/client match
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
  0: '#1a1a28',
  1: '#1e3a5f',
  2: '#2563a8',
  3: '#3b82f6',
  4: '#60a5fa',
}

export default function ActivityTile() {
  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative rounded-2xl border border-[#1e1e2e] p-5 bg-[#111118] overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 100% 100%, rgba(79,142,247,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative flex items-center gap-2 mb-4">
        <Activity size={16} className="text-[#4f8ef7]" />
        <h2 className="text-sm font-semibold text-[#e8e8f0]">Activity</h2>
        <span className="ml-auto text-xs text-[#6b6b8a]">Last 10 weeks</span>
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
        <span className="text-[11px] text-[#6b6b8a]">Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div
            key={l}
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: levelColor[l] }}
          />
        ))}
        <span className="text-[11px] text-[#6b6b8a]">More</span>
      </div>
    </motion.article>
  )
}