export const dynamic = 'force-dynamic'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import BrandsSection from '@/components/sections/BrandsSection'
import ProcessSection from '@/components/sections/ProcessSection'
import AboutSection from '@/components/sections/AboutSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import connectDB from '@/lib/mongodb'
import VideoModel from '@/models/Video'
import BrandModel from '@/models/Brand'
import TestimonialModel from '@/models/Testimonial'
import type { Video, Brand, Testimonial } from '@/types'

async function getData() {
  try {
    await connectDB()
    const [videos, brands, testimonials] = await Promise.all([
      VideoModel.find({}).sort({ featured: -1, order: 1, createdAt: -1 }).limit(20).lean(),
      BrandModel.find({}).sort({ order: 1 }).lean(),
      TestimonialModel.find({ featured: true }).sort({ order: 1 }).lean(),
    ])
    return {
      videos: JSON.parse(JSON.stringify(videos)) as Video[],
      brands: JSON.parse(JSON.stringify(brands)) as Brand[],
      testimonials: JSON.parse(JSON.stringify(testimonials)) as Testimonial[],
    }
  } catch {
    return { videos: [], brands: [], testimonials: [] }
  }
}

export default async function HomePage() {
  const { videos, brands, testimonials } = await getData()

  return (
    <main className="min-h-screen bg-[#070B14]">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <PortfolioSection videos={videos} />
      <BrandsSection brands={brands} />
      <ProcessSection />
      <AboutSection />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
