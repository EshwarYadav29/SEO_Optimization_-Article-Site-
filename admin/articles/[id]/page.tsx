import { prisma } from '@/lib/prisma'
import ArticleForm from '@/components/ArticleForm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Article — Admin',
  robots: { index: false, follow: false },
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const article = await prisma.article.findUnique({
    where: { id: Number(id) },
  })

  if (!article) notFound()

  return (
    <div style={{ maxWidth: '780px' }}>
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
            <Link
              href="/admin"
              style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}
            >
              Articles
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li
            aria-current="page"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '360px',
            }}
          >
            {article.title}
          </li>
        </ol>
      </nav>

      {/* Page Title */}
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
              fontSize: '1.625rem',
              fontWeight: 800,
              color: '#111827',
              letterSpacing: '-0.025em',
            }}
          >
            Edit Article
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
            Last saved on{' '}
            {new Date(article.updatedAt ?? article.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Quick status pill */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            padding: '0.3rem 0.875rem',
            borderRadius: '999px',
            fontSize: '0.8125rem',
            fontWeight: 600,
            background: article.published ? '#dcfce7' : '#fef9c3',
            color: article.published ? '#15803d' : '#a16207',
            alignSelf: 'flex-start',
          }}
        >
          <span aria-hidden="true">{article.published ? '●' : '○'}</span>
          {article.published ? 'Published' : 'Draft'}
        </span>
      </div>

      <ArticleForm article={article} />
    </div>
  )
}