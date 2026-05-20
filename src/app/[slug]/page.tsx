import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } })

  if (!article) return { title: 'Not Found' }

  return {
    title: article.metaTitle || article.title,
    description: article.metaDesc || article.excerpt || article.content.slice(0, 155),
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDesc || article.excerpt || '',
    }
  }
}

export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } })

  if (!article) notFound()
  if (!article.published) notFound()

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Top Nav */}
      <nav style={{
        borderBottom: '1px solid var(--gray-100)',
        padding: '1rem 1.5rem',
        position: 'sticky',
        top: 0,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(8px)',
        zIndex: 10,
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <Link
            href="/"
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--brand-600)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            ← Back to articles
          </Link>
        </div>
      </nav>

      {/* Article */}
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <article className="fade-in-up">
          <header style={{ marginBottom: '2.5rem' }}>
            <h1 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--gray-900)',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}>
              {article.title}
            </h1>
            {article.excerpt && (
              <p style={{
                fontSize: '1.125rem',
                color: 'var(--gray-500)',
                lineHeight: 1.6,
                marginBottom: '1.25rem',
              }}>
                {article.excerpt}
              </p>
            )}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              paddingBottom: '2rem',
              borderBottom: '1px solid var(--gray-100)',
            }}>
              <time style={{ fontSize: '0.875rem', color: 'var(--gray-400)', fontWeight: 500 }}>
                {new Date(article.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </time>
            </div>
          </header>

          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
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