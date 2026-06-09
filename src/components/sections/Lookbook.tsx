import { Icon } from "@iconify/react"

export function Lookbook() {
  return (
    <section className="w-full bg-white py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-accent tracking-[0.2em] text-xs uppercase font-medium mb-4 block">
            Our Offerings
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-primary font-light">
            Crafted for Every Space
          </h2>
          <p className="font-body text-[hsl(var(--muted-foreground))] text-sm md:text-base mt-6 max-w-2xl leading-relaxed">
            From floor tiles that define your living room to bathware that
            elevates your sanctuary — we supply the finest materials for every
            corner of your project.
          </p>
        </div>

        {/* Row 1: Tiles */}
        <div
          id="floor-tiles"
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center mb-32"
        >
          {/* Left Column: Portrait Showcase */}
          <div className="md:col-span-5 h-[600px] overflow-hidden group relative">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
              alt="Premium floor tiles installed in a luxury living room"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-body font-bold text-primary">
                Tiles
              </span>
            </div>
          </div>
          {/* Right Column: Text + Macro Texture */}
          <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
            <h3 className="font-heading text-3xl text-primary mb-6">
              Floor Tiles · Wall Tiles · Outdoor Tiles
            </h3>
            <p className="font-body text-[hsl(var(--muted-foreground))] leading-relaxed font-light mb-8">
              Explore our comprehensive range of Glazed Vitrified Tiles (GVT),
              Polished GVT, Double Charge, Full Body, and Ceramic tiles.
              Available in sizes from 300×300 mm to 1200×1800 mm with finishes
              including Glossy, Matte, Satin, Carving, Rustic, Lapato, and Book
              Match.
            </p>
            <div className="space-y-3 font-body text-sm text-primary mb-10">
              <div className="flex justify-between border-b border-gray-100 pb-2.5">
                <span className="text-[hsl(var(--muted-foreground))]">Tile Types</span>
                <span className="font-medium">GVT, PGVT, Double Charge, Full Body, Ceramic</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2.5">
                <span className="text-[hsl(var(--muted-foreground))]">Sizes Available</span>
                <span className="font-medium">300×300 mm to 1200×1800 mm</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2.5">
                <span className="text-[hsl(var(--muted-foreground))]">Application</span>
                <span className="font-medium">Living, Bedroom, Kitchen, Bathroom, Outdoor</span>
              </div>
            </div>
            <div className="relative w-full max-w-sm h-56 overflow-hidden shadow-2xl group self-end md:-ml-12">
              <img
                src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80"
                alt="Marble tile macro texture detail"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Icon
                  icon="ph:magnifying-glass-plus-light"
                  className="text-white w-8 h-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Bathware */}
        <div
          id="sanitaryware"
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center mb-32"
        >
          {/* Left Column: Text & Specs */}
          <div className="md:col-span-5 flex flex-col justify-center order-2 md:order-1">
            <h3 className="font-heading text-3xl text-primary mb-6">
              Sanitaryware · Faucets · Accessories
            </h3>
            <p className="font-body text-[hsl(var(--muted-foreground))] leading-relaxed font-light mb-8">
              Premium bathware engineered for modern living. From wall-hung
              basins and rimless WCs to rainfall shower systems and concealed
              cisterns — every piece combines European design with enduring
              quality.
            </p>
            <div className="space-y-3 font-body text-sm text-primary">
              <div className="flex justify-between border-b border-gray-100 pb-2.5">
                <span className="text-[hsl(var(--muted-foreground))]">Sanitaryware</span>
                <span className="font-medium">Basins, WCs, Urinals, Pedestals</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2.5">
                <span className="text-[hsl(var(--muted-foreground))]">Faucets & Showers</span>
                <span className="font-medium">Basin Mixers, Rainfall, Hand Showers</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2.5">
                <span className="text-[hsl(var(--muted-foreground))]">Finishes</span>
                <span className="font-medium">Chrome, Matte Black, Brushed Nickel</span>
              </div>
            </div>
          </div>
          {/* Right Column: Widescreen Render */}
          <div className="md:col-span-7 h-[450px] overflow-hidden group order-1 md:order-2 relative">
            <img
              src="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80"
              alt="Premium bathroom with modern sanitaryware"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-body font-bold text-primary">
                Bathware
              </span>
            </div>
          </div>
        </div>

        {/* Row 3: Building Solutions */}
        <div id="adhesives-&-grouts" className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          {/* Left Column: Showcase */}
          <div className="md:col-span-5 h-[500px] overflow-hidden group relative">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
              alt="Construction site with building solutions materials"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-body font-bold text-primary">
                Building Solutions
              </span>
            </div>
          </div>
          {/* Right Column: Text */}
          <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
            <h3 className="font-heading text-3xl text-primary mb-6">
              Adhesives · Waterproofing · Chemicals
            </h3>
            <p className="font-body text-[hsl(var(--muted-foreground))] leading-relaxed font-light mb-8">
              Complete your construction with our range of tile-laying adhesives,
              premium grouts in 12+ colours, liquid-applied waterproofing
              systems, and speciality construction chemicals — ensuring
              durability that lasts generations.
            </p>
            <div className="space-y-3 font-body text-sm text-primary">
              <div className="flex justify-between border-b border-gray-100 pb-2.5">
                <span className="text-[hsl(var(--muted-foreground))]">Adhesives</span>
                <span className="font-medium">Tile Fix, Stone Fix, Heavy Duty</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2.5">
                <span className="text-[hsl(var(--muted-foreground))]">Grouts</span>
                <span className="font-medium">Epoxy, Flexible, Anti-Fungal</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2.5">
                <span className="text-[hsl(var(--muted-foreground))]">Waterproofing</span>
                <span className="font-medium">Liquid Applied, Cementitious, Membrane</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
