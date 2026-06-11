import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
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

  // hash manually to bypass pre-save hook issues in serverless
  const hashed = await bcrypt.hash(password, 12)
  await UserModel.collection.insertOne({ name, email, password: hashed, role: 'admin', createdAt: new Date(), updatedAt: new Date() })
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
