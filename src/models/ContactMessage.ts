import mongoose, { Schema } from 'mongoose'

export interface IContactMessage {
  _id: string
  name: string
  email: string
  company?: string
  service: string
  budget?: string
  message: string
  status: 'جديد' | 'مقروء' | 'تم الرد'
  createdAt: Date
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    company: { type: String, trim: true },
    service: {
      type: String,
      required: true,
      enum: ['UGC', 'إعلانات مدفوعة', 'محتوى سوشيال ميديا', 'فيديو منتج', 'حزمة متكاملة', 'أخرى'],
    },
    budget: { type: String },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['جديد', 'مقروء', 'تم الرد'],
      default: 'جديد',
    },
  },
  { timestamps: true }
)

ContactMessageSchema.index({ status: 1, createdAt: -1 })

export default mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema)
