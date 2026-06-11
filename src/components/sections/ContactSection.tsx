'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Send } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  company: z.string().optional(),
  service: z.string().min(1, 'يرجى اختيار الخدمة'),
  budget: z.string().optional(),
  message: z.string().min(20, 'يرجى كتابة تفاصيل أكثر (٢٠ حرف على الأقل)'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      toast.success('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً')
      reset()
    } catch {
      toast.error('حدث خطأ أثناء الإرسال، يرجى المحاولة مجدداً')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-[#C66CFF]/10 text-[#C66CFF] border border-[#C66CFF]/20 mb-4">
                ابدأ مشروعك
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
                هل أنت مستعد
                <br />
                <span className="gradient-text">لتحويل براندك؟</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                أنا متاحة للمشاريع الجديدة. تواصل معي وسأرد خلال ٢٤ ساعة بعرض مخصص لاحتياجات
                براندك.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: 'واتساب',
                  value: '+20 109 599 3164',
                  color: '#25D366',
                  href: 'https://wa.me/201095993164',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  ),
                },
                {
                  label: 'انستغرام',
                  value: '@nada_negm1',
                  color: '#E1306C',
                  href: 'https://www.instagram.com/nada_negm1?igsh=YzNxbGdjMWI4OHlz&utm_source=qr',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                },
                {
                  label: 'تيك توك',
                  value: '@nada_ugc10',
                  color: '#ff0050',
                  href: 'https://www.tiktok.com/@nada_ugc10?_r=1&_t=ZS-974orEZmsXE',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.17a8.16 8.16 0 004.77 1.52V7.25a4.85 4.85 0 01-1-.56z"/>
                    </svg>
                  ),
                },
                {
                  label: 'فيسبوك',
                  value: 'Nada Negm',
                  color: '#1877F2',
                  href: 'https://www.facebook.com/nada.611390',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 glass-card rounded-xl p-4 hover:border-white/20 transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}18`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white/40 text-xs">{item.label}</div>
                    <div className="text-white font-medium text-sm group-hover:text-white/80 transition-colors">{item.value}</div>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              ))}
            </div>

            {/* Response time */}
            <div className="glass-card rounded-xl p-5 border border-[#C66CFF]/15">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white font-semibold text-sm">متاحة الآن</span>
              </div>
              <p className="text-white/50 text-sm">وقت الاستجابة المعتاد: أقل من ٢٤ ساعة</p>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass-card rounded-2xl p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    الاسم <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('name')}
                    placeholder="اسمك"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C66CFF]/50 transition-colors"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    البريد الإلكتروني <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C66CFF]/50 transition-colors"
                    dir="ltr"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">اسم الشركة / البراند</label>
                <input
                  {...register('company')}
                  placeholder="اسم براندك (اختياري)"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C66CFF]/50 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    الخدمة المطلوبة <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('service')}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C66CFF]/50 transition-colors"
                    style={{ background: '#111827' }}
                  >
                    <option value="">اختر الخدمة</option>
                    <option value="UGC">محتوى UGC</option>
                    <option value="إعلانات مدفوعة">إعلانات مدفوعة</option>
                    <option value="محتوى سوشيال ميديا">محتوى سوشيال ميديا</option>
                    <option value="فيديو منتج">فيديو منتج</option>
                    <option value="حزمة متكاملة">حزمة متكاملة</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                  {errors.service && (
                    <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">الميزانية التقريبية</label>
                  <select
                    {...register('budget')}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C66CFF]/50 transition-colors"
                    style={{ background: '#111827' }}
                  >
                    <option value="">اختر الميزانية</option>
                    <option value="أقل من ٥٠٠$">أقل من ٥٠٠$</option>
                    <option value="٥٠٠$ - ١٠٠٠$">٥٠٠$ - ١٠٠٠$</option>
                    <option value="١٠٠٠$ - ٣٠٠٠$">١٠٠٠$ - ٣٠٠٠$</option>
                    <option value="أكثر من ٣٠٠٠$">أكثر من ٣٠٠٠$</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">
                  تفاصيل مشروعك <span className="text-red-400">*</span>
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="أخبرني عن براندك وما تريد تحقيقه..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C66CFF]/50 transition-colors resize-none"
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 disabled:opacity-50 transition-all duration-200"
              >
                <Send size={18} />
                {isSubmitting ? 'جاري الإرسال...' : 'أرسل طلبك الآن'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
