import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import SEOSchema from '@/components/SEOSchema'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-sans',
})

const BASE_URL = process.env.NEXTAUTH_URL ?? 'https://nadanegm.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ندى نجم | خبيرة محتوى UGC والبراندات',
    template: '%s | ندى نجم',
  },
  description:
    'ندى نجم — خبيرة محتوى UGC ومحتوى البراندات. أنتج محتوى أصيل يحرك العواطف ويزيد المبيعات لبراندات عالمية ومحلية.',
  keywords: ['UGC creator', 'محتوى برانداتات', 'ندى نجم', 'فيديو تسويقي', 'محتوى سوشيال ميديا'],
  authors: [{ name: 'Nada Negm' }],
  creator: 'Nada Negm',
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: BASE_URL,
    siteName: 'Nada Negm',
    title: 'ندى نجم | خبيرة محتوى UGC والبراندات',
    description: 'أنتج محتوى UGC أصيل يحرك العواطف ويزيد مبيعات براندك بطريقة طبيعية ومؤثرة.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ندى نجم' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ندى نجم | خبيرة محتوى UGC والبراندات',
    description: 'أنتج محتوى UGC أصيل يحرك العواطف ويزيد مبيعات براندك.',
    images: ['/og-image.jpg'],
    creator: '@nadanegm',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: BASE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full`}>
      <body className={`${cairo.className} min-h-full flex flex-col antialiased`}>
        <SEOSchema />
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#111827',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.08)',
              fontFamily: 'Cairo, sans-serif',
              direction: 'rtl',
            },
          }}
        />
      </body>
    </html>
  )
}
