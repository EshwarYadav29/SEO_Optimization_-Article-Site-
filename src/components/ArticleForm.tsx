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
    border: '1px solid #e5e7eb',
    borderLeft: `4px solid ${accentColor}`,
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
    boxSizing: 'border-box' as const,
  })

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '0.5rem',
  }

  const baseInputStyle = {
    width: '100%',
    boxSizing: 'border-box' as const,
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem',
    outline: 'none',
  }

  return (
    /* THE BREAKOUT TRICK: 
      These styles force the form container out of narrow parents up to 1000px 
    */
    <div style={{
      width: '100vw',
      maxWidth: '1000px',
      margin: '2rem auto',
      padding: '0 1.5rem',
      boxSizing: 'border-box',
    }}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fca5a5',
            color: '#dc2626',
            padding: '0.875rem 1rem',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
          }}>
            ⚠ {error}
          </div>
        )}

        {/* Main Content Card */}
        <div style={cardStyle('#3b82f6')}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
            ✦ Article Content
          </h2>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={handleTitleChange}
              required
              placeholder="Enter article title..."
              style={baseInputStyle}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
              style={{ ...baseInputStyle, fontFamily: 'monospace', color: '#4b5563' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Content *</label>
            <textarea
              value={form.content}
              onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
              required
              rows={20}
              placeholder="Write your article content here..."
              style={{ 
                ...baseInputStyle, 
                resize: 'vertical', 
                lineHeight: '1.75', 
                minHeight: '450px',
                fontSize: '1rem' 
              }}
            />
          </div>

          <div>
            <label style={labelStyle}>Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={e => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={4}
              placeholder="Short summary..."
              style={{ ...baseInputStyle, resize: 'vertical', minHeight: '100px' }}
            />
          </div>
        </div>

        {/* SEO Card */}
        <div style={cardStyle('#7c3aed')}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
            ◎ SEO Settings
          </h2>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Meta Title</label>
            <input
              type="text"
              value={form.metaTitle}
              onChange={e => setForm(prev => ({ ...prev, metaTitle: e.target.value }))}
              placeholder="Defaults to title..."
              style={baseInputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Meta Description ({form.metaDesc?.length ?? 0}/155)</label>
            <textarea
              value={form.metaDesc}
              onChange={e => setForm(prev => ({ ...prev, metaDesc: e.target.value }))}
              rows={3}
              maxLength={155}
              placeholder="Google description..."
              style={{ ...baseInputStyle, resize: 'none' }}
            />
          </div>
        </div>

        {/* Actions layout wrapper */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingBottom: '4rem' }}>
          <button type="submit" disabled={loading} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
            {loading ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
          </button>
          {isEditing && (
            <button type="button" onClick={handleDelete} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
              Delete Article
            </button>
          )}
        </div>
      </form>
    </div>
  )
}