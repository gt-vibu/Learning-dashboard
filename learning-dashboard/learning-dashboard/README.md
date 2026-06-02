# LearnFlow — Student Learning Dashboard

A high-fidelity, animated student dashboard built as a submission for the **Next-Gen Learning Dashboard** frontend intern challenge. It features a dark-mode Bento Grid layout, live data from Supabase, hardware-accelerated Framer Motion animations, and a fully responsive design.

---

## Live Demo

> **Vercel URL:** _Add your deployment URL here after deploying_
>
> **GitHub Repo:** _Add your public repo URL here_

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Supabase Setup](#supabase-setup)
6. [Architectural Decisions](#architectural-decisions)
7. [Server / Client Component Split](#server--client-component-split)
8. [Animation Strategy](#animation-strategy)
9. [Responsive Design](#responsive-design)
10. [Challenges & Solutions](#challenges--solutions)
11. [Deployment](#deployment)

---

## Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| Database / BaaS | Supabase (PostgreSQL) | — |
| Supabase client | `@supabase/ssr` | 0.10.x |
| Styling | Tailwind CSS | 4.x |
| Animations | Framer Motion | 12.x |
| Icons | Lucide React | 1.x |
| Font | DM Sans (Google Fonts) | — |
| Deployment | Vercel | — |

---

## Project Structure

```
learning-dashboard/
├── app/
│   ├── globals.css          # CSS variables, Tailwind import, skeleton animation
│   ├── layout.tsx           # Root layout — font, metadata
│   └── page.tsx             # Dashboard page — Bento Grid, Suspense boundary
├── components/
│   ├── BentoEntrance.tsx    # Staggered page-load animation wrapper (client)
│   ├── Sidebar.tsx          # Collapsible desktop sidebar (client)
│   ├── MobileNav.tsx        # Bottom navigation bar on mobile (client)
│   ├── HeroTile.tsx         # Greeting + streak tile (client)
│   ├── StatsTile.tsx        # Weekly stats tile (client)
│   ├── ActivityTile.tsx     # Contribution-graph activity tile (client)
│   ├── CoursesSection.tsx   # Async server component — fetches from Supabase
│   ├── CourseCardGrid.tsx   # Staggered grid of CourseCards (client)
│   ├── CourseCard.tsx       # Individual course card with progress (client)
│   ├── ProgressBar.tsx      # Animated progress bar (client)
│   ├── CoursesLoading.tsx   # Suspense fallback — 4 skeleton cards
│   └── CourseCardSkeleton.tsx # Single skeleton card with pulse animation
├── lib/
│   └── supabase.ts          # createClient() — server-side Supabase client via @supabase/ssr
├── types/
│   └── index.ts             # TypeScript interfaces (Course)
├── .env.example             # Required environment variable keys (no values)
├── .env.local               # ⚠ NOT committed — real keys go here
└── next.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Supabase](https://supabase.com) account

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/learning-dashboard.git
cd learning-dashboard

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Then fill in your Supabase URL and anon key (see below)

# 4. Set up the Supabase database (see Supabase Setup section)

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

You can find both values in your Supabase project under:
**Project Settings → API → Project URL** and **anon / public key**.

> ⚠ **Never commit `.env.local`.** It is listed in `.gitignore`. The `.env.example` file (committed) shows only the key names, never the values.

---

## Supabase Setup

### 1. Create the `courses` table

Run this SQL in your Supabase **SQL Editor**:

```sql
create table public.courses (
  id          uuid primary key default gen_random_uuid(),
  title       text        not null,
  progress    integer     not null check (progress between 0 and 100),
  icon_name   text        not null,
  created_at  timestamptz not null default now()
);

-- Allow anonymous reads (used by the anon key in the client)
alter table public.courses enable row level security;
create policy "Public read access"
  on public.courses for select
  using (true);
```

### 2. Seed mock data

```sql
insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns',  75, 'Code'),
  ('System Design Fundamentals', 42, 'Layers'),
  ('PostgreSQL Deep Dive',      88, 'Database'),
  ('TypeScript Mastery',        20, 'Terminal');
```

### Supported `icon_name` values

The following strings map to a Lucide icon and a colour in `CourseCard.tsx`:

| `icon_name` | Icon | Colour |
|---|---|---|
| `Code` | `<Code />` | Blue `#4f8ef7` |
| `Layers` | `<Layers />` | Purple `#8b5cf6` |
| `Database` | `<Database />` | Teal `#14b8a6` |
| `Globe` | `<Globe />` | Orange `#f97316` |
| `BookOpen` | `<BookOpen />` | Blue `#4f8ef7` |
| `Cpu` | `<Cpu />` | Purple `#8b5cf6` |
| `Terminal` | `<Terminal />` | Teal `#14b8a6` |
| `Figma` | `<Figma />` | Orange `#f97316` |

Any unrecognised value falls back to `<BookOpen />` and blue.

---

## Architectural Decisions

### Why `@supabase/ssr` instead of `@supabase/supabase-js` directly?

The challenge required data fetching inside **React Server Components**. `@supabase/ssr` is the officially recommended Supabase package for Next.js App Router because it correctly threads the Next.js `cookies()` store through the Supabase client, making authenticated requests work properly in both server components and server actions — without leaking session data across requests (a risk with a naively shared singleton client).

### Why are `NEXT_PUBLIC_` prefixed keys used for a server component?

Both the URL and the anon key are intentionally public — they are safe to expose in the browser because Supabase Row Level Security (RLS) controls what the anon role can actually read. This allows the same env vars to work in both server and (future) client components without needing two separate key sets.

### Bento Grid approach

Rather than using a rigid CSS grid with manually placed grid areas, the layout uses a responsive `grid-cols-1 md:grid-cols-3` with `md:col-span-2` on the Hero tile. This gives the Bento aesthetic while staying fully flexible — the grid reflows naturally at every breakpoint without JavaScript.

---

## Server / Client Component Split

This is the core architectural requirement. The split is deliberate:

| Component | Type | Reason |
|---|---|---|
| `page.tsx` | **Server** | Renders layout; no browser APIs needed |
| `CoursesSection.tsx` | **Server** (async) | Fetches from Supabase at request time; keeps the DB query server-side |
| `CourseCardGrid.tsx` | **Client** (`'use client'`) | Uses Framer Motion `variants` and `animate` — requires the browser runtime |
| `CourseCard.tsx` | **Client** | `whileHover`, motion values |
| `ProgressBar.tsx` | **Client** | `useMotionValue`, `useEffect`, `animate` — browser-only APIs |
| `BentoEntrance.tsx` | **Client** | Wraps server-rendered children in a motion container for stagger animation |
| `Sidebar.tsx` | **Client** | `useState` for collapsed/active state; `layoutId` animation |
| `MobileNav.tsx` | **Client** | `useState` for active tab; `layoutId` animation |
| `HeroTile.tsx` | **Client** | `whileHover` spring animation |
| `StatsTile.tsx` | **Client** | `whileHover` spring animation |
| `ActivityTile.tsx` | **Client** | `motion.div` entrance animation per cell |
| `CoursesLoading.tsx` | **Server** | Pure JSX skeleton — no interactivity |
| `CourseCardSkeleton.tsx` | **Server** | Pure JSX skeleton — no interactivity |

### The key pattern — passing server data into client components

`CoursesSection` (server) fetches the data, then passes it as a plain prop to `CourseCardGrid` (client):

```tsx
// CoursesSection.tsx — server component
const { data, error } = await supabase.from('courses').select('*')
return <CourseCardGrid courses={data ?? []} />  // ← serialisable prop

// CourseCardGrid.tsx — 'use client'
export default function CourseCardGrid({ courses }: { courses: Course[] }) { … }
```

This is the canonical RSC pattern: fetch on the server, render interactivity on the client. The database query never runs in the browser, credentials never leave the server.

### Suspense boundary

```tsx
// page.tsx
<Suspense fallback={<CoursesLoading />}>
  <CoursesSection />   {/* async server component */}
</Suspense>
```

While `CoursesSection` awaits the Supabase response, React streams `CoursesLoading` (four skeleton cards with a CSS pulse animation) to the browser immediately. Once the data resolves, the skeletons are swapped for the real `CourseCardGrid` — no full-page loading state, no layout shift.

---

## Animation Strategy

All animations use **`transform` and `opacity` exclusively** to stay on the GPU compositor thread and avoid triggering browser layout or paint.

### 1. Staggered page-load entrance (`BentoEntrance.tsx`)

```ts
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const tile = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 22 },
  },
}
```

The parent `motion.div` orchestrates the children via `variants` + `staggerChildren`. Each child tile fades in while translating upward — never triggering a layout recalculation because only `transform: translateY()` and `opacity` change.

The same pattern applies to course cards in `CourseCardGrid.tsx` with a tighter `staggerChildren: 0.08`.

### 2. Card hover spring (`whileHover`)

```ts
<motion.article
  whileHover={{ scale: 1.02 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
>
```

Spring physics (`stiffness: 300, damping: 20`) give a natural overshoot-and-settle feel instead of a linear ease. `scale` is a transform — zero layout impact.

### 3. Sidebar & mobile nav `layoutId`

```tsx
{isActive && (
  <motion.div
    layoutId="sidebar-active-bg"
    className="absolute inset-0 rounded-lg bg-[#4f8ef7]/10"
    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
  />
)}
```

Framer Motion's `layoutId` tracks the highlight element across re-renders. When the active item changes, the highlight smoothly slides (not fades) from one nav item to the next — achieved purely with transforms, avoiding any paint.

### 4. Animated progress bar (`ProgressBar.tsx`)

```ts
const progress = useMotionValue(0)
animate(progress, value, { duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] })
```

`useMotionValue` drives the bar width through `useTransform`, from `0%` → `{value}%` with a custom cubic-bezier that gives a fast-start, soft-landing feel. A `hasAnimated` ref ensures the animation only fires once per card mount.

---

## Responsive Design

| Breakpoint | Sidebar | Main Grid |
|---|---|---|
| `< 768px` (mobile) | Hidden; replaced by fixed bottom nav (`MobileNav.tsx`) | Single column, vertically scrollable |
| `768px – 1024px` (tablet) | Icon-only mode (collapsed, `width: 64px`) via spring animation | 2-column grid (`sm:grid-cols-2`) |
| `> 1024px` (desktop) | Full sidebar with labels (`width: 220px`) | 3–4 column grid |

The sidebar collapse is controlled by a `collapsed` boolean in React state and animated with:

```tsx
<motion.aside animate={{ width: collapsed ? 64 : 220 }} transition={{ type: 'spring', … }}>
```

On mobile, the sidebar is hidden entirely (`hidden md:flex`) and `MobileNav` is shown (`md:hidden`), using the same `layoutId="mobile-active"` pattern for the highlight.

---

## Challenges & Solutions

### 1. Missing `types/index.ts`

**Problem:** `CourseCard.tsx` and `CourseCardGrid.tsx` imported `Course` from `@/types`, but no `types/index.ts` file existed in the project, causing a TypeScript compilation error.

**Solution:** Created `types/index.ts` with the `Course` interface that exactly mirrors the Supabase table schema:

```ts
export interface Course {
  id: string
  title: string
  progress: number
  icon_name: string
  created_at: string
}
```

### 2. Top-row bento tiles had no page-load entrance animation

**Problem:** The Hero, Stats, and Activity tiles appeared instantly on load — the staggered entrance animation only existed for course cards. The spec required *all* bento tiles to stagger in.

**Solution:** Created `BentoEntrance.tsx`, a thin `'use client'` wrapper that applies `staggerChildren` Framer Motion variants to its children. `page.tsx` (a server component) passes the tiles as children — the RSC boundary is respected because the children are server-rendered JSX, not component references.

### 3. Hydration mismatch risk in `ActivityTile`

**Problem:** Using `Math.random()` to generate the activity grid data inside a client component would cause a server/client hydration mismatch, since the random values would differ between the server render and the client hydration.

**Solution:** The existing code correctly uses a hardcoded `WEEKS` constant instead of `Math.random()`. This is documented here to explain the intent, as it's a non-obvious but critical correctness decision.

### 4. Cookies API in server Supabase client

**Problem:** `@supabase/ssr`'s `createServerClient` needs access to Next.js cookies to support authenticated sessions. In the App Router, `cookies()` is async and must be awaited.

**Solution:** `lib/supabase.ts` wraps the client creation in an async function and properly awaits `cookies()`:

```ts
export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(url, key, { cookies: { getAll, setAll } })
}
```

The `setAll` call is wrapped in a `try/catch` because calling it from a Server Component (as opposed to a Server Action) is expected to throw — the component has already started streaming its response.

---

## Deployment

### Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

During setup, add your environment variables in the Vercel dashboard under **Project → Settings → Environment Variables**:

```
NEXT_PUBLIC_SUPABASE_URL      → your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY → your Supabase anon key
```

Or via CLI:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

> Make sure to add the variables to **Production**, **Preview**, and **Development** environments as needed.

### Checklist before submitting

- [ ] Code pushed to a **public** GitHub repository
- [ ] `.env.local` is in `.gitignore` and **not committed**
- [ ] `.env.example` is committed with key names but no values
- [ ] Vercel deployment is live and accessible
- [ ] Supabase `courses` table is seeded with at least 3–4 rows
- [ ] README (this file) is present in the repo root

---

## License

MIT
