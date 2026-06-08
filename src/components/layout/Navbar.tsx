'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const navLinks = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'أعمالي', href: '#portfolio' },
  { label: 'خدماتي', href: '#services' },
  { label: 'البراندات', href: '#brands' },
  { label: 'عني', href: '#about' },
  { label: 'آراء العملاء', href: '#testimonials' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
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

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] text-white hover:opacity-90 transition-opacity duration-200"
            >
              تواصل معي
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block mt-4 py-3 px-4 text-center rounded-xl text-white font-semibold bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD]"
              >
                تواصل معي
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
