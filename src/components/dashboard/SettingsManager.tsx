'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Loader2, Save, Globe, Mail, Phone } from 'lucide-react'

interface Settings {
  heroTitle: string; heroSubtitle: string; heroDescription: string; aboutText: string
  email: string; phone: string; instagram: string; tiktok: string; youtube: string; twitter: string
  stats: { videos: number; brands: number; views: string; experience: string }
  seo: { title: string; description: string; keywords: string }
}

const defaultSettings: Settings = {
  heroTitle: 'ندى نجم', heroSubtitle: 'خبيرة محتوى UGC ومحتوى البراندات',
  heroDescription: 'أحول منتجك إلى قصة تبيع', aboutText: '',
  email: 'hello@nadanegm.com', phone: '', instagram: '', tiktok: '', youtube: '', twitter: '',
  stats: { videos: 150, brands: 50, views: '10M+', experience: '3+' },
  seo: { title: 'ندى نجم | خبيرة محتوى UGC', description: '', keywords: '' },
}

export default function SettingsManager() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'general' | 'social' | 'stats' | 'seo'>('general')

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(data => {
      if (data.success && data.data) setSettings({ ...defaultSettings, ...data.data })
    }).finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) })
      const data = await res.json()
      if (!data.success) throw new Error()
      toast.success('تم حفظ الإعدادات بنجاح')
    } catch { toast.error('فشل الحفظ') } finally { setSaving(false) }
  }

  const update = (path: string, value: string | number) => {
    setSettings(prev => {
      const keys = path.split('.')
      if (keys.length === 2 && (keys[0] === 'stats' || keys[0] === 'seo')) {
        return { ...prev, [keys[0]]: { ...prev[keys[0] as 'stats' | 'seo'], [keys[1]]: value } }
      }
      return { ...prev, [keys[0]]: value }
    })
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#C66CFF]" size={32} /></div>

  const tabs = [
    { key: 'general', label: 'عام' },
    { key: 'social', label: 'التواصل' },
    { key: 'stats', label: 'الإحصائيات' },
    { key: 'seo', label: 'SEO' },
  ] as const

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">إعدادات الموقع</h2>
          <p className="text-white/40 text-sm">تعديل محتوى الموقع والإعدادات العامة</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 disabled:opacity-60 transition-opacity">
          {saving ? <><Loader2 size={16} className="animate-spin" /> حفظ...</> : <><Save size={16} /> حفظ الإعدادات</>}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/5 w-fit">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-[#C66CFF]/20 text-[#C66CFF]' : 'text-white/40 hover:text-white'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-5">
        {activeTab === 'general' && <>
          <Field label="عنوان الهيرو" value={settings.heroTitle} onChange={v => update('heroTitle', v)} />
          <Field label="العنوان الفرعي" value={settings.heroSubtitle} onChange={v => update('heroSubtitle', v)} />
          <Field label="وصف الهيرو" value={settings.heroDescription} onChange={v => update('heroDescription', v)} textarea />
          <Field label="نص قسم عني" value={settings.aboutText} onChange={v => update('aboutText', v)} textarea />
        </>}

        {activeTab === 'social' && <>
          <Field label="البريد الإلكتروني" value={settings.email} onChange={v => update('email', v)} icon={<Mail size={14} />} dir="ltr" />
          <Field label="رقم الهاتف / واتساب" value={settings.phone} onChange={v => update('phone', v)} icon={<Phone size={14} />} dir="ltr" />
          <Field label="انستغرام" value={settings.instagram} onChange={v => update('instagram', v)} placeholder="@nadanegm" dir="ltr" />
          <Field label="تيك توك" value={settings.tiktok} onChange={v => update('tiktok', v)} placeholder="@nadanegm" dir="ltr" />
          <Field label="يوتيوب" value={settings.youtube} onChange={v => update('youtube', v)} placeholder="https://youtube.com/@nadanegm" dir="ltr" />
          <Field label="تويتر / إكس" value={settings.twitter} onChange={v => update('twitter', v)} placeholder="@nadanegm" dir="ltr" />
        </>}

        {activeTab === 'stats' && <>
          <Field label="عدد الفيديوهات" value={String(settings.stats.videos)} onChange={v => update('stats.videos', parseInt(v) || 0)} type="number" />
          <Field label="عدد البراندات" value={String(settings.stats.brands)} onChange={v => update('stats.brands', parseInt(v) || 0)} type="number" />
          <Field label="إجمالي المشاهدات" value={settings.stats.views} onChange={v => update('stats.views', v)} placeholder="10M+" />
          <Field label="سنوات الخبرة" value={settings.stats.experience} onChange={v => update('stats.experience', v)} placeholder="3+" />
        </>}

        {activeTab === 'seo' && <>
          <Field label="عنوان SEO" value={settings.seo.title} onChange={v => update('seo.title', v)} />
          <Field label="وصف SEO" value={settings.seo.description} onChange={v => update('seo.description', v)} textarea />
          <Field label="الكلمات المفتاحية" value={settings.seo.keywords} onChange={v => update('seo.keywords', v)} textarea placeholder="اكتب الكلمات مفصولة بفواصل" />
        </>}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, textarea, type, icon, placeholder, dir }: {
  label: string; value: string; onChange: (v: string) => void
  textarea?: boolean; type?: string; icon?: React.ReactNode
  placeholder?: string; dir?: string
}) {
  const cls = "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#C66CFF]/50 transition-colors"
  return (
    <div>
      <label className="block text-white/60 text-sm mb-1.5">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className={`${cls} resize-none`} placeholder={placeholder} dir={dir} />
      ) : (
        <div className="relative">
          {icon && <span className="absolute top-1/2 -translate-y-1/2 right-3 text-white/30">{icon}</span>}
          <input value={value} onChange={e => onChange(e.target.value)} type={type ?? 'text'} className={`${cls} ${icon ? 'pr-9' : ''}`} placeholder={placeholder} dir={dir} />
        </div>
      )}
    </div>
  )
}
