'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Loader2, Trash2, Mail, ChevronDown, ChevronUp } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { ContactMessage } from '@/types'

const statusColors: Record<string, string> = {
  'جديد': 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  'مقروء': 'bg-white/10 text-white/50 border-white/10',
  'تم الرد': 'bg-green-500/15 text-green-400 border-green-500/20',
}

export default function ContactManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('الكل')

  const load = async () => {
    try {
      const res = await fetch('/api/contact'); const data = await res.json()
      setMessages(data.data ?? [])
    } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
      if (!res.ok) throw new Error()
      setMessages(m => m.map(x => x._id === id ? { ...x, status: status as ContactMessage['status'] } : x))
      toast.success('تم تحديث الحالة')
    } catch { toast.error('فشل التحديث') }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('حذف هذه الرسالة؟')) return
    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE' })
      setMessages(m => m.filter(x => x._id !== id))
      toast.success('تم الحذف')
    } catch { toast.error('فشل الحذف') }
  }

  const handleExpand = async (msg: ContactMessage) => {
    if (expanded === msg._id) { setExpanded(null); return }
    setExpanded(msg._id)
    if (msg.status === 'جديد') await updateStatus(msg._id, 'مقروء')
  }

  const filtered = filter === 'الكل' ? messages : messages.filter(m => m.status === filter)
  const newCount = messages.filter(m => m.status === 'جديد').length

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#C66CFF]" size={32} /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            الرسائل ({messages.length})
            {newCount > 0 && <span className="px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-400 border border-blue-500/20">{newCount} جديد</span>}
          </h2>
          <p className="text-white/40 text-sm">رسائل التواصل من العملاء</p>
        </div>
        <div className="flex gap-2">
          {['الكل', 'جديد', 'مقروء', 'تم الرد'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === s ? 'bg-[#C66CFF]/20 text-[#C66CFF] border border-[#C66CFF]/30' : 'text-white/40 hover:text-white border border-white/10 hover:border-white/20'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((msg) => (
          <div key={msg._id} className="glass-card rounded-xl overflow-hidden">
            {/* Header */}
            <button onClick={() => handleExpand(msg)} className="w-full flex items-center gap-4 p-4 text-right hover:bg-white/2 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C66CFF]/30 to-[#FF5ACD]/30 flex items-center justify-center flex-shrink-0">
                <Mail size={16} className="text-[#C66CFF]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-semibold text-sm">{msg.name}</span>
                  {msg.company && <span className="text-white/40 text-xs">· {msg.company}</span>}
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[msg.status]}`}>{msg.status}</span>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-white/40 text-xs">{msg.email}</span>
                  <span className="text-white/30 text-xs">· {msg.service}</span>
                  <span className="text-white/25 text-xs">· {formatDate(msg.createdAt)}</span>
                </div>
              </div>
              {expanded === msg._id ? <ChevronUp size={16} className="text-white/40 flex-shrink-0" /> : <ChevronDown size={16} className="text-white/40 flex-shrink-0" />}
            </button>

            {/* Expanded */}
            {expanded === msg._id && (
              <div className="border-t border-white/5 p-4 space-y-4">
                {msg.budget && <div><span className="text-white/40 text-xs">الميزانية: </span><span className="text-white text-sm">{msg.budget}</span></div>}
                <div>
                  <p className="text-white/40 text-xs mb-1">الرسالة:</p>
                  <p className="text-white/80 text-sm leading-relaxed">{msg.message}</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-white/40 text-xs">تغيير الحالة:</span>
                  {['جديد', 'مقروء', 'تم الرد'].map(s => (
                    <button key={s} onClick={() => updateStatus(msg._id, s)} className={`px-3 py-1 rounded-lg text-xs transition-all border ${msg.status === s ? statusColors[s] : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white'}`}>
                      {s}
                    </button>
                  ))}
                  <div className="flex-1" />
                  <a href={`mailto:${msg.email}`} className="px-3 py-1.5 rounded-lg text-xs text-[#C66CFF] border border-[#C66CFF]/30 hover:bg-[#C66CFF]/10 transition-colors">
                    رد عبر البريد
                  </a>
                  <button onClick={() => handleDelete(msg._id)} className="p-1.5 rounded-lg text-red-400 border border-red-500/20 hover:bg-red-500/10">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center py-16 text-white/30">لا توجد رسائل</div>}
      </div>
    </div>
  )
}
