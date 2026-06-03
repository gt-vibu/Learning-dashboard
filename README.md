# LearnFlow — Student Learning Dashboard

A student dashboard built for the Next-Gen Learning Dashboard frontend intern challenge using Next.js, Supabase, Tailwind CSS, and Framer Motion.

The project uses a dark-mode Bento Grid layout and fetches live course data from Supabase. The main focus of the project was smooth animations, responsive design, and proper server/client component usage in Next.js App Router.

**Live Demo:** https://learning-dashboard-amber.vercel.app/
**GitHub Repo:** https://github.com/gt-vibu/Learning-dashboard

---

# Getting Started

```bash
git clone https://github.com/your-username/learning-dashboard.git
cd learning-dashboard
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000` in the browser.

---

# Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

You can get these from:

`Supabase → Settings → API`

---

# Supabase Setup

Run this in the Supabase SQL Editor:

```sql
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null check (progress between 0 and 100),
  icon_name text not null,
  created_at timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "Public read"
on public.courses
for select
using (true);

insert into public.courses (title, progress, icon_name) values
('Advanced React Patterns', 75, 'Code'),
('System Design Fundamentals', 42, 'Layers'),
('PostgreSQL Deep Dive', 88, 'Database'),
('TypeScript Mastery', 20, 'Terminal');
```

---

# Project Structure

* Server Components are used for fetching data from Supabase
* Client Components are used for Framer Motion animations and interactive UI
* Tailwind CSS is used for styling
* Framer Motion is used for hover effects and stagger animations

Main flow:

```txt
CoursesSection (Server Component)
        ↓
fetches Supabase data
        ↓
passes data to CourseCardGrid (Client Component)
```

I used React Suspense to show loading skeletons while course data is loading.

```tsx
<Suspense fallback={<CoursesLoading />}>
  <CoursesSection />
</Suspense>
```

---

# Animations

The project uses Framer Motion for animations and micro-interactions.

Features implemented:

* Staggered tile animations on page load
* Hover scaling effect on Bento cards
* Animated sidebar highlight using `layoutId`
* Animated progress bars
* Smooth spring animations

Most animations use only `transform` and `opacity` to avoid layout shifts.

---

# Challenges Faced

### Async `cookies()` issue

While using `@supabase/ssr`, the `cookies()` function needed `await` in Next.js App Router. Older examples online used synchronous calls, so it took some debugging.

### Hydration mismatch

Initially used random values in the activity graph which caused hydration mismatch between server and client render. Fixed it using a fixed array instead.

### Tailwind v4 setup

Tailwind styles were not loading properly at first because `postcss.config.js` was missing.

---

# Deployment

The project is deployed using Vercel.

Before deployment:

* Add environment variables in Vercel
* Make sure `.env.local` is in `.gitignore`
* Commit `.env.example`
* Add sample rows in Supabase

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
