'use client'

import { motion } from 'framer-motion'
import CourseCard from './CourseCard'
import { Course } from '@/types'

interface Props {
  courses: Course[]
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 22 },
  },
}

export default function CourseCardGrid({ courses }: Props) {
  if (courses.length === 0) {
    return (
      <div className="col-span-full rounded-2xl border border-[#1e1e2e] p-8 text-center">
        <p className="text-sm text-[#6b6b8a]">No courses found. Add some rows to your Supabase <code className="text-[#4f8ef7] bg-[#1a1a28] px-1.5 py-0.5 rounded text-xs">courses</code> table!</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {courses.map((course) => (
        <motion.div key={course.id} variants={item}>
          <CourseCard course={course} />
        </motion.div>
      ))}
    </motion.div>
  )
}
