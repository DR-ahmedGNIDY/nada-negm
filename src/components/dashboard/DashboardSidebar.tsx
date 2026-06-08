'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Video,
  Building2,
  Star,
  MessageSquare,
  Settings,
  LogOut,
  X,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard },
  { label: 'الفيديوهات', href: '/dashboard/videos', icon: Video },
  { label: 'البراندات', href: '/dashboard/brands', icon: Building2 },
  { label: 'التقييمات', href: '/dashboard/testimonials', icon: Star },
  { label: 'الرسائل', href: '/dashboard/contact', icon: MessageSquare },
  { label: 'الإعدادات', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <aside className="hidden md:flex w-64 flex-col border-l border-white/5 bg-[#0d1320] min-h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="block">
          <span className="text-xl font-black">
            <span className="gradient-text">Nada</span>
            <span className="text-white"> Negm</span>
          </span>
          <p className="text-white/30 text-xs mt-0.5">لوحة الإدارة</p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-[#C66CFF]/15 text-[#C66CFF] border border-[#C66CFF]/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
        >
          <LogOut size={18} />
          {signingOut ? 'جاري الخروج...' : 'تسجيل الخروج'}
        </button>
      </div>
    </aside>
  )
}
