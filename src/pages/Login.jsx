import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import toast, { Toaster } from 'react-hot-toast'
import InputField from '../components/atoms/Input'
import Button from '../components/atoms/Button'

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email tidak boleh kosong',
      'string.email': 'Format email tidak valid',
      'any.required': 'Email wajib diisi',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password tidak boleh kosong',
      'string.min': 'Password minimal harus 6 karakter',
      'any.required': 'Password wajib diisi',
    }),
})

function Login({ onLoginSuccess }) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmitLink = async (data) => {
    setIsLoading(true)
    const loadingToast = toast.loading('Sedang memproses login...')

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.isSucces) {
        toast.dismiss(loadingToast)
        toast.success('Login Berhasil! Selamat Datang.')

        localStorage.setItem('token', result.token)
        if (onLoginSuccess) onLoginSuccess()
        
        setTimeout(() => {
          navigate('/')
        }, 1000)
      } else {
        toast.dismiss(loadingToast)
        toast.error(result.message || 'Gagal login. Periksa kembali akun Anda.')
      }
    } catch {
      toast.dismiss(loadingToast)
      toast.error('Gagal terhubung ke server. Pastikan backend Go menyala.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f8fafc] text-black font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col items-center justify-center px-4 pt-12 pb-6 w-full md:max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-black">
          ShortLink
        </h1>

        <div className="w-full max-w-3xl bg-white rounded-xl border border-gray-100 shadow-sm p-8 sm:p-10">
          <div className="mb-8">
            <h2 className="text-xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-1">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmitLink)} className="space-y-5">
            <div>
              <InputField
                id="email"
                label="Email Address"
                type="email"
                placeholder="Input Your Email"
                {...register('email')}
                className={`text-sm focus:outline-none rounded-lg py-2.5 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </a>
              </div>
              <InputField
                id="password"
                type="password"
                placeholder="Input Your Password"
                {...register('password')}
                className={`text-sm focus:outline-none rounded-lg py-2.5 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 font-medium">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              rounded="lg"
              disabled={isLoading}
              className="w-full font-semibold shadow-sm py-3 mt-2 text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Log In'} <span className="ml-1 text-xs">➔</span>
            </Button>
          </form>

          <div className="relative flex py-6 items-center">
            <div className="grow border-t border-gray-100"></div>
            <span className="shrink mx-4 text-[10px] font-bold text-gray-400 tracking-widest uppercase">
              Or continue with
            </span>
            <div className="grow border-t border-gray-100"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700 py-3 px-4 rounded-lg transition-all active:scale-[0.99]"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google Logo" 
              className="w-4 h-4"
            />
            Sign in with Google
          </button>
        </div>

        
        <p className="text-sm text-gray-500 mt-8">
          Don't have an account?{" "}
          <Link 
            to="/auth/register" 
            className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login