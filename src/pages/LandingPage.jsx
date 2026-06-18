import { useState } from 'react' 
import { useNavigate } from 'react-router' 
import Button from '../components/atoms/Button'

function LandingPage() {
  const [urlInput, setUrlInput] = useState('') 
  const navigate = useNavigate()

  const handleShortenSubmit = (e) => {
    e.preventDefault()
    
  
    navigate('/create-link', { 
      state: { urlFromLanding: urlInput } 
    })
  }

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center bg-[#f8fafc] px-4 py-12 font-sans text-gray-800">
      
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Shorten URLs. <span className="text-blue-600">Share Easily.</span>
        </h1>
        
        <p className="text-base sm:text-lg text-gray-500 font-medium max-w-2xl mx-auto mt-6 leading-relaxed">
          Create short, memorable links for your team communications. 
          Transform long, cumbersome URLs into powerful digital assets that drive engagement.
        </p>
      </div>


      <div className="flex items-center justify-center gap-4 mb-16">
        <Button
          variant="primary"
          size="md"
          rounded="lg"
          className="font-semibold px-6 shadow-md bg-blue-600 hover:bg-blue-700"
        >
          Get Started
        </Button>
        
        <Button
          variant="outline"
          size="md"
          rounded="lg"
          className="font-semibold px-6 bg-white border-gray-200 text-blue-600 hover:bg-gray-50 shadow-sm"
        >
          Learn More
        </Button>
      </div>

      
      <div className="w-full max-w-4xl mx-auto">
        <form 
          onSubmit={handleShortenSubmit}
          className="w-full bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative w-full flex-grow flex items-center pl-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-5 h-5 text-gray-300 absolute left-3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
            
            <input
              type="url"
              required
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://very-long-architectural-url.com/asset-id-99238-x1"
              className="w-full bg-transparent text-sm pl-8 pr-4 py-3 text-gray-700 placeholder:text-gray-300 focus:outline-none font-sans"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-[#004cd8] hover:bg-blue-700 text-white font-bold text-sm tracking-wide px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] whitespace-nowrap"
          >
            Shorten
          </button>
        </form>
      </div>

    </div>
  )
}

export default LandingPage