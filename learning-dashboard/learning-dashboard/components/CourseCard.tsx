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
  Code: '#4f46e5',
  Layers: '#059669',
  Database: '#0891b2',
  Globe: '#d97706',
  BookOpen: '#4f46e5',
  Cpu: '#059669',
  Terminal: '#0891b2',
  Figma: '#e11d48',
}

export default function CourseCard({ course }: Props) {
  const IconComponent = (LucideIcons as unknown as Record<string, React.FC<LucideProps>>)[
    course.icon_name
  ]
  const iconColor = iconColorMap[course.icon_name] ?? '#4f46e5'

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative rounded-2xl border border-[#e2ddd6] hover:border-[#c9c2b8] p-5 bg-white overflow-hidden flex flex-col gap-4 cursor-default"
    >
      {/* soft tinted background wash */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, ${iconColor}14 0%, transparent 60%)`,
        }}
      />

      {/* hover glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{ boxShadow: `inset 0 0 0 1px ${iconColor}30` }}
      />

      <div className="relative flex items-start justify-between">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${iconColor}12`, border: `1px solid ${iconColor}25` }}
        >
          {IconComponent ? (
            <IconComponent size={18} color={iconColor} />
          ) : (
            <LucideIcons.BookOpen size={18} color={iconColor} />
          )}
        </div>
        <span className="text-xs text-[#78716c] bg-[#f5f3ef] px-2 py-0.5 rounded-full border border-[#e2ddd6]">
          {course.progress}%
        </span>
      </div>

      <div className="relative flex-1">
        <h3 className="text-sm font-semibold text-[#1c1917] leading-snug">{course.title}</h3>
      </div>

      <div className="relative">
        <ProgressBar value={course.progress} color={iconColor} />
        <p className="mt-2 text-[11px] text-[#78716c]">
          {course.progress < 100 ? `${100 - course.progress}% remaining` : 'Completed 🎉'}
        </p>
      </div>
    </motion.article>
  )
}
