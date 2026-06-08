import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'لوحة التحكم', template: '%s | لوحة التحكم' },
  robots: { index: false, follow: false },
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <div className="min-h-screen bg-[#070B14] flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader user={session.user} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
