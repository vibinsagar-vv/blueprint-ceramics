import { Icon } from "@iconify/react"

export function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left 60%: Ambient Viewport */}
      <div className="w-full md:w-[60%] h-[50vh] md:h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2000&q=80"
          alt="Premium tiled interior showroom"
          className="w-full h-full object-cover transform scale-105 animate-[pulse_20s_ease-in-out_infinite] origin-center"
        />
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 flex flex-col gap-2">
          <p className="text-white/90 font-heading text-xl md:text-2xl">
            The Statuario Collection
          </p>
          <p className="text-white/60 font-body text-xs tracking-[0.2em] uppercase">
            Premium Glazed Vitrified Tiles · 800×1600 mm
          </p>
        </div>
      </div>

      {/* Right 40%: Typography Panel */}
      <div className="w-full md:w-[40%] h-[50vh] md:h-full bg-background flex flex-col items-center justify-center relative p-8 md:p-16 lg:p-24">
        <div className="max-w-md w-full text-center md:text-left flex flex-col gap-6">
          <div className="w-12 h-[1px] bg-accent mx-auto md:mx-0" />
          <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] text-primary font-light leading-[1.15]">
            Tiles, Bathware &<br />Building Solutions.
          </h1>
          <p className="font-body text-[hsl(var(--muted-foreground))] text-sm md:text-base leading-relaxed font-light tracking-wide">
            Oman's trusted destination for premium floor tiles, wall tiles, sanitaryware, faucets, adhesives, and waterproofing — curated by BLUEPRINT.
          </p>
          <div className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
            {["Floor Tiles", "Wall Tiles", "Sanitaryware", "Adhesives"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-[0.2em] font-body font-medium border border-gray-200 px-4 py-2 text-primary/60 hover:border-accent hover:text-accent transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] font-medium">
            Explore
          </span>
          <Icon
            icon="ph:arrow-down-thin"
            className="w-6 h-6 text-primary animate-bounce"
          />
        </div>
      </div>
    </section>
  )
}
