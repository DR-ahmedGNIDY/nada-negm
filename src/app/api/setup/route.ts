import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import UserModel from '@/models/User'

// One-time admin setup endpoint — disable after first use in production
export async function POST() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = 'ندى نجم'

  if (!email || !password) {
    return NextResponse.json({ error: 'ADMIN_EMAIL و ADMIN_PASSWORD مطلوبان في .env.local' }, { status: 400 })
  }

  try {
    await connectDB()
    const existing = await UserModel.findOne({ email })
    if (existing) return NextResponse.json({ message: 'المدير موجود بالفعل' })

    await UserModel.create({ name, email, password, role: 'admin' })
    return NextResponse.json({ success: true, message: 'تم إنشاء حساب المدير بنجاح' })
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}
