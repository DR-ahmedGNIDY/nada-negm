import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import VideoModel from '@/models/Video'
import { z } from 'zod'

const videoSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  category: z.string().min(1),
  cloudinaryId: z.string().min(1),
  cloudinaryUrl: z.string().url(),
  thumbnailId: z.string().min(1),
  thumbnailUrl: z.string().url(),
  brand: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') ?? '50')

    const query: Record<string, unknown> = {}
    if (category && category !== 'الكل') query.category = category
    if (featured === 'true') query.featured = true

    const videos = await VideoModel.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .limit(limit)
      .lean()

    return NextResponse.json({ success: true, data: videos })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'حدث خطأ في الخادم' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = videoSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'بيانات غير صحيحة', details: parsed.error.flatten() }, { status: 400 })
    }

    await connectDB()
    const video = await VideoModel.create(parsed.data)
    return NextResponse.json({ success: true, data: video }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'حدث خطأ في الخادم' }, { status: 500 })
  }
}
