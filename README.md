# LearnFlow — Student Learning Dashboard

A modern dark-mode student dashboard built using Next.js App Router, Supabase, Tailwind CSS, and Framer Motion.

The dashboard fetches live course data from Supabase and displays it in an animated Bento Grid layout with smooth transitions, responsive design, and interactive UI components.

## Tech Stack

* Next.js (App Router)
* Supabase
* Tailwind CSS
* Framer Motion
* TypeScript
* Lucide Icons

---

# Features

* Server-side data fetching using Supabase
* Animated Bento Grid dashboard
* Smooth staggered page-load animations
* Interactive hover effects using Framer Motion
* Animated progress bars
* Responsive layout for desktop, tablet, and mobile
* Skeleton loading states using Suspense

---

# Supabase Setup

Create a `courses` table with:

* `id`
* `title`
* `progress`
* `icon_name`
* `created_at`

Example seed data:

```sql id="wfx1iq"
insert into public.courses (title, progress, icon_name) values
('Advanced React Patterns', 75, 'Code'),
('System Design Fundamentals', 42, 'Layers'),
('PostgreSQL Deep Dive', 88, 'Database');
```

---

# Environment Variables

Create a `.env.local` file:

```env id="i7d9lr"
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

---

# Architecture

I used Server Components for fetching Supabase data securely and Client Components for Framer Motion animations and interactive UI elements.

Animations mainly use `transform` and `opacity` to avoid layout shifts and improve performance.

---

# Challenges Faced

* Handling async `cookies()` with `@supabase/ssr`
* Avoiding hydration mismatch issues
* Managing the server/client component split correctly
* Creating smooth animations without layout shifts

---

# Deployment

The project is deployed on Vercel.

## Run Locally

```bash id="it3nni"
npm install
npm run dev
```
