import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { fetchAPI, getStrapiMedia } from "@/lib/api"

export function Lookbook() {
  const navigate = useNavigate()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchAPI("/lookbook-section", { 
          "populate[sections][populate]": "*" 
        })
        setData(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return <section className="w-full bg-white py-24 md:py-32 animate-pulse min-h-[800px]"></section>
  }

  const eyebrow = data?.eyebrow || "Our Offerings"
  const heading = data?.heading || "Crafted for Every Space"
  const description = data?.description || "From floor tiles that define your living room to bathware that elevates your sanctuary — we supply the finest materials for every corner of your project."
  const categories = data?.sections?.length > 0 ? data.sections : [
    {
      idAttribute: "floor-tiles",
      tag: "Tiles",
      heading: "Floor Tiles · Wall Tiles · Outdoor Tiles",
      description: "Explore our comprehensive range of Glazed Vitrified Tiles (GVT), Polished GVT, Double Charge, Full Body, and Ceramic tiles. Available in sizes from 300×300 mm to 1200×1800 mm with finishes including Glossy, Matte, Satin, Carving, Rustic, Lapato, and Book Match.",
      mainImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      macroImage: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80",
      features: [
        { label: "Tile Types", value: "GVT, PGVT, Double Charge, Full Body, Ceramic" },
        { label: "Sizes Available", value: "300×300 mm to 1200×1800 mm" },
        { label: "Application", value: "Living, Bedroom, Kitchen, Bathroom, Outdoor" }
      ],
      ctaText: "Explore Tiles Collection",
      categoryLink: "/products?category=Tiles"
    },
    {
      idAttribute: "sanitaryware",
      tag: "Bathware",
      heading: "Sanitaryware · Faucets · Accessories",
      description: "Premium bathware engineered for modern living. From wall-hung basins and rimless WCs to rainfall shower systems and concealed cisterns — every piece combines European design with enduring quality.",
      mainImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80",
      features: [
        { label: "Sanitaryware", value: "Basins, WCs, Urinals, Pedestals" },
        { label: "Faucets & Showers", value: "Basin Mixers, Rainfall, Hand Showers" },
        { label: "Finishes", value: "Chrome, Matte Black, Brushed Nickel" }
      ],
      ctaText: "Explore Bathware Suite",
      categoryLink: "/products?category=Bathware"
    },
    {
      idAttribute: "adhesives-&-grouts",
      tag: "Building Solutions",
      heading: "Adhesives · Waterproofing · Chemicals",
      description: "Complete your construction with our range of tile-laying adhesives, premium grouts in 12+ colours, liquid-applied waterproofing systems, and speciality construction chemicals — ensuring durability that lasts generations.",
      mainImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      features: [
        { label: "Adhesives", value: "Tile Fix, Stone Fix, Heavy Duty" },
        { label: "Grouts", value: "Epoxy, Flexible, Anti-Fungal" },
        { label: "Waterproofing", value: "Liquid Applied, Cementitious, Membrane" }
      ],
      ctaText: "Explore Building Solutions",
      categoryLink: "/products?category=Building Solutions"
    }
  ]

  return (
    <section className="w-full bg-white py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-accent tracking-[0.2em] text-xs uppercase font-medium mb-4 block">
            {eyebrow}
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-primary font-light">
            {heading}
          </h2>
          <p className="font-body text-[hsl(var(--muted-foreground))] text-sm md:text-base mt-6 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {categories.map((cat: any, idx: number) => {
          const isEven = idx % 2 === 0
          const mainImgUrl = getStrapiMedia(cat.mainImage) || cat.mainImage
          const macroImgUrl = getStrapiMedia(cat.macroImage) || cat.macroImage

          return (
            <div
              key={idx}
              id={cat.idAttribute}
              className={`grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center ${idx !== categories.length - 1 ? 'mb-32' : ''}`}
            >
              {/* Image Column */}
              <div className={`md:col-span-[5] ${isEven ? 'h-[600px] md:col-span-5' : 'h-[450px] md:col-span-7 order-1 md:order-2'} overflow-hidden group relative`}>
                <img
                  src={mainImgUrl}
                  alt={cat.heading}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className={`absolute top-6 ${isEven ? 'left-6' : 'right-6'} bg-white/90 backdrop-blur-sm px-4 py-2`}>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-body font-bold text-primary">
                    {cat.tag}
                  </span>
                </div>
              </div>

              {/* Text Column */}
              <div className={`md:col-span-6 flex flex-col justify-center ${isEven ? 'md:col-start-7' : 'md:col-span-5 order-2 md:order-1'}`}>
                <h3 className="font-heading text-3xl text-primary mb-6">
                  {cat.heading}
                </h3>
                <p className="font-body text-[hsl(var(--muted-foreground))] leading-relaxed font-light mb-8">
                  {cat.description}
                </p>
                <div className="space-y-3 font-body text-sm text-primary mb-6">
                  {cat.features?.map((feature: any, fIdx: number) => (
                    <div key={fIdx} className="flex justify-between border-b border-gray-100 pb-2.5">
                      <span className="text-[hsl(var(--muted-foreground))]">{feature.label}</span>
                      <span className="font-medium text-right max-w-[60%]">{feature.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className={`mb-10 flex justify-start`}>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white rounded-none font-body font-medium uppercase tracking-[0.15em] text-[11px] px-8 py-5 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate(cat.categoryLink)}
                  >
                    <span>{cat.ctaText}</span>
                    <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {/* Optional Macro Image */}
                {macroImgUrl && (
                  <div className={`relative w-full max-w-sm h-56 overflow-hidden shadow-2xl group self-end ${isEven ? 'md:-ml-12' : ''}`}>
                    <img
                      src={macroImgUrl}
                      alt="Macro detail"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Icon
                        icon="ph:magnifying-glass-plus-light"
                        className="text-white w-8 h-8"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
