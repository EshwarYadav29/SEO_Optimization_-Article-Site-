import { prisma } from '@/lib/prisma'
import ArticleForm from '@/components/ArticleForm'
import { notFound } from 'next/navigation'

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const article = await prisma.article.findUnique({
    where: { id: Number(id) }
  })

  if (!article) notFound()

  return (
    <div style={{ maxWidth: '760px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '0.25rem' }}>
          Edit Article
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
          {article.title}
        </p>
      </div>
      <ArticleForm article={article} />
    </div>
  )
}