'use client'

import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Plus, Trash2, Loader2, Upload, X } from 'lucide-react'
import type { Testimonial } from '@/types'

export default function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [imageId, setImageId] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [featured, setFeatured] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  const load = async () => {
    try {
      const res = await fetch('/api/testimonials')
      const data = await res.json()
      setItems(data.data ?? [])
    } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const reset = () => {
    setShowForm(false)
    setPreview(null)
    setImageId('')
    setImageUrl('')
    setFeatured(true)
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    toast.loading('جاري رفع الصورة...', { id: 'upload' })
    try {
      const sigRes = await fetch('/api/upload-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder: 'nada-negm/testimonials', resource_type: 'image' }),
      })
      const sig = await sigRes.json()
      const fd = new FormData()
      fd.append('file', file)
      fd.append('api_key', sig.apiKey)
      fd.append('timestamp', String(sig.timestamp))
      fd.append('signature', sig.signature)
      fd.append('folder', sig.folder)
      const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, { method: 'POST', body: fd })
      const result = await res.json()
      if (result.error) throw new Error(result.error.message)
      setImageId(result.public_id)
      setImageUrl(result.secure_url)
      setPreview(result.secure_url)
      toast.success('تم رفع الصورة ✓', { id: 'upload' })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'فشل رفع الصورة', { id: 'upload' })
    } finally { setUploading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageId || !imageUrl) { toast.error('يرجى رفع صورة أولاً'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageId, imageUrl, featured }),
      })
      const data = await res.json()
      if (!data.success) throw new Error()
      toast.success('تم الإضافة بنجاح')
      reset(); load()
    } catch { toast.error('حدث خطأ') } finally { setSaving(false) }
  }

  const handleDelete = async (t: Testimonial) => {
    if (!confirm('حذف هذه الصورة؟')) return
    try {
      await fetch(`/api/testimonials/${t._id}`, { method: 'DELETE' })
      toast.success('تم الحذف')
      setItems(i => i.filter(x => x._id !== t._id))
    } catch { toast.error('فشل الحذف') }
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#C66CFF]" size={32} /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">التقييمات ({items.length})</h2>
          <p className="text-white/40 text-sm">صور آراء العملاء</p>
        </div>
        <button onClick={() => { reset(); setShowForm(true) }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90">
          <Plus size={18} /> إضافة صورة
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && reset()}>
          <div className="w-full max-w-sm glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">إضافة صورة تقييم</h3>
              <button onClick={reset}><X size={20} className="text-white/40 hover:text-white" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

              {preview ? (
                <div className="relative rounded-xl overflow-hidden">
                  <img src={preview} alt="preview" className="w-full object-contain max-h-64 rounded-xl" />
                  <button type="button" onClick={() => { setPreview(null); setImageId(''); setImageUrl('') }}
                    className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-red-500/80">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
                  className="w-full flex flex-col items-center justify-center gap-2 py-10 rounded-xl border-2 border-dashed border-white/15 text-white/40 hover:border-[#C66CFF]/40 hover:text-[#C66CFF] transition-colors">
                  {uploading
                    ? <><Loader2 size={24} className="animate-spin" /><span className="text-sm">جاري الرفع...</span></>
                    : <><Upload size={24} /><span className="text-sm">اختر صورة</span></>}
                </button>
              )}

              <div className="flex items-center gap-3">
                <label className="text-white/60 text-sm">مميز</label>
                <button type="button" onClick={() => setFeatured(v => !v)}
                  className={`w-11 h-6 rounded-full relative transition-colors ${featured ? 'bg-[#C66CFF]' : 'bg-white/10'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${featured ? 'right-0.5' : 'right-5'}`} />
                </button>
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={saving || uploading || !imageId}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 disabled:opacity-50">
                  {saving ? <><Loader2 size={16} className="animate-spin" /> حفظ...</> : 'حفظ'}
                </button>
                <button type="button" onClick={reset} className="px-6 py-3 rounded-xl text-white/60 border border-white/10">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((t) => (
          <div key={t._id} className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-white/5">
            <img src={t.imageUrl} alt="تقييم" className="w-full h-full object-cover" />
            {t.featured && (
              <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">مميز</span>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button onClick={() => handleDelete(t)} className="p-2.5 rounded-full bg-red-500/80 hover:bg-red-500 text-white">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="col-span-full text-center py-16 text-white/30">لا توجد صور بعد</div>}
      </div>
    </div>
  )
}
