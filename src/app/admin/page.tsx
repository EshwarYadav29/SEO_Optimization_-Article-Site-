import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }
  })

  const published = articles.filter(a => a.published).length
  const drafts = articles.filter(a => !a.published).length

  return (
    <div>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '0.25rem' }}>
            Articles
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
            {published} published · {drafts} draft{drafts !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/admin/articles/new" className="btn btn-primary">
          + New Article
        </Link>
      </div>

      {/* Table */}
      <div style={{
        background: '#fff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--gray-200)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
      }}>
        {articles.length === 0 ? (
          <div style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            color: 'var(--gray-400)',
          }}>
            <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>No articles yet.</p>
            <Link href="/admin/articles/new" className="btn btn-primary">
              Create your first article
            </Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)' }}>
                {['Title', 'Slug', 'Status', 'Created', 'Actions'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left',
                    padding: '0.875rem 1.25rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--gray-500)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <tr
                  key={article.id}
                  style={{
                    borderBottom: i < articles.length - 1 ? '1px solid var(--gray-100)' : 'none',
                    transition: 'background var(--transition)',
                  }}
                >
                  <td style={{ padding: '1rem 1.25rem', maxWidth: '280px' }}>
                    <span style={{
                      fontWeight: 600,
                      color: 'var(--gray-800)',
                      fontSize: '0.9375rem',
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {article.title}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <code style={{
                      fontSize: '0.8125rem',
                      color: 'var(--gray-500)',
                      background: 'var(--gray-100)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                    }}>
                      /{article.slug}
                    </code>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className={`badge ${article.published ? 'badge-green' : 'badge-yellow'}`}>
                      {article.published ? '● Published' : '○ Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                    {new Date(article.createdAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="btn btn-ghost"
                      style={{ fontSize: '0.875rem' }}
                    >
                      Edit →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}