'use client'

import { motion } from 'framer-motion'
import { MessageCircle, FileText, Clapperboard, Send } from 'lucide-react'

const steps = [
  {
    step: '٠١',
    icon: MessageCircle,
    title: 'التواصل والاستشارة',
    description:
      'نتحدث عن براندك وأهدافك وجمهورك المستهدف. أفهم رؤيتك بالكامل قبل أي خطوة.',
    color: '#C66CFF',
  },
  {
    step: '٠٢',
    icon: FileText,
    title: 'الإستراتيجية والسيناريو',
    description:
      'أكتب سيناريو محكم وأضع خطة محتوى تُناسب منصتك وتُحقق أهدافك التسويقية.',
    color: '#FF5ACD',
  },
  {
    step: '٠٣',
    icon: Clapperboard,
    title: 'التصوير والإنتاج',
    description:
      'أنتج المحتوى بأعلى جودة — تصوير طبيعي وأصيل يشعر المشاهد أنه من شخص حقيقي.',
    color: '#818cf8',
  },
  {
    step: '٠٤',
    icon: Send,
    title: 'التسليم والمتابعة',
    description:
      'أسلّم المحتوى في الوقت المحدد مع تقرير أداء كامل وإمكانية التعديل حتى رضاك التام.',
    color: '#34d399',
  },
]

export default function ProcessSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-[#818cf8]/10 text-[#818cf8] border border-[#818cf8]/20 mb-4">
            كيف أعمل
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            من الفكرة إلى المحتوى
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            عملية واضحة وشفافة من أول تواصل حتى تسليم المحتوى
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative glass-card rounded-2xl p-6 text-center"
                >
                  {/* Step number */}
                  <div className="text-5xl font-black text-white/5 absolute top-4 left-4 select-none">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div
                    className="relative w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                  >
                    <Icon size={24} style={{ color: step.color }} />
                    {/* Glow */}
                    <div
                      className="absolute inset-0 rounded-2xl blur-xl opacity-30"
                      style={{ background: step.color }}
                    />
                  </div>

                  <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
