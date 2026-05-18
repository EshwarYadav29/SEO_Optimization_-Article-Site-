import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true }
  })

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

  const articleUrls = articles.map(article => ({
    url: `${baseUrl}/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...articleUrls,
  ]
}