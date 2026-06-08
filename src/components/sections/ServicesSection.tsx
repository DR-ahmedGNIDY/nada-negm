'use client'

import { motion } from 'framer-motion'
import { Video, Megaphone, Smartphone, Package, Star, Zap } from 'lucide-react'

const services = [
  {
    icon: Video,
    title: 'محتوى UGC',
    description:
      'فيديوهات أصيلة وطبيعية تشعر المشاهد أنها من مستخدم حقيقي — أقوى أنواع المحتوى في تحقيق المبيعات',
    color: '#C66CFF',
    features: ['مراجعات منتجات', 'فيديو تجربة شخصية', 'محتوى قصصي'],
  },
  {
    icon: Megaphone,
    title: 'إعلانات مدفوعة',
    description:
      'محتوى مُحسَّن للإعلانات المدفوعة على منصات ميتا وتيك توك — صُمِّم لتحقيق أعلى معدل تحويل',
    color: '#FF5ACD',
    features: ['إعلانات ميتا', 'إعلانات تيك توك', 'A/B Testing Content'],
  },
  {
    icon: Smartphone,
    title: 'ريلز وشورتس',
    description:
      'محتوى قصير مؤثر لانستغرام ريلز ويوتيوب شورتس وتيك توك — يزيد الوصول العضوي بشكل ملحوظ',
    color: '#818cf8',
    features: ['انستغرام ريلز', 'يوتيوب شورتس', 'تيك توك'],
  },
  {
    icon: Package,
    title: 'محتوى المنتجات',
    description:
      'فيديوهات احترافية تُبرز مميزات منتجك بطريقة جذابة وتحفّز القرار الشرائي عند المشاهد',
    color: '#34d399',
    features: ['عرض المنتج', 'Unboxing', 'Before & After'],
  },
  {
    icon: Star,
    title: 'محتوى أزياء وجمال',
    description:
      'محتوى متخصص لعلامات الأزياء والجمال — GRWM ومراجعات وتوتوريال بأسلوب راقٍ وجذاب',
    color: '#fbbf24',
    features: ['GRWM', 'مراجعات مكياج', 'ستايل هاول'],
  },
  {
    icon: Zap,
    title: 'حزمة محتوى متكاملة',
    description:
      'حزمة شاملة لإدارة كاملة لمحتوى السوشيال ميديا مع استراتيجية متكاملة تُناسب احتياجات براندك',
    color: '#f87171',
    features: ['استراتيجية محتوى', 'تقويم نشر', 'تقارير أداء'],
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-[#C66CFF]/10 text-[#C66CFF] border border-[#C66CFF]/20 mb-4">
            ما أقدّمه
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            خدماتي
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            محتوى مصمم لتحقيق نتائج حقيقية — لا مجرد مشاهدات
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 group hover:border-white/15 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
                >
                  <Icon size={22} style={{ color: service.color }} />
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{service.description}</p>
                <ul className="space-y-1.5">
                  {service.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-white/40">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: service.color }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 transition-all duration-200"
          >
            احصل على عرض مخصص لبراندك
          </a>
        </motion.div>
      </div>
    </section>
  )
}
