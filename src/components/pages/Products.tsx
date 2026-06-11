import * as React from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Icon } from "@iconify/react"
import { categoryMap, applicationImages, spaceImages, sizeImages, finishImages } from "@/data/mockData"
import type { TopLevelCategory, ProductCategory, Product } from "@/data/mockData"
import { Button } from "@/components/ui/button"
import { fetchAPI, getStrapiMedia } from "@/lib/api"

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  
  // Parse parameters
  const queryCategory = searchParams.get("category") as TopLevelCategory | null
  const querySubCategory = searchParams.get("subCategory") as ProductCategory | null
  const queryApplication = searchParams.get("application")
  const querySize = searchParams.get("size")
  const queryFinish = searchParams.get("finish")
  const queryViewBy = searchParams.get("viewBy") || "application"
  
  const [products, setProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetchAPI("/products", { populate: "*" })
        const mappedProducts = res.data.map((item: any) => ({
          id: item.documentId || item.id?.toString(),
          name: item.name,
          code: item.code,
          topCategory: item.topCategory,
          subCategory: item.subCategory,
          tileType: item.tileType,
          applicationArea: item.applicationArea,
          dimensions: item.dimensions,
          finish: item.finish,
          textureUrl: getStrapiMedia(item.texture),
          mockupUrl: getStrapiMedia(item.mockup),
          isNewArrival: item.isNewArrival,
          isBestseller: item.isBestseller,
          description: item.description,
          features: item.features || [],
          lookbookImages: item.lookbookImages?.map(getStrapiMedia) || [],
          faqs: item.faqs || []
        }))
        setProducts(mappedProducts)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Search & Filter state
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<TopLevelCategory | "All">(queryCategory || "All")
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<string | "All">(querySubCategory || "All")
  const [selectedFinish, setSelectedFinish] = React.useState<string>(queryFinish || "All")
  const [selectedSize, setSelectedSize] = React.useState<string>(querySize || "All")

  // Application filter state
  const [activeApp, setActiveApp] = React.useState<string>(queryApplication || "All")

  // Sync state if URL query changes
  React.useEffect(() => {
    setSelectedCategory(queryCategory || "All")
    setSelectedSubCategory(querySubCategory || "All")
    setActiveApp(queryApplication || "All")
    setSelectedSize(querySize || "All")
    setSelectedFinish(queryFinish || "All")
  }, [queryCategory, querySubCategory, queryApplication, querySize, queryFinish])

  // Get distinct sizes & finishes from all fetched products
  const allFinishes = Array.from(new Set(products.map((p) => p.finish).filter(Boolean)))
  const allSizes = Array.from(new Set(products.map((p) => p.dimensions).filter(Boolean)))

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.topCategory === selectedCategory
    const matchesSubCategory = selectedSubCategory === "All" || p.subCategory === selectedSubCategory
    const matchesFinish = selectedFinish === "All" || p.finish === selectedFinish
    const matchesSize = selectedSize === "All" || p.dimensions === selectedSize
    const matchesApp = activeApp === "All" || p.applicationArea?.includes(activeApp) || p.topCategory === "Bathware" // Let Bathware show if App isn't strictly matched, or adjust as needed. Actually, mockProducts has some applicationArea.
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
      
    return matchesCategory && matchesSubCategory && matchesFinish && matchesSize && matchesApp && matchesSearch
  })

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedSubCategory("All")
    setSelectedFinish("All")
    setSelectedSize("All")
    setActiveApp("All")
    setSearchParams(new URLSearchParams())
  }

  const handleCategoryChange = (cat: TopLevelCategory | "All") => {
    setSelectedCategory(cat)
    setSelectedSubCategory("All")
    const newParams = new URLSearchParams(searchParams)
    if (cat === "All") {
      newParams.delete("category")
    } else {
      newParams.set("category", cat)
    }
    newParams.delete("subCategory")
    setSearchParams(newParams)
  }

  const handleSubCategoryChange = (sub: string) => {
    setSelectedSubCategory(sub)
    const newParams = new URLSearchParams(searchParams)
    if (sub === "All") {
      newParams.delete("subCategory")
    } else {
      newParams.set("subCategory", sub)
    }
    setSearchParams(newParams)
  }

  const handleAppChange = (app: string) => {
    setActiveApp(app)
    const newParams = new URLSearchParams(searchParams)
    if (app === "All") {
      newParams.delete("application")
    } else {
      newParams.set("application", app)
    }
    setSearchParams(newParams)
  }

  const handleFinishChange = (finish: string) => {
    setSelectedFinish(finish)
    const newParams = new URLSearchParams(searchParams)
    if (finish === "All") newParams.delete("finish")
    else newParams.set("finish", finish)
    setSearchParams(newParams)
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    const newParams = new URLSearchParams(searchParams)
    if (size === "All") newParams.delete("size")
    else newParams.set("size", size)
    setSearchParams(newParams)
  }

  // Dynamic Tracks
  let trackData: { name: string, image: string, filterVal: string }[] = []
  let trackTitle = ""
  let trackDescription = ""
  let activeValue = ""
  let setActiveValue: (v: string) => void = () => {}
  
  if (queryViewBy === "application") {
    trackData = applicationImages.map(a => ({ name: a.name, image: a.image, filterVal: a.name }))
    activeValue = activeApp
    setActiveValue = handleAppChange
    trackTitle = "Explore By Application"
    trackDescription = "Select a space to filter matching materials."
  } else if (queryViewBy === "space") {
    trackData = spaceImages.map(a => ({ name: a.name, image: a.image, filterVal: a.application }))
    activeValue = activeApp
    setActiveValue = handleAppChange
    trackTitle = "Explore By Space"
    trackDescription = "Find the perfect tile or bathware piece for specific architectural spaces."
  } else if (queryViewBy === "size") {
    trackData = sizeImages.map(a => ({ name: a.name, image: a.image, filterVal: a.size }))
    activeValue = selectedSize
    setActiveValue = handleSizeChange
    trackTitle = "Explore By Size"
    trackDescription = "Filter by specific dimensions for large formats to standard modules."
  } else if (queryViewBy === "look") {
    trackData = finishImages.map(a => ({ name: a.name, image: a.image, filterVal: a.finish }))
    activeValue = selectedFinish
    setActiveValue = handleFinishChange
    trackTitle = "Explore By Look"
    trackDescription = "Discover our premium selection tailored to specific finishes and textures."
  }

  const currentTrackItem = trackData.find(a => a.filterVal === activeValue && activeValue !== "All")
  const heroImage = currentTrackItem ? currentTrackItem.image : (trackData[0]?.image || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2000&q=80")
  const heroTitle = currentTrackItem ? `${currentTrackItem.name} Products` : trackTitle
  const heroDescription = currentTrackItem 
    ? `Discover our premium selection tailored specifically for ${currentTrackItem.name.toLowerCase()}.` 
    : trackDescription

  return (
    <div className="bg-[#F9F9FB] min-h-screen pt-20">
      {/* ── Section 1: Hero Banner ───────────────────────────────────────── */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt={heroTitle}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
          <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12 max-w-lg shadow-2xl">
            <h1 className="font-heading text-3xl md:text-4xl text-primary font-bold tracking-wide">
              {heroTitle}
            </h1>
            <p className="font-body text-primary/60 text-sm mt-4 leading-relaxed">
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Dynamic Filter Slider ──────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-heading text-2xl text-primary font-bold">{trackTitle}</h2>
              <p className="font-body text-[13px] text-primary/60 mt-1">{trackDescription}</p>
            </div>
            {activeValue !== "All" && (
              <button 
                onClick={() => setActiveValue("All")}
                className="text-xs font-body font-bold text-accent uppercase tracking-widest hover:text-primary transition-colors"
              >
                Clear Selection
              </button>
            )}
          </div>

          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 hide-scrollbar scroll-smooth">
            {trackData.map((item) => (
              <div 
                key={item.name}
                onClick={() => setActiveValue(activeValue === item.filterVal ? "All" : item.filterVal)}
                className={`group relative shrink-0 w-[260px] md:w-[320px] aspect-[16/9] cursor-pointer overflow-hidden ${
                  activeValue === item.filterVal ? "ring-2 ring-accent ring-offset-2" : ""
                }`}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <span className="text-white font-body text-sm uppercase tracking-widest font-bold">
                    {item.name}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    activeValue === item.filterVal ? "bg-accent text-white" : "bg-white text-primary group-hover:bg-accent group-hover:text-white"
                  }`}>
                    <Icon icon="ph:arrow-right-thin" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Filter + Grid Layout ──────────────────────────────── */}
      <section className="py-12 container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 bg-white border border-gray-100 p-6 flex flex-col gap-8 shrink-0">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="text-[10px] font-body font-bold uppercase tracking-[0.2em] text-primary">
                Filters
              </span>
              <button
                onClick={clearAllFilters}
                className="text-[10px] font-body font-bold uppercase tracking-[0.1em] text-accent hover:text-primary transition-colors focus:outline-none"
              >
                Clear All
              </button>
            </div>

            {/* Category Selector */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-body font-bold uppercase tracking-[0.15em] text-primary/40">
                Category
              </label>
              <div className="flex flex-col gap-2">
                {(["All", "Tiles", "Bathware", "Building Solutions"] as const).map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group" onClick={() => handleCategoryChange(cat)}>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      selectedCategory === cat ? "border-accent" : "border-gray-300 group-hover:border-accent"
                    }`}>
                      {selectedCategory === cat && <div className="w-2 h-2 rounded-full bg-accent" />}
                    </div>
                    <span className={`text-xs font-body ${selectedCategory === cat ? "font-bold text-primary" : "text-primary/70 group-hover:text-primary"}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sub-Category Selector */}
            {selectedCategory !== "All" && (
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-body font-bold uppercase tracking-[0.15em] text-primary/40">
                  Sub-Category
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer group" onClick={() => handleSubCategoryChange("All")}>
                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                      selectedSubCategory === "All" ? "border-accent bg-accent" : "border-gray-300 group-hover:border-accent"
                    }`}>
                      {selectedSubCategory === "All" && <Icon icon="ph:check-bold" className="text-white w-3 h-3" />}
                    </div>
                    <span className={`text-xs font-body ${selectedSubCategory === "All" ? "font-bold text-primary" : "text-primary/70 group-hover:text-primary"}`}>
                      All {selectedCategory}
                    </span>
                  </label>
                  {categoryMap[selectedCategory as TopLevelCategory]?.map((sub) => (
                    <label key={sub} className="flex items-center gap-3 cursor-pointer group" onClick={() => handleSubCategoryChange(sub)}>
                      <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                        selectedSubCategory === sub ? "border-accent bg-accent" : "border-gray-300 group-hover:border-accent"
                      }`}>
                        {selectedSubCategory === sub && <Icon icon="ph:check-bold" className="text-white w-3 h-3" />}
                      </div>
                      <span className={`text-xs font-body ${selectedSubCategory === sub ? "font-bold text-primary" : "text-primary/70 group-hover:text-primary"}`}>
                        {sub}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Finish Selector */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-body font-bold uppercase tracking-[0.15em] text-primary/40">
                Finish
              </label>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                <label className="flex items-center gap-3 cursor-pointer group" onClick={() => handleFinishChange("All")}>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    selectedFinish === "All" ? "border-accent" : "border-gray-300 group-hover:border-accent"
                  }`}>
                    {selectedFinish === "All" && <div className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                  <span className={`text-xs font-body ${selectedFinish === "All" ? "font-bold text-primary" : "text-primary/70 group-hover:text-primary"}`}>
                    All Finishes
                  </span>
                </label>
                {allFinishes.map((f) => (
                  <label key={f} className="flex items-center gap-3 cursor-pointer group" onClick={() => handleFinishChange(f)}>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      selectedFinish === f ? "border-accent" : "border-gray-300 group-hover:border-accent"
                    }`}>
                      {selectedFinish === f && <div className="w-2 h-2 rounded-full bg-accent" />}
                    </div>
                    <span className={`text-xs font-body ${selectedFinish === f ? "font-bold text-primary" : "text-primary/70 group-hover:text-primary"}`}>
                      {f}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-body font-bold uppercase tracking-[0.15em] text-primary/40">
                Size
              </label>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                <label className="flex items-center gap-3 cursor-pointer group" onClick={() => handleSizeChange("All")}>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    selectedSize === "All" ? "border-accent" : "border-gray-300 group-hover:border-accent"
                  }`}>
                    {selectedSize === "All" && <div className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                  <span className={`text-xs font-body ${selectedSize === "All" ? "font-bold text-primary" : "text-primary/70 group-hover:text-primary"}`}>
                    All Sizes
                  </span>
                </label>
                {allSizes.map((s) => (
                  <label key={s} className="flex items-center gap-3 cursor-pointer group" onClick={() => handleSizeChange(s)}>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      selectedSize === s ? "border-accent" : "border-gray-300 group-hover:border-accent"
                    }`}>
                      {selectedSize === s && <div className="w-2 h-2 rounded-full bg-accent" />}
                    </div>
                    <span className={`text-xs font-body ${selectedSize === s ? "font-bold text-primary" : "text-primary/70 group-hover:text-primary"}`}>
                      {s}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1 w-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <p className="text-xs font-body text-primary/60 font-bold uppercase tracking-wider">
                Showing {filteredProducts.length} Results
              </p>

              <div className="relative w-full md:max-w-[240px]">
                <Icon icon="solar:magnifer-linear" className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-200 text-xs font-body pl-6 pr-6 py-2 focus:outline-none focus:border-accent text-primary placeholder:text-primary/30 transition-colors"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-0 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary">
                    <Icon icon="ph:x" className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="group relative cursor-pointer flex flex-col overflow-hidden bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
                  >
                    {/* Visual Area */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                      <img
                        src={product.textureUrl}
                        alt={`${product.name} texture`}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out group-hover:opacity-0"
                      />
                      <img
                        src={product.mockupUrl}
                        alt={`${product.name} installed`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100 group-hover:opacity-100"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex gap-2 z-10">
                        {product.isNewArrival && (
                          <span className="bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
                            New
                          </span>
                        )}
                        {product.isBestseller && (
                          <span className="bg-primary text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer Bar (Light theme) */}
                    <div className="p-5 flex flex-col justify-between flex-1">
                      {/* Upper Row: SubCategory + Dimensions */}
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-body uppercase tracking-[0.2em] text-primary/40 font-bold">{product.subCategory}</span>
                        <span className="text-[9px] font-body uppercase tracking-[0.2em] text-primary/60">{product.dimensions}</span>
                      </div>
                      
                      {/* Middle Row: Name */}
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="font-heading font-bold text-lg leading-tight text-primary group-hover:text-accent transition-colors duration-300">
                          {product.name}
                        </h3>
                        <div className="w-8 h-8 rounded-full border border-primary/20 flex flex-shrink-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                          <Icon icon="solar:arrow-right-linear" className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                      
                      {/* Lower Row: Code */}
                      <div className="text-[10px] font-body uppercase tracking-widest text-primary/60">
                        <span>{product.code}</span>
                      </div>
                      
                      {/* Feature Icons Row */}
                      {product.features && product.features.length > 0 && (
                        <div className="flex gap-4 mt-4 pt-3 border-t border-gray-100">
                          {product.features.slice(0, 3).map((feat, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-primary/60" title={feat.label}>
                              <Icon icon={feat.icon} className="w-4 h-4" style={{ strokeWidth: "1px", stroke: "currentColor", fill: "none" }} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 flex flex-col items-center justify-center text-center bg-white border border-gray-100">
                <Icon icon="solar:box-broken" className="w-16 h-16 text-primary/10 mb-4" />
                <h3 className="font-heading text-xl text-primary font-bold">No Products Found</h3>
                <p className="text-sm font-body text-primary/50 mt-2 mb-6">
                  Try adjusting your filters or search query to find what you're looking for.
                </p>
                <Button variant="outline" onClick={clearAllFilters} className="rounded-none border-accent text-accent hover:bg-accent hover:text-white uppercase tracking-widest text-[10px] font-bold px-8">
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  )
}
