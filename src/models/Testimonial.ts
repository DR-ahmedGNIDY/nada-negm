import mongoose, { Schema } from 'mongoose'

export interface ITestimonial {
  _id: string
  imageId: string
  imageUrl: string
  featured: boolean
  order: number
  createdAt: Date
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    imageId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

TestimonialSchema.index({ featured: 1, order: 1 })

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)
