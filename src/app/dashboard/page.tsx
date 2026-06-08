import connectDB from '@/lib/mongodb'
import VideoModel from '@/models/Video'
import BrandModel from '@/models/Brand'
import TestimonialModel from '@/models/Testimonial'
import ContactMessageModel from '@/models/ContactMessage'
import { Video, Eye, Building2, MessageSquare, Star, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'لوحة التحكم' }

async function getStats() {
  try {
    await connectDB()
    const [videos, brands, testimonials, messages, newMessages] = await Promise.all([
      VideoModel.countDocuments(),
      BrandModel.countDocuments(),
      TestimonialModel.countDocuments(),
      ContactMessageModel.countDocuments(),
      ContactMessageModel.countDocuments({ status: 'جديد' }),
    ])
    return { videos, brands, testimonials, messages, newMessages }
  } catch {
    return { videos: 0, brands: 0, testimonials: 0, messages: 0, newMessages: 0 }
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const cards = [
    { label: 'الفيديوهات', value: stats.videos, icon: Video, color: '#C66CFF', href: '/dashboard/videos' },
    { label: 'البراندات', value: stats.brands, icon: Building2, color: '#FF5ACD', href: '/dashboard/brands' },
    { label: 'التقييمات', value: stats.testimonials, icon: Star, color: '#fbbf24', href: '/dashboard/testimonials' },
    { label: 'الرسائل', value: stats.messages, icon: MessageSquare, color: '#34d399', badge: stats.newMessages, href: '/dashboard/contact' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-white">مرحباً بك 👋</h2>
        <p className="text-white/40 mt-1">هذه نظرة عامة على موقعك</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <a
              key={card.label}
              href={card.href}
              className="glass-card rounded-2xl p-5 hover:border-white/15 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${card.color}15`, border: `1px solid ${card.color}25` }}
                >
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                {card.badge ? (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/20">
                    {card.badge} جديد
                  </span>
                ) : null}
              </div>
              <div className="text-3xl font-black text-white mb-1">{card.value}</div>
              <div className="text-white/40 text-sm">{card.label}</div>
            </a>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-white font-bold mb-4">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'رفع فيديو جديد', href: '/dashboard/videos', color: '#C66CFF' },
            { label: 'إضافة براند', href: '/dashboard/brands', color: '#FF5ACD' },
            { label: 'إضافة تقييم', href: '/dashboard/testimonials', color: '#fbbf24' },
            { label: 'عرض الرسائل', href: '/dashboard/contact', color: '#34d399' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex items-center justify-center text-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border border-white/10 hover:border-white/20 text-white/60 hover:text-white hover:bg-white/5"
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="glass-card rounded-2xl p-6 border border-[#C66CFF]/10">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp size={20} className="text-[#C66CFF]" />
          <h3 className="text-white font-bold">نصائح سريعة</h3>
        </div>
        <ul className="space-y-2 text-white/50 text-sm">
          <li>• أضف فيديوهاتك المميزة أولاً لتظهر في أعلى معرض الأعمال</li>
          <li>• تأكد من رفع صور واضحة لشعارات البراندات بخلفية شفافة</li>
          <li>• تحقق من رسائل التواصل بانتظام للرد على العملاء المحتملين</li>
        </ul>
      </div>
    </div>
  )
}
