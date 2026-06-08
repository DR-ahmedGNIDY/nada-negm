'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Send, MessageSquare } from 'lucide-react'

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
                { icon: MessageSquare, label: 'واتساب', value: '+٩٦٦ ٥XX XXX XXXX', color: '#25D366' },
                { icon: MessageSquare, label: 'انستغرام', value: '@nadanegm', color: '#E1306C' },
                { icon: MessageSquare, label: 'يوتيوب', value: 'Nada Negm', color: '#FF0000' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-center gap-4 glass-card rounded-xl p-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${item.color}15` }}
                    >
                      <Icon size={18} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs">{item.label}</div>
                      <div className="text-white font-medium text-sm">{item.value}</div>
                    </div>
                  </div>
                )
              })}
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
