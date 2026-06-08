import SettingsManager from '@/components/dashboard/SettingsManager'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'إعدادات الموقع' }
export default function SettingsPage() { return <SettingsManager /> }
