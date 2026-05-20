import ArticleForm from '@/components/ArticleForm'

export default function NewArticlePage() {
  return (
    <div style={{ maxWidth: '760px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '0.25rem' }}>
          New Article
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
          Create a new article for your blog
        </p>
      </div>
      <ArticleForm />
    </div>
  )
}