import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/slugify'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const article = await prisma.article.findUnique({
    where: { id: Number(id) }
  })
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(article)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  const { title, content, excerpt, metaTitle, metaDesc, published } = body

  const data: Record<string, unknown> = {
    title,
    content,
    excerpt,
    metaTitle,
    metaDesc,
    published,
  }

  if (title) data.slug = slugify(title)
  if (published) data.publishedAt = new Date()

  const article = await prisma.article.update({
    where: { id: Number(id) },
    data
  })
  return NextResponse.json(article)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.article.delete({
    where: { id: Number(id) }
  })
  return NextResponse.json({ success: true })
}