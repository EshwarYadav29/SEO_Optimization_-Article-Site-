import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Articles',
  description: 'Manage your published and draft articles.',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const published = articles.filter((a) => a.published).length
  const drafts = articles.length - published

  return (
    <div>
      {/* ── Page Header ─────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#111827',
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
            }}
          >
            Articles
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
            Manage all your content in one place.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
            color: '#fff',
            padding: '0.625rem 1.375rem',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.9375rem',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(37,99,235,0.3)',
            transition: 'opacity 0.15s ease, transform 0.15s ease',
          }}
        >
          <span aria-hidden="true" style={{ fontSize: '1.1rem' }}>+</span>
          New Article
        </Link>
      </div>

      {/* ── Stats Row ───────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {[
          {
            label: 'Total Articles',
            value: articles.length,
            icon: '📄',
            bg: '#f0f9ff',
            accent: '#0369a1',
          },
          {
            label: 'Published',
            value: published,
            icon: '✅',
            bg: '#f0fdf4',
            accent: '#15803d',
          },
          {
            label: 'Drafts',
            value: drafts,
            icon: '🖊️',
            bg: '#fefce8',
            accent: '#a16207',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: stat.bg,
              border: '1.5px solid',
              borderColor: stat.bg === '#f0f9ff'
                ? '#bae6fd'
                : stat.bg === '#f0fdf4'
                ? '#bbf7d0'
                : '#fde68a',
              borderRadius: '14px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span style={{ fontSize: '1.75rem' }} aria-hidden="true">
              {stat.icon}
            </span>
            <div>
              <p
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: stat.accent,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {stat.value}
              </p>
              <p style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.15rem' }}>
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Articles Table ──────────────────────────────── */}
      <div
        style={{
          background: '#fff',
          border: '1.5px solid #e5e7eb',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}
      >
        {/* Table header */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              fontSize: '0.9375rem',
              fontWeight: 700,
              color: '#374151',
            }}
          >
            All Articles{' '}
            <span
              style={{
                background: '#f3f4f6',
                color: '#6b7280',
                borderRadius: '999px',
                padding: '0.15rem 0.55rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                marginLeft: '0.4rem',
              }}
            >
              {articles.length}
            </span>
          </h2>
        </div>

        {articles.length === 0 ? (
          <div
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              color: '#9ca3af',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} aria-hidden="true">
              📭
            </div>
            <p style={{ fontWeight: 600, color: '#374151', fontSize: '1rem' }}>
              No articles yet
            </p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.4rem' }}>
              Create your first article to get started.
            </p>
            <Link
              href="/admin/articles/new"
              style={{
                display: 'inline-flex',
                marginTop: '1.25rem',
                padding: '0.55rem 1.25rem',
                background: '#2563eb',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              Create Article
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}
              aria-label="Articles list"
            >
              <thead>
                <tr style={{ background: '#f9fafb' }}>
                  {['Title', 'Slug', 'Status', 'Created', 'Actions'].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        fontWeight: 600,
                        color: '#6b7280',
                        fontSize: '0.75rem',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        borderBottom: '1px solid #f3f4f6',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    style={{
                      borderBottom: '1px solid #f9fafb',
                      transition: 'background 0.12s ease',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLTableRowElement).style.background = '#f9fafb')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLTableRowElement).style.background = 'transparent')
                    }
                  >
                    <td
                      style={{
                        padding: '0.875rem 1rem',
                        fontWeight: 600,
                        color: '#111827',
                        maxWidth: '280px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {article.title}
                    </td>
                    <td
                      style={{
                        padding: '0.875rem 1rem',
                        color: '#9ca3af',
                        fontFamily: 'ui-monospace,monospace',
                        fontSize: '0.8125rem',
                      }}
                    >
                      /{article.slug}
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: '0.2rem 0.65rem',
                          borderRadius: '999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: article.published ? '#dcfce7' : '#fef9c3',
                          color: article.published ? '#15803d' : '#a16207',
                        }}
                      >
                        <span aria-hidden="true">{article.published ? '●' : '○'}</span>
                        {article.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: '0.875rem 1rem',
                        color: '#9ca3af',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {new Date(article.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Link
                          href={`/admin/articles/${article.id}`}
                          aria-label={`Edit article: ${article.title}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '7px',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            color: '#2563eb',
                            background: '#eff6ff',
                            textDecoration: 'none',
                            transition: 'background 0.12s ease',
                          }}
                        >
                          ✎ Edit
                        </Link>
                        {article.published && (
                          <a
                            href={`/${article.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View published article: ${article.title}`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              padding: '0.35rem 0.75rem',
                              borderRadius: '7px',
                              fontSize: '0.8125rem',
                              fontWeight: 500,
                              color: '#6b7280',
                              background: '#f3f4f6',
                              textDecoration: 'none',
                            }}
                          >
                            ↗ View
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}