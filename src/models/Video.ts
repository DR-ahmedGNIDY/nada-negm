import mongoose, { Schema } from 'mongoose'

export interface IVideo {
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
  createdAt: Date
  updatedAt: Date
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['UGC', 'إعلان', 'ريلز', 'تيك توك', 'يوتيوب', 'منتج', 'مطعم', 'أزياء', 'جمال', 'أخرى'],
    },
    cloudinaryId: { type: String, required: true },
    cloudinaryUrl: { type: String, required: true },
    thumbnailId: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    brand: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

VideoSchema.index({ featured: 1, order: 1 })
VideoSchema.index({ category: 1 })
VideoSchema.index({ createdAt: -1 })

export default mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema)
