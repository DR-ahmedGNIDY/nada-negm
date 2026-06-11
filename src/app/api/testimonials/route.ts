import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import TestimonialModel from '@/models/Testimonial'
import { z } from 'zod'

const schema = z.object({
  imageId: z.string().min(1),
  imageUrl: z.string().url(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

export async function GET() {
  try {
    await connectDB()
    const testimonials = await TestimonialModel.find({}).sort({ featured: -1, order: 1 }).lean()
    return NextResponse.json({ success: true, data: testimonials })
  } catch {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'بيانات غير صحيحة', details: parsed.error.issues }, { status: 400 })
    await connectDB()
    const item = await TestimonialModel.create(parsed.data)
    return NextResponse.json({ success: true, data: item }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}
