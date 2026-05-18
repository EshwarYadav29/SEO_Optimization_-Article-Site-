import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/slugify'

export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(articles)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, content, excerpt, metaTitle, metaDesc } = body

  if (!title || !content) {
    return NextResponse.json(
      { error: 'Title and content are required' },
      { status: 400 }
    )
  }

  let slug = slugify(title)

  const existing = await prisma.article.findUnique({ where: { slug } })
  if (existing) {
    slug = `${slug}-${Date.now()}`
  }

  const article = await prisma.article.create({
    data: { title, slug, content, excerpt, metaTitle, metaDesc }
  })

  return NextResponse.json(article, { status: 201 })
}