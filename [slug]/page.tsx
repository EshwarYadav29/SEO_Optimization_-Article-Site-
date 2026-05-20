import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const article = await prisma.article.findUnique({ where: { slug } })

  if (!article) return { title: 'Article Not Found' }

  const description =
    article.metaDesc ||
    article.excerpt ||
    article.content.replace(/<[^>]+>/g, '').slice(0, 155)

  return {
    title: article.metaTitle || article.title,
    description,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDesc || article.excerpt || '',
      type: 'article',
      publishedTime: article.createdAt.toISOString(),
    },
    alternates: {
      canonical: `/${slug}`,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } })

  if (!article) notFound()
  if (!article.published) notFound()

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const wordCount = article.content.replace(/<[^>]+>/g, '').split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <>
      {/* ── Site Nav ──────────────────────────────────── */}
      <header
        style={{
          borderBottom: '1px solid #e5e7eb',
          background: '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            padding: '0.875rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href="/"
            style={{
              fontWeight: 800,
              fontSize: '1rem',
              color: '#111827',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            ✦ The Blog
          </Link>
          <Link
            href="/"
            aria-label="Back to all articles"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#2563eb',
              textDecoration: 'none',
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              background: '#eff6ff',
              transition: 'background 0.15s ease',
            }}
          >
            ← All articles
          </Link>
        </div>
      </header>

      {/* ── Article ───────────────────────────────────── */}
      <main
        id="main-content"
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '3rem 1.5rem 6rem',
        }}
      >
        <article>
          {/* Article header */}
          <header style={{ marginBottom: '2.5rem' }}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
              <ol
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  listStyle: 'none',
                  padding: 0,
                  fontSize: '0.8125rem',
                  color: '#9ca3af',
                }}
              >
                <li>
                  <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '360px',
                  }}
                  aria-current="page"
                >
                  {article.title}
                </li>
              </ol>
            </nav>

            <h1
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: '#111827',
                lineHeight: 1.25,
                letterSpacing: '-0.025em',
                marginBottom: '1.25rem',
              }}
            >
              {article.title}
            </h1>

            {article.excerpt && (
              <p
                style={{
                  fontSize: '1.125rem',
                  color: '#4b5563',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                }}
              >
                {article.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.75rem',
                paddingBottom: '1.75rem',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <time
                dateTime={new Date(article.createdAt).toISOString()}
                style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span aria-hidden="true">📅</span> {formattedDate}
              </time>
              <span
                style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span aria-hidden="true">⏱</span> {readTime} min read
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  background: '#dcfce7',
                  color: '#15803d',
                  borderRadius: '999px',
                  padding: '0.2rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                ✓ Published
              </span>
            </div>
          </header>

          {/* Article body */}
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* ── Back link at bottom ── */}
        <div
          style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: '#2563eb',
              textDecoration: 'none',
              padding: '0.6rem 1.25rem',
              borderRadius: '10px',
              background: '#eff6ff',
              border: '1.5px solid #bfdbfe',
              transition: 'all 0.2s ease',
            }}
          >
            ← Back to all articles
          </Link>
        </div>
      </main>

      {/* ── Footer ───────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid #e5e7eb',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          color: '#9ca3af',
          fontSize: '0.875rem',
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p>
            <strong style={{ color: '#374151' }}>✦ The Blog</strong> — built
            with Next.js &amp; Prisma
          </p>
          <p style={{ marginTop: '0.25rem' }}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}