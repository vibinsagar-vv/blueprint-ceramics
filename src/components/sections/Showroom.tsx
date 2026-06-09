import { useState } from "react"
import { Icon } from "@iconify/react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  mockProducts,
  type Product,
  type TopLevelCategory,
} from "@/data/mockData"

export function Showroom() {
  const categories: TopLevelCategory[] = [
    "Tiles",
    "Bathware",
    "Building Solutions",
  ]
  const [activeTab, setActiveTab] = useState<TopLevelCategory>("Tiles")

  const filteredProducts = mockProducts.filter(
    (p) => p.topCategory === activeTab
  )

  return (
    <section id="showroom" className="w-full bg-[#F9F9FB] py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-accent tracking-[0.2em] text-xs uppercase font-medium mb-4 block">
            Interactive Catalog
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-primary font-light mb-4">
            The Showroom
          </h2>
          <p className="font-body text-[hsl(var(--muted-foreground))] text-sm md:text-base max-w-xl leading-relaxed mb-12">
            Browse our complete product catalog. Hover to preview how each
            material looks when installed.
          </p>

          <Tabs
            defaultValue="Tiles"
            onValueChange={(v) => setActiveTab(v as TopLevelCategory)}
            className="w-full flex flex-col items-center"
          >
            <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 flex gap-8 mb-16 w-full max-w-2xl justify-center">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-1 py-4 font-body text-[13px] tracking-[0.12em] text-[hsl(var(--muted-foreground))] data-[state=active]:text-primary transition-all uppercase cursor-pointer"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full text-left">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col cursor-pointer bg-white">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50">
        {/* Texture Image (Default) */}
        <img
          src={product.textureUrl}
          alt={`${product.name} texture`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
        />
        {/* Mockup Image (Hover) */}
        <img
          src={product.mockupUrl}
          alt={`${product.name} installed`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
        />
        {product.isNewArrival && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 z-10">
            New Arrival
          </div>
        )}
        {product.isBestseller && !product.isNewArrival && (
          <div className="absolute top-4 left-4 bg-primary text-white text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 z-10">
            Bestseller
          </div>
        )}
        {/* Hover overlay with details icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <Icon icon="ph:eye" className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-5 pb-4 px-1 flex flex-col gap-2">
        <h4 className="font-heading text-lg text-primary">{product.name}</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-body font-mono text-[hsl(var(--muted-foreground))]">
            {product.code}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-[11px] font-body text-[hsl(var(--muted-foreground))]">
            {product.dimensions}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-body text-primary/50 border border-gray-200 px-2 py-0.5 uppercase tracking-[0.1em]">
            {product.finish}
          </span>
          <span className="text-[10px] font-body text-primary/50 border border-gray-200 px-2 py-0.5 uppercase tracking-[0.1em]">
            {product.subCategory}
          </span>
        </div>
        {product.tileType && (
          <span className="text-[10px] font-body text-accent tracking-[0.1em] mt-1">
            {product.tileType}
          </span>
        )}
        {product.applicationArea && (
          <span className="text-[10px] font-body text-[hsl(var(--muted-foreground))] tracking-[0.05em]">
            <Icon icon="ph:house-line" className="inline w-3 h-3 mr-1" />
            {product.applicationArea}
          </span>
        )}
        <div className="h-[1px] w-0 bg-accent transition-all duration-500 ease-in-out group-hover:w-full mt-2" />
      </div>
    </div>
  )
}
