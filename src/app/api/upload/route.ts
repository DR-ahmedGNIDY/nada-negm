import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { uploadVideo, uploadImage } from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const type = formData.get('type') as string ?? 'image'
    const folder = formData.get('folder') as string ?? 'nada-negm'

    if (!file) return NextResponse.json({ error: 'لم يتم اختيار ملف' }, { status: 400 })

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

    let result
    if (type === 'video') {
      result = await uploadVideo(base64, `nada-negm/videos`)
    } else {
      result = await uploadImage(base64, `nada-negm/${folder}`)
    }

    return NextResponse.json({
      success: true,
      data: {
        publicId: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        duration: (result as { duration?: number }).duration,
      },
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'فشل رفع الملف' }, { status: 500 })
  }
}
