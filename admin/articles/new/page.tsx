import ArticleForm from '@/components/ArticleForm'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New Article — Admin',
  robots: { index: false, follow: false },
}

export default function NewArticlePage() {
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
          <li aria-current="page">New Article</li>
        </ol>
      </nav>

      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '1.625rem',
            fontWeight: 800,
            color: '#111827',
            letterSpacing: '-0.025em',
          }}
        >
          New Article
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
          Fill in the details below and publish when ready.
        </p>
      </div>

      <ArticleForm />
    </div>
  )
}