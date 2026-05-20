import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'The Blog — Fresh Articles & Insights',
  description:
    'Explore our latest articles, tutorials, and insights on a wide range of topics.',
}

export default async function HomePage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      createdAt: true,
    },
  })

  return (
    <>
      {/* ── Site Header ─────────────────────────────────── */}
      <header
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #7c3aed 100%)',
          padding: '0',
        }}
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '0 1.5rem',
          }}
        >
          {/* Top nav */}
          <nav
            aria-label="Site navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <span
              style={{
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.125rem',
                letterSpacing: '-0.02em',
              }}
            >
              ✦ The Blog
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link
                href="/"
                aria-current="page"
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  transition: 'background 0.2s',
                }}
              >
                Articles
              </Link>
            </div>
          </nav>

          {/* Hero */}
          <div style={{ padding: '4rem 0 4.5rem' }}>
            <p
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Welcome to the blog
            </p>
            <h1
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem',
                maxWidth: '640px',
              }}
            >
              Fresh ideas,{' '}
              <span
                style={{
                  backgroundImage:
                    'linear-gradient(135deg,#bfdbfe 0%,#e9d5ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                beautifully written
              </span>
            </h1>
            <p
              style={{
                color: 'rgba(255,255,255,0.72)',
                fontSize: '1.0625rem',
                maxWidth: '520px',
                lineHeight: 1.7,
              }}
            >
              Explore our curated collection of articles on the topics that
              matter most.
            </p>

            {/* Stats pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '2rem',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '999px',
                padding: '0.45rem 1rem',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              <span aria-hidden="true">📝</span>
              {articles.length} article{articles.length !== 1 ? 's' : ''} published
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '48px' }}
          aria-hidden="true"
        >
          <path
            d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48Z"
            fill="#ffffff"
          />
        </svg>
      </header>

      {/* ── Main Content ────────────────────────────────── */}
      <main
        id="main-content"
        style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}
      >
        {articles.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              color: '#9ca3af',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }} aria-hidden="true">
              📭
            </div>
            <p style={{ fontSize: '1.125rem', fontWeight: 600, color: '#374151' }}>
              No articles yet
            </p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9375rem' }}>
              Check back soon — great content is on the way.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,420px),1fr))',
              gap: '1.75rem',
            }}
          >
            {articles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid #e5e7eb',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          color: '#9ca3af',
          fontSize: '0.875rem',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p>
            <strong style={{ color: '#374151' }}>✦ The Blog</strong> — built
            with Next.js &amp; Prisma
          </p>
          <p style={{ marginTop: '0.35rem' }}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

/* ── Article Card Component ─────────────────────────────── */
function ArticleCard({
  article,
  index,
}: {
  article: {
    id: number
    title: string
    slug: string
    excerpt: string | null
    createdAt: Date
  }
  index: number
}) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const readTime = article.excerpt
    ? Math.max(1, Math.ceil(article.excerpt.split(' ').length / 200))
    : 3

  return (
    <article
      style={{
        background: '#ffffff',
        border: '1.5px solid #e5e7eb',
        borderRadius: '16px',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        animationDelay: `${index * 60}ms`,
      }}
      className="card-lift fade-in-up"
    >
      {/* Category chip */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem',
          background: '#eff6ff',
          color: '#1d4ed8',
          borderRadius: '999px',
          padding: '0.2rem 0.65rem',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
          alignSelf: 'flex-start',
        }}
      >
        <span aria-hidden="true">✦</span> Article
      </div>

      <Link
        href={`/${article.slug}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <h2
          style={{
            fontSize: '1.1875rem',
            fontWeight: 700,
            color: '#111827',
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
            transition: 'color 0.15s ease',
          }}
        >
          {article.title}
        </h2>
      </Link>

      {article.excerpt && (
        <p
          style={{
            color: '#4b5563',
            fontSize: '0.9375rem',
            lineHeight: 1.65,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.excerpt}
        </p>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '0.75rem',
          borderTop: '1px solid #f3f4f6',
        }}
      >
        <time
          dateTime={new Date(article.createdAt).toISOString()}
          style={{ fontSize: '0.8125rem', color: '#9ca3af' }}
        >
          {formattedDate} · {readTime} min read
        </time>
        <Link
          href={`/${article.slug}`}
          aria-label={`Read article: ${article.title}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#2563eb',
            textDecoration: 'none',
            padding: '0.3rem 0.75rem',
            borderRadius: '8px',
            background: '#eff6ff',
            transition: 'background 0.15s ease',
          }}
        >
          Read →
        </Link>
      </div>
    </article>
  )
}