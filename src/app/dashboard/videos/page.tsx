import VideosManager from '@/components/dashboard/VideosManager'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'إدارة الفيديوهات' }

export default function VideosPage() {
  return <VideosManager />
}
