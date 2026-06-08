import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import SettingsModel from '@/models/Settings'

export async function GET() {
  try {
    await connectDB()
    let settings = await SettingsModel.findOne().lean()
    if (!settings) settings = await SettingsModel.create({})
    return NextResponse.json({ success: true, data: settings })
  } catch {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
  try {
    const body = await req.json()
    await connectDB()
    const settings = await SettingsModel.findOneAndUpdate({}, body, { new: true, upsert: true })
    return NextResponse.json({ success: true, data: settings })
  } catch {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}
