'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Plus, Trash2, Edit2, Star, Loader2, X } from 'lucide-react'
import type { Testimonial } from '@/types'

export default function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ clientName: '', clientTitle: '', clientCompany: '', content: '', rating: 5, featured: false, order: 0 })

  const load = async () => {
    try {
      const res = await fetch('/api/testimonials'); const data = await res.json()
      setItems(data.data ?? [])
    } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const reset = () => { setForm({ clientName: '', clientTitle: '', clientCompany: '', content: '', rating: 5, featured: false, order: 0 }); setEditing(null); setShowForm(false) }

  const handleEdit = (t: Testimonial) => {
    setForm({ clientName: t.clientName, clientTitle: t.clientTitle, clientCompany: t.clientCompany, content: t.content, rating: t.rating, featured: t.featured, order: t.order })
    setEditing(t); setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    try {
      const url = editing ? `/api/testimonials/${editing._id}` : '/api/testimonials'
      const res = await fetch(url, { method: editing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!data.success) throw new Error()
      toast.success(editing ? 'تم التحديث' : 'تم الإضافة')
      reset(); load()
    } catch { toast.error('حدث خطأ') } finally { setSaving(false) }
  }

  const handleDelete = async (t: Testimonial) => {
    if (!confirm(`حذف تقييم "${t.clientName}"؟`)) return
    try {
      await fetch(`/api/testimonials/${t._id}`, { method: 'DELETE' })
      toast.success('تم الحذف'); setItems(i => i.filter(x => x._id !== t._id))
    } catch { toast.error('فشل الحذف') }
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#C66CFF]" size={32} /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">التقييمات ({items.length})</h2>
          <p className="text-white/40 text-sm">آراء العملاء</p>
        </div>
        <button onClick={() => { reset(); setShowForm(true) }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90">
          <Plus size={18} /> إضافة تقييم
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && reset()}>
          <div className="w-full max-w-lg glass-card rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">{editing ? 'تعديل التقييم' : 'إضافة تقييم جديد'}</h3>
              <button onClick={reset}><X size={20} className="text-white/40 hover:text-white" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">اسم العميل *</label>
                  <input value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} required className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C66CFF]/50" placeholder="سارة أحمد" />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">المسمى الوظيفي *</label>
                  <input value={form.clientTitle} onChange={e => setForm(f => ({ ...f, clientTitle: e.target.value }))} required className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C66CFF]/50" placeholder="مدير التسويق" />
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-1.5">اسم الشركة *</label>
                <input value={form.clientCompany} onChange={e => setForm(f => ({ ...f, clientCompany: e.target.value }))} required className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C66CFF]/50" placeholder="Zara Middle East" />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-1.5">نص التقييم *</label>
                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required rows={4} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C66CFF]/50 resize-none" placeholder="رأي العميل بالتفصيل..." />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">التقييم</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} type="button" onClick={() => setForm(f => ({ ...f, rating: n }))} className="p-1">
                      <Star size={24} className={n <= form.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-white/60 text-sm">مميز</label>
                <button type="button" onClick={() => setForm(f => ({ ...f, featured: !f.featured }))} className={`w-11 h-6 rounded-full relative transition-colors ${form.featured ? 'bg-[#C66CFF]' : 'bg-white/10'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${form.featured ? 'right-0.5' : 'right-5'}`} />
                </button>
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 disabled:opacity-50">
                  {saving ? <><Loader2 size={16} className="animate-spin" /> حفظ...</> : 'حفظ'}
                </button>
                <button type="button" onClick={reset} className="px-6 py-3 rounded-xl text-white/60 border border-white/10">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((t) => (
          <div key={t._id} className="glass-card rounded-xl p-5 flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#C66CFF] to-[#FF5ACD] flex items-center justify-center text-white font-bold flex-shrink-0">
              {t.clientName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="text-white font-semibold text-sm">{t.clientName}</span>
                  <span className="text-white/40 text-xs mr-2">· {t.clientTitle} · {t.clientCompany}</span>
                </div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(n => <Star key={n} size={12} className={n <= t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'} />)}
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed line-clamp-2">"{t.content}"</p>
              <div className="flex items-center gap-2 mt-2">
                {t.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">مميز</span>}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleEdit(t)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white" aria-label="تعديل"><Edit2 size={15} /></button>
              <button onClick={() => handleDelete(t)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400" aria-label="حذف"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="text-center py-16 text-white/30">لا توجد تقييمات بعد</div>}
      </div>
    </div>
  )
}
