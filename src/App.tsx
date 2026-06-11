import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Hero } from "@/components/sections/Hero"
import { Lookbook } from "@/components/sections/Lookbook"
import { Showroom } from "@/components/sections/Showroom"
import { Footer } from "@/components/layout/Footer"
import { AccountModal } from "@/components/sections/AccountModal"
import Catalogues from "@/components/pages/Catalogues"
import DesignStudio from "@/components/pages/DesignStudio"
import Products from "@/components/pages/Products"
import ProductDetail from "@/components/pages/ProductDetail"

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const element = document.getElementById(id)
      if (element) {
        // Delay slightly to allow page rendering
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 100)
        return () => clearTimeout(timer)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

function MainLayout() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [userSession, setUserSession] = useState<{ name: string; email: string } | null>(null)

  // Load user session from localStorage on mount (mock persistence)
  useEffect(() => {
    const session = localStorage.getItem("blueprint_session")
    if (session) {
      try {
        setUserSession(JSON.parse(session))
      } catch (e) {
        localStorage.removeItem("blueprint_session")
      }
    }
  }, [])

  const handleLoginSuccess = (email: string, name: string) => {
    const session = { email, name }
    setUserSession(session)
    localStorage.setItem("blueprint_session", JSON.stringify(session))
  }

  const handleLogout = () => {
    setUserSession(null)
    localStorage.removeItem("blueprint_session")
    alert("Successfully logged out.")
  }

  return (
    <div className="min-h-screen font-body flex flex-col w-full selection:bg-accent/30 selection:text-primary">
      <ScrollToTop />
      <Header
        onOpenLogin={() => setIsLoginOpen(true)}
        userSession={userSession}
        onLogout={handleLogout}
      />
      <main className="flex-1 w-full flex flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Lookbook />
                <Showroom />
              </>
            }
          />
          <Route path="/catalogues" element={<Catalogues />} />
          <Route path="/design-studio" element={<DesignStudio />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer />

      {/* Account Modal */}
      <AccountModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  )
}

export default App
