'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const skills = [
  'سيناريو وكتابة المحتوى',
  'تصوير وإخراج فيديو',
  'مونتاج احترافي',
  'محتوى UGC أصيل',
  'إستراتيجية السوشيال ميديا',
  'تحليل الأداء والنتائج',
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1 hidden md:block"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-card">
              {/* Placeholder for profile image */}
              <div className="w-full h-full bg-gradient-to-br from-[#C66CFF]/20 via-[#111827] to-[#FF5ACD]/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#C66CFF] to-[#FF5ACD] mx-auto mb-4 flex items-center justify-center text-white text-4xl font-black">
                    ن
                  </div>
                  <p className="text-white/50 text-sm">Nada Negm</p>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute top-6 left-6 glass-card rounded-xl px-4 py-2.5 border border-[#C66CFF]/20"
              >
                <div className="text-xs text-white/50">متاحة للمشاريع</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white text-sm font-semibold">Open for Work</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                className="absolute bottom-6 right-6 glass-card rounded-xl px-4 py-2.5 border border-[#FF5ACD]/20"
              >
                <div className="text-2xl font-black gradient-text">١٠M+</div>
                <div className="text-xs text-white/50">إجمالي المشاهدات</div>
              </motion.div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#C66CFF]/10 to-[#FF5ACD]/10 rounded-3xl blur-2xl -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 space-y-6 col-span-1 lg:col-span-1"
          >
            {/* Mobile mini avatar */}
            <div className="flex items-center gap-4 md:hidden mb-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C66CFF] to-[#FF5ACD] flex items-center justify-center text-white text-2xl font-black flex-shrink-0">
                ن
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white text-sm font-semibold">متاحة للمشاريع</span>
                </div>
                <div className="text-white/40 text-xs mt-0.5">١٠M+ مشاهدة • ٥٠+ براند</div>
              </div>
            </div>

            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-[#C66CFF]/10 text-[#C66CFF] border border-[#C66CFF]/20">
              عني
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              أنا ندى نجم
              <br />
              <span className="gradient-text">أصنع المحتوى الذي يُغيِّر</span>
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                مبدعة محتوى رقمي بخبرة تزيد عن ٣ سنوات في عالم UGC ومحتوى البراندات. تخصصت في
                إنتاج محتوى أصيل يربط الجمهور بالبراند بطريقة طبيعية وإنسانية.
              </p>
              <p>
                عملت مع أكثر من ٥٠ براند عالمي ومحلي في قطاعات الجمال والأزياء والمطاعم
                والتكنولوجيا — وكل مشروع كان له أثر حقيقي على مبيعات وانتشار هذه البراندات.
              </p>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <CheckCircle size={16} className="text-[#C66CFF] flex-shrink-0" />
                  {skill}
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#contact"
                className="px-7 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 transition-opacity"
              >
                تعاون معي
              </a>
              <a
                href="#portfolio"
                className="px-7 py-3.5 rounded-full font-bold text-white glass border border-white/10 hover:border-white/20 transition-all"
              >
                شاهد أعمالي
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
