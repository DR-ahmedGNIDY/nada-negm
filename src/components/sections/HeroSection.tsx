'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Play, Sparkles } from 'lucide-react'
import Image from 'next/image'

// =============================================
// DESKTOP HERO — لا تعدل هذا الجزء إطلاقاً
// =============================================
function DesktopHero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
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
        <div className="absolute inset-0 bg-gradient-to-l from-[#070B14]/90 via-[#070B14]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#070B14] to-transparent" />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#070B14] to-transparent" />
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full bg-[#C66CFF]/8 blur-[140px]" />
      </div>

      <div
        className="absolute inset-0 z-[1] opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ transform: 'translateX(120px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C66CFF]/30 text-sm text-white/80 mb-8 backdrop-blur-md"
        >
          <Sparkles size={14} className="text-[#C66CFF]" />
          <span>خبيرة UGC والمحتوى الرقمي المتخصص</span>
        </motion.div>

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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-white/70 mb-10 leading-relaxed"
        >
          محتوى حقيقي يصنع ثقة حقيقية ويزيد مبيعات البراند.
        </motion.p>

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

// =============================================
// MOBILE HERO — تصميم مختلف تماماً
// =============================================
function MobileHero() {
  return (
    <section id="home" className="flex flex-col bg-[#070B14]" style={{ paddingTop: '60px' }}>

      {/* ===== صورة البانر + Overlay + أزرار + سوشيال ===== */}
      <div className="relative w-full">

        {/* الصورة — كاملة بدون قص */}
        <Image
          src="/panar2.webp"
          alt="Nada Negm"
          width={1080}
          height={1350}
          priority
          quality={90}
          className="w-full h-auto block"
          sizes="100vw"
        />

        {/* Overlay تدريجي على آخر 35% من الصورة */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(7,11,20,1) 0%, rgba(7,11,20,0.92) 15%, rgba(7,11,20,0.6) 28%, rgba(0,0,0,0) 50%)',
          }}
        />

        {/* أزرار + سوشيال فوق الـ Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center px-5 pb-6 gap-3">

          {/* الأزرار */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col w-full gap-2.5 max-w-[300px]"
          >
            <a
              href="#portfolio"
              className="flex items-center justify-center gap-2 w-full py-[13px] rounded-2xl font-bold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] shadow-lg shadow-purple-500/30 active:scale-[0.98] transition-transform"
            >
              <Play size={17} className="fill-white" />
              شاهد أعمالي
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 w-full py-[13px] rounded-2xl font-bold text-white border border-white/20 backdrop-blur-sm active:bg-white/10 transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              تواصل معي
              <ArrowLeft size={17} className="rotate-180" />
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center gap-3"
          >
            <span className="text-white/40 text-xs">تابعيني</span>
            <div className="flex gap-2.5">
              <a href="https://www.instagram.com/nada_negm1?igsh=YzNxbGdjMWI4OHlz&utm_source=qr" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/20 text-white/70 backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.1)' }} aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@nada_ugc10?_r=1&_t=ZS-974orEZmsXE" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/20 text-white/70 backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.1)' }} aria-label="TikTok">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/nada.611390" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/20 text-white/70 backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.1)' }} aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ===== الإحصائيات — أسفل الصورة ===== */}
      <div className="flex flex-col items-center px-5 pb-10 pt-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="grid grid-cols-2 gap-2.5 w-full max-w-[300px]"
        >
          {[
            { value: '١٥٠+', label: 'فيديو منتج' },
            { value: '٥٠+', label: 'براند عالمي' },
            { value: '١٠M+', label: 'مشاهدة' },
            { value: '٣+', label: 'سنوات خبرة' },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl p-4 text-center border border-white/8" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="text-2xl font-black gradient-text mb-0.5">{stat.value}</div>
              <div className="text-xs text-white/45">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// =============================================
// TABLET HERO — iPad / Tablet (768px – 1024px)
// Scaled-down Desktop: full-bleed image background, content overlay on right
// ONE overlay only — no stacking dark layers
// =============================================
function TabletHero() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden bg-[#070B14]"
      style={{ height: 'min(60vw, 680px)', minHeight: '480px' }}
    >
      {/* ===== الصورة — background كامل كـ Desktop ===== */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/panar.webp"
          alt="Nada Negm — UGC Creator"
          fill
          priority
          quality={90}
          className="object-contain object-center"
          sizes="100vw"
        />
        {/* overlay واحد فقط — يغمق اليمين حيث المحتوى، يترك اليسار مرئياً */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to left, rgba(7,11,20,0.93) 0%, rgba(7,11,20,0.75) 35%, rgba(7,11,20,0.2) 60%, transparent 100%)',
          }}
        />
        {/* تعتيم سفلي خفيف فقط */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#070B14] to-transparent" />
      </div>

      {/* glow بنفسجي خلف المحتوى */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[#C66CFF]/8 blur-[130px] pointer-events-none z-[1]" />

      {/* ===== المحتوى — نفس موضع Desktop مع translateX مناسب للـ tablet ===== */}
      <div
        className="relative z-10 w-full max-w-2xl mx-auto px-4 text-center"
        style={{ transform: 'translateX(80px)' }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C66CFF]/30 text-sm text-white/80 mb-7 backdrop-blur-md"
        >
          <Sparkles size={14} className="text-[#C66CFF]" />
          <span>خبيرة UGC والمحتوى الرقمي المتخصص</span>
        </motion.div>

        {/* الاسم */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl font-black tracking-tight mb-5 leading-[1.1]"
        >
          <span className="gradient-text drop-shadow-lg">Nada Negm</span>
          <br />
          <span className="text-white/90 text-3xl font-bold drop-shadow-md">
            UGC Creator & Brand Content Specialist
          </span>
        </motion.h1>

        {/* الوصف */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xs mx-auto text-base text-white/70 mb-8 leading-relaxed"
        >
          محتوى حقيقي يصنع ثقة حقيقية ويزيد مبيعات البراند.
        </motion.p>

        {/* الأزرار */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-row items-center justify-center gap-3 mb-10"
        >
          <a
            href="#portfolio"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 transition-all shadow-lg shadow-purple-500/30"
          >
            <Play size={16} className="fill-white" />
            شاهد أعمالي
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white glass border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all"
          >
            تواصل معي
            <ArrowLeft size={16} className="rotate-180" />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-4 gap-3"
        >
          {[
            { value: '١٥٠+', label: 'فيديو منتج' },
            { value: '٥٠+', label: 'براند عالمي' },
            { value: '١٠M+', label: 'مشاهدة' },
            { value: '٣+', label: 'سنوات خبرة' },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 text-center backdrop-blur-md border border-white/10"
              style={{ background: 'rgba(7,11,20,0.55)' }}
            >
              <div className="text-2xl font-black gradient-text mb-1">{stat.value}</div>
              <div className="text-xs text-white/55">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}

// =============================================
// EXPORT
// =============================================
export default function HeroSection() {
  return (
    <>
      {/* Desktop: lg+ */}
      <div className="hidden lg:block">
        <DesktopHero />
      </div>
      {/* Tablet: md → lg */}
      <div className="hidden md:block lg:hidden">
        <TabletHero />
      </div>
      {/* Mobile: < md */}
      <div className="md:hidden">
        <MobileHero />
      </div>
    </>
  )
}
