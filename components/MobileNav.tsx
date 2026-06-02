'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Bell,
  Settings,
} from 'lucide-react'

const items = [
  { icon: LayoutDashboard, label: 'Home', id: 'dashboard' },
  { icon: BookOpen, label: 'Courses', id: 'courses' },
  { icon: BarChart2, label: 'Progress', id: 'progress' },
  { icon: Bell, label: 'Alerts', id: 'notifications' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

export default function MobileNav() {
  const [activeId, setActiveId] = useState('dashboard')

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d14] border-t border-[#1e1e2e] flex items-center justify-around px-2 py-2">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = activeId === item.id
        return (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className="relative flex flex-col items-center gap-0.5 px-3 py-1"
          >
            {isActive && (
              <motion.div
                layoutId="mobile-active"
                className="absolute inset-0 rounded-lg bg-[#4f8ef7]/10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Icon
              size={20}
              className={`relative transition-colors ${
                isActive ? 'text-[#4f8ef7]' : 'text-[#6b6b8a]'
              }`}
            />
            <span
              className={`relative text-[10px] transition-colors ${
                isActive ? 'text-[#4f8ef7]' : 'text-[#6b6b8a]'
              }`}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
