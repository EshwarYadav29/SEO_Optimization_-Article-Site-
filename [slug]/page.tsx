import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params

  const article = await prisma.article.findUnique({
    where: { slug }
  })

  if (!article) return { title: 'Not Found' }

  return {
    title: article.metaTitle || article.title,
    description: article.metaDesc || article.excerpt || article.content.slice(0, 155),
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDesc || article.excerpt || '',
    }
  }
}

export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = await prisma.article.findUnique({
    where: { slug }
  })

  if (!article) notFound()
  if (!article.published) notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← Back to articles
        </Link>
      </nav>
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <time className="text-sm text-gray-600">
            {new Date(article.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </header>
        <div
          className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </main>
  )
}