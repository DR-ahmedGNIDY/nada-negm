'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center px-4 text-center">
      <div className="space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
          <AlertTriangle size={28} className="text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">حدث خطأ غير متوقع</h1>
        <p className="text-white/40 max-w-sm mx-auto">
          نعتذر عن هذا الخطأ. يرجى المحاولة مجدداً.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 transition-opacity"
          >
            حاول مجدداً
          </button>
          <a
            href="/"
            className="px-6 py-3 rounded-xl font-semibold text-white/60 border border-white/10 hover:border-white/20 hover:text-white transition-all"
          >
            الرئيسية
          </a>
        </div>
      </div>
    </div>
  )
}
