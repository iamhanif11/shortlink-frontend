import { useNavigate } from 'react-router' 
import Button from '../components/atoms/Button'

function NotFound() {
  const navigate = useNavigate() 

  const handleGoToDashboard = () => {

    navigate('/')
  }

  const handleReportIssue = () => {
    window.open('mailto:support@short.link?subject=Reporting Broken Link / 404 Issue', '_blank')
  }

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] font-sans text-gray-800 px-4 flex flex-col items-center justify-center">
      

      <div className="relative w-32 h-32 mb-8 flex items-center justify-center select-none">
        <div className="flex items-center justify-center border border-gray-100 rounded-xl p-2 bg-white shadow-sm">
          <img src="/Container.svg" alt="Sinkronisasi Ilustrasi" className="w-28 object-contain" />
        </div>
      </div>

      <div className="text-center max-w-md mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">
          404
        </h1>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight mt-2">
          Page Not Found
        </h2>
        <p className="text-sm text-gray-500 font-medium mt-4 leading-relaxed px-2">
          The page you're looking for doesn't exist. It may have been moved, deleted, or the link might be broken.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none">
        
        <Button
          onClick={handleGoToDashboard}
          variant="primary"
          size="md"
          rounded="lg"
          className="w-full sm:w-auto font-semibold px-6 shadow-md bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Go to Dashboard
        </Button>
      
        <Button
          onClick={handleReportIssue}
          variant="outline"
          size="md"
          rounded="lg"
          className="w-full sm:w-auto font-semibold px-6 bg-white border-gray-200 text-blue-600 hover:bg-gray-50 shadow-sm text-sm cursor-pointer"
        >
          Report an Issue
        </Button>
      </div>

    </div>
  )
}

export default NotFound