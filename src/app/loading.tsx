export default function Loading() {
  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#C66CFF]/20 border-t-[#C66CFF] animate-spin" />
        <p className="text-white/30 text-sm">جاري التحميل...</p>
      </div>
    </div>
  )
}
