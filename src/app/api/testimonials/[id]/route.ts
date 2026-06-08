import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import TestimonialModel from '@/models/Testimonial'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
  const { id } = await params
  try {
    const body = await req.json()
    await connectDB()
    const item = await TestimonialModel.findByIdAndUpdate(id, body, { new: true })
    if (!item) return NextResponse.json({ error: 'غير موجود' }, { status: 404 })
    return NextResponse.json({ success: true, data: item })
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
    await TestimonialModel.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}
