'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Bell,
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: BookOpen, label: 'Courses', id: 'courses' },
  { icon: BarChart2, label: 'Progress', id: 'progress' },
  { icon: Bell, label: 'Notifications', id: 'notifications' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeId, setActiveId] = useState('dashboard')

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative hidden md:flex flex-col h-screen bg-white border-r border-[#e2ddd6] py-6 overflow-hidden shrink-0"
      style={{ minWidth: collapsed ? 64 : 220 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 mb-8">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#059669] flex items-center justify-center shrink-0">
          <GraduationCap size={16} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="text-sm font-semibold text-[#1c1917] whitespace-nowrap"
            >
              LearnFlow
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeId === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left group"
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-bg"
                  className="absolute inset-0 rounded-lg bg-[#4f46e5]/8 border border-[#4f46e5]/20"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={18}
                className={`relative shrink-0 transition-colors ${
                  isActive ? 'text-[#4f46e5]' : 'text-[#78716c] group-hover:text-[#1c1917]'
                }`}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`relative text-sm whitespace-nowrap transition-colors ${
                      isActive ? 'text-[#1c1917] font-medium' : 'text-[#78716c] group-hover:text-[#1c1917]'
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mx-2 mt-4 flex items-center justify-center p-2 rounded-lg border border-[#e2ddd6] text-[#78716c] hover:text-[#1c1917] hover:border-[#c9c2b8] transition-colors"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </motion.aside>
  )
}
