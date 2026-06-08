import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import BrandModel from '@/models/Brand'
import { deleteMedia } from '@/lib/cloudinary'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
  const { id } = await params
  try {
    const body = await req.json()
    await connectDB()
    const brand = await BrandModel.findByIdAndUpdate(id, body, { new: true })
    if (!brand) return NextResponse.json({ error: 'البراند غير موجود' }, { status: 404 })
    return NextResponse.json({ success: true, data: brand })
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
    const brand = await BrandModel.findById(id)
    if (!brand) return NextResponse.json({ error: 'البراند غير موجود' }, { status: 404 })
    await deleteMedia(brand.logoId, 'image').catch(() => {})
    await BrandModel.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}
