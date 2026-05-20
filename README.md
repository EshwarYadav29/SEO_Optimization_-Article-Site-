# SEO-Optimized Content Publishing Platform

A minimal but production-ready blog CMS built with Next.js App Router, 
featuring a full admin panel, dynamic SEO metadata, and a perfect Lighthouse score.

**Live Demo:** https://seo-cms-07f9.onrender.com  
**Admin Panel:** https://seo-cms-07f9.onrender.com/admin

---

## Lighthouse Score

| Metric | Score |
|---|---|
| Performance | 99 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

<img width="738" height="256" alt="image" src="https://github.com/user-attachments/assets/7637ff9d-9296-45f0-b8d5-fef751bae650" />


---

## Features

**Admin Panel**
- Create, edit, delete, publish articles
- Auto-generated URL slugs from title
- SEO fields: meta title, meta description with character counter
- Draft/publish toggle with visual status indicator

**Public Site**
- Article listing homepage with excerpts
- Individual article pages with semantic HTML
- Fully responsive layout

**SEO**
- Dynamic `generateMetadata` per article (title, description, OpenGraph)
- Auto-generated `sitemap.xml` with all published articles
- `robots.txt` with admin panel excluded
- Proper heading hierarchy (h1 → h2 → h3)
- Semantic HTML5 elements (`<main>`, `<article>`, `<header>`, `<nav>`)

**Performance**
- ISR (Incremental Static Regeneration) on public pages
- `next/font` for zero layout shift font loading
- Selective `select` queries — only fetch fields needed per page
- No unnecessary client components

---

## Tech Stack

| Technology | Reason |
|---|---|
| Next.js 15 App Router | Server rendering for SEO, file-based routing, `generateMetadata` API |
| TypeScript | Type-safe database queries and component props |
| Prisma ORM | Schema-first migrations, fully typed query results |
| SQLite | Zero-config local database, single file, no external service needed |
| Tailwind CSS v4 | Utility-first styling, no unused CSS in production |
| Render | Persistent filesystem supports SQLite in production |

---

## Architecture

<img width="610" height="432" alt="image" src="https://github.com/user-attachments/assets/ee95aef2-6215-4134-8f6d-370a29865d6a" />

**Rendering Strategy:**
- Public pages use ISR — cached at CDN, regenerates in background
- Admin pages are dynamic — always fresh, no caching
- API routes are server-only — direct database access, no client exposure

---

## Local Setup

```bash
# Clone the repo
git clone https://github.com/EshwarYadav29/SEO_Optimization_-Article-Site-.git
cd SEO_Optimization_-Article-Site-

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run database migrations
npx prisma migrate dev --name init

# Start development server
npm run dev
```

Open `http://localhost:3000`

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | SQLite file path e.g. `file:./prisma/dev.db` |
| `NEXT_PUBLIC_BASE_URL` | Production URL for sitemap generation |

---

## Trade-offs & Known Limitations

- **No authentication** on admin panel — acceptable for assignment scope, production would use NextAuth.js
- **SQLite on Render** — works because Render has a persistent filesystem, unlike Vercel, which is read-only. For horizontal scaling, PostgreSQL would be the correct choice
- **Plain textarea for content** — no rich text editor to avoid complexity. Content is stored and rendered as plain text
- **No image upload** — images would require cloud storage (Cloudinary/S3) in production

---

## What I Would Add With More Time

- NextAuth.js authentication for the admin panel
- Rich text / Markdown editor for article content
- Image upload with Cloudinary integration
- AI-generated meta descriptions via Claude API
- RSS feed at `/feed.xml`
- Reading time estimate on articles
- JSON-LD structured data for Google rich results
- Search functionality
