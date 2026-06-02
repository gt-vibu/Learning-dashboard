import { Suspense } from 'react'
import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'
import HeroTile from '@/components/HeroTile'
import StatsTile from '@/components/StatsTile'
import ActivityTile from '@/components/ActivityTile'
import CoursesSection from '@/components/CoursesSection'
import CoursesLoading from '@/components/CoursesLoading'

export default function Dashboard() {
  return (
    <section className="flex h-screen bg-[#0f0f13] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 min-w-0">
        <article className="p-4 md:p-6 space-y-4">

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <section className="md:col-span-2 min-h-[180px]">
              <HeroTile />
            </section>
            <section className="grid grid-cols-2 md:grid-cols-1 gap-4">
              <StatsTile />
              <ActivityTile />
            </section>
          </section>

          <section>
            <header className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-[#e2e2e8]">Active Courses</h2>
              <button className="text-xs text-[#7c6af7] hover:text-[#a89bf9] transition-colors">
                View all
              </button>
            </header>
            <Suspense fallback={<CoursesLoading />}>
              <CoursesSection />
            </Suspense>
          </section>

        </article>
      </main>

      <MobileNav />
    </section>
  )
}