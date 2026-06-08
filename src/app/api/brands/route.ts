import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import BrandModel from '@/models/Brand'
import { z } from 'zod'

const brandSchema = z.object({
  name: z.string().min(1),
  logoId: z.string().min(1),
  logoUrl: z.string().url(),
  website: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

export async function GET() {
  try {
    await connectDB()
    const brands = await BrandModel.find({}).sort({ order: 1, createdAt: -1 }).lean()
    return NextResponse.json({ success: true, data: brands })
  } catch {
    return NextResponse.json({ success: false, error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = brandSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'بيانات غير صحيحة' }, { status: 400 })

    await connectDB()
    const brand = await BrandModel.create(parsed.data)
    return NextResponse.json({ success: true, data: brand }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}
