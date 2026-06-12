import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"

interface HeaderProps {
  onOpenLogin: () => void
  userSession: { name: string; email: string } | null
  onLogout: () => void
}

export function Header({ onOpenLogin, userSession, onLogout }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [activeMenu, setActiveMenu] = useState<"tiles" | "bathware" | "solutions" | null>(null)
  
  // Interactive mega menu internal column states
  const [tilesLeftHover, setTilesLeftHover] = useState("Explore By Collection")
  const [tilesMiddleHover, setTilesMiddleHover] = useState("Slabs")
  
  const [bathwareLeftHover, setBathwareLeftHover] = useState("Collections")
  const [solutionsLeftHover, setSolutionsLeftHover] = useState("Concrete Solutions")

  const profileMenuRef = useRef<HTMLDivElement>(null)

  const location = useLocation()
  const navigate = useNavigate()

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
    setActiveMenu(null)
  }, [location.pathname])

  // Handle click outside for profile menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }
    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showProfileMenu])

  const navigateToFilteredProducts = (filters: { category: string; subCategory?: string; application?: string; size?: string; finish?: string; viewBy?: "application" | "space" | "size" | "look" }) => {
    setActiveMenu(null)
    const params = new URLSearchParams()
    if (filters.category) params.set("category", filters.category)
    if (filters.subCategory) params.set("subCategory", filters.subCategory)
    if (filters.application) params.set("application", filters.application)
    if (filters.size) params.set("size", filters.size)
    if (filters.finish) params.set("finish", filters.finish)
    if (filters.viewBy) params.set("viewBy", filters.viewBy)
    navigate(`/products?${params.toString()}`)
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${
        isScrolled || activeMenu
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-200/40 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent py-5"
      }`}
      onMouseLeave={() => setActiveMenu(null)}
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
          
          {/* TILES MEGA MENU TRIGGER */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("tiles")}
          >
            <button className={`flex items-center gap-1.5 font-body font-medium text-[13px] uppercase tracking-[0.12em] transition-colors py-2 focus:outline-none cursor-pointer ${
              activeMenu === "tiles" ? "text-accent" : "text-primary/80 hover:text-primary"
            }`}>
              Tiles
              <Icon
                icon="ph:caret-down"
                className={`w-3 h-3 transition-transform duration-300 ${activeMenu === "tiles" ? "rotate-180 text-accent" : "opacity-50"}`}
              />
            </button>
          </div>

          {/* BATHWARE MEGA MENU TRIGGER */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("bathware")}
          >
            <button className={`flex items-center gap-1.5 font-body font-medium text-[13px] uppercase tracking-[0.12em] transition-colors py-2 focus:outline-none cursor-pointer ${
              activeMenu === "bathware" ? "text-accent" : "text-primary/80 hover:text-primary"
            }`}>
              Bathware
              <Icon
                icon="ph:caret-down"
                className={`w-3 h-3 transition-transform duration-300 ${activeMenu === "bathware" ? "rotate-180 text-accent" : "opacity-50"}`}
              />
            </button>
          </div>

          {/* BUILDING SOLUTIONS MEGA MENU TRIGGER */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("solutions")}
          >
            <button className={`flex items-center gap-1.5 font-body font-medium text-[13px] uppercase tracking-[0.12em] transition-colors py-2 focus:outline-none cursor-pointer ${
              activeMenu === "solutions" ? "text-accent" : "text-primary/80 hover:text-primary"
            }`}>
              Building Solutions
              <Icon
                icon="ph:caret-down"
                className={`w-3 h-3 transition-transform duration-300 ${activeMenu === "solutions" ? "rotate-180 text-accent" : "opacity-50"}`}
              />
            </button>
          </div>

          <Link
            to="/catalogues"
            className={`font-body font-medium text-[13px] uppercase tracking-[0.12em] hover:text-primary transition-colors ${
              location.pathname === "/catalogues" ? "text-accent border-b border-accent pb-0.5" : "text-primary/80"
            }`}
            onMouseEnter={() => setActiveMenu(null)}
          >
            Catalogues
          </Link>
          
          <Link
            to="/design-studio"
            className={`font-body font-medium text-[13px] uppercase tracking-[0.12em] hover:text-primary transition-colors ${
              location.pathname === "/design-studio" ? "text-accent border-b border-accent pb-0.5" : "text-primary/80"
            }`}
            onMouseEnter={() => setActiveMenu(null)}
          >
            Design Studio
          </Link>
          
          <a
            href="/#locate"
            className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-primary/80 hover:text-primary transition-colors"
            onMouseEnter={() => setActiveMenu(null)}
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
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`flex items-center gap-1.5 p-1 transition-colors focus:outline-none cursor-pointer ${userSession ? "text-primary/80 hover:text-primary" : "text-primary/70 hover:text-primary hover:scale-105"}`}
              title="Account"
            >
              {userSession ? (
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center text-xs font-bold font-body uppercase shadow-sm">
                  {userSession.name.slice(0, 2)}
                </div>
              ) : (
                <div className="p-0.5">
                  <Icon icon="solar:user-circle-linear" className="w-6 h-6" />
                </div>
              )}
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-3.5 w-80 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-2xl p-2 flex flex-col z-50 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                {userSession ? (
                  <>
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
                  </>
                ) : (
                  <div className="p-1">
                    <div className="p-3 pb-4">
                      <h3 className="text-xl font-heading font-bold text-primary tracking-tight">Welcome</h3>
                      <p className="text-[13px] font-body text-primary/60 mt-1.5 leading-relaxed">
                        Access your account, track orders, and curate your material wishlist.
                      </p>
                    </div>
                    
                    <div className="px-2 pb-3 flex flex-col gap-2">
                      <a 
                        href="https://respected-victory-5041000857.strapiapp.com/admin/auth/login"
                        className="w-full relative group overflow-hidden bg-primary text-white rounded-xl h-11 flex items-center justify-center gap-2 text-sm font-body font-medium transition-all hover:shadow-lg focus:outline-none cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <Icon icon="solar:login-3-bold" className="w-4 h-4" />
                        <span className="relative z-10">Sign In to Account</span>
                      </a>
                      <a 
                        href="https://respected-victory-5041000857.strapiapp.com/admin/auth/login"
                        className="w-full bg-white hover:bg-gray-50 text-primary rounded-xl h-11 flex items-center justify-center gap-2 text-sm font-body font-medium transition-colors focus:outline-none border border-gray-200 cursor-pointer"
                      >
                        <span>Create Account</span>
                      </a>
                    </div>

                    <div className="h-[1px] w-[calc(100%-16px)] mx-auto bg-gray-100 my-1"></div>

                    <div className="p-2 flex flex-col gap-0.5">
                      <button className="flex items-center justify-between text-[14px] font-body text-primary/80 hover:text-primary hover:bg-gray-50/80 p-3 rounded-xl transition-all w-full text-left focus:outline-none cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <Icon icon="solar:user-rounded-linear" className="w-[18px] h-[18px] text-primary/50 group-hover:text-primary transition-colors" />
                          <span>Profile Settings</span>
                        </div>
                        <Icon icon="ph:caret-right" className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary/40" />
                      </button>
                      <button className="flex items-center justify-between text-[14px] font-body text-primary/80 hover:text-primary hover:bg-gray-50/80 p-3 rounded-xl transition-all w-full text-left focus:outline-none cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <Icon icon="solar:heart-linear" className="w-[18px] h-[18px] text-primary/50 group-hover:text-primary transition-colors" />
                          <span>Saved Wishlist</span>
                        </div>
                        <Icon icon="ph:caret-right" className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary/40" />
                      </button>
                      <button className="flex items-center justify-between text-[14px] font-body text-primary/80 hover:text-primary hover:bg-gray-50/80 p-3 rounded-xl transition-all w-full text-left focus:outline-none cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <Icon icon="solar:letter-linear" className="w-[18px] h-[18px] text-primary/50 group-hover:text-primary transition-colors" />
                          <span>Get In Touch</span>
                        </div>
                        <Icon icon="ph:caret-right" className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary/40" />
                      </button>
                    </div>
                  </div>
                )}
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

      {/* ── INTERACTIVE MEGA MENUS (FULL-WIDTH DROPDOWNS) ──────────────────── */}
      {activeMenu && (
        <div className="absolute top-full left-0 right-0 w-full bg-white border-t border-b border-gray-200/50 shadow-2xl animate-in slide-in-from-top-2 duration-300 z-40 hidden lg:block">
          <div className="container mx-auto px-12 py-10 flex gap-8">
            
            {/* ── TILES MENUS ──────────────────────────────────────────────── */}
            {activeMenu === "tiles" && (
              <>
                {/* Column 1: Left Menu Links */}
                <div className="w-64 border-r border-gray-100 pr-6 flex flex-col gap-1.5 shrink-0">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-3 px-2">Tiles Catalog</span>
                  <button
                    onClick={() => navigateToFilteredProducts({ category: "Tiles" })}
                    className="text-left text-xs font-body py-2 px-3 hover:bg-gray-50 hover:text-primary text-primary/70 transition-all rounded"
                  >
                    Overview
                  </button>
                  <button
                    onMouseEnter={() => setTilesLeftHover("Explore By Application")}
                    onClick={() => navigateToFilteredProducts({ category: "Tiles", viewBy: "application" })}
                    className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between ${
                      tilesLeftHover === "Explore By Application" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <span>Explore By Application</span>
                    <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onMouseEnter={() => setTilesLeftHover("Explore By Space")}
                    onClick={() => navigateToFilteredProducts({ category: "Tiles", viewBy: "space" })}
                    className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between ${
                      tilesLeftHover === "Explore By Space" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <span>Explore By Space</span>
                    <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onMouseEnter={() => setTilesLeftHover("Explore By Collection")}
                    className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between cursor-pointer ${
                      tilesLeftHover === "Explore By Collection" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <span>Explore By Collection</span>
                    <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onMouseEnter={() => setTilesLeftHover("Explore By Size")}
                    onClick={() => navigateToFilteredProducts({ category: "Tiles", viewBy: "size" })}
                    className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between ${
                      tilesLeftHover === "Explore By Size" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <span>Explore By Size</span>
                    <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onMouseEnter={() => setTilesLeftHover("Explore By Look")}
                    onClick={() => navigateToFilteredProducts({ category: "Tiles", viewBy: "look" })}
                    className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between ${
                      tilesLeftHover === "Explore By Look" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <span>Explore By Look</span>
                    <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onClick={() => navigateToFilteredProducts({ category: "Tiles" })}
                    className="text-left text-xs font-body py-2 px-3 hover:bg-gray-50 hover:text-primary text-primary/70 transition-all rounded font-bold text-accent"
                  >
                    Explore All Tiles
                  </button>
                </div>

                {/* Column 2: Middle SubMenu (Dynamic based on Left hover) */}
                <div className="w-64 border-r border-gray-100 pr-6 flex flex-col gap-1.5 shrink-0">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-3 px-2">
                    {tilesLeftHover === "Explore By Collection" ? "Collections" : tilesLeftHover}
                  </span>
                  
                  {tilesLeftHover === "Explore By Collection" && (
                    <>
                      <button
                        onMouseEnter={() => setTilesMiddleHover("Slabs")}
                        className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between cursor-pointer ${
                          tilesMiddleHover === "Slabs" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                        }`}
                      >
                        <span>Slabs</span>
                        <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                      </button>
                      <button
                        onMouseEnter={() => setTilesMiddleHover("Glazed Vitrified")}
                        onClick={() => navigateToFilteredProducts({ category: "Tiles", subCategory: "Floor Tiles" })}
                        className={`text-left text-xs font-body py-2 px-3 transition-all rounded ${
                          tilesMiddleHover === "Glazed Vitrified" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                        }`}
                      >
                        Glazed Vitrified
                      </button>
                      <button
                        onMouseEnter={() => setTilesMiddleHover("Ceramic")}
                        onClick={() => navigateToFilteredProducts({ category: "Tiles", subCategory: "Wall Tiles" })}
                        className={`text-left text-xs font-body py-2 px-3 transition-all rounded ${
                          tilesMiddleHover === "Ceramic" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                        }`}
                      >
                        Ceramic
                      </button>
                      <button
                        onMouseEnter={() => setTilesMiddleHover("HDVT")}
                        onClick={() => navigateToFilteredProducts({ category: "Tiles", subCategory: "Outdoor & Parking Tiles" })}
                        className={`text-left text-xs font-body py-2 px-3 transition-all rounded ${
                          tilesMiddleHover === "HDVT" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                        }`}
                      >
                        HDVT (Outdoor & Parking)
                      </button>
                      <button
                        onMouseEnter={() => setTilesMiddleHover("Polished Vitrified")}
                        onClick={() => navigateToFilteredProducts({ category: "Tiles", subCategory: "Floor Tiles" })}
                        className={`text-left text-xs font-body py-2 px-3 transition-all rounded ${
                          tilesMiddleHover === "Polished Vitrified" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                        }`}
                      >
                        Polished Vitrified
                      </button>
                      <button
                        onMouseEnter={() => setTilesMiddleHover("Accent")}
                        onClick={() => navigateToFilteredProducts({ category: "Tiles", subCategory: "Wall Tiles" })}
                        className={`text-left text-xs font-body py-2 px-3 transition-all rounded ${
                          tilesMiddleHover === "Accent" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                        }`}
                      >
                        Accent & Highlighter
                      </button>
                    </>
                  )}

                  {tilesLeftHover === "Explore By Application" && (
                    <>
                      <button onClick={() => navigateToFilteredProducts({ category: "Tiles", subCategory: "Floor Tiles", application: "Living Room", viewBy: "application" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Living Room Floors</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Tiles", subCategory: "Wall Tiles", application: "Bathroom", viewBy: "application" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Bathroom Walls</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Tiles", subCategory: "Wall Tiles", application: "Kitchen", viewBy: "application" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Kitchen Splashbacks</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Tiles", subCategory: "Outdoor & Parking Tiles", application: "Outdoor", viewBy: "application" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Balcony & Terraces</button>
                    </>
                  )}

                  {tilesLeftHover === "Explore By Space" && (
                    <>
                      <button onClick={() => navigateToFilteredProducts({ category: "Tiles", application: "Bedroom", viewBy: "space" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Residential Suites</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Tiles", application: "Commercial", viewBy: "space" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Commercial Lobbies</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Tiles", application: "Commercial", viewBy: "space" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Hospitality Corridors</button>
                    </>
                  )}

                  {tilesLeftHover === "Explore By Size" && (
                    <>
                      <button onClick={() => navigateToFilteredProducts({ category: "Tiles", size: "800x1600 mm", viewBy: "size" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Large Format Slabs</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Tiles", size: "600x600 mm", viewBy: "size" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Standard 600x600 mm</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Tiles", size: "600x1200 mm", viewBy: "size" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Standard 600x1200 mm</button>
                    </>
                  )}

                  {tilesLeftHover === "Explore By Look" && (
                    <>
                      <button onClick={() => navigateToFilteredProducts({ category: "Tiles", finish: "Glossy", viewBy: "look" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Glossy Marble Look</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Tiles", finish: "Matte", viewBy: "look" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Matte Stone Finish</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Tiles", finish: "Rustic", viewBy: "look" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Plank Wood Finish</button>
                    </>
                  )}
                </div>

                {/* Column 3: Third Tier Menu (e.g. Slabs leaf items) */}
                <div className="w-64 border-r border-gray-100 pr-6 flex flex-col gap-1.5 shrink-0">
                  {tilesLeftHover === "Explore By Collection" && tilesMiddleHover === "Slabs" ? (
                    <>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-3 px-2">Slabs Types</span>
                      <button
                        onClick={() => navigateToFilteredProducts({ category: "Tiles", subCategory: "Floor Tiles", size: "800x1600 mm" })}
                        className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded"
                      >
                        Coverstone 15
                      </button>
                      <button
                        onClick={() => navigateToFilteredProducts({ category: "Tiles", subCategory: "Floor Tiles", size: "800x1600 mm" })}
                        className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded"
                      >
                        Cover9ine
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col text-primary/30 text-[10px] font-body uppercase tracking-wider py-10 text-center justify-center">
                      <span>No further sub-options</span>
                    </div>
                  )}
                </div>

                {/* Column 4: Right Image Preview */}
                <div className="flex-1 min-w-[200px] h-[250px] relative overflow-hidden bg-gray-50 rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                    alt="Tiles preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-5 left-5 text-white">
                    <p className="text-[10px] font-body uppercase tracking-widest text-accent font-bold">Premium Slabs Collection</p>
                    <p className="text-sm font-heading font-semibold mt-0.5">Bianco Venato Slabs</p>
                  </div>
                </div>
              </>
            )}

            {/* ── BATHWARE MEGA MENU ───────────────────────────────────────── */}
            {activeMenu === "bathware" && (
              <>
                {/* Column 1: Left Navigation list */}
                <div className="w-64 border-r border-gray-100 pr-6 flex flex-col gap-1.5 shrink-0">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-3 px-2">Bathware Catalog</span>
                  <button
                    onClick={() => navigateToFilteredProducts({ category: "Bathware" })}
                    className="text-left text-xs font-body py-2 px-3 hover:bg-gray-50 hover:text-primary text-primary/70 transition-all rounded"
                  >
                    Overview
                  </button>
                  <button
                    onMouseEnter={() => setBathwareLeftHover("Collections")}
                    className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between cursor-pointer ${
                      bathwareLeftHover === "Collections" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <span>Collections</span>
                    <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onMouseEnter={() => setBathwareLeftHover("Sanitaryware")}
                    onClick={() => navigateToFilteredProducts({ category: "Bathware", subCategory: "Sanitaryware" })}
                    className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between ${
                      bathwareLeftHover === "Sanitaryware" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <span>Sanitaryware</span>
                    <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onMouseEnter={() => setBathwareLeftHover("Bath Fittings")}
                    onClick={() => navigateToFilteredProducts({ category: "Bathware", subCategory: "Faucets & Showers" })}
                    className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between ${
                      bathwareLeftHover === "Bath Fittings" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <span>Bath Fittings</span>
                    <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onMouseEnter={() => setBathwareLeftHover("Smart Bathware")}
                    onClick={() => navigateToFilteredProducts({ category: "Bathware", subCategory: "Sanitaryware" })}
                    className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between ${
                      bathwareLeftHover === "Smart Bathware" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <span>Smart Bathware</span>
                    <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                  </button>
                </div>

                {/* Column 2: Middle Navigation list */}
                <div className="w-64 border-r border-gray-100 pr-6 flex flex-col gap-1.5 shrink-0">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-3 px-2">
                    {bathwareLeftHover}
                  </span>

                  {bathwareLeftHover === "Collections" && (
                    <>
                      <button
                        onClick={() => navigateToFilteredProducts({ category: "Bathware" })}
                        className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded"
                      >
                        French Collection
                      </button>
                      <button
                        onClick={() => navigateToFilteredProducts({ category: "Bathware" })}
                        className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded"
                      >
                        Signature Collection
                      </button>
                    </>
                  )}

                  {bathwareLeftHover === "Sanitaryware" && (
                    <>
                      <button onClick={() => navigateToFilteredProducts({ category: "Bathware", subCategory: "Sanitaryware" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Wall-Hung Basins</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Bathware", subCategory: "Sanitaryware" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Rimless WCs</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Bathware", subCategory: "Sanitaryware" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Cabinet Basins</button>
                    </>
                  )}

                  {bathwareLeftHover === "Bath Fittings" && (
                    <>
                      <button onClick={() => navigateToFilteredProducts({ category: "Bathware", subCategory: "Faucets & Showers" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Rainfall Showers</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Bathware", subCategory: "Faucets & Showers" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Basin Mixers</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Bathware", subCategory: "Faucets & Showers" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Shower Columns</button>
                    </>
                  )}

                  {bathwareLeftHover === "Smart Bathware" && (
                    <>
                      <button onClick={() => navigateToFilteredProducts({ category: "Bathware", subCategory: "Sanitaryware" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Sensor Faucets</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Bathware", subCategory: "Sanitaryware" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Intelligent WCs</button>
                    </>
                  )}
                </div>

                {/* Column 3: Dummy spacing / Extra list */}
                <div className="w-64 border-r border-gray-100 pr-6 flex flex-col justify-center">
                  <div className="bg-gray-50/50 p-4 border border-dashed border-gray-200 text-center">
                    <p className="text-[10px] font-body font-bold text-accent uppercase tracking-wider">Showroom Guarantee</p>
                    <p className="text-[11px] font-body text-primary/50 leading-relaxed mt-1">10-year surface polish & mechanism replacement warranty across all premium Omani suites.</p>
                  </div>
                </div>

                {/* Column 4: Right Image preview */}
                <div className="flex-1 min-w-[200px] h-[250px] relative overflow-hidden bg-gray-50 rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&q=80"
                    alt="Bathware preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-5 left-5 text-white">
                    <p className="text-[10px] font-body uppercase tracking-widest text-accent font-bold">Premium Sanitary Suites</p>
                    <p className="text-sm font-heading font-semibold mt-0.5">Elita White Rimless WC</p>
                  </div>
                </div>
              </>
            )}

            {/* ── BUILDING SOLUTIONS MEGA MENU ─────────────────────────────── */}
            {activeMenu === "solutions" && (
              <>
                {/* Column 1: Left Navigation list */}
                <div className="w-64 border-r border-gray-100 pr-6 flex flex-col gap-1.5 shrink-0">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-3 px-2">Technical Catalog</span>
                  <button
                    onClick={() => navigateToFilteredProducts({ category: "Building Solutions" })}
                    className="text-left text-xs font-body py-2 px-3 hover:bg-gray-50 hover:text-primary text-primary/70 transition-all rounded"
                  >
                    Overview
                  </button>
                  <button
                    onMouseEnter={() => setSolutionsLeftHover("Adhesive")}
                    onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Adhesives & Grouts" })}
                    className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between ${
                      solutionsLeftHover === "Adhesive" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <span>Adhesive</span>
                    <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onMouseEnter={() => setSolutionsLeftHover("Grouts")}
                    onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Adhesives & Grouts" })}
                    className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between ${
                      solutionsLeftHover === "Grouts" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <span>Grouts</span>
                    <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onMouseEnter={() => setSolutionsLeftHover("Waterproofing Systems")}
                    onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Waterproofing Solutions" })}
                    className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between ${
                      solutionsLeftHover === "Waterproofing Systems" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <span>Waterproofing Systems</span>
                    <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onMouseEnter={() => setSolutionsLeftHover("Protective Coatings & Primers")}
                    onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Construction Chemicals" })}
                    className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between ${
                      solutionsLeftHover === "Protective Coatings & Primers" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <span>Protective Coatings</span>
                    <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                  </button>
                  <button
                    onMouseEnter={() => setSolutionsLeftHover("Concrete Solutions")}
                    className={`text-left text-xs font-body py-2 px-3 transition-all rounded flex items-center justify-between cursor-pointer ${
                      solutionsLeftHover === "Concrete Solutions" ? "bg-primary/5 text-primary font-semibold" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    <span>Concrete Solutions</span>
                    <Icon icon="ph:caret-right" className="w-3 h-3 opacity-40" />
                  </button>
                </div>

                {/* Column 2: Middle Navigation list */}
                <div className="w-64 border-r border-gray-100 pr-6 flex flex-col gap-1.5 shrink-0">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-3 px-2">
                    {solutionsLeftHover}
                  </span>

                  {solutionsLeftHover === "Concrete Solutions" && (
                    <>
                      <button onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Construction Chemicals" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Concrete Admixtures</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Construction Chemicals" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Repairs & Rehabilitation</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Construction Chemicals" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Bonding Agents</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Construction Chemicals" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Curing Compounds</button>
                    </>
                  )}

                  {solutionsLeftHover === "Adhesive" && (
                    <>
                      <button onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Adhesives & Grouts" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">TileFix Pro (Tile)</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Adhesives & Grouts" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Stone Adhesive</button>
                    </>
                  )}

                  {solutionsLeftHover === "Grouts" && (
                    <>
                      <button onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Adhesives & Grouts" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Epoxy Premium Grout</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Adhesives & Grouts" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Flexible Tile Grout</button>
                    </>
                  )}

                  {solutionsLeftHover === "Waterproofing Systems" && (
                    <>
                      <button onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Waterproofing Solutions" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">AquaShield Liquid-Applied</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Waterproofing Solutions" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Cementitious Sealants</button>
                    </>
                  )}

                  {solutionsLeftHover === "Protective Coatings & Primers" && (
                    <>
                      <button onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Construction Chemicals" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Anti-Corrosive Primer</button>
                      <button onClick={() => navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Construction Chemicals" })} className="text-left text-xs font-body py-2 px-3 text-primary/70 hover:bg-gray-50 rounded">Dustproofer Coating</button>
                    </>
                  )}
                </div>

                {/* Column 3: Dummy spacing / Extra list */}
                <div className="w-64 border-r border-gray-100 pr-6 flex flex-col justify-center">
                  <div className="bg-gray-50/50 p-4 border border-dashed border-gray-200 text-center">
                    <p className="text-[10px] font-body font-bold text-accent uppercase tracking-wider">Quality Certification</p>
                    <p className="text-[11px] font-body text-primary/50 leading-relaxed mt-1">Sourced in compliance with ISO 9001 and certified by local Omani Municipalities.</p>
                  </div>
                </div>

                {/* Column 4: Right Image preview */}
                <div className="flex-1 min-w-[200px] h-[250px] relative overflow-hidden bg-gray-50 rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
                    alt="Building Solutions preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-5 left-5 text-white">
                    <p className="text-[10px] font-body uppercase tracking-widest text-accent font-bold">Structural Adhesives</p>
                    <p className="text-sm font-heading font-semibold mt-0.5">TileFix Pro Premium</p>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg animate-in fade-in-0 duration-300">
          <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">
                Tiles Catalogues
              </span>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  navigateToFilteredProducts({ category: "Tiles" })
                }}
                className="text-sm font-body text-primary/70 hover:text-primary pl-4 py-1.5 text-left focus:outline-none"
              >
                All Tiles
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  navigateToFilteredProducts({ category: "Tiles", subCategory: "Floor Tiles" })
                }}
                className="text-sm font-body text-primary/70 hover:text-primary pl-4 py-1.5 text-left focus:outline-none"
              >
                Floor Tiles
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  navigateToFilteredProducts({ category: "Tiles", subCategory: "Wall Tiles" })
                }}
                className="text-sm font-body text-primary/70 hover:text-primary pl-4 py-1.5 text-left focus:outline-none"
              >
                Wall Tiles
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  navigateToFilteredProducts({ category: "Tiles", subCategory: "Outdoor & Parking Tiles" })
                }}
                className="text-sm font-body text-primary/70 hover:text-primary pl-4 py-1.5 text-left focus:outline-none"
              >
                Outdoor & Parking Tiles
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">
                Bathware Catalogues
              </span>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  navigateToFilteredProducts({ category: "Bathware" })
                }}
                className="text-sm font-body text-primary/70 hover:text-primary pl-4 py-1.5 text-left focus:outline-none"
              >
                All Bathware
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  navigateToFilteredProducts({ category: "Bathware", subCategory: "Sanitaryware" })
                }}
                className="text-sm font-body text-primary/70 hover:text-primary pl-4 py-1.5 text-left focus:outline-none"
              >
                Sanitaryware
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  navigateToFilteredProducts({ category: "Bathware", subCategory: "Faucets & Showers" })
                }}
                className="text-sm font-body text-primary/70 hover:text-primary pl-4 py-1.5 text-left focus:outline-none"
              >
                Faucets & Showers
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  navigateToFilteredProducts({ category: "Bathware", subCategory: "Bathroom Accessories" })
                }}
                className="text-sm font-body text-primary/70 hover:text-primary pl-4 py-1.5 text-left focus:outline-none"
              >
                Bathroom Accessories
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">
                Building Solutions
              </span>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  navigateToFilteredProducts({ category: "Building Solutions" })
                }}
                className="text-sm font-body text-primary/70 hover:text-primary pl-4 py-1.5 text-left focus:outline-none"
              >
                All Solutions
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Adhesives & Grouts" })
                }}
                className="text-sm font-body text-primary/70 hover:text-primary pl-4 py-1.5 text-left focus:outline-none"
              >
                Adhesives & Grouts
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  navigateToFilteredProducts({ category: "Building Solutions", subCategory: "Waterproofing Solutions" })
                }}
                className="text-sm font-body text-primary/70 hover:text-primary pl-4 py-1.5 text-left focus:outline-none"
              >
                Waterproofing Solutions
              </button>
            </div>

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
