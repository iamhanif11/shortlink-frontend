import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import toast from 'react-hot-toast'
import Button from '../components/atoms/Button'


const shortLinkSchema = Joi.object({
  url: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required()
    .messages({
      'string.empty': 'Destination URL tidak boleh kosong',
      'string.uri': 'Format URL tidak valid (wajib gunakan http:// atau https://)',
      'any.required': 'Destination URL wajib diisi',
    }),
  slug: Joi.string()
    .allow('')
    .pattern(/^[a-zA-Z0-9_-]*$/)
    .messages({
      'string.pattern.base': 'Slug hanya boleh berisi huruf, angka, dash (-), dan underscore (_)',
    }),
})

function CreateShortLink() {
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()


  const initialUrl = location.state?.urlFromLanding || ''

  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(shortLinkSchema),
    mode: 'onChange',
    defaultValues: {
      url: initialUrl,
      slug: '',
    },
  })

  
  const watchSlug = watch('slug', '')

  
  const onCreateLinkSubmit = async (data) => {
    setIsLoading(true)

    const createLinkRequest = async () => {
      const token = localStorage.getItem('token')
      
      
      if (!token || token === 'undefined') {
        throw new Error('Sesi Anda telah berakhir. Silakan login kembali.')
      }

      const response = await fetch('http://localhost:8080/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
     original_url: data.url, 
    slug: data.slug || undefined,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.isSucces) {
        throw new Error(result.message || 'Gagal membuat short link.')
      }

      return result
    }

    toast.promise(createLinkRequest(), {
      loading: 'Sedang membuat short link...',
      success: () => {
        setTimeout(() => navigate('/list-link'), 1200)
        return 'Short link berhasil dibuat!'
      },
      error: (err) => {
        setIsLoading(false)
        return err.message
      },
    })
    .then(() => {
      setIsLoading(false)
    })
    .catch(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] font-sans text-gray-800 px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-[760px] mx-auto">
        
        
        <button 
          onClick={() => navigate('/list-link')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors mb-6 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Dashboard
        </button>

        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create New Short Link</h1>
          <p className="text-sm text-gray-500 mt-1">Transform your long URLs into clean, manageable assets.</p>
        </div>

        
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10 mb-12">
          <form onSubmit={handleSubmit(onCreateLinkSubmit)} className="space-y-6">
            
            
            <div className="space-y-2">
              <label htmlFor="url" className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                Destination URL <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 absolute left-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
                <input
                  id="url"
                  type="url"
                  placeholder="https://example.com/your-long-url-here"
                  {...register('url')}
                  className={`w-full bg-[#f8fafc] border text-sm rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-1 transition-all text-gray-700 placeholder:text-gray-300 ${
                    errors.url ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.url ? (
                <p className="text-xs text-red-500 mt-1 font-medium pl-1">{errors.url.message}</p>
              ) : (
                <p className="text-[11px] text-gray-400 italic pl-1">Ensure your URL starts with http:// or https://</p>
              )}
            </div>

            
            <div className="space-y-2">
              <label htmlFor="slug" className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                Custom Slug (Optional)
              </label>
              <div className={`flex rounded-xl border overflow-hidden shadow-sm transition-all ${errors.slug ? 'border-red-500' : 'border-gray-200'}`}>
                <span className="bg-gray-50 border-r border-gray-200 text-gray-500 text-sm px-4 py-3.5 font-medium select-none flex items-center">
                  short.link/
                </span>
                <input
                  id="slug"
                  type="text"
                  placeholder="my-custom-slug"
                  {...register('slug')}
                  onChange={(e) => {
                    const sanitizedValue = e.target.value.replace(/\s+/g, '-')
                    setValue('slug', sanitizedValue, { shouldValidate: true })
                  }}
                  className="w-full text-sm px-4 py-3.5 focus:outline-none text-gray-700 placeholder:text-gray-300"
                />
              </div>
              {errors.slug ? (
                <p className="text-xs text-red-500 mt-1 font-medium pl-1">{errors.slug.message}</p>
              ) : (
                <p className="text-[11px] text-gray-400 italic pl-1">Leave blank to generate a random unique identifier.</p>
              )}
            </div>

            
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-600 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <div>
                <span className="block text-[11px] font-bold text-blue-700 uppercase tracking-wider">Live Preview</span>
                <p className="text-sm font-medium text-gray-700 mt-0.5">
                  Your short link will be: <span className="text-blue-600 font-semibold break-all">https://short.link/{watchSlug || 'my-custom-slug'}</span>
                </p>
              </div>
            </div>

            
            <div className="flex items-center gap-6 pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                rounded="lg"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 font-semibold px-6 shadow-md flex items-center gap-1.5 disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Link'} 
                {!isLoading && (
                  <svg xmlns="http://www.w3.org/2000/xl" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
                  </svg>
                )}
              </Button>
              
              <button 
                type="button"
                onClick={() => navigate('/list-link')}
                className="text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateShortLink