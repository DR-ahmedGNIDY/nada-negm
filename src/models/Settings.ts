import mongoose, { Schema } from 'mongoose'

export interface ISettings {
  _id: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  aboutText: string
  aboutImageId?: string
  aboutImageUrl?: string
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

const SettingsSchema = new Schema<ISettings>(
  {
    heroTitle: { type: String, default: 'ندى نجم' },
    heroSubtitle: { type: String, default: 'خبيرة محتوى UGC ومحتوى البراندات' },
    heroDescription: {
      type: String,
      default: 'أحول منتجك إلى قصة تبيع — محتوى أصيل يُحرك العواطف ويزيد المبيعات',
    },
    aboutText: {
      type: String,
      default:
        'مبدعة محتوى رقمي متخصصة في إنتاج محتوى UGC الأصيل الذي يربط البراندات بجمهورها المستهدف بطريقة طبيعية ومؤثرة.',
    },
    aboutImageId: { type: String },
    aboutImageUrl: { type: String },
    phone: { type: String },
    email: { type: String, default: 'hello@nadanegm.com' },
    instagram: { type: String },
    tiktok: { type: String },
    youtube: { type: String },
    twitter: { type: String },
    stats: {
      videos: { type: Number, default: 300 },
      brands: { type: Number, default: 250 },
      views: { type: String, default: '10M+' },
      experience: { type: String, default: '5+' },
    },
    seo: {
      title: { type: String, default: 'ندى نجم | خبيرة محتوى UGC والبراندات' },
      description: {
        type: String,
        default:
          'ندى نجم — خبيرة محتوى UGC ومحتوى البراندات. أنتج محتوى أصيل يحرك العواطف ويزيد المبيعات لبراندات عالمية ومحلية.',
      },
      keywords: {
        type: String,
        default: 'UGC creator, محتوى برانداتات, ندى نجم, فيديو تسويقي, محتوى سوشيال ميديا',
      },
    },
  },
  { timestamps: true }
)

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema)
