import { useParams, useNavigate, Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { mockProducts } from "@/data/mockData"

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const product = mockProducts.find((p) => p.id === id)
  
  if (!product) {
    return (
      <div className="min-h-screen bg-[#F9F9FB] pt-32 pb-20 flex flex-col items-center justify-center">
        <Icon icon="solar:sad-circle-bold" className="w-16 h-16 text-primary/20 mb-4" />
        <h2 className="font-heading text-2xl text-primary font-bold">Product Not Found</h2>
        <Button onClick={() => navigate("/products")} className="mt-6 rounded-none">
          Back to Products
        </Button>
      </div>
    )
  }

  const triggerWhatsAppInquiry = () => {
    const text = `Hello Blueprint, I am interested in inquiring about the following product:\n\n*Product Name:* ${product.name}\n*Product Code:* ${product.code}\n*Category:* ${product.topCategory} - ${product.subCategory}\n*Dimensions:* ${product.dimensions}\n*Finish:* ${product.finish}\n\nPlease share the technical specifications, stock availability, and pricing. Thank you!`
    const encoded = encodeURIComponent(text)
    window.open(`https://wa.me/message/W74G75DZ5NWNF1?text=${encoded}`, "_blank")
  }

  const relatedProducts = mockProducts
    .filter((p) => p.topCategory === product.topCategory && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="bg-[#F9F9FB] min-h-screen pt-24 pb-20 selection:bg-accent/30 selection:text-primary">
      
      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 md:px-12 py-4 border-b border-gray-200/60 mb-8">
        <nav className="flex text-[10px] font-body uppercase tracking-widest text-primary/40 font-bold whitespace-nowrap overflow-x-auto hide-scrollbar">
          <Link to="/" className="hover:text-primary transition-colors flex items-center shrink-0">Home</Link>
          <Icon icon="ph:caret-right" className="mx-2 w-3 h-3 shrink-0" />
          <Link to={`/products?category=${product.topCategory}`} className="hover:text-primary transition-colors flex items-center shrink-0">{product.topCategory}</Link>
          <Icon icon="ph:caret-right" className="mx-2 w-3 h-3 shrink-0" />
          <Link to={`/products?category=${product.topCategory}&subCategory=${product.subCategory}`} className="hover:text-primary transition-colors flex items-center shrink-0">{product.subCategory}</Link>
          <Icon icon="ph:caret-right" className="mx-2 w-3 h-3 shrink-0" />
          <span className="text-primary truncate">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        {/* ── Section 1: Hero Product Display ─────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20">
          
          {/* Left: Product Image */}
          <div className="w-full lg:w-3/5 bg-white shadow-xl shadow-black/5 relative group overflow-hidden">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              {product.isNewArrival && (
                <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">New</span>
              )}
              {product.isBestseller && (
                <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">Bestseller</span>
              )}
            </div>
            <img 
              src={product.textureUrl} 
              alt={product.name}
              className="w-full aspect-square md:aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Magnifier overlay hint */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Icon icon="ph:magnifying-glass-plus" className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center">
            <span className="text-[11px] font-body font-bold text-accent uppercase tracking-[0.2em] mb-2">
              {product.subCategory}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary font-bold leading-[1.1] mb-2">
              {product.name}
            </h1>
            <p className="text-sm font-body text-primary/40 uppercase tracking-widest font-bold mb-6">
              Code: {product.code}
            </p>

            <p className="font-body text-primary/70 text-sm md:text-base leading-relaxed font-light mb-8 max-w-lg">
              {product.description}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-primary/40 mb-1">Dimensions</p>
                <p className="font-heading text-xl text-primary font-bold">{product.dimensions}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-primary/40 mb-1">Finish</p>
                <p className="font-heading text-xl text-primary font-bold">{product.finish}</p>
              </div>
              {product.tileType && (
                <div className="col-span-2">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-primary/40 mb-1">Material Type</p>
                  <p className="font-heading text-xl text-primary font-bold">{product.tileType}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button 
                onClick={triggerWhatsAppInquiry}
                className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-none py-6 text-xs uppercase tracking-widest font-bold transition-colors"
              >
                <Icon icon="mdi:whatsapp" className="w-5 h-5 mr-2" />
                Inquire Now
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.print()}
                className="flex-1 border-primary text-primary hover:bg-primary hover:text-white rounded-none py-6 text-xs uppercase tracking-widest font-bold transition-colors"
              >
                <Icon icon="solar:document-download-linear" className="w-5 h-5 mr-2" />
                Spec Sheet
              </Button>
            </div>
          </div>
        </div>

        {/* ── Section 2: Feature Icons ────────────────────────────────────── */}
        {product.features && product.features.length > 0 && (
          <div className="border-y border-gray-200/60 py-12 mb-20 bg-white shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Icon icon={feature.icon} className="w-6 h-6" />
                  </div>
                  <span className="font-body text-xs font-bold uppercase tracking-widest text-primary">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Section 3: Detailed Specifications Table ────────────────────── */}
        <div className="mb-24 max-w-4xl">
          <h3 className="font-heading text-2xl md:text-3xl text-primary font-bold mb-8">Technical Specifications</h3>
          <div className="bg-white border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-b border-gray-100">
              <div className="p-5 flex justify-between items-center group hover:bg-gray-50 transition-colors">
                <span className="text-xs font-body font-bold text-primary/50 uppercase tracking-widest">Model Name</span>
                <span className="font-heading font-bold text-primary text-right">{product.name}</span>
              </div>
              <div className="p-5 flex justify-between items-center group hover:bg-gray-50 transition-colors">
                <span className="text-xs font-body font-bold text-primary/50 uppercase tracking-widest">Model Code</span>
                <span className="font-body font-bold text-primary text-right tracking-wide">{product.code}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-b border-gray-100 bg-gray-50/50">
              <div className="p-5 flex justify-between items-center group hover:bg-white transition-colors">
                <span className="text-xs font-body font-bold text-primary/50 uppercase tracking-widest">Category</span>
                <span className="font-body text-sm font-medium text-primary text-right">{product.topCategory}</span>
              </div>
              <div className="p-5 flex justify-between items-center group hover:bg-white transition-colors">
                <span className="text-xs font-body font-bold text-primary/50 uppercase tracking-widest">Sub Category</span>
                <span className="font-body text-sm font-medium text-primary text-right">{product.subCategory}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-b border-gray-100">
              <div className="p-5 flex justify-between items-center group hover:bg-gray-50 transition-colors">
                <span className="text-xs font-body font-bold text-primary/50 uppercase tracking-widest">Dimensions</span>
                <span className="font-body text-sm font-medium text-primary text-right">{product.dimensions}</span>
              </div>
              <div className="p-5 flex justify-between items-center group hover:bg-gray-50 transition-colors">
                <span className="text-xs font-body font-bold text-primary/50 uppercase tracking-widest">Finish</span>
                <span className="font-body text-sm font-medium text-primary text-right">{product.finish}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 bg-gray-50/50">
              <div className="p-5 flex justify-between items-center group hover:bg-white transition-colors">
                <span className="text-xs font-body font-bold text-primary/50 uppercase tracking-widest">Ideal Application</span>
                <span className="font-body text-sm font-medium text-primary text-right">{product.applicationArea || "Interior & Exterior"}</span>
              </div>
              <div className="p-5 flex justify-between items-center group hover:bg-white transition-colors">
                <span className="text-xs font-body font-bold text-primary/50 uppercase tracking-widest">Eco Grading</span>
                <span className="font-body text-sm font-medium text-green-600 text-right flex items-center gap-1"><Icon icon="solar:leaf-bold" /> ISO Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 4: Explore Our Lookbook ─────────────────────────────── */}
        {product.lookbookImages && product.lookbookImages.length > 0 && (
          <div className="mb-24">
            <h3 className="font-heading text-2xl md:text-3xl text-primary font-bold mb-8 text-center md:text-left">
              Explore Our Lookbook
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.lookbookImages.map((imgUrl, idx) => (
                <div key={idx} className="relative aspect-square md:aspect-[4/5] bg-gray-100 overflow-hidden group cursor-pointer shadow-lg">
                  <img 
                    src={imgUrl} 
                    alt={`Lookbook inspiration ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 shadow-xl">
                      <Icon icon="solar:eye-linear" className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Section 5: Recommended For You ────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200/60 pt-20">
            <h3 className="font-heading text-2xl md:text-3xl text-primary font-bold mb-8">
              Recommended For You
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <div
                  key={related.id}
                  onClick={() => navigate(`/products/${related.id}`)}
                  className="group relative cursor-pointer flex flex-col overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500"
                >
                  {/* Visual Area */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={related.textureUrl}
                      alt={related.name}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out group-hover:opacity-0"
                    />
                    <img
                      src={related.mockupUrl}
                      alt={`${related.name} installed`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100 group-hover:opacity-100"
                    />
                  </div>

                  {/* Footer Bar (Light theme) */}
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <div>
                        <p className="text-[8px] font-body uppercase tracking-[0.2em] text-primary/40 mb-1 font-bold">
                          {related.subCategory}
                        </p>
                        <h4 className="font-heading font-bold text-sm leading-tight text-primary group-hover:text-accent transition-colors duration-300 line-clamp-1">
                          {related.name}
                        </h4>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-[9px] font-body uppercase tracking-widest text-primary/60">
                      <span className="truncate max-w-[60%]">{related.code}</span>
                      <span>{related.dimensions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
