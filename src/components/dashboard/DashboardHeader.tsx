'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ExternalLink, Bell } from 'lucide-react'
import {
  LayoutDashboard, Video, Building2, Star, MessageSquare, Settings, LogOut,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard },
  { label: 'الفيديوهات', href: '/dashboard/videos', icon: Video },
  { label: 'البراندات', href: '/dashboard/brands', icon: Building2 },
  { label: 'التقييمات', href: '/dashboard/testimonials', icon: Star },
  { label: 'الرسائل', href: '/dashboard/contact', icon: MessageSquare },
  { label: 'الإعدادات', href: '/dashboard/settings', icon: Settings },
]

const pageTitles: Record<string, string> = {
  '/dashboard': 'لوحة التحكم',
  '/dashboard/videos': 'إدارة الفيديوهات',
  '/dashboard/brands': 'إدارة البراندات',
  '/dashboard/testimonials': 'إدارة التقييمات',
  '/dashboard/contact': 'رسائل التواصل',
  '/dashboard/settings': 'إعدادات الموقع',
}

interface Props {
  user: { name?: string | null; email?: string | null }
}

export default function DashboardHeader({ user }: Props) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const title = pageTitles[pathname] ?? 'لوحة التحكم'

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#070B14]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5"
          aria-label="قائمة التنقل"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-white font-bold text-lg">{title}</h1>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/20 transition-all"
          >
            <ExternalLink size={13} />
            عرض الموقع
          </Link>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C66CFF] to-[#FF5ACD] flex items-center justify-center text-white text-xs font-bold">
              {user.name?.charAt(0) ?? 'م'}
            </div>
            <span className="hidden sm:block text-white/70 text-sm">{user.name ?? 'المدير'}</span>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute right-0 top-0 bottom-0 w-72 bg-[#0d1320] border-l border-white/5 flex flex-col p-4">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-black">
                <span className="gradient-text">Nada</span>
                <span className="text-white"> Negm</span>
              </span>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-white/40 hover:text-white">
                ✕
              </button>
            </div>
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = item.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                      isActive ? 'bg-[#C66CFF]/15 text-[#C66CFF]' : 'text-white/50 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all mt-4 border-t border-white/5 pt-4"
            >
              <LogOut size={18} />
              تسجيل الخروج
            </button>
          </aside>
        </div>
      )}
    </>
  )
}
