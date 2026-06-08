import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import ContactMessageModel from '@/models/ContactMessage'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  service: z.string().min(1),
  budget: z.string().optional(),
  message: z.string().min(20),
})

// Rate limiting in-memory (basic)
const rateLimit = new Map<string, { count: number; timestamp: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now - entry.timestamp > 60_000) {
    rateLimit.set(ip, { count: 1, timestamp: now })
    return true
  }
  if (entry.count >= 3) return false
  entry.count++
  return true
}

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
  try {
    await connectDB()
    const messages = await ContactMessageModel.find({}).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ success: true, data: messages })
  } catch {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'تم إرسال عدد كبير من الطلبات. يرجى المحاولة لاحقاً.' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'بيانات غير صحيحة' }, { status: 400 })

    await connectDB()
    const message = await ContactMessageModel.create(parsed.data)
    return NextResponse.json({ success: true, data: message }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 })
  }
}
