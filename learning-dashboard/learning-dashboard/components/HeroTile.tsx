'use client'

import { motion } from 'framer-motion'
import { Flame, Trophy } from 'lucide-react'

export default function HeroTile() {
  const streak = 12

  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative col-span-2 row-span-1 rounded-2xl border border-[#e2ddd6] overflow-hidden p-6 bg-white"
      style={{ cursor: 'default' }}
    >
      {/* warm gradient wash */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(79,70,229,0.07) 0%, transparent 60%), radial-gradient(ellipse at 85% 20%, rgba(5,150,105,0.06) 0%, transparent 50%)',
        }}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-[#78716c] mb-1">Good morning 👋</p>
          <h1 className="text-2xl font-bold text-[#1c1917]">Welcome back, Alex</h1>
          <p className="text-sm text-[#78716c] mt-2">
            You have <span className="text-[#4f46e5] font-medium">3 lessons</span> due today.
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            <Flame size={18} className="text-amber-500" />
            <span className="text-lg font-bold text-amber-600">{streak}</span>
          </div>
          <span className="text-[10px] text-[#78716c]">day streak</span>
        </div>
      </div>

      <div className="relative mt-5 flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[#faf9f7] rounded-lg px-3 py-1.5 border border-[#e2ddd6]">
          <Trophy size={14} className="text-amber-500" />
          <span className="text-xs text-[#1c1917]">Top 10% this week</span>
        </div>
        <div className="h-4 w-px bg-[#e2ddd6]" />
        <span className="text-xs text-[#78716c]">2,340 XP earned</span>
      </div>
    </motion.article>
  )
}
