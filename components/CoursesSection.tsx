import { createClient } from '@/lib/supabase'
import { Course } from '@/types'
import CourseCardGrid from './CourseCardGrid'

export default async function CoursesSection() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    return (
      <div className="col-span-full rounded-2xl border border-red-900/30 bg-red-950/10 p-5">
        <p className="text-sm text-red-400 font-medium">
          ⚠ Could not load courses — check your Supabase connection.
        </p>
        <p className="text-xs text-[#6b6b8a] mt-1 font-mono">{error.message}</p>
        <p className="text-xs text-[#6b6b8a] mt-2">
          Make sure <code className="text-[#4f8ef7]">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
          <code className="text-[#4f8ef7]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> are set in your{' '}
          <code className="text-[#4f8ef7]">.env.local</code> file.
        </p>
      </div>
    )
  }

  const courses: Course[] = data ?? []

  return <CourseCardGrid courses={courses} />
}
