'use client'

import { motion } from 'framer-motion'
import { Flame, Trophy } from 'lucide-react'

export default function HeroTile() {
  const streak = 12

  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative col-span-2 row-span-1 rounded-2xl border border-[#1e1e2e] overflow-hidden p-6 bg-[#111118]"
      style={{ cursor: 'default' }}
    >
      {/* gradient background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(79,142,247,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.14) 0%, transparent 50%)',
        }}
      />

      {/* subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-[#6b6b8a] mb-1">Good morning 👋</p>
          <h1 className="text-2xl font-bold text-[#e8e8f0]">Welcome back, Alex</h1>
          <p className="text-sm text-[#6b6b8a] mt-2">
            You have <span className="text-[#4f8ef7]">3 lessons</span> due today.
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="flex items-center gap-1.5 bg-[#1a1a28] border border-orange-500/20 rounded-xl px-3 py-2">
            <Flame size={18} className="text-orange-400" />
            <span className="text-lg font-bold text-orange-400">{streak}</span>
          </div>
          <span className="text-[10px] text-[#6b6b8a]">day streak</span>
        </div>
      </div>

      <div className="relative mt-5 flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[#1a1a28] rounded-lg px-3 py-1.5 border border-[#1e1e2e]">
          <Trophy size={14} className="text-yellow-400" />
          <span className="text-xs text-[#e8e8f0]">Top 10% this week</span>
        </div>
        <div className="h-4 w-px bg-[#1e1e2e]" />
        <span className="text-xs text-[#6b6b8a]">2,340 XP earned</span>
      </div>
    </motion.article>
  )
}
