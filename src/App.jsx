import { useState} from "react"
import { Routes, Route  , Navigate } from "react-router"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MainLayout from "./components/layouts/MainLayout"
import LandingPage from "./pages/LandingPage"
import CreateShortLink from "./pages/CreateShortLink"
import ListLinks from "./pages/ListLink"
import NotFound from "./pages/NotFound"
import { Toaster } from "react-hot-toast"


function ProtectedRoute({ isLoggedIn, children }) {
  
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />
  }
  return children
}

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token")
    return !!(token && token !== "undefined")
  })

  

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        

        <Route 
          path="/" 
          element={
            <MainLayout isLoggedIn={isLoggedIn} activeMenu="dashboard" onLogout={handleLogout}>
              <LandingPage />
            </MainLayout>
          } 
        />

        
        <Route path="auth">
          <Route index element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
          <Route path="register" element={<Register />} />
        </Route>

        
        <Route 
          path="create-link" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainLayout isLoggedIn={isLoggedIn} activeMenu="dashboard" onLogout={handleLogout}>
                <CreateShortLink />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="list-link" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainLayout isLoggedIn={isLoggedIn} activeMenu="links" onLogout={handleLogout}>
                <ListLinks />
              </MainLayout>
            </ProtectedRoute>
          } 
        />

        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App