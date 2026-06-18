import { useState } from 'react' 
import { useNavigate, Link } from 'react-router' 
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi' 
import Joi from 'joi'
import toast from 'react-hot-toast'
import InputField from '../components/atoms/Input' 
import Button from '../components/atoms/Button'      

const registerSchema = Joi.object({
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
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      'string.empty': 'Konfirmasi password tidak boleh kosong',
      'any.only': 'Konfirmasi password tidak cocok',
      'any.required': 'Konfirmasi password wajib diisi',
    }),
})

function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerSchema),
    mode: 'onChange',
  })

  const onSubmitRegister = async (data) => {
    setIsLoading(true)
    const loadingToast = toast.loading('Sedang mendaftarkan akun...')

    const payload = {
      email: data.email,
      password: data.password,
    }

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok && result.isSucces) {
        toast.dismiss(loadingToast)
        toast.success('Registrasi Sukses! Silakan masuk.')

        setTimeout(() => {
          navigate('/auth')
        }, 1000)
      } else {
        toast.dismiss(loadingToast)
        toast.error(result.message || 'Gagal mendaftar. Email mungkin sudah digunakan') // 6. PERBAIKAN: result.message
      }
    } catch {
      toast.dismiss(loadingToast)
      toast.error('Gagal terhubung ke server')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f8fafc] font-sans text-gray-800 selection:bg-blue-100 p-4">
      
      <div className="w-full flex flex-col items-center justify-center max-w-md mx-auto">
        
        
        <div className="bg-blue-50 text-blue-800 p-2.5 rounded-xl mb-6 shadow-sm border border-blue-100/50">
          <img src="/Background.svg" alt="linked" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1.5">Join the elite architects of the web.</p>
        </div>

        <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10">
          
          <form onSubmit={handleSubmit(onSubmitRegister)} className="space-y-5">
            
    
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

        
            <div>
              <InputField
                id="password"
                label="Password"
                type="password"
                placeholder="Input Your Password"
                {...register('password')} 
                className={`text-sm focus:outline-none rounded-lg py-2.5 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
              />
              {errors.password ? (
                <p className="text-xs text-red-500 mt-1 font-medium">{errors.password.message}</p>
              ) : (
                <span className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-2 pl-0.5">
                  Minimum 6 characters
                </span>
              )}
            </div>

      
            <div>
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Input Your Confirm Password"
                {...register('confirmPassword')}
                className={`text-sm focus:outline-none rounded-lg py-2.5 ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1 font-medium">{errors.confirmPassword.message}</p>
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
              {isLoading ? 'Processing...' : 'Sign Up'} <span className="ml-1 text-xs">➔</span>
            </Button>
          </form>

          <p className="text-center text-[11px] leading-relaxed text-gray-400 mt-6 px-2">
            By signing up, you agree to our{" "}
            <a href="#terms" className="font-semibold text-blue-600 hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#privacy" className="font-semibold text-blue-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>

  
        <p className="text-sm text-gray-500 mt-8 text-center">
          Already have an account?{" "}
          <Link 
            to="/auth" 
            className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4 transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>

    </div>
  )
}

export default Register