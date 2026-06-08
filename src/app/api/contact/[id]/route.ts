import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import ContactMessageModel from '@/models/ContactMessage'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
  const { id } = await params
  try {
    const { status } = await req.json()
    if (!['جديد', 'مقروء', 'تم الرد'].includes(status)) {
      return NextResponse.json({ error: 'حالة غير صحيحة' }, { status: 400 })
    }
    await connectDB()
    const msg = await ContactMessageModel.findByIdAndUpdate(id, { status }, { new: true })
    if (!msg) return NextResponse.json({ error: 'غير موجود' }, { status: 404 })
    return NextResponse.json({ success: true, data: msg })
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
    await ContactMessageModel.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}
