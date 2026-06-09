import * as React from "react"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"

interface Catalog {
  id: string
  title: string
  category: "tiles" | "bathware" | "technical"
  description: string
  pages: number
  size: string
  coverUrl: string
  pagesImages: string[]
}

const mockCatalogs: Catalog[] = [
  {
    id: "cat1",
    title: "Vitrified & Porcelain Tiles 2026",
    category: "tiles",
    description: "Our core collection of glazed vitrified, double charge, and polished ceramic tiles for premium floors and walls.",
    pages: 48,
    size: "12.4 MB",
    coverUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    pagesImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1000&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=80",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1000&q=80",
    ],
  },
  {
    id: "cat2",
    title: "Sanitaryware & Bath Suites",
    category: "bathware",
    description: "Premium sanitaryware including wall-hung basins, rimless WCs, showers, and accessories in high-grade finishes.",
    pages: 32,
    size: "8.1 MB",
    coverUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&q=80",
    pagesImages: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1000&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1000&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&q=80",
    ],
  },
  {
    id: "cat3",
    title: "Tile Adhesives & Grouts Tech Spec",
    category: "technical",
    description: "Detailed parameters, application workflows, and certifications for high-strength adhesives and waterproof sealants.",
    pages: 16,
    size: "4.5 MB",
    coverUrl: "https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?w=600&q=80",
    pagesImages: [
      "https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?w=1000&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=80",
    ],
  },
  {
    id: "cat4",
    title: "Outdoor & Landscaping Surfaces",
    category: "tiles",
    description: "Heavy-duty anti-skid floor tiles, parking slabs, and cladding designs engineered for Omani environmental conditions.",
    pages: 24,
    size: "6.9 MB",
    coverUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80",
    pagesImages: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1000&q=80",
      "https://images.unsplash.com/photo-1588628566587-bf5ec47eebe6?w=1000&q=80",
    ],
  },
]

