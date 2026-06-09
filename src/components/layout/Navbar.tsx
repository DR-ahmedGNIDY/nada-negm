'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const navLinks = [
  { label: 'الرئيسية', href: '#home', emoji: '🏠' },
  { label: 'أعمالي', href: '#portfolio', emoji: '🎬' },
  { label: 'خدماتي', href: '#services', emoji: '⚡' },
  { label: 'البراندات', href: '#brands', emoji: '✨' },
  { label: 'عني', href: '#about', emoji: '👤' },
  { label: 'آراء العملاء', href: '#testimonials', emoji: '💬' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight">
                <span className="gradient-text">Nada</span>
                <span className="text-white"> Negm</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] text-white hover:opacity-90 transition-opacity duration-200"
              >
                تواصل معي
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl glass border border-white/10 text-white/80 hover:text-white transition-colors"
              aria-label="فتح القائمة"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ===== MOBILE DRAWER ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            />

            {/* Drawer Panel — slides from right (RTL) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="md:hidden fixed top-0 right-0 bottom-0 z-[70] w-[78vw] max-w-[320px] flex flex-col"
              style={{ background: 'rgba(7,11,20,0.98)', borderLeft: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <span className="text-xl font-black">
                  <span className="gradient-text">Nada</span>
                  <span className="text-white"> Negm</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                  aria-label="إغلاق القائمة"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 font-medium"
                  >
                    <span className="text-lg">{link.emoji}</span>
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </nav>

              {/* Drawer Footer CTA */}
              <div className="px-4 pb-8 pt-4 border-t border-white/5 space-y-3">
                <motion.a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="block w-full py-3.5 rounded-2xl text-center font-bold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 transition-opacity"
                >
                  تواصل معي الآن
                </motion.a>
                <p className="text-center text-white/25 text-xs">UGC Creator & Brand Content Specialist</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
