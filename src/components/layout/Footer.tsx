import { Link, useLocation } from "react-router-dom"
import { Icon } from "@iconify/react"
import { siteMetadata } from "@/data/mockData"

export function Footer() {
  const location = useLocation()

  const handleScrollToSection = (id: string) => {
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
    <>
      <footer className="bg-[#0A0C0E] text-white pt-24 pb-12 relative overflow-hidden">
        {/* Subtle top accent line */}
        <div className="absolute top-0 right-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
            {/* Brand & Rating */}
            <div className="md:col-span-4 flex flex-col items-start gap-8">
              <div className="flex items-center gap-3">
                <Link to="/" className="flex items-center gap-3 focus:outline-none">
                  <div className="w-10 h-10 bg-accent rounded-br-2xl rounded-tl-2xl flex items-center justify-center text-white font-heading font-bold text-xl">
                    B
                  </div>
                  <div className="font-heading tracking-widest text-lg font-bold">
                    BLUEPRINT
                  </div>
                </Link>
              </div>
              <p className="font-body text-gray-400 font-light text-sm leading-relaxed max-w-xs">
                {siteMetadata.tagline}
              </p>

              {/* Google Rating */}
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-md">
                <Icon icon="logos:google-icon" className="w-6 h-6" />
                <div className="flex flex-col">
                  <div className="flex text-accent gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} icon="ph:star-fill" className="w-4 h-4" />
                    ))}
                  </div>
                  <span className="text-sm font-body mt-1 text-gray-400">
                    Google Rating{" "}
                    <strong className="text-white">{siteMetadata.rating}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2 md:col-start-6 flex flex-col gap-3">
              <h4 className="font-heading text-lg mb-2 text-accent">Quick Links</h4>
              <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors font-body">
                Home
              </Link>
              <Link to="/catalogues" className="text-sm text-gray-400 hover:text-white transition-colors font-body">
                Catalogues
              </Link>
              <Link to="/design-studio" className="text-sm text-gray-400 hover:text-white transition-colors font-body">
                Design Studio
              </Link>
              
              <h4 className="font-heading text-lg mb-1 text-accent mt-4">Collections</h4>
              <button
                onClick={() => handleScrollToSection("floor-tiles")}
                className="text-sm text-gray-400 hover:text-white transition-colors font-body text-left cursor-pointer focus:outline-none"
              >
                Floor Tiles
              </button>
              <button
                onClick={() => handleScrollToSection("wall-tiles")}
                className="text-sm text-gray-400 hover:text-white transition-colors font-body text-left cursor-pointer focus:outline-none"
              >
                Wall & Sanitaryware
              </button>
              <button
                onClick={() => handleScrollToSection("adhesives-&-grouts")}
                className="text-sm text-gray-400 hover:text-white transition-colors font-body text-left cursor-pointer focus:outline-none"
              >
                Building Solutions
              </button>
            </div>

            {/* Contact & CTA */}
            <div
              id="locate"
              className="md:col-span-4 md:col-start-9 flex flex-col gap-6"
            >
              <h4 className="font-heading text-2xl font-light mb-2">
                Schedule a Private Consultation
              </h4>
              <p className="text-sm text-gray-400 font-body mb-2">
                Visit our showroom in {siteMetadata.location} to experience our
                tiles, sanitaryware, and building materials in person.
              </p>
              <div className="flex items-center gap-4 mb-2 text-sm font-body">
                <Icon icon="ph:map-pin" className="text-accent w-5 h-5 flex-shrink-0" />
                <span>{siteMetadata.location}, Oman</span>
              </div>
              <div className="flex items-center gap-4 mb-4 text-sm font-body">
                <Icon icon="ph:phone" className="text-accent w-5 h-5 flex-shrink-0" />
                <span>+968 {siteMetadata.phone}</span>
              </div>
              <a
                href={siteMetadata.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-fit border border-accent text-accent px-8 py-3 uppercase tracking-[0.15em] text-xs font-medium hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Icon icon="ic:baseline-whatsapp" className="w-4 h-4" />
                Message on WhatsApp
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-body text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} BLUEPRINT Building Materials &
              Ceramics. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <a
                href={siteMetadata.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <Icon icon="ph:instagram-logo" className="w-4 h-4" />
                Instagram
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={siteMetadata.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl shadow-[#25D366]/20 flex items-center justify-center z-50 hover:scale-110 transition-transform duration-300"
        aria-label="Chat on WhatsApp"
      >
        <Icon icon="ic:baseline-whatsapp" className="w-8 h-8" />
      </a>
    </>
  )
}
