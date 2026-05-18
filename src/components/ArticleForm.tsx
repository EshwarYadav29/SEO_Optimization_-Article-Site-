'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Article {
  id?: number
  title?: string
  slug?: string
  content?: string
  excerpt?: string
  metaTitle?: string
  metaDesc?: string
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
      const url = isEditing
        ? `/api/articles/${article.id}`
        : '/api/articles'
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
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this article?')) return
    await fetch(`/api/articles/${article?.id}`, { method: 'DELETE' })
    router.push('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={handleTitleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Slug</label>
        <input
          type="text"
          value={form.slug}
          onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
          className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-400 mt-1">Auto-generated from title</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content *</label>
        <textarea
          value={form.content}
          onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
          required
          rows={12}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Excerpt</label>
        <textarea
          value={form.excerpt}
          onChange={e => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
          rows={2}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium mb-3 text-gray-700">SEO Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Meta Title</label>
            <input
              type="text"
              value={form.metaTitle}
              onChange={e => setForm(prev => ({ ...prev, metaTitle: e.target.value }))}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Meta Description
              <span className="text-gray-400 font-normal ml-1">
                ({form.metaDesc.length}/155)
              </span>
            </label>
            <textarea
              value={form.metaDesc}
              onChange={e => setForm(prev => ({ ...prev, metaDesc: e.target.value }))}
              rows={2}
              maxLength={155}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          checked={form.published}
          onChange={e => setForm(prev => ({ ...prev, published: e.target.checked }))}
          className="w-4 h-4"
        />
        <label htmlFor="published" className="text-sm font-medium">
          Publish this article
        </label>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-red-600 hover:underline text-sm"
          >
            Delete Article
          </button>
        )}
      </div>
    </form>
  )
}