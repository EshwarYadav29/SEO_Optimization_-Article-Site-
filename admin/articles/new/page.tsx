import ArticleForm from '@/components/ArticleForm'

export default function NewArticlePage() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">New Article</h2>
      <ArticleForm />
    </div>
  )
}