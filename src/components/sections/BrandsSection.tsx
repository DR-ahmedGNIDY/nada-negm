'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { Brand } from '@/types'

interface BrandsSectionProps {
  brands: Brand[]
}

const fallbackBrands = [
  'Zara', 'H&M', 'Maybelline', 'L\'Oréal', 'MAC', 'Nike', 'Sephora', 'NARS',
  'Dior', 'Chanel', 'Fenty Beauty', 'Glossier'
]

function MarqueeTrack({ brands, reverse = false }: { brands: Brand[]; reverse?: boolean }) {
  const items = brands.length > 0 ? brands : fallbackBrands.map((n, i) => ({ _id: String(i), name: n, logoUrl: '', logoId: '', featured: true, order: i, createdAt: '' }))
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        className="flex gap-6 w-max"
      >
        {doubled.map((brand, i) => (
          <div
            key={`${brand._id}-${i}`}
            className="flex-shrink-0 flex items-center justify-center px-8 py-4 glass-card rounded-xl border border-white/5 min-w-[140px] h-16"
          >
            {brand.logoUrl ? (
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity filter brightness-0 invert"
              />
            ) : (
              <span className="text-white/50 font-semibold text-sm whitespace-nowrap">{brand.name}</span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function BrandsSection({ brands }: BrandsSectionProps) {
  return (
    <section id="brands" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-[#C66CFF]/10 text-[#C66CFF] border border-[#C66CFF]/20 mb-4">
            ثقوا بي
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            براندات عملت معها
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            +٥٠ براند عالمي ومحلي اختاروا محتوى ندى نجم لتمثيلهم
          </p>
        </motion.div>
      </div>

      <div className="space-y-4">
        <MarqueeTrack brands={brands} />
        <MarqueeTrack brands={brands} reverse />
      </div>
    </section>
  )
}
