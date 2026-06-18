import { useState } from 'react'
import { Link, useNavigate } from 'react-router' 
import Button from '../atoms/Button'

function Header({ isLoggedIn = false, activeMenu = 'dashboard', onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogoutAction = () => {
    setIsDropdownOpen(false)
    if (onLogout) onLogout()
  }

  return (
    <header className="w-full h-16 border-b border-gray-100 bg-white px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 font-sans">
      
      
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight cursor-pointer">
          ShortLink
        </Link>

        
        {isLoggedIn && (
          <nav className="hidden md:flex items-center gap-6 h-16 text-sm font-medium">
            <Link
              to="/create-link"
              className={`relative flex items-center h-full transition-colors ${
                activeMenu === 'dashboard' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Dashboard
              {activeMenu === 'dashboard' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
              )}
            </Link>

            <Link
              to="/list-link"
              className={`relative flex items-center h-full transition-colors ${
                activeMenu === 'links' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Links
              {activeMenu === 'links' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
              )}
            </Link>
          </nav>
        )}
      </div>

      
      <div className="flex items-center gap-6 relative">
        {!isLoggedIn ? (
        
          <div className="flex items-center gap-4">
            <Link to="/auth" className="text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">
              Login
            </Link>
            <Button 
              onClick={() => navigate('/auth/register')}
              variant="primary" 
              size="sm" 
              rounded="lg" 
              className="px-4 font-semibold text-xs shadow-sm bg-blue-600 text-white"
            >
              Sign Up
            </Button>
          </div>
        ) : (
          
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 cursor-pointer group focus:outline-none bg-transparent border-none py-1"
            >
              <div className="w-8 h-8 rounded-full bg-[#1e3e3d] flex items-center justify-center overflow-hidden border border-gray-100 transition-transform active:scale-95">
                <svg className="w-6 h-6 text-emerald-400 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A11.95 11.95 0 0112 21.75c-2.776 0-5.4-.94-7.513-2.66a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className={`w-3.5 h-3.5 text-gray-500 group-hover:text-gray-700 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            
            {isDropdownOpen && (
              <>
                
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                  

                  <div className="block md:hidden border-b border-gray-50 pb-1.5 mb-1.5">
                    <Link
                      to="/create-link"
                      onClick={() => setIsDropdownOpen(false)}
                      className={`block px-4 py-2.5 text-sm font-medium ${activeMenu === 'dashboard' ? 'text-blue-600 bg-blue-50/50' : 'text-gray-600'}`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/list-link"
                      onClick={() => setIsDropdownOpen(false)}
                      className={`block px-4 py-2.5 text-sm font-medium ${activeMenu === 'links' ? 'text-blue-600 bg-blue-50/50' : 'text-gray-600'}`}
                    >
                      My Links
                    </Link>
                  </div>

                  
                  <a href="#settings" className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                    Account Settings
                  </a>

                  
                  <button
                    onClick={handleLogoutAction}
                    className="w-full text-left block px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer border-t border-gray-50 mt-1"
                  >
                    Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

    </header>
  )
}

export default Header