import { Suspense } from 'react'
import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'
import HeroTile from '@/components/HeroTile'
import ActivityTile from '@/components/ActivityTile'
import StatsTile from '@/components/StatsTile'
import CoursesSection from '@/components/CoursesSection'
import CoursesLoading from '@/components/CoursesLoading'
import BentoEntrance from '@/components/BentoEntrance'

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-[#f5f3ef] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-4">

          {/* top bento row — staggered entrance via BentoEntrance wrapper */}
          <BentoEntrance>
            {/* hero takes 2 cols on md+ */}
            <div className="md:col-span-2">
              <HeroTile />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              <StatsTile />
              <ActivityTile />
            </div>
          </BentoEntrance>

          {/* courses section */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#1c1917]">Active Courses</h2>
              <button className="text-xs text-[#4f46e5] hover:text-[#3730a3] transition-colors">
                View all
              </button>
            </div>
            <Suspense fallback={<CoursesLoading />}>
              <CoursesSection />
            </Suspense>
          </section>

        </div>
      </main>

      <MobileNav />
    </div>
  )
}
