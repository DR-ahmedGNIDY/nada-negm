'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronRight, ChevronLeft } from 'lucide-react'
import type { Testimonial } from '@/types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

const fallbackTestimonials: Partial<Testimonial>[] = [
  {
    _id: '1',
    clientName: 'سارة المنصوري',
    clientTitle: 'مديرة التسويق',
    clientCompany: 'براند جمال راقٍ',
    content:
      'ندى حولت منتجاتنا إلى قصص مؤثرة جداً. المحتوى الذي أنتجته لنا حقق ضعف المبيعات المعتادة خلال أسبوع واحد فقط. احترافية عالية وفهم عميق لما يريده الجمهور.',
    rating: 5,
  },
  {
    _id: '2',
    clientName: 'محمد الراشدي',
    clientTitle: 'صاحب مشروع',
    clientCompany: 'مطعم الأصالة',
    content:
      'تعاملت مع ندى لإنتاج محتوى لمطعمي. النتيجة كانت مذهلة — حجوزات تضاعفت وطلبات دلفري زادت بنسبة ٧٠٪. تنصح بها بكل ثقة.',
    rating: 5,
  },
  {
    _id: '3',
    clientName: 'لينا العمر',
    clientTitle: 'Brand Manager',
    clientCompany: 'Zara Middle East',
    content:
      'العمل مع ندى كان تجربة استثنائية. إبداعها ومهنيتها وسرعة تنفيذها جعلتنا نختارها لأكثر من ٢٠ مشروع. محتوى UGC الخاص بها من أفضل ما رأيناه في المنطقة.',
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items = testimonials.length > 0 ? testimonials : (fallbackTestimonials as Testimonial[])
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length)
  const next = () => setCurrent((c) => (c + 1) % items.length)

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 mb-4">
            ماذا قالوا عني
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">آراء عملائي</h2>
          <p className="text-white/50 max-w-xl mx-auto">نتائج حقيقية وتجارب موثقة من براندات وثقوا بمحتوى ندى</p>
        </motion.div>

        {/* Featured Testimonial */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-8 sm:p-12 text-center relative"
            >
              <Quote size={48} className="text-[#C66CFF]/20 mx-auto mb-6" />
              <p className="text-white text-lg sm:text-xl leading-relaxed mb-8 font-medium">
                "{items[current].content}"
              </p>
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C66CFF] to-[#FF5ACD] flex items-center justify-center text-white font-bold text-xl">
                  {items[current].clientName?.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold">{items[current].clientName}</div>
                  <div className="text-white/50 text-sm">
                    {items[current].clientTitle} · {items[current].clientCompany}
                  </div>
                </div>
                <StarRating rating={items[current].rating} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {items.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={next}
                className="p-3 rounded-full glass border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all"
                aria-label="التالي"
              >
                <ChevronRight size={20} />
              </button>
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? 'w-8 bg-[#C66CFF]' : 'w-1.5 bg-white/20'
                    }`}
                    aria-label={`انتقل إلى ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={prev}
                className="p-3 rounded-full glass border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all"
                aria-label="السابق"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Grid of all testimonials */}
        {items.length > 3 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.slice(0, 3).map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <StarRating rating={t.rating} />
                <p className="text-white/70 text-sm leading-relaxed my-4">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C66CFF] to-[#FF5ACD] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {t.clientName?.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.clientName}</div>
                    <div className="text-white/40 text-xs">{t.clientCompany}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
