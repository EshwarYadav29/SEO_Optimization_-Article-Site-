import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'The Blog — Fresh Articles & Insights',
  description: 'Discover fresh articles.',
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
    }
  })

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Hero Header */}
      <header style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)',
        borderBottom: '1px solid var(--gray-100)',
        padding: '3rem 1.5rem 2.5rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'var(--brand-50)',
            color: 'var(--brand-600)',
            padding: '0.3rem 1rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            border: '1px solid var(--brand-100)',
          }}>
            ✦ Latest Articles
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1rem' }}>
            <span className="gradient-text">Fresh Articles</span>
            <br />Real Insights
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '1.0625rem', maxWidth: '480px', margin: '0 auto' }}>
            Stay up to date with the latest articles and insights.
          </p>
        </div>
      </header>

      {/* Articles List */}
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        {articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--gray-400)' }}>
            <p style={{ fontSize: '1.125rem' }}>No articles published yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {articles.map((article, i) => (
              <article
                key={article.id}
                className="card-lift fade-in-up"
                style={{
                  padding: '2rem 0',
                  borderBottom: '1px solid var(--gray-100)',
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <Link href={`/${article.slug}`} style={{ textDecoration: 'none' }}>
  <h2 style={{
    fontSize: '1.375rem',
    fontWeight: 700,
    color: 'var(--gray-900)',
    marginBottom: '0.5rem',
    lineHeight: 1.3,
  }}>
    {article.title}
  </h2>
</Link>
                {article.excerpt && (
                  <p style={{
                    color: 'var(--gray-500)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    marginBottom: '1rem',
                  }}>
                    {article.excerpt}
                  </p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <time style={{ fontSize: '0.8125rem', color: 'var(--gray-400)', fontWeight: 500 }}>
                    {new Date(article.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </time>
                  <Link
                    href={`/${article.slug}`}
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--brand-600)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      transition: 'gap var(--transition)',
                    }}
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--gray-100)',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        color: 'var(--gray-400)',
        fontSize: '0.875rem',
      }}>
        <p>© {new Date().getFullYear()} The Blog. Built with Next.js.</p>
      </footer>
    </div>
  )
}