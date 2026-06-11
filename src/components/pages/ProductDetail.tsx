import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { fetchAPI, getStrapiMedia } from "@/lib/api"

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
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

        const foundProduct = mappedProducts.find((p: any) => p.id === id)
        setProduct(foundProduct || null)

        if (foundProduct) {
          const related = mappedProducts
            .filter((p: any) => p.topCategory === foundProduct.topCategory && p.id !== foundProduct.id)
            .slice(0, 4)
          setRelatedProducts(related)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchData()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9FB] pt-32 pb-20 flex justify-center items-center">
        <Icon icon="line-md:loading-twotone-loop" className="w-12 h-12 text-primary/40" />
      </div>
    )
  }

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

  const mockReviews = [
    { name: "Sarah L.", rating: 5, text: "Absolutely stunning tiles! They transformed my living room completely. The quality is exceptional." },
    { name: "Michael T.", rating: 5, text: "Great finish and very durable. The delivery was prompt and the packaging was very secure." },
    { name: "Emma W.", rating: 4, text: "Beautiful texture, looks exactly like the pictures. Very happy with the purchase." }
  ];

  const mockGuides = [
    { title: "How to choose the perfect tile for your living room", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80" },
    { title: "Top 5 bathroom design trends of 2024", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&q=80" },
    { title: "The ultimate guide to maintaining your tiles", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" }
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-20 selection:bg-accent/30 selection:text-primary font-body text-primary">
      {/* ── Top Header / Breadcrumb ─────────────────────────────────────── */}
      <div className="container mx-auto px-6 md:px-12 py-4 mb-4 flex justify-between items-center">
        <nav className="flex text-xs font-body tracking-wide text-primary/60 whitespace-nowrap overflow-x-auto hide-scrollbar items-center">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Icon icon="ph:caret-right" className="mx-2 w-3 h-3" />
          <Link to={`/products?category=${product.topCategory}`} className="hover:text-primary transition-colors">{product.topCategory}</Link>
          <Icon icon="ph:caret-right" className="mx-2 w-3 h-3" />
          <span className="text-primary truncate font-medium">{product.name}</span>
        </nav>
        <div className="flex gap-4">
          <button className="text-primary hover:text-accent transition-colors"><Icon icon="ph:share-network" className="w-5 h-5" /></button>
          <button className="text-primary hover:text-accent transition-colors"><Icon icon="ph:heart" className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        {/* ── Section 1: Hero Split ─────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-24">
          
          {/* Left Column: Media */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6">
            {/* Main Texture with 3D button */}
            <div className="relative aspect-[4/3] md:aspect-[16/10] bg-gray-100 overflow-hidden rounded-md group shadow-sm border border-gray-100">
              <img 
                src={product.textureUrl} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-black/80 hover:bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 backdrop-blur-md transition-colors text-xs font-bold tracking-widest uppercase shadow-xl hover:scale-105 transform duration-300">
                  <Icon icon="ph:cube" className="w-5 h-5" />
                  View in 3D
                </button>
              </div>
            </div>

            {/* Premium Guarantee */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] bg-[#F8F8F8] rounded-md overflow-hidden text-primary flex items-center justify-center p-8 group shadow-sm border border-gray-100">
               <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full justify-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                  <Icon icon="ph:medal-light" className="w-10 h-10 text-accent" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-heading text-lg md:text-xl font-bold mb-2 tracking-wide text-primary uppercase">Premium Quality Guarantee</h3>
                  <p className="text-sm text-primary/70 max-w-xs leading-relaxed font-body">Crafted with precision to ensure unmatched durability, pristine finish, and timeless elegance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="w-full lg:w-[45%] flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              {product.isNewArrival && (
                <span className="bg-red-50 text-red-600 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm">New</span>
              )}
              {product.isBestseller && (
                <span className="bg-primary/5 text-primary text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm">Bestseller</span>
              )}
            </div>
            
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary font-bold leading-tight mb-6">
              {product.name}
            </h1>

            {/* View in your space Card */}
            <div className="flex items-center gap-4 bg-[#F8F8F8] p-3 rounded-xl mb-8 cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200/60 shadow-sm">
              <img src={product.mockupUrl} alt="Room" className="w-16 h-16 rounded-lg object-cover shadow-sm" />
              <div className="flex-1">
                <p className="font-heading text-sm font-bold text-primary mb-0.5">See this in your space</p>
                <p className="text-[11px] text-primary/60">Upload a photo to visualize it instantly.</p>
              </div>
              <button className="bg-black hover:bg-black/80 text-white px-4 py-2.5 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-2 transition-colors">
                <Icon icon="ph:camera-plus" className="w-4 h-4" /> Try It
              </button>
            </div>

            {/* Spacer */}
            <div className="mb-6"></div>

            {/* Works well for */}
            {product.applicationArea && (
              <div className="mb-8">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-3">Works Well For</h4>
                <div className="flex flex-wrap gap-2">
                  {product.applicationArea.split(',').map((area: string, i: number) => (
                    <span key={i} className="bg-gray-100 text-primary text-xs px-3 py-1.5 rounded-full font-medium border border-gray-200/50">
                      {area.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Spec Grid */}
            <div className="grid grid-cols-2 gap-y-5 gap-x-6 mb-10 text-sm">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-primary/40 mb-1">Code</p>
                <p className="font-medium text-primary">{product.code}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-primary/40 mb-1">Finish</p>
                <p className="font-medium text-primary">{product.finish}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-primary/40 mb-1">Dimensions</p>
                <p className="font-medium text-primary">{product.dimensions}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-primary/40 mb-1">Category</p>
                <p className="font-medium text-primary">{product.subCategory}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-auto">
              <Button className="w-full bg-[#1a1a1a] hover:bg-black text-white rounded-full py-6 text-xs uppercase tracking-widest font-bold shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5">
                Add to Cart
              </Button>
              <Button variant="outline" onClick={triggerWhatsAppInquiry} className="w-full rounded-full py-6 text-xs uppercase tracking-widest font-bold border-gray-200 hover:bg-gray-50 transition-colors">
                <Icon icon="mdi:whatsapp" className="w-5 h-5 mr-2 text-green-600" />
                Inquire via WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* ── Section 2: Features Grid ────────────────────────────────────── */}
        {product.features && product.features.length > 0 && (
          <div className="border-t border-gray-200 py-12 mb-12">
            <div className="flex flex-wrap justify-center gap-8 md:gap-20">
              {product.features.map((feature: any, idx: number) => (
                <div key={idx} className="flex flex-col items-center text-center gap-3 w-24 group">
                  <Icon icon={feature.icon || "ph:star"} className="w-8 h-8 text-primary/70 stroke-[1] group-hover:text-accent transition-colors duration-300" />
                  <span className="font-body text-[11px] font-bold tracking-wider uppercase text-primary/80 leading-tight">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Section 3: Advice Banner ────────────────────────────────────── */}
      <div className="w-full relative py-20 mb-24 overflow-hidden shadow-sm">
        <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80" alt="Consultation" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 backdrop-blur-[2px]"></div>
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <h2 className="font-heading text-3xl md:text-5xl text-white font-bold mb-12 max-w-xl leading-tight">
            Advice is always on the house.
            <span className="text-lg md:text-xl font-normal opacity-80 mt-4 block leading-relaxed">Let our design experts help you build your dream space with confidence.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 flex flex-col justify-between shadow-xl transform transition-transform hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                  <Icon icon="ph:truck-light" className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading font-bold text-xl mb-2 text-primary">Delivery To</h4>
                <p className="text-sm text-primary/60 mb-6 leading-relaxed">Check shipping times and product availability in your specific region.</p>
              </div>
              <button className="w-full bg-[#1a1a1a] hover:bg-black transition-colors text-white rounded-full py-3 text-xs font-bold uppercase tracking-widest">Check Pincode</button>
            </div>
            
            <div className="bg-white rounded-2xl p-8 flex flex-col justify-between shadow-xl transform transition-transform hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <Icon icon="ph:chat-circle-text-light" className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-heading font-bold text-xl mb-2 text-primary">Message Us</h4>
                <p className="text-sm text-primary/60 mb-6 leading-relaxed">Get quick answers from our tile experts via WhatsApp within minutes.</p>
              </div>
              <button className="w-full border border-gray-200 hover:border-accent hover:text-accent transition-colors text-primary rounded-full py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Icon icon="mdi:whatsapp" className="w-4 h-4 text-green-500" /> Start Chat
              </button>
            </div>
            
            <div className="bg-[#1a1a1a] text-white rounded-2xl p-8 flex flex-col justify-between shadow-xl transform transition-transform hover:-translate-y-1 border border-white/10">
              <div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <Icon icon="ph:calendar-check-light" className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-heading font-bold text-xl mb-2 text-white">Speak to Us</h4>
                <p className="text-sm text-white/60 mb-6 leading-relaxed">Schedule a free 1-on-1 virtual or in-store design consultation today.</p>
              </div>
              <button className="w-full bg-white hover:bg-gray-100 transition-colors text-black rounded-full py-3 text-xs font-bold uppercase tracking-widest">Book Appointment</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        {/* ── Section 4: Explore Our Lookbook ─────────────────────────────── */}
        {product.lookbookImages && product.lookbookImages.length > 0 && (
          <div className="mb-24">
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-3"><span className="text-accent text-lg align-top mr-1">✦</span> Explore Our Lookbook</h2>
            <p className="text-sm md:text-base text-primary/60 mb-10 max-w-2xl leading-relaxed">See how {product.name} elevates real spaces. Discover styling ideas from our community and top interior designers.</p>
            
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {product.lookbookImages.map((imgUrl: string, idx: number) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden group cursor-pointer break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <img 
                    src={imgUrl} 
                    alt={`Lookbook inspiration ${idx + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <button className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-primary whitespace-nowrap hover:bg-black hover:text-white">
                    Shop This Look
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Section 5: What Makes It Special ────────────────────────────── */}
        <div className="flex flex-col lg:flex-row items-stretch mb-24 rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 bg-white">
          <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-gray-50/50">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary leading-tight">
              What makes<br/><span className="text-accent">{product.name}</span> special
            </h2>
            <div className="w-12 h-1 bg-accent mb-6 rounded-full"></div>
            <p className="text-base md:text-lg text-primary/70 leading-relaxed mb-10">
              {product.description}
            </p>
            <div className="mt-auto">
              <Button className="bg-black hover:bg-black/80 text-white rounded-full px-8 py-6 text-xs uppercase tracking-widest font-bold shadow-lg">
                View Technical Specs
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 min-h-[400px]">
            <img src={product.mockupUrl} alt="Feature highlight" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* ── Section 6: FAQs (Sticky Notes) ──────────────────────────────── */}
        {product.faqs && product.faqs.length > 0 && (
          <div className="mb-24 pt-16 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
               <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold">
                 Frequently Asked Questions
               </h2>
               <button className="text-sm font-bold text-accent hover:text-primary transition-colors flex items-center gap-2 border-b border-accent/30 pb-1">
                 See all FAQs <Icon icon="ph:arrow-right" />
               </button>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              {product.faqs.map((faq: any, idx: number) => {
                const colors = ['bg-[#FEF6E5]', 'bg-[#EAF6E3]', 'bg-[#EBF1FE]', 'bg-[#FEF1F1]'];
                const rotations = ['-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1'];
                const color = colors[idx % colors.length];
                const rotation = rotations[idx % rotations.length];
                
                return (
                  <div key={idx} className={`${color} ${rotation} w-full sm:w-[320px] p-8 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:rotate-0 transition-all duration-500 cursor-pointer border border-black/5`}>
                    <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center mb-6 text-primary/40">
                      <Icon icon="ph:question" className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-lg mb-4 text-primary leading-snug">{faq.question}</h4>
                    <p className="text-sm text-primary/70 leading-relaxed font-body">{faq.answer}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Section 7: Recommended For You ────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div className="mb-24 pt-16 border-t border-gray-200 bg-[#F9F9FB]">
            <div className="flex justify-between items-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold">Recommended For You</h2>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"><Icon icon="ph:caret-left" /></button>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"><Icon icon="ph:caret-right" /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <div key={related.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col">
                  <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md cursor-pointer hover:bg-black hover:text-white text-primary transition-colors">
                    <Icon icon="ph:shopping-bag-open" className="w-4 h-4" />
                  </div>
                  <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => navigate(`/products/${related.id}`)}>
                    <img src={related.textureUrl} alt={related.name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out group-hover:opacity-0" />
                    <img src={related.mockupUrl} alt={`${related.name} installed`} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-1000 ease-out scale-105 group-hover:scale-100 group-hover:opacity-100" />
                  </div>
                  <div className="p-6 flex flex-col flex-1 cursor-pointer" onClick={() => navigate(`/products/${related.id}`)}>
                    <p className="text-[10px] uppercase tracking-widest text-primary/40 mb-1 font-bold">{related.subCategory}</p>
                    <h4 className="font-heading font-bold text-base text-primary mb-6 group-hover:text-accent transition-colors">{related.name}</h4>
                    <div className="mt-auto">
                      <Button className="w-full bg-[#1a1a1a] hover:bg-black text-white rounded-full py-2.5 h-auto text-[11px] uppercase tracking-widest font-bold">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Section 8: Reviews ────────────────────────────────────────── */}
        <div className="mb-24 pt-16 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-2">Hear From Our Community</h2>
              <p className="text-sm text-primary/60">Trusted by homeowners and designers across Oman.</p>
            </div>
            <div className="flex gap-2">
               <div className="flex -space-x-2">
                 <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=1" alt="User" /></div>
                 <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=2" alt="User" /></div>
                 <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=3" alt="User" /></div>
                 <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-primary">+2k</div>
               </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockReviews.map((review, i) => (
              <div key={i} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="flex text-[#F59E0B] mb-6">
                  {[...Array(review.rating)].map((_, j) => <Icon key={j} icon="ph:star-fill" className="w-4 h-4" />)}
                </div>
                <p className="text-primary/80 text-sm leading-relaxed mb-8 font-body flex-1">"{review.text}"</p>
                <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-heading font-bold text-sm uppercase">{review.name[0]}</div>
                  <span className="text-sm font-bold text-primary">{review.name}</span>
                  <div className="ml-auto flex items-center gap-1 text-[10px] text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full border border-green-100"><Icon icon="ph:check-circle-fill" /> Verified Buyer</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 9: News & Guides ──────────────────────────────────── */}
        <div className="mb-12 pt-16 border-t border-gray-200">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold">News & Guides</h2>
            <button className="text-[11px] uppercase tracking-widest font-bold border border-gray-200 rounded-full px-6 py-2.5 hover:bg-black hover:text-white transition-colors">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockGuides.map((guide, i) => (
              <div key={i} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-sm border border-gray-100">
                  <img src={guide.image} alt={guide.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-primary/40 font-bold mb-3">Interior Design</p>
                <h4 className="font-heading font-bold text-xl text-primary group-hover:text-accent transition-colors leading-snug mb-4">{guide.title}</h4>
                <p className="text-xs text-accent font-bold uppercase tracking-widest flex items-center gap-2 mt-auto">
                  Read Article <Icon icon="ph:arrow-right" className="transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  )
}
