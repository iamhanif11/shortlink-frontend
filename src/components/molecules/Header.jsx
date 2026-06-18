import Button from '../atoms/Button' // Pastikan path mengarah ke atom Button kamu

function Header({ isLoggedIn = false, activeMenu = 'dashboard', onLogout }) {
  return (
    <header className="w-full h-16 border-b border-gray-100 bg-white px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
      
      {/* KIRI: Logo Utama */}
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold text-gray-900 tracking-tight font-sans">
          ShortLink
        </span>

        {/* TENGAH: Menu Navigasi (Otomatis menyesuaikan active state) */}
        <nav className="flex items-center gap-6 h-16 text-sm font-medium">
          <a
            href="#dashboard"
            className={`relative flex items-center h-full transition-colors ${
              activeMenu === 'dashboard' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {/* Tampilkan ikon grid khusus di mode Auth Dashboard sesuai gambar 2 */}
            {isLoggedIn && activeMenu === 'dashboard' && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1.5 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
              </svg>
            )}
            Dashboard
            {activeMenu === 'dashboard' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
            )}
          </a>
          <a
            href="#analytics"
            className={`relative flex items-center h-full transition-colors ${
              activeMenu === 'analytics' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Analytics
            {activeMenu === 'analytics' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
            )}
          </a>
          <a
            href="#links"
            className={`relative flex items-center h-full transition-colors ${
              activeMenu === 'links' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Links
            {activeMenu === 'links' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
            )}
          </a>
        </nav>
      </div>


      <div className="flex items-center gap-6">
        {!isLoggedIn ? (

          <div className="flex items-center gap-4">
            <a href="#login" className="text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">
              Login
            </a>
            <Button variant="primary" size="sm" rounded="lg" className="px-4 font-semibold text-xs shadow-sm">
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Ikon Profil Avatar & Dropdown Arrow */}
            <div className="flex items-center gap-1.5 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-[#1e3e3d] flex items-center justify-center overflow-hidden border border-gray-100">
                {/* Ilustrasi Avatar default mirip dengan gambar mockup */}
                <svg className="w-6 h-6 text-emerald-400 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A11.95 11.95 0 0112 21.75c-2.776 0-5.4-.94-7.513-2.66a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-700 transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
            
            <button 
              onClick={onLogout}
              className="text-sm font-medium text-gray-400 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>

    </header>
  )
}

export default Header