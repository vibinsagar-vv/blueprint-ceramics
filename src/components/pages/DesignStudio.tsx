import * as React from "react"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"

// ─── Quiz Types ──────────────────────────────────────────────────────────────
interface QuizQuestion {
  question: string
  options: { text: string; icon: string; value: string }[]
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "Which palette defines your dream space?",
    options: [
      { text: "Beiges & Soothing Creams", icon: "solar:palet-linear", value: "natural" },
      { text: "Charcoal, Concrete & Raw Metallics", icon: "solar:box-linear", value: "industrial" },
      { text: "Obsidian Black & Champagne Gold", icon: "solar:stars-line-duotone", value: "classic" },
      { text: "Light Oak & Raw Organic Terrains", icon: "solar:tree-linear", value: "minimalist" },
    ],
  },
  {
    question: "Where will this material reside?",
    options: [
      { text: "Living Area or Master Bedroom", icon: "solar:home-linear", value: "indoor" },
      { text: "High-Traffic Commercial Office/Lobby", icon: "solar:buildings-linear", value: "commercial" },
      { text: "Bathroom, Kitchen, or Wellness Spa", icon: "solar:bath-linear", value: "wet" },
      { text: "Outdoor Patio, Balcony or Driveway", icon: "solar:cloud-sun-linear", value: "outdoor" },
    ],
  },
  {
    question: "What texture or finish speaks to you?",
    options: [
      { text: "Polished Mirror (High Gloss)", icon: "solar:mirror-linear", value: "glossy" },
      { text: "Warm Satin or Soft Silk (Matte)", icon: "solar:ghost-linear", value: "satin" },
      { text: "Carved Veins or Sugar Textures", icon: "solar:magic-stick-linear", value: "textured" },
      { text: "Raw Textured Slip-Resistant (Anti-Skid)", icon: "solar:shield-linear", value: "antiskid" },
    ],
  },
]

