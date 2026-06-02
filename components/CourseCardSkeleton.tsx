export default function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#1e1e2e] p-5 bg-[#111118] flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 rounded-lg bg-[#1e1e2e] skeleton-pulse" />
        <div className="w-10 h-5 rounded-full bg-[#1e1e2e] skeleton-pulse" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-3.5 w-3/4 rounded bg-[#1e1e2e] skeleton-pulse" />
        <div className="h-3 w-1/2 rounded bg-[#1e1e2e] skeleton-pulse" />
      </div>
      <div>
        <div className="h-1.5 w-full rounded-full bg-[#1e1e2e] skeleton-pulse" />
        <div className="mt-2 h-3 w-1/3 rounded bg-[#1e1e2e] skeleton-pulse" />
      </div>
    </div>
  )
}
