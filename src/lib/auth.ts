import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import connectDB from './mongodb'
import UserModel from '@/models/User'
import bcrypt from 'bcryptjs'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const config: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        await connectDB()
        const user = await UserModel.findOne({ email: parsed.data.email }).lean() as { _id: unknown; email: string; name: string; role: string; password: string } | null
        if (!user) return null

        const isValid = await bcrypt.compare(parsed.data.password, user.password)
        if (!isValid) return null

        return {
          id: String(user._id),
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (token && session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string
      }
      return session
    },
  },
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
