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
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Edit Article</h2>
      <ArticleForm article={article} />
    </div>
  )
}