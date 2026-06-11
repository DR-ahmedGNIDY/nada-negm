'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import type { Testimonial } from '@/types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

function MarqueeRow({ images, reverse = false }: { images: string[]; reverse?: boolean }) {
  const doubled = [...images, ...images]
  return (
    <div className="overflow-hidden relative">
      {/* fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #070B14, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #070B14, transparent)' }} />

      <motion.div
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
        className="flex gap-4 w-max"
      >
        {doubled.map((url, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden"
            style={{ aspectRatio: '4/3' }}
          >
            <img
              src={url}
              alt={`تقييم ${i + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null

  const images = testimonials.map(t => t.imageUrl)
  // split into two rows
  const mid = Math.ceil(images.length / 2)
  const row1 = images.length >= 2 ? images.slice(0, mid) : images
  const row2 = images.length >= 2 ? images.slice(mid) : images

  return (
    <section id="testimonials" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 mb-4">
            ماذا قالوا عني
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">آراء عملائي</h2>
          <p className="text-white/50 max-w-xl mx-auto">نتائج حقيقية وتجارب موثقة من براندات وثقوا بمحتوى ندى</p>
        </motion.div>
      </div>

      <div className="space-y-4">
        <MarqueeRow images={row1} />
        {row2.length > 0 && <MarqueeRow images={row2} reverse />}
      </div>
    </section>
  )
}
