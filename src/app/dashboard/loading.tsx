import { Loader2 } from 'lucide-react'

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={28} className="animate-spin text-[#C66CFF]" />
        <p className="text-white/30 text-sm">جاري التحميل...</p>
      </div>
    </div>
  )
}
