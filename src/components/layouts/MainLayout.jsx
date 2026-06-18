import Header from '../molecules/Header'

function MainLayout({ children, isLoggedIn, activeMenu, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f8fafc] font-sans text-gray-800">
      
      <Header 
        isLoggedIn={isLoggedIn} 
        activeMenu={activeMenu} 
        onLogout={onLogout} 
      />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default MainLayout