'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  value: number
  suffix: string
  label: string
  description: string
}

const stats: Stat[] = [
  { value: 150, suffix: '+', label: 'فيديو UGC', description: 'منتج لبراندات متنوعة' },
  { value: 50, suffix: '+', label: 'براند', description: 'محلي وعالمي' },
  { value: 10, suffix: 'M+', label: 'مشاهدة', description: 'إجمالي المشاهدات' },
  { value: 3, suffix: '+', label: 'سنوات', description: 'من الخبرة والإبداع' },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const steps = 60
    const increment = value / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      setCurrent(Math.min(Math.round(increment * step), value))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {current}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#C66CFF]/10 via-transparent to-[#FF5ACD]/10" />
          <div className="absolute inset-0 border border-white/5 rounded-3xl" />

          <div className="relative grid grid-cols-2 lg:grid-cols-4 divide-x divide-x-reverse divide-white/5">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 text-center"
              >
                <div className="text-4xl sm:text-5xl font-black gradient-text mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white font-bold text-lg mb-1">{stat.label}</div>
                <div className="text-white/40 text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
