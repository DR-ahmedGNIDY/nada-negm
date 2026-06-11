import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import UserModel from '@/models/User'

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = 'ندى نجم'

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL و ADMIN_PASSWORD مطلوبان في Environment Variables')
  }

  await connectDB()
  const existing = await UserModel.findOne({ email })
  if (existing) return { message: 'المدير موجود بالفعل' }

  await UserModel.create({ name, email, password, role: 'admin' })
  return { success: true, message: 'تم إنشاء حساب المدير بنجاح', email }
}

// GET — open in browser directly
export async function GET() {
  try {
    const result = await createAdmin()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

// POST — keep for backward compat
export async function POST() {
  try {
    const result = await createAdmin()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
