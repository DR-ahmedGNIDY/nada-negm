import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'الصفحة غير موجودة | ندى نجم',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center px-4 text-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-[#C66CFF]/8 blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-[#FF5ACD]/8 blur-[120px]" />
      </div>
      <div className="relative">
        <p className="text-8xl font-black gradient-text mb-4">٤٠٤</p>
        <h1 className="text-2xl font-bold text-white mb-3">الصفحة غير موجودة</h1>
        <p className="text-white/40 mb-8 max-w-sm mx-auto">
          يبدو أن هذه الصفحة لا وجود لها. ربما تم نقلها أو حذفها.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 transition-opacity"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  )
}