export default function Catalogues() {
  const [filter, setFilter] = React.useState<"all" | "tiles" | "bathware" | "technical">("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activePreview, setActivePreview] = React.useState<Catalog | null>(null)
  const [previewPageIndex, setPreviewPageIndex] = React.useState(0)
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null)

  const filteredCatalogs = mockCatalogs.filter((cat) => {
    const matchesFilter = filter === "all" || cat.category === filter
    const matchesSearch = cat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cat.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleDownload = (catalog: Catalog) => {
    setDownloadingId(catalog.id)
    setTimeout(() => {
      setDownloadingId(null)
      // Create a temporary anchor element to trigger download action (mocked)
      alert(`Successfully downloaded: ${catalog.title} (PDF)`)
    }, 1500)
  }

  return (
    <div className="bg-[#F9F9FB] min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        {/* Editorial Title */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-body font-bold uppercase tracking-[0.25em] text-accent">
            Design Assets
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary tracking-wide mt-2">
            Product Catalogues
          </h1>
          <p className="text-sm font-body text-primary/60 leading-relaxed mt-4">
            Download our comprehensive collection brochures containing sizes, layout configurations, packing specifications, and high-resolution visuals.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200/60 pb-6 mb-10">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {(["all", "tiles", "bathware", "technical"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2.5 text-xs font-body font-bold uppercase tracking-wider transition-all duration-300 rounded-none border ${
                  filter === t
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-primary/60 border-gray-200 hover:text-primary hover:border-primary/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <Icon
              icon="solar:magnifer-linear"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 text-xs font-body px-10 py-3 rounded-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary placeholder:text-primary/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary"
              >
                <Icon icon="ph:x" className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Grid Catalogues */}
        {filteredCatalogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCatalogs.map((catalog) => (
              <div
                key={catalog.id}
                className="group bg-white border border-gray-100 hover:border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 flex flex-col h-full"
              >
                {/* Cover Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                  <img
                    src={catalog.coverUrl}
                    alt={catalog.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-primary/95 text-white text-[9px] font-body font-bold uppercase tracking-widest px-2.5 py-1 backdrop-blur-md">
                    {catalog.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-heading font-bold text-primary group-hover:text-accent transition-colors duration-300">
                      {catalog.title}
                    </h3>
                    <p className="text-xs font-body text-primary/50 leading-relaxed mt-2.5">
                      {catalog.description}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] font-body font-bold uppercase tracking-wider text-primary/40 mt-4">
                      <span className="flex items-center gap-1">
                        <Icon icon="solar:document-linear" className="w-3.5 h-3.5" />
                        {catalog.pages} Pages
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon icon="solar:disk-linear" className="w-3.5 h-3.5" />
                        {catalog.size}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-100/70">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActivePreview(catalog)
                        setPreviewPageIndex(0)
                      }}
                      className="rounded-none border-primary/20 text-primary text-[10px] uppercase font-bold tracking-widest py-4.5 hover:bg-primary/5 hover:border-primary"
                    >
                      <Icon icon="solar:eye-linear" className="w-3.5 h-3.5 mr-1.5" />
                      View Online
                    </Button>
                    <Button
                      onClick={() => handleDownload(catalog)}
                      disabled={downloadingId === catalog.id}
                      className="rounded-none bg-primary text-white text-[10px] uppercase font-bold tracking-widest py-4.5 flex items-center justify-center gap-1.5"
                    >
                      {downloadingId === catalog.id ? (
                        <Icon icon="ph:spinner-gap" className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Icon icon="solar:download-linear" className="w-3.5 h-3.5" />
                      )}
                      {downloadingId === catalog.id ? "Saving..." : "Download"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-gray-200">
            <Icon icon="solar:document-text-broken" className="w-12 h-12 mx-auto text-primary/20" />
            <p className="text-sm font-body text-primary/50 mt-4 uppercase tracking-widest">
              No catalogues found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Online Flipbook Viewer Modal */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in-0 duration-300">
          <button
            onClick={() => setActivePreview(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors focus:outline-none z-10 p-1"
          >
            <Icon icon="ph:x" className="w-6 h-6" />
          </button>

          <div className="w-full max-w-4xl flex flex-col gap-4">
            {/* Header details */}
            <div className="text-white text-center">
              <span className="text-[10px] font-body font-bold uppercase tracking-widest text-accent">
                Online Catalog Reader
              </span>
              <h2 className="text-xl font-heading font-bold mt-1 tracking-wide">
                {activePreview.title}
              </h2>
              <p className="text-xs font-body opacity-60 mt-0.5">
                Page {previewPageIndex + 1} of {activePreview.pagesImages.length}
              </p>
            </div>

            {/* Slider page viewer */}
            <div className="relative aspect-[4/3] bg-neutral-900 border border-neutral-800 overflow-hidden flex items-center justify-center">
              <img
                src={activePreview.pagesImages[previewPageIndex]}
                alt={`Page ${previewPageIndex + 1}`}
                className="max-w-full max-h-full object-contain animate-in fade-in-30 zoom-in-95 duration-300"
              />

              {/* Prev Page Button */}
              {previewPageIndex > 0 && (
                <button
                  onClick={() => setPreviewPageIndex((p) => p - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/95 text-white p-3 rounded-full hover:scale-105 transition-all focus:outline-none"
                >
                  <Icon icon="solar:alt-arrow-left-linear" className="w-6 h-6" />
                </button>
              )}

              {/* Next Page Button */}
              {previewPageIndex < activePreview.pagesImages.length - 1 && (
                <button
                  onClick={() => setPreviewPageIndex((p) => p + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/95 text-white p-3 rounded-full hover:scale-105 transition-all focus:outline-none"
                >
                  <Icon icon="solar:alt-arrow-right-linear" className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Dot Navigator */}
            <div className="flex justify-center gap-2">
              {activePreview.pagesImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPreviewPageIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none ${
                    idx === previewPageIndex ? "bg-accent w-6" : "bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
