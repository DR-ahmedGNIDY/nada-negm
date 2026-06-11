'use client'

import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Plus, Trash2, Edit2, Upload, Loader2, X, Globe } from 'lucide-react'
import type { Brand } from '@/types'

export default function BrandsManager() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({ name: '', logoId: '', logoUrl: '', website: '', featured: true, order: 0 })

  const load = async () => {
    try {
      const res = await fetch('/api/brands')
      const data = await res.json()
      setBrands(data.data ?? [])
    } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const reset = () => { setForm({ name: '', logoId: '', logoUrl: '', website: '', featured: true, order: 0 }); setEditingBrand(null); setShowForm(false) }

  const handleEdit = (b: Brand) => {
    setForm({ name: b.name, logoId: b.logoId, logoUrl: b.logoUrl, website: b.website ?? '', featured: b.featured, order: b.order })
    setEditingBrand(b); setShowForm(true)
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true)
    const fd = new FormData(); fd.append('file', file); fd.append('type', 'image'); fd.append('folder', 'brands')
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) setForm(f => ({ ...f, logoId: data.data.publicId, logoUrl: data.data.url }))
      else toast.error('فشل رفع الشعار')
    } catch { toast.error('خطأ في الرفع') } finally { setUploading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.logoId) { toast.error('يرجى رفع شعار البراند'); return }
    setSaving(true)
    try {
      const url = editingBrand ? `/api/brands/${editingBrand._id}` : '/api/brands'
      const method = editingBrand ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!data.success) throw new Error()
      toast.success(editingBrand ? 'تم التحديث' : 'تم الإضافة')
      reset(); load()
    } catch { toast.error('حدث خطأ') } finally { setSaving(false) }
  }

  const handleDelete = async (brand: Brand) => {
    if (!confirm(`حذف "${brand.name}"؟`)) return
    try {
      await fetch(`/api/brands/${brand._id}`, { method: 'DELETE' })
      toast.success('تم الحذف')
      setBrands(b => b.filter(x => x._id !== brand._id))
    } catch { toast.error('فشل الحذف') }
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#C66CFF]" size={32} /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">البراندات ({brands.length})</h2>
          <p className="text-white/40 text-sm">إدارة شعارات البراندات</p>
        </div>
        <button onClick={() => { reset(); setShowForm(true) }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 transition-opacity">
          <Plus size={18} /> إضافة براند
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && reset()}>
          <div className="w-full max-w-md glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">{editingBrand ? 'تعديل البراند' : 'إضافة براند جديد'}</h3>
              <button onClick={reset}><X size={20} className="text-white/40 hover:text-white" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-1.5">اسم البراند *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C66CFF]/50" placeholder="مثال: Zara" />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-1.5">شعار البراند *</label>
                <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                <div className="flex gap-3 items-center">
                  <button type="button" onClick={() => logoInputRef.current?.click()} disabled={uploading} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed transition-colors ${form.logoUrl ? 'border-green-500/50 text-green-400' : 'border-white/15 text-white/40 hover:border-[#C66CFF]/40 hover:text-[#C66CFF]'}`}>
                    {uploading ? <><Loader2 size={16} className="animate-spin" /> جاري الرفع...</> : form.logoUrl ? 'تم رفع الشعار ✓' : <><Upload size={16} /> رفع الشعار</>}
                  </button>
                  {form.logoUrl && <img src={form.logoUrl} alt="preview" className="w-12 h-12 object-contain rounded-lg bg-white/5 p-1" />}
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-1.5">الموقع الإلكتروني</label>
                <div className="relative">
                  <Globe size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-white/30" />
                  <input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} dir="ltr" className="w-full pr-9 pl-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C66CFF]/50" placeholder="https://example.com" />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={saving || uploading} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 disabled:opacity-50">
                  {saving ? <><Loader2 size={16} className="animate-spin" /> جاري الحفظ...</> : 'حفظ'}
                </button>
                <button type="button" onClick={reset} className="px-6 py-3 rounded-xl text-white/60 border border-white/10 hover:border-white/20">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {brands.map((brand) => (
          <div key={brand._id} className="glass-card rounded-xl p-4 group text-center">
            <div className="h-16 flex items-center justify-center mb-3">
              {brand.logoUrl ? (
                <img src={brand.logoUrl} alt={brand.name} className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              ) : (
                <span className="text-white/50 font-bold">{brand.name.charAt(0)}</span>
              )}
            </div>
            <p className="text-white text-sm font-medium truncate">{brand.name}</p>
            <div className="flex justify-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(brand)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white" aria-label="تعديل"><Edit2 size={13} /></button>
              <button onClick={() => handleDelete(brand)} className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400" aria-label="حذف"><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
      </div>

      {brands.length === 0 && <div className="text-center py-16 text-white/30">لا توجد براندات بعد</div>}
    </div>
  )
}