const quizRecommendations = {
  minimalist: {
    title: "The Minimalist Suite",
    desc: "A combination of soft textures and neutral shades that create an uncluttered, serene living environment.",
    materials: ["Corda Sandstone PGVT (Satin/Silk)", "Rimless Wall-Hung WC (Ceramic White)"],
    bgImage: "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80",
  },
  industrial: {
    title: "Urban Industrial Concept",
    desc: "A bold, raw look utilizing textures of concrete and charcoal, perfect for modern offices or urban lofts.",
    materials: ["Gris Cement Outdoor (Anti-Skid)", "TileFix Pro Adhesive (High Strength)"],
    bgImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
  },
  classic: {
    title: "Classic & Timeless Elegance",
    desc: "Mirror gloss statuario slabs and brass details to construct an upscale, majestic atmosphere.",
    materials: ["Belmar Statuario (High Gloss PGVT)", "Rainfall Shower System (Matte Chrome)"],
    bgImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  natural: {
    title: "Natural & Organic Haven",
    desc: "Stunning marble veins and stone-like finishes that draw direct inspiration from biological patterns.",
    materials: ["Bianco Marble GVT (Glossy Floor)", "Elena Wall-Hung Basin (Ceramic White)"],
    bgImage: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
  },
}

// ─── Project Database ────────────────────────────────────────────────────────
interface ProjectItem {
  name: string
  location: string
  image: string
}

const mockProjectsData: Record<string, ProjectItem[]> = {
  "Public Spaces": [
    {
      name: "Vadnagar Museum",
      location: "Mehsana, Gujarat",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    },
    {
      name: "Gramin Vikas Bhavan",
      location: "New Delhi",
      image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901d?w=1200&q=80",
    },
    {
      name: "Nau Sena Bhawan",
      location: "New Delhi",
      image: "https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?w=1200&q=80",
    },
  ],
  Airports: [
    {
      name: "Muscat International Airport (Terminal 1)",
      location: "Seeb, Oman",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
    },
    {
      name: "Sohar Airport Executive Lounge",
      location: "Sohar, Oman",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
    },
  ],
  Hospitality: [
    {
      name: "Lumina Boutique Hotel",
      location: "Qurum, Muscat",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    },
    {
      name: "Oasis Executive Suites",
      location: "Bawshar, Muscat",
      image: "https://images.unsplash.com/photo-1600607687710-146b245bf793?w=1200&q=80",
    },
  ],
  Residential: [
    {
      name: "Amerat Luxury Villa Phase 5",
      location: "Amerat, Oman",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    },
    {
      name: "The Alabaster Villa",
      location: "Amerat, Oman",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    },
  ],
  Offices: [
    {
      name: "Blueprint Corporate HQ",
      location: "Ghala Industrial Area, Oman",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    },
  ],
}

export default function DesignStudio() {
  // Booking status
  const [bookingSuccess, setBookingSuccess] = React.useState(false)
  const [bookingLoading, setBookingLoading] = React.useState(false)

  // Style Quiz State
  const [quizOpen, setQuizOpen] = React.useState(false)
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0)
  const [quizAnswers, setQuizAnswers] = React.useState<string[]>([])
  const [quizResult, setQuizResult] = React.useState<typeof quizRecommendations["minimalist"] | null>(null)

  // Projects State
  const projectCategories = Object.keys(mockProjectsData)
  const [activeProjCategory, setActiveProjCategory] = React.useState(projectCategories[0])
  const [activeProjIndex, setActiveProjIndex] = React.useState(0)

  // Handle Quiz Option Selection
  const handleQuizAnswer = (value: string) => {
    const nextAnswers = [...quizAnswers, value]
    setQuizAnswers(nextAnswers)
    
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1)
    } else {
      // Calculate result based on the dominant values
      // Simple logic: mapping last category or most selected.
      // Let's map key answers to one of minimalist, industrial, classic, natural
      const resultKey = nextAnswers[0] as keyof typeof quizRecommendations
      const matched = quizRecommendations[resultKey] || quizRecommendations.minimalist
      setQuizResult(matched)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIdx(0)
    setQuizAnswers([])
    setQuizResult(null)
  }

  const handleBookVisit = () => {
    setBookingLoading(true)
    setTimeout(() => {
      setBookingLoading(false)
      setBookingSuccess(true)
      setTimeout(() => setBookingSuccess(false), 3000)
    }, 1200)
  }

  return (
    <div className="bg-[#F9F9FB] min-h-screen pt-20">
      
      {/* ── SECTION 1: Your Projects, Our Purpose ───────────────────────────── */}
      <section className="py-16 md:py-24 border-b border-gray-200/40">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="max-w-xl">
              <span className="text-xs font-body font-bold uppercase tracking-[0.25em] text-accent">
                Partner Services
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary tracking-wide mt-2">
                Your Projects,<br />Our Purpose
              </h1>
              <p className="text-sm font-body text-primary/60 leading-relaxed mt-5">
                Great spaces are built on deliberate material choices. Walk into our Experience Centre to see, touch, and pair our full range of surfaces and bathware — our team knows every technical detail should you need it. When you're ready, we connect you with your nearest dealer to fulfill your order.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start">
                <Button
                  onClick={handleBookVisit}
                  disabled={bookingLoading}
                  className="rounded-none bg-primary text-white font-body font-bold uppercase tracking-wider text-xs px-8 py-5.5 flex items-center gap-2 group"
                >
                  {bookingLoading ? (
                    <Icon icon="ph:spinner-gap" className="w-4 h-4 animate-spin" />
                  ) : bookingSuccess ? (
                    <Icon icon="ph:check-bold" className="w-4 h-4 text-accent" />
                  ) : (
                    <Icon icon="solar:calendar-date-linear" className="w-4 h-4" />
                  )}
                  <span>{bookingSuccess ? "Appointment Reserved" : "Book a Visit"}</span>
                </Button>
                
                <a
                  href="https://wa.me/message/W74G75DZ5NWNF1"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 border border-primary/20 hover:border-primary text-primary font-body font-bold uppercase tracking-wider text-xs transition-colors flex items-center gap-2"
                >
                  <Icon icon="solar:chat-round-line-linear" className="w-4 h-4" />
                  Ask Technical Support
                </a>
              </div>

              {bookingSuccess && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-body tracking-wide flex items-center gap-2">
                  <Icon icon="ph:check-circle-fill" className="w-4 h-4" />
                  Our design representative has blocked your private showroom walkthrough time slot!
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 rounded-lg group shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=80"
                alt="Blueprint Design Studio"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-[10px] font-body uppercase tracking-[0.2em] text-accent font-bold">Showroom Experience Centre</p>
                  <p className="text-sm font-heading font-semibold mt-1">Amerat Phase 5, Muscat, Oman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Explore our Lookbook ─────────────────────────────────── */}
      <section className="py-20 border-b border-gray-200/40 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary tracking-wide">
              Explore our <span className="text-accent">Lookbook</span>
            </h2>
            <p className="text-xs font-body text-primary/50 leading-relaxed mt-2.5 max-w-xl">
              We understand that it takes some hunting to find what works best. Find our crafted lookbooks below to show you exactly how our products shine in a variety of ways.
            </p>
          </div>

          {/* Lookbook Layout */}
          <div className="flex flex-col gap-6">
            {/* Row 1: Full-width Minimalist */}
            <div className="relative h-[250px] md:h-[320px] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
                alt="Minimalist Lookbook"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-500"></div>
              <div className="absolute bottom-8 left-8 text-white z-10 flex flex-col items-start gap-2">
                <span className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-accent">Style Concept 01</span>
                <h3 className="text-2xl font-heading font-bold tracking-wide">Minimalist Design</h3>
                <button className="flex items-center gap-1.5 text-xs font-body font-bold uppercase tracking-widest border-b border-white pb-1 mt-2 hover:text-accent hover:border-accent transition-all">
                  View Style <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Row 2: Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Tall Column - Industrial */}
              <div className="relative aspect-[3/4] md:aspect-auto md:h-full min-h-[350px] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1000&q=80"
                  alt="Industrial & Urban"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-500"></div>
                <div className="absolute bottom-8 left-8 text-white z-10 flex flex-col items-start gap-2">
                  <span className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-accent">Style Concept 02</span>
                  <h3 className="text-2xl font-heading font-bold tracking-wide">Industrial & Urban</h3>
                  <button className="flex items-center gap-1.5 text-xs font-body font-bold uppercase tracking-widest border-b border-white pb-1 mt-2 hover:text-accent hover:border-accent transition-all">
                    View Style <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column Stack */}
              <div className="flex flex-col gap-6">
                {/* Classic */}
                <div className="relative h-[220px] overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1000&q=80"
                    alt="Classic & Timeless"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-500"></div>
                  <div className="absolute bottom-6 left-6 text-white z-10 flex flex-col items-start gap-2">
                    <span className="text-[9px] font-body font-bold uppercase tracking-[0.25em] text-accent">Style Concept 03</span>
                    <h3 className="text-xl font-heading font-bold tracking-wide">Classic & Timeless</h3>
                    <button className="flex items-center gap-1.5 text-xs font-body font-bold uppercase tracking-widest border-b border-white pb-1 mt-1 hover:text-accent hover:border-accent transition-all">
                      View Style <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Organic */}
                <div className="relative h-[220px] overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1546412414-8035e1776c92?w=1000&q=80"
                    alt="Natural & Organic"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-500"></div>
                  <div className="absolute bottom-6 left-6 text-white z-10 flex flex-col items-start gap-2">
                    <span className="text-[9px] font-body font-bold uppercase tracking-[0.25em] text-accent">Style Concept 04</span>
                    <h3 className="text-xl font-heading font-bold tracking-wide">Natural & Organic</h3>
                    <button className="flex items-center gap-1.5 text-xs font-body font-bold uppercase tracking-widest border-b border-white pb-1 mt-1 hover:text-accent hover:border-accent transition-all">
                      View Style <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Explore Product Range by Spaces ─────────────────────── */}
      <section className="py-20 border-b border-gray-200/40">
        <div className="container mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary tracking-wide">
              Explore Product Range by Spaces
            </h2>
            <p className="text-xs font-body text-primary/50 leading-relaxed mt-2.5">
              Solutions thoughtfully developed to meet the needs of different environments, balancing performance, durability, and design across every setting.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Residential */}
            <div className="group bg-white border border-gray-100 hover:border-gray-200 shadow-sm p-8 flex flex-col justify-between aspect-[16/10] relative overflow-hidden transition-all duration-300">
              <div className="absolute right-[-40px] bottom-[-40px] opacity-10 group-hover:opacity-15 transition-opacity duration-300">
                <Icon icon="solar:home-linear" className="w-48 h-48 text-primary" />
              </div>
              
              <div>
                <span className="text-xs font-body font-bold uppercase tracking-widest text-accent">Sector Solutions</span>
                <h3 className="text-2xl font-heading font-bold mt-2 text-primary">Residential Spaces</h3>
                <p className="text-xs font-body text-primary/60 leading-relaxed mt-3.5 max-w-sm">
                  Clean lines, neutral tones, and stain-resistant finishes tailored to construct a serene, uncluttered, and low-maintenance living environment for families.
                </p>
              </div>

              <button className="self-start w-10 h-10 rounded-full border border-primary/20 hover:border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
              </button>
            </div>

            {/* Commercial */}
            <div className="group bg-white border border-gray-100 hover:border-gray-200 shadow-sm p-8 flex flex-col justify-between aspect-[16/10] relative overflow-hidden transition-all duration-300">
              <div className="absolute right-[-40px] bottom-[-40px] opacity-10 group-hover:opacity-15 transition-opacity duration-300">
                <Icon icon="solar:buildings-linear" className="w-48 h-48 text-primary" />
              </div>

              <div>
                <span className="text-xs font-body font-bold uppercase tracking-widest text-accent">Commercial Solutions</span>
                <h3 className="text-2xl font-heading font-bold mt-2 text-primary">Commercial Spaces</h3>
                <p className="text-xs font-body text-primary/60 leading-relaxed mt-3.5 max-w-sm">
                  High-traffic durability parameters, chemical resistance, anti-skid safety grading, and solid load capacity properties for office lobbies, public corridors, and facades.
                </p>
              </div>

              <button className="self-start w-10 h-10 rounded-full border border-primary/20 hover:border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Discover the Right Fit ─────────────────────────────── */}
      <section className="py-20 border-b border-gray-200/40 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary tracking-wide">
              Discover the Right Fit
            </h2>
            <p className="text-xs font-body text-primary/50 leading-relaxed mt-2.5">
              Explore a range of options crafted to suit different environments and design preferences.
            </p>
          </div>

          {/* Three-Column Explore */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Explore by Size */}
            <div className="group flex flex-col gap-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1546412414-8035e1776c92?w=600&q=80"
                  alt="Explore By Size"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                  <Icon icon="solar:arrow-right-up-linear" className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-primary group-hover:text-accent transition-colors">
                  Explore By Size
                </h3>
                <p className="text-xs font-body text-primary/50 mt-1">
                  Discover grids from 300x300mm up to large-format 800x1600mm slabs.
                </p>
              </div>
            </div>

            {/* Explore by Collection */}
            <div className="group flex flex-col gap-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&q=80"
                  alt="Explore By Collection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                  <Icon icon="solar:arrow-right-up-linear" className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-primary group-hover:text-accent transition-colors">
                  Explore By Collection
                </h3>
                <p className="text-xs font-body text-primary/50 mt-1">
                  Browse custom design groupings, vitrified marvels, and matching sanitary suites.
                </p>
              </div>
            </div>

            {/* Explore by Application */}
            <div className="group flex flex-col gap-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                  alt="Explore By Application"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                  <Icon icon="solar:arrow-right-up-linear" className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-primary group-hover:text-accent transition-colors">
                  Explore By Application
                </h3>
                <p className="text-xs font-body text-primary/50 mt-1">
                  Find tiles and solutions built specifically for bathrooms, kitchens, or driveways.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Find Your Style (Quiz Option) ───────────────────────── */}
      <section className="py-20 border-b border-gray-200/40 bg-neutral-900 text-white relative overflow-hidden">
        {/* Abstract Background details */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/50 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {!quizOpen ? (
            <div className="max-w-2xl mx-auto text-center py-8">
              <span className="text-xs font-body font-bold uppercase tracking-[0.3em] text-accent">Style Diagnostic</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 tracking-wide">
                Find Your Style
              </h2>
              <p className="text-sm font-body opacity-60 leading-relaxed mt-4 max-w-lg mx-auto">
                Finding it hard to pinpoint what fits your interior best? Take our short interactive questionnaire to discover suitable material pairings.
              </p>
              <Button
                onClick={() => {
                  setQuizOpen(true)
                  resetQuiz()
                }}
                className="mt-8 rounded-none bg-accent hover:bg-accent/90 text-primary font-body font-bold uppercase tracking-widest text-xs px-10 py-5.5"
              >
                Take the Quiz
              </Button>
            </div>
          ) : (
            <div className="max-w-xl mx-auto bg-neutral-800/80 backdrop-blur-xl border border-white/5 p-8 rounded-xl shadow-2xl relative">
              <button
                onClick={() => setQuizOpen(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
              >
                <Icon icon="ph:x" className="w-5 h-5" />
              </button>

              {/* Quiz Results Screen */}
              {quizResult ? (
                <div className="text-center animate-in fade-in-0 duration-500">
                  <div className="w-20 h-20 rounded-full border-2 border-accent/40 flex items-center justify-center mx-auto mb-6 text-accent">
                    <Icon icon="solar:stars-line-duotone" className="w-10 h-10" />
                  </div>
                  <span className="text-[10px] font-body font-bold uppercase tracking-[0.2em] text-accent">Your Style Blueprint</span>
                  <h3 className="text-2xl font-heading font-bold mt-1.5">{quizResult.title}</h3>
                  <p className="text-xs font-body opacity-60 leading-relaxed mt-3 max-w-sm mx-auto">
                    {quizResult.desc}
                  </p>

                  <div className="bg-neutral-900/50 p-5 mt-6 rounded-lg text-left border border-white/5">
                    <p className="text-[10px] font-body font-bold uppercase tracking-wider text-accent">Recommended Products:</p>
                    <ul className="mt-2.5 flex flex-col gap-2">
                      {quizResult.materials.map((mat, idx) => (
                        <li key={idx} className="text-xs font-body flex items-center gap-2">
                          <Icon icon="ph:check-bold" className="w-3.5 h-3.5 text-accent shrink-0" />
                          {mat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <Button
                      onClick={resetQuiz}
                      variant="outline"
                      className="flex-1 rounded-none border-white/20 text-white hover:bg-white/5 font-body text-xs uppercase font-bold tracking-wider py-4.5"
                    >
                      Start Over
                    </Button>
                    <Button
                      onClick={() => setQuizOpen(false)}
                      className="flex-1 rounded-none bg-accent text-primary hover:bg-accent/90 font-body text-xs uppercase font-bold tracking-wider py-4.5"
                    >
                      Explore Collections
                    </Button>
                  </div>
                </div>
              ) : (
                /* Question Screen */
                <div>
                  <div className="flex justify-between items-center text-[10px] font-body font-bold uppercase tracking-wider text-accent mb-2">
                    <span>Design Style Diagnostic</span>
                    <span>Question {currentQuestionIdx + 1} of {quizQuestions.length}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-6">
                    <div
                      className="bg-accent h-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIdx) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>

                  <h3 className="text-lg font-heading font-bold mb-5 leading-snug">
                    {quizQuestions[currentQuestionIdx].question}
                  </h3>

                  <div className="flex flex-col gap-3">
                    {quizQuestions[currentQuestionIdx].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(opt.value)}
                        className="w-full text-left bg-neutral-900 hover:bg-neutral-700/60 p-4 border border-white/5 hover:border-accent/40 rounded-lg flex items-center gap-3.5 transition-all group focus:outline-none"
                      >
                        <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center text-white/50 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                          <Icon icon={opt.icon} className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-body font-medium group-hover:text-white transition-colors">
                          {opt.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 6: Projects Showcase (Tabs & Slider) ───────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-body font-bold uppercase tracking-[0.25em] text-accent">Case Studies</span>
            <h2 className="text-3xl font-heading font-bold text-primary tracking-wide mt-2">
              Landmark Projects
            </h2>
            <p className="text-xs font-body text-primary/50 leading-relaxed mt-2.5">
              Explore a curated selection of projects where our surfaces come to life across diverse environments and scales.
            </p>
          </div>

          {/* Project Navigation */}
          <div className="flex flex-col lg:flex-row gap-10 items-stretch">
            {/* Left Column: Categories List & Project Names */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6 justify-between">
              <div className="flex flex-col gap-2">
                {/* Category selectors */}
                <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-100">
                  {projectCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveProjCategory(cat)
                        setActiveProjIndex(0)
                      }}
                      className={`px-4 py-2 text-[10px] font-body font-bold uppercase tracking-wider transition-colors border ${
                        activeProjCategory === cat
                          ? "bg-primary border-primary text-white"
                          : "bg-gray-50 border-gray-100 text-primary/60 hover:text-primary hover:border-primary/30"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Specific Projects list */}
                <div className="flex flex-col mt-4">
                  {mockProjectsData[activeProjCategory]?.map((proj, idx) => (
                    <button
                      key={proj.name}
                      onClick={() => setActiveProjIndex(idx)}
                      className={`text-left p-4.5 border-l-2 transition-all flex flex-col gap-1 ${
                        activeProjIndex === idx
                          ? "border-accent bg-gray-50/50"
                          : "border-transparent text-primary/60 hover:text-primary hover:bg-gray-50/20"
                      }`}
                    >
                      <span className={`text-xs font-body uppercase tracking-wider font-bold ${activeProjIndex === idx ? "text-accent" : "text-primary/40"}`}>
                        0{idx + 1} / Project Details
                      </span>
                      <span className="text-sm font-heading font-bold text-primary mt-1">
                        {proj.name}
                      </span>
                      <span className="text-[10px] font-body opacity-50">
                        {proj.location}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Showcase Stat block */}
              <div className="hidden lg:block bg-gray-50 border border-gray-100 p-6">
                <span className="text-[10px] font-body font-bold uppercase tracking-wider text-accent">Technical Specs</span>
                <p className="text-xs font-body text-primary/70 leading-relaxed mt-2.5">
                  All featured items undergo strict wear resistance (PEI rating), compression tests, and water absorption analysis to comply with GCC building guidelines.
                </p>
              </div>
            </div>

            {/* Right Column: Display Frame */}
            <div className="flex-1 w-full relative aspect-[16/10] overflow-hidden bg-gray-100 rounded-lg group shadow-lg">
              {mockProjectsData[activeProjCategory]?.[activeProjIndex] ? (
                <>
                  <img
                    src={mockProjectsData[activeProjCategory][activeProjIndex].image}
                    alt={mockProjectsData[activeProjCategory][activeProjIndex].name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 animate-in fade-in-30 duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                    <div className="text-white">
                      <span className="text-[10px] font-body uppercase tracking-[0.2em] text-accent font-bold">Featured Installation</span>
                      <h4 className="text-xl md:text-2xl font-heading font-bold tracking-wide mt-1">
                        {mockProjectsData[activeProjCategory][activeProjIndex].name}
                      </h4>
                      <p className="text-xs font-body opacity-80 mt-1 flex items-center gap-1.5">
                        <Icon icon="solar:map-point-linear" className="w-3.5 h-3.5" />
                        {mockProjectsData[activeProjCategory][activeProjIndex].location}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs font-body text-primary/40 uppercase tracking-widest">No Project Selected</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
