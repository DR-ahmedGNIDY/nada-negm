'use client'

import { motion } from 'framer-motion'
import type { Testimonial } from '@/types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 mb-4">
            ماذا قالوا عني
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">آراء عملائي</h2>
          <p className="text-white/50 max-w-xl mx-auto">نتائج حقيقية وتجارب موثقة من براندات وثقوا بمحتوى ندى</p>
        </motion.div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="break-inside-avoid rounded-2xl overflow-hidden"
            >
              <img
                src={t.imageUrl}
                alt={`تقييم ${i + 1}`}
                className="w-full h-auto block hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
