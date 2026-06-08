import mongoose, { Schema } from 'mongoose'

export interface IBrand {
  _id: string
  name: string
  logoId: string
  logoUrl: string
  website?: string
  featured: boolean
  order: number
  createdAt: Date
}

const BrandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true, trim: true },
    logoId: { type: String, required: true },
    logoUrl: { type: String, required: true },
    website: { type: String, trim: true },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

BrandSchema.index({ featured: 1, order: 1 })

export default mongoose.models.Brand || mongoose.model<IBrand>('Brand', BrandSchema)
