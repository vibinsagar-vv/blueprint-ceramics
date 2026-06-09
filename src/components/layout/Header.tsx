import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { categoryMap } from "@/data/mockData"

interface HeaderProps {
  onOpenLogin: () => void
  userSession: { name: string; email: string } | null
  onLogout: () => void
}

export function Header({ onOpenLogin, userSession, onLogout }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menus on path changes
  useEffect(() => {
    setMobileOpen(false)
    setShowProfileMenu(false)
  }, [location.pathname])

  const topCategories = Object.keys(categoryMap) as (keyof typeof categoryMap)[]

  // Helper to handle category click navigation
  const handleCategoryClick = (sub: string) => {
    // If we're not on home page, route to home first, then scroll
    const id = sub.toLowerCase().replace(/\s+/g, "-")
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-white/70 backdrop-blur-xl border-b border-gray-200/40 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-accent rounded-br-2xl rounded-tl-2xl flex items-center justify-center text-white font-heading font-bold text-xl transition-transform group-hover:scale-105">
            B
          </div>
          <div className="font-heading tracking-widest text-lg font-bold text-primary">
            BLUEPRINT
            <span className="block text-[0.55rem] font-body tracking-[0.18em] uppercase opacity-60 font-medium">
              Building Materials & Ceramics
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {topCategories.map((cat) => (
            <div key={cat} className="group relative">
              <button className="flex items-center gap-1.5 font-body font-medium text-[13px] uppercase tracking-[0.12em] text-primary/80 hover:text-primary transition-colors py-2 focus:outline-none cursor-pointer">
                {cat}
                <Icon
                  icon="ph:caret-down"
                  className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 opacity-50"
                />
              </button>
              {/* Mega Menu Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out translate-y-2 group-hover:translate-y-0">
                <div className="bg-white/95 backdrop-blur-xl border border-gray-100/80 shadow-2xl shadow-black/5 rounded-xl p-5 flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-2 px-2">
                    {cat}
                  </span>
                  {categoryMap[cat].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleCategoryClick(sub)}
                      className="text-sm font-body text-primary/70 hover:text-primary hover:bg-gray-50/80 p-2.5 rounded-lg transition-all duration-200 flex items-center justify-between group/item w-full text-left cursor-pointer focus:outline-none"
                    >
                      {sub}
                      <Icon
                        icon="ph:arrow-right-light"
                        className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          <Link
            to="/catalogues"
            className={`font-body font-medium text-[13px] uppercase tracking-[0.12em] hover:text-primary transition-colors ${
              location.pathname === "/catalogues" ? "text-accent border-b border-accent pb-0.5" : "text-primary/80"
            }`}
          >
            Catalogues
          </Link>
          
          <Link
            to="/design-studio"
            className={`font-body font-medium text-[13px] uppercase tracking-[0.12em] hover:text-primary transition-colors ${
              location.pathname === "/design-studio" ? "text-accent border-b border-accent pb-0.5" : "text-primary/80"
            }`}
          >
            Design Studio
          </Link>
          
          <a
            href="/#locate"
            className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-primary/80 hover:text-primary transition-colors"
          >
            Locate Us
          </a>
        </nav>

        {/* CTA & Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="hidden lg:inline-flex border-primary/80 text-primary hover:bg-primary hover:text-white rounded-none font-body font-medium uppercase tracking-[0.15em] text-[11px] px-7 py-5 transition-all duration-300 cursor-pointer"
            onClick={() => window.open(`https://wa.me/message/W74G75DZ5NWNF1`, "_blank")}
          >
            Request Consultation
          </Button>

          {/* Account Profile Icon / Dropdown */}
          <div className="relative">
            {userSession ? (
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-1.5 p-1 text-primary/80 hover:text-primary transition-colors focus:outline-none cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center text-xs font-bold font-body uppercase shadow-sm">
                  {userSession.name.slice(0, 2)}
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="p-1.5 text-primary/70 hover:text-primary hover:scale-105 transition-all focus:outline-none cursor-pointer"
                title="Account Login"
              >
                <Icon icon="solar:user-circle-linear" className="w-6 h-6" />
              </button>
            )}

            {/* Profile Dropdown Menu */}
            {showProfileMenu && userSession && (
              <div className="absolute right-0 mt-3.5 w-56 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl shadow-black/5 rounded-xl p-4 flex flex-col gap-1 z-50 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                <div className="px-2 py-1.5 border-b border-gray-100 mb-2">
                  <p className="text-[10px] font-body uppercase tracking-wider text-accent font-bold">Logged In As</p>
                  <p className="text-sm font-heading font-bold text-primary truncate mt-0.5">{userSession.name}</p>
                  <p className="text-xs font-body text-primary/50 truncate">{userSession.email}</p>
                </div>
                <button
                  onClick={() => alert("Redirecting to Saved Materials...")}
                  className="flex items-center gap-2 text-xs font-body text-primary/70 hover:text-primary hover:bg-gray-50/80 p-2.5 rounded-lg transition-colors w-full text-left focus:outline-none cursor-pointer"
                >
                  <Icon icon="solar:bookmark-linear" className="w-4 h-4" />
                  Saved Materials
                </button>
                <button
                  onClick={() => alert("Opening account settings...")}
                  className="flex items-center gap-2 text-xs font-body text-primary/70 hover:text-primary hover:bg-gray-50/80 p-2.5 rounded-lg transition-colors w-full text-left focus:outline-none cursor-pointer"
                >
                  <Icon icon="solar:settings-linear" className="w-4 h-4" />
                  Account Settings
                </button>
                <button
                  onClick={() => {
                    onLogout()
                    setShowProfileMenu(false)
                  }}
                  className="flex items-center gap-2 text-xs font-body text-red-600 hover:bg-red-50 p-2.5 rounded-lg transition-colors w-full text-left mt-2 border-t border-gray-100 pt-3 focus:outline-none cursor-pointer font-bold"
                >
                  <Icon icon="solar:logout-3-linear" className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

          <button
            className="lg:hidden text-primary p-1 cursor-pointer focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon icon={mobileOpen ? "ph:x" : "ph:list"} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg animate-in fade-in-0 duration-300">
          <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
            {topCategories.map((cat) => (
              <div key={cat} className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">
                  {cat}
                </span>
                {categoryMap[cat].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => {
                      setMobileOpen(false)
                      handleCategoryClick(sub)
                    }}
                    className="text-sm font-body text-primary/70 hover:text-primary pl-4 py-1 transition-colors text-left w-full focus:outline-none"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            ))}
            <div className="flex flex-col gap-3.5 pt-4 border-t border-gray-100">
              <Link
                to="/catalogues"
                className="text-sm font-body font-semibold text-primary/80 hover:text-accent"
                onClick={() => setMobileOpen(false)}
              >
                Catalogues
              </Link>
              <Link
                to="/design-studio"
                className="text-sm font-body font-semibold text-primary/80 hover:text-accent"
                onClick={() => setMobileOpen(false)}
              >
                Design Studio
              </Link>
              <a
                href="/#locate"
                className="text-sm font-body font-semibold text-primary/80 hover:text-accent"
                onClick={() => setMobileOpen(false)}
              >
                Locate Us
              </a>
            </div>
            <Button
              className="w-full rounded-none font-body font-medium uppercase tracking-[0.15em] text-[11px] py-5"
              onClick={() => window.open(`https://wa.me/message/W74G75DZ5NWNF1`, "_blank")}
            >
              Request Consultation
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

