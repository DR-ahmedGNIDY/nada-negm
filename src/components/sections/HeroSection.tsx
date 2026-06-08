'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Play, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ===== BANNER IMAGE ===== */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/panar.webp"
          alt="Nada Negm — UGC Creator"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* تعتيم على اليمين فقط خلف النص — الشمال (ندى) واضح */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#070B14]/90 via-[#070B14]/60 to-transparent" />
        {/* Gradient أسفل الصفحة فقط للانتقال */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#070B14] to-transparent" />
      </div>

      {/* Purple glow behind content */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#070B14] to-transparent" />
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full bg-[#C66CFF]/8 blur-[140px]" />
      </div>

      {/* Grid pattern subtle */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ transform: 'translateX(120px)' }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C66CFF]/30 text-sm text-white/80 mb-8 backdrop-blur-md"
        >
          <Sparkles size={14} className="text-[#C66CFF]" />
          <span>خبيرة UGC والمحتوى الرقمي المتخصص</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.1]"
        >
          <span className="gradient-text drop-shadow-lg">Nada Negm</span>
          <br />
          <span className="text-white/90 text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-md">
            UGC Creator & Brand Content Specialist
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-white/70 mb-10 leading-relaxed"
        >
          محتوى حقيقي يصنع ثقة حقيقية ويزيد مبيعات البراند.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#portfolio"
            className="group flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 transition-all duration-200 shadow-lg shadow-purple-500/30"
          >
            <Play size={18} className="fill-white" />
            شاهد أعمالي
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white glass border border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
          >
            تواصل معي
            <ArrowLeft size={18} className="rotate-180" />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: '١٥٠+', label: 'فيديو منتج' },
            { value: '٥٠+', label: 'براند عالمي' },
            { value: '١٠M+', label: 'مشاهدة' },
            { value: '٣+', label: 'سنوات خبرة' },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 text-center backdrop-blur-md border border-white/10"
              style={{ background: 'rgba(7,11,20,0.55)' }}
            >
              <div className="text-3xl font-black gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-10"
      >
        <span className="text-xs">تمرير للأسفل</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
