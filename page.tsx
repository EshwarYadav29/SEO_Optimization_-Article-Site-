import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      createdAt: true,
    }
  })

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">The Blog</h1>
        <p className="text-gray-500">Latest articles and updates</p>
      </header>

      {articles.length === 0 ? (
        <p className="text-gray-400">No articles published yet.</p>
      ) : (
        <div className="space-y-8">
          {articles.map(article => (
            <article key={article.id} className="border-b pb-8">
              <Link href={`/${article.slug}`}>
                <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 mb-2">
                  {article.title}
                </h2>
              </Link>
              {article.excerpt && (
                <p className="text-gray-600 mb-3">{article.excerpt}</p>
              )}
              <div className="flex items-center justify-between">
                <time className="text-sm text-gray-400">
                  {new Date(article.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <Link
                  href={`/${article.slug}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}