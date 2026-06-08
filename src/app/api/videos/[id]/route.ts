import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import VideoModel from '@/models/Video'
import { deleteMedia } from '@/lib/cloudinary'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await connectDB()
    const video = await VideoModel.findById(id).lean()
    if (!video) return NextResponse.json({ error: 'الفيديو غير موجود' }, { status: 404 })
    return NextResponse.json({ success: true, data: video })
  } catch {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })

  const { id } = await params
  try {
    const body = await req.json()
    await connectDB()
    const video = await VideoModel.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!video) return NextResponse.json({ error: 'الفيديو غير موجود' }, { status: 404 })
    return NextResponse.json({ success: true, data: video })
  } catch {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })

  const { id } = await params
  try {
    await connectDB()
    const video = await VideoModel.findById(id)
    if (!video) return NextResponse.json({ error: 'الفيديو غير موجود' }, { status: 404 })

    await Promise.allSettled([
      deleteMedia(video.cloudinaryId, 'video'),
      deleteMedia(video.thumbnailId, 'image'),
    ])

    await VideoModel.findByIdAndDelete(id)
    return NextResponse.json({ success: true, message: 'تم حذف الفيديو' })
  } catch {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}
