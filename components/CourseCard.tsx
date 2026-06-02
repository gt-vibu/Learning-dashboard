'use client'

import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { LucideProps } from 'lucide-react'
import ProgressBar from './ProgressBar'
import { Course } from '@/types'

interface Props {
  course: Course
}

const iconColorMap: Record<string, string> = {
  Code: '#4f8ef7',
  Layers: '#8b5cf6',
  Database: '#14b8a6',
  Globe: '#f97316',
  BookOpen: '#4f8ef7',
  Cpu: '#8b5cf6',
  Terminal: '#14b8a6',
  Figma: '#f97316',
}

export default function CourseCard({ course }: Props) {
  // dynamically pick the icon from lucide
  const IconComponent = (LucideIcons as unknown as Record<string, React.FC<LucideProps>>)[
    course.icon_name
  ]
  const iconColor = iconColorMap[course.icon_name] ?? '#4f8ef7'

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative rounded-2xl border border-[#1e1e2e] hover:border-[#2e2e4e] p-5 bg-[#111118] overflow-hidden flex flex-col gap-4 cursor-default"
    >
      {/* gradient mesh background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, ${iconColor}22 0%, transparent 60%)`,
        }}
      />

      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
      />

      {/* hover glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{ boxShadow: `inset 0 0 0 1px ${iconColor}40` }}
      />

      <div className="relative flex items-start justify-between">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${iconColor}18`, border: `1px solid ${iconColor}30` }}
        >
          {IconComponent ? (
            <IconComponent size={18} color={iconColor} />
          ) : (
            <LucideIcons.BookOpen size={18} color={iconColor} />
          )}
        </div>
        <span className="text-xs text-[#6b6b8a] bg-[#1a1a28] px-2 py-0.5 rounded-full border border-[#1e1e2e]">
          {course.progress}%
        </span>
      </div>

      <div className="relative flex-1">
        <h3 className="text-sm font-semibold text-[#e8e8f0] leading-snug">{course.title}</h3>
      </div>

      <div className="relative">
        <ProgressBar value={course.progress} color={iconColor} />
        <p className="mt-2 text-[11px] text-[#6b6b8a]">
          {course.progress < 100 ? `${100 - course.progress}% remaining` : 'Completed 🎉'}
        </p>
      </div>
    </motion.article>
  )
}
