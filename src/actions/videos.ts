'use server'

import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import VideoModel from '@/models/Video'
import { revalidatePath } from 'next/cache'
import { deleteMedia } from '@/lib/cloudinary'

export async function deleteVideoAction(id: string): Promise<{ success: boolean; error?: string }> {
  const session = await auth()
  if (!session?.user) return { success: false, error: 'غير مصرح' }

  try {
    await connectDB()
    const video = await VideoModel.findById(id)
    if (!video) return { success: false, error: 'الفيديو غير موجود' }

    await Promise.allSettled([
      deleteMedia(video.cloudinaryId, 'video'),
      deleteMedia(video.thumbnailId, 'image'),
    ])

    await VideoModel.findByIdAndDelete(id)
    revalidatePath('/dashboard/videos')
    revalidatePath('/')
    return { success: true }
  } catch {
    return { success: false, error: 'فشل حذف الفيديو' }
  }
}

export async function toggleFeaturedAction(id: string, featured: boolean) {
  const session = await auth()
  if (!session?.user) return { success: false, error: 'غير مصرح' }

  try {
    await connectDB()
    await VideoModel.findByIdAndUpdate(id, { featured })
    revalidatePath('/dashboard/videos')
    revalidatePath('/')
    return { success: true }
  } catch {
    return { success: false, error: 'فشل التحديث' }
  }
}
