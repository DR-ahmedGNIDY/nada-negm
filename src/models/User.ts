import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  createdAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: ['admin', 'user'], default: 'admin' },
  },
  { timestamps: true }
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
UserSchema.pre('save', async function (this: any, next: any) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

UserSchema.index({ email: 1 })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
