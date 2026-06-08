'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
})
type LoginData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })
      if (result?.error) {
        toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      } else {
        toast.success('مرحباً بك في لوحة التحكم')
        router.push('/dashboard')
        router.refresh()
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-[#C66CFF]/10 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-[#FF5ACD]/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-3xl font-black">
            <span className="gradient-text">Nada</span>
            <span className="text-white"> Negm</span>
          </span>
          <p className="text-white/40 text-sm mt-2">لوحة التحكم — دخول المدير</p>
        </div>

        {/* Form Card */}
        <div className="glass-card rounded-2xl p-8 border border-white/8">
          <h1 className="text-xl font-bold text-white mb-6">تسجيل الدخول</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label className="block text-white/60 text-sm mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={16} className="absolute top-1/2 -translate-y-1/2 right-3.5 text-white/30" />
                <input
                  {...register('email')}
                  type="email"
                  dir="ltr"
                  placeholder="nada@admin.com"
                  className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#C66CFF]/50 transition-colors"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/60 text-sm mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock size={16} className="absolute top-1/2 -translate-y-1/2 right-3.5 text-white/30" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  dir="ltr"
                  placeholder="••••••••"
                  className="w-full pr-10 pl-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#C66CFF]/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 left-3.5 text-white/30 hover:text-white/60"
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] hover:opacity-90 disabled:opacity-60 transition-all duration-200"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
              {isLoading ? 'جاري الدخول...' : 'دخول'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
