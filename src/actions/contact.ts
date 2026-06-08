'use server'

import { z } from 'zod'
import connectDB from '@/lib/mongodb'
import ContactMessageModel from '@/models/ContactMessage'
import { revalidatePath } from 'next/cache'

const contactSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  company: z.string().optional(),
  service: z.string().min(1, 'يرجى اختيار الخدمة'),
  budget: z.string().optional(),
  message: z.string().min(20, 'يرجى كتابة تفاصيل أكثر (٢٠ حرف على الأقل)'),
})

export type ContactActionState = {
  success?: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function submitContactAction(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company') || undefined,
    service: formData.get('service'),
    budget: formData.get('budget') || undefined,
    message: formData.get('message'),
  }

  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      success: false,
      error: 'يرجى التحقق من البيانات المدخلة',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  try {
    await connectDB()
    await ContactMessageModel.create(parsed.data)
    revalidatePath('/dashboard/contact')
    return { success: true }
  } catch {
    return { success: false, error: 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً.' }
  }
}
