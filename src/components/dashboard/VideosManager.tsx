'use client'

import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Plus, Trash2, Edit2, Star, Upload, Loader2, Eye, X } from 'lucide-react'
import type { Video } from '@/types'

const categories = ['UGC', 'إعلان', 'ريلز', 'تيك توك', 'يوتيوب', 'منتج', 'مطعم', 'أزياء', 'جمال', 'أخرى']

interface UploadResult {
  publicId: string
  url: string
}

export default function VideosManager() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<'video' | 'thumb' | null>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const thumbInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    title: '', description: '', category: 'UGC', brand: '',
    cloudinaryId: '', cloudinaryUrl: '', thumbnailId: '', thumbnailUrl: '',
    featured: false, order: 0,
  })

  const loadVideos = async () => {
    try {
      const res = await fetch('/api/videos')
      const data = await res.json()
      setVideos(data.data ?? [])
    } catch {
      toast.error('فشل تحميل الفيديوهات')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadVideos() }, [])

  const resetForm = () => {
    setForm({ title: '', description: '', category: 'UGC', brand: '', cloudinaryId: '', cloudinaryUrl: '', thumbnailId: '', thumbnailUrl: '', featured: false, order: 0 })
    setEditingVideo(null)
    setShowForm(false)
  }

  const handleEdit = (video: Video) => {
    setForm({ title: video.title, description: video.description, category: video.category, brand: video.brand ?? '', cloudinaryId: video.cloudinaryId, cloudinaryUrl: video.cloudinaryUrl, thumbnailId: video.thumbnailId, thumbnailUrl: video.thumbnailUrl, featured: video.featured, order: video.order })
    setEditingVideo(video)
    setShowForm(true)
  }

  const uploadFile = async (file: File, type: 'video' | 'thumb'): Promise<UploadResult | null> => {
    setUploading(type)
    try {
      const isVideo = type === 'video'
      const folder = isVideo ? 'nada-negm/videos' : 'nada-negm/thumbnails'
      const resource_type = isVideo ? 'video' : 'image'

      // Get signed params from server
      const sigRes = await fetch('/api/upload-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder, resource_type }),
      })
      const sig = await sigRes.json()

      // Upload directly to Cloudinary (bypasses Vercel 4.5MB limit)
      const fd = new FormData()
      fd.append('file', file)
      fd.append('api_key', sig.apiKey)
      fd.append('timestamp', String(sig.timestamp))
      fd.append('signature', sig.signature)
      fd.append('folder', sig.folder)

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sig.cloudName}/${resource_type}/upload`,
        { method: 'POST', body: fd }
      )
      const result = await uploadRes.json()
      if (result.error) throw new Error(result.error.message)

      return { publicId: result.public_id, url: result.secure_url }
    } catch {
      toast.error('فشل رفع الملف')
      return null
    } finally {
      setUploading(null)
    }
  }

  const handleVideoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const result = await uploadFile(file, 'video')
    if (result) setForm(f => ({ ...f, cloudinaryId: result.publicId, cloudinaryUrl: result.url }))
  }

  const handleThumbFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const result = await uploadFile(file, 'thumb')
    if (result) setForm(f => ({ ...f, thumbnailId: result.publicId, thumbnailUrl: result.url }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.cloudinaryId || !form.thumbnailId) {
      toast.error('يرجى رفع الفيديو والصورة المصغرة')
      return
    }
    setSaving(true)
    try {
      const url = editingVideo ? `/api/videos/${editingVideo._id}` : '/api/videos'
      const method = editingVideo ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!data.success) throw new Error()
      toast.success(editingVideo ? 'تم تحديث الفيديو' : 'تم إضافة الفيديو')
      resetForm()
      loadVideos()
    } catch {
      toast.error('حدث خطأ أثناء الحفظ')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (video: Video) => {
    if (!confirm(`هل أنت متأكد من حذف "${video.title}"؟`)) return
    try {
      const res = await fetch(`/api/videos/${video._id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('تم حذف الفيديو')
      setVideos(v => v.filter(x => x._id !== video._id))
    } catch {
      toast.error('فشل حذف الفيديو')
    }
  }

  const toggleFeatured = async (video: Video) => {
    try {
      const res = await fetch(`/api/videos/${video._id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ featured: !video.featured }) })
      if (!res.ok) throw new Error()
      toast.success(video.featured ? 'أُزيل من المميزة' : 'أُضيف إلى المميزة')
      loadVideos()
    } catch { toast.error('فشل التحديث') }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="animate-spin text-[#C66CFF]" size={32} />
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">الفيديوهات ({videos.length})</h2>
          <p className="text-white/40 text-sm mt-0.5">إدارة معرض الأعمال</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 transition-opacity"
        >
          <Plus size={18} /> إضافة فيديو
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && resetForm()}>
          <div className="w-full max-w-2xl glass-card rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">{editingVideo ? 'تعديل الفيديو' : 'إضافة فيديو جديد'}</h3>
              <button onClick={resetForm} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-white/60 text-sm mb-1.5">العنوان *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C66CFF]/50" placeholder="عنوان الفيديو" />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">الفئة *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-white focus:outline-none focus:border-[#C66CFF]/50">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">البراند</label>
                  <input value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C66CFF]/50" placeholder="اسم البراند (اختياري)" />
                </div>
                <div className="col-span-2">
                  <label className="block text-white/60 text-sm mb-1.5">الوصف *</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required rows={3} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C66CFF]/50 resize-none" placeholder="وصف الفيديو" />
                </div>
                {/* Video Upload */}
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">الفيديو *</label>
                  <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoFile} className="hidden" />
                  <button type="button" onClick={() => videoInputRef.current?.click()} disabled={!!uploading} className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed transition-colors ${form.cloudinaryUrl ? 'border-green-500/50 text-green-400' : 'border-white/15 text-white/40 hover:border-[#C66CFF]/40 hover:text-[#C66CFF]'}`}>
                    {uploading === 'video' ? <><Loader2 size={16} className="animate-spin" /> جاري الرفع...</> : form.cloudinaryUrl ? <><Eye size={16} /> تم رفع الفيديو ✓</> : <><Upload size={16} /> رفع فيديو</>}
                  </button>
                </div>
                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">الصورة المصغرة *</label>
                  <input ref={thumbInputRef} type="file" accept="image/*" onChange={handleThumbFile} className="hidden" />
                  <button type="button" onClick={() => thumbInputRef.current?.click()} disabled={!!uploading} className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed transition-colors ${form.thumbnailUrl ? 'border-green-500/50 text-green-400' : 'border-white/15 text-white/40 hover:border-[#C66CFF]/40 hover:text-[#C66CFF]'}`}>
                    {uploading === 'thumb' ? <><Loader2 size={16} className="animate-spin" /> جاري الرفع...</> : form.thumbnailUrl ? <><Eye size={16} /> تم رفع الصورة ✓</> : <><Upload size={16} /> رفع صورة مصغرة</>}
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-white/60 text-sm">مميز</label>
                  <button type="button" onClick={() => setForm(f => ({ ...f, featured: !f.featured }))} className={`w-11 h-6 rounded-full transition-colors ${form.featured ? 'bg-[#C66CFF]' : 'bg-white/10'} relative`}>
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${form.featured ? 'right-0.5' : 'right-5'}`} />
                  </button>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">الترتيب</label>
                  <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) }))} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C66CFF]/50" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving || !!uploading} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 disabled:opacity-50 transition-opacity">
                  {saving ? <><Loader2 size={16} className="animate-spin" /> جاري الحفظ...</> : 'حفظ'}
                </button>
                <button type="button" onClick={resetForm} className="px-6 py-3 rounded-xl text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      {videos.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <p>لا توجد فيديوهات بعد. أضف أول فيديو لك!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {videos.map((video) => (
            <div key={video._id} className="glass-card rounded-xl overflow-hidden group">
              <div className="relative aspect-[9/16]">
                {video.thumbnailUrl ? (
                  <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#C66CFF]/20 to-[#FF5ACD]/20" />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => handleEdit(video)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors" aria-label="تعديل">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => toggleFeatured(video)} className={`p-2 rounded-lg transition-colors ${video.featured ? 'bg-yellow-400/20 text-yellow-400' : 'bg-white/10 text-white hover:bg-white/20'}`} aria-label="تمييز">
                    <Star size={16} className={video.featured ? 'fill-yellow-400' : ''} />
                  </button>
                  <button onClick={() => handleDelete(video)} className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors" aria-label="حذف">
                    <Trash2 size={16} />
                  </button>
                </div>
                {video.featured && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-white text-xs font-semibold truncate">{video.title}</p>
                <p className="text-white/40 text-xs mt-0.5">{video.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
