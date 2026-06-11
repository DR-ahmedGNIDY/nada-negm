export interface Video {
  _id: string
  title: string
  description: string
  category: string
  cloudinaryId: string
  cloudinaryUrl: string
  thumbnailId: string
  thumbnailUrl: string
  brand?: string
  featured: boolean
  views: number
  order: number
  createdAt: string
  updatedAt: string
}

export interface Brand {
  _id: string
  name: string
  logoId: string
  logoUrl: string
  website?: string
  featured: boolean
  order: number
  createdAt: string
}

export interface Testimonial {
  _id: string
  imageId: string
  imageUrl: string
  featured: boolean
  order: number
  createdAt: string
}

export interface ContactMessage {
  _id: string
  name: string
  email: string
  company?: string
  service: string
  budget?: string
  message: string
  status: 'جديد' | 'مقروء' | 'تم الرد'
  createdAt: string
}

export interface SiteSettings {
  _id: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  aboutText: string
  aboutImage?: string
  phone?: string
  email: string
  instagram?: string
  tiktok?: string
  youtube?: string
  twitter?: string
  stats: {
    videos: number
    brands: number
    views: string
    experience: string
  }
  seo: {
    title: string
    description: string
    keywords: string
  }
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
