'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Article {
  id?: number
  title?: string
  slug?: string
  content?: string
  excerpt?: string | null
  metaTitle?: string | null
  metaDesc?: string | null
  imageUrl?: string | null
  imageAlt?: string | null
  published?: boolean
}

export default function ArticleForm({ article }: { article?: Article }) {
  const router = useRouter()
  const isEditing = !!article?.id

  const [form, setForm] = useState({
    title: article?.title ?? '',
    slug: article?.slug ?? '',
    content: article?.content ?? '',
    excerpt: article?.excerpt ?? '',
    metaTitle: article?.metaTitle ?? '',
    metaDesc: article?.metaDesc ?? '',
    published: article?.published ?? false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
    setForm(prev => ({ ...prev, title, slug }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = isEditing ? `/api/articles/${article!.id}` : '/api/articles'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Something went wrong')
      }

      router.push('/admin')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this article? This cannot be undone.')) return
    await fetch(`/api/articles/${article?.id}`, { method: 'DELETE' })
    router.push('/admin')
    router.refresh()
  }

  const cardStyle = (accentColor: string) => ({
    background: '#fff',
    border: '2px solid var(--gray-200)',
    borderLeft: `4px solid ${accentColor}`,
    borderRadius: 'var(--radius-lg)',
    padding: '1.75rem',
    marginBottom: '1.25rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  })

  const headingStyle = (color: string) => ({
    fontSize: '0.75rem',
    fontWeight: 700,
    color,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    marginBottom: '1.25rem',
    paddingBottom: '0.75rem',
    borderBottom: `2px solid ${color}22`,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  })

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--gray-700)',
    marginBottom: '0.4rem',
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fca5a5',
          color: '#dc2626',
          padding: '0.875rem 1rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
        }}>
          ⚠ {error}
        </div>
      )}

      {/* Main Content Card */}
      <div style={cardStyle('var(--brand-500)')}>
        <h2 style={headingStyle('var(--brand-600)')}>
          ✦ Article Content
        </h2>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>
            Title <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={handleTitleChange}
            required
            placeholder="Enter article title..."
            className="form-input"
          />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
            className="form-input"
            style={{ fontFamily: 'monospace', fontSize: '0.8125rem', color: 'var(--gray-500)' }}
          />
          <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '0.3rem' }}>
            Auto-generated from title · URL: /{form.slug || 'your-slug'}
          </p>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>
            Content <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <textarea
            value={form.content}
            onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
            required
            rows={14}
            placeholder="Write your article content here..."
            className="form-input"
            style={{ resize: 'vertical', fontFamily: 'inherit', fontSize: '0.9375rem', lineHeight: 1.8, minHeight: '320px' }}
          />
        </div>

        <div>
          <label style={labelStyle}>Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={e => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
            rows={3}
            placeholder="Short summary shown on the homepage listing..."
            className="form-input"
            style={{ resize: 'vertical', fontFamily: 'inherit', fontSize: '0.9375rem', lineHeight: 1.7, minHeight: '100px' }}
          />
        </div>
      </div>

      {/* SEO Card */}
      <div style={cardStyle('#7c3aed')}>
        <h2 style={headingStyle('#7c3aed')}>
          ◎ SEO Settings
        </h2>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>Meta Title</label>
          <input
            type="text"
            value={form.metaTitle}
            onChange={e => setForm(prev => ({ ...prev, metaTitle: e.target.value }))}
            placeholder="Defaults to article title if empty"
            className="form-input"
          />
        </div>

        <div>
          <label style={labelStyle}>
            Meta Description
            <span style={{ fontWeight: 400, color: 'var(--gray-400)', marginLeft: '0.5rem' }}>
              ({form.metaDesc?.length ?? 0}/155)
            </span>
          </label>
          <textarea
            value={form.metaDesc}
            onChange={e => setForm(prev => ({ ...prev, metaDesc: e.target.value }))}
            rows={3}
            maxLength={155}
            placeholder="Shown in Google search results..."
            className="form-input"
            style={{ resize: 'none' }}
          />
          {/* Character bar */}
          <div style={{
            marginTop: '0.4rem',
            height: '4px',
            background: 'var(--gray-100)',
            borderRadius: '999px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${Math.min(((form.metaDesc?.length ?? 0) / 155) * 100, 100)}%`,
              background: (form.metaDesc?.length ?? 0) > 140 ? '#dc2626' : '#7c3aed',
              borderRadius: '999px',
              transition: 'width 0.2s ease',
            }} />
          </div>
        </div>
      </div>

      {/* Publish Card */}
      <div style={{
        ...cardStyle(form.published ? '#16a34a' : '#d97706'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '1.25rem 1.75rem',
        marginBottom: '1.5rem',
      }}>
        <div>
          <p style={{
            fontWeight: 700,
            fontSize: '0.9375rem',
            color: form.published ? '#16a34a' : '#d97706',
          }}>
            {form.published ? '● Published' : '○ Draft'}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '0.15rem' }}>
            {form.published ? 'Visible to the public' : 'Only visible in admin'}
          </p>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={form.published}
            onChange={e => setForm(prev => ({ ...prev, published: e.target.checked }))}
            style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--brand-600)' }}
          />
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-700)' }}>
            Publish
          </span>
        </label>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-danger"
          >
            Delete Article
          </button>
        )}
      </div>
    </form>
  )
}