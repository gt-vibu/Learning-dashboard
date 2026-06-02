import { Suspense } from 'react'
import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'
import CoursesSection from '@/components/CoursesSection'
import CoursesLoading from '@/components/CoursesLoading'
import BentoEntrance from '@/components/BentoEntrance'

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-[#0a0a0f] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-4">

          <BentoEntrance />

          {/* courses section */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#e8e8f0]">Active Courses</h2>
              <button className="text-xs text-[#4f8ef7] hover:text-[#7db0fb] transition-colors">
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