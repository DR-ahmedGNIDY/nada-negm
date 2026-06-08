import mongoose, { Schema } from 'mongoose'

export interface ITestimonial {
  _id: string
  clientName: string
  clientTitle: string
  clientCompany: string
  clientAvatarId?: string
  clientAvatarUrl?: string
  content: string
  rating: number
  featured: boolean
  order: number
  createdAt: Date
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true, trim: true },
    clientTitle: { type: String, required: true, trim: true },
    clientCompany: { type: String, required: true, trim: true },
    clientAvatarId: { type: String },
    clientAvatarUrl: { type: String },
    content: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

TestimonialSchema.index({ featured: 1, order: 1 })

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)
