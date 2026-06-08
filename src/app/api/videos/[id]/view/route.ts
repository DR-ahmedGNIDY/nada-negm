import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import VideoModel from '@/models/Video'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await connectDB()
    await VideoModel.findByIdAndUpdate(id, { $inc: { views: 1 } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
