import { useState } from "react"
import { Icon } from "@iconify/react"
import { caseStudies } from "@/data/mockData"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<typeof caseStudies[0] | null>(null)

  return (
    <section id="projects" className="w-full bg-primary py-24 md:py-32 overflow-hidden text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-accent tracking-widest text-xs uppercase font-medium mb-4 block">Architectural Marvels</span>
            <h2 className="font-heading text-3xl md:text-5xl font-light">Project Sites</h2>
          </div>
          <p className="font-body text-gray-400 font-light max-w-md text-sm md:text-base leading-relaxed">
            A selection of our most prestigious installations. Discover how BLUEPRINT materials transform spaces into structural masterpieces.
          </p>
        </div>

        {/* Horizontal Scroll/Slider Container */}
        <div className="flex overflow-x-auto gap-6 pb-12 hide-scrollbar snap-x snap-mandatory">
          {caseStudies.map((project) => (
            <div 
              key={project.id} 
              className="flex-none w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center group cursor-pointer relative"
              onClick={() => setSelectedCase(project)}
            >
              <div className="w-full aspect-[16/10] overflow-hidden relative bg-gray-900">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 right-6 flex justify-between items-end">
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl text-white mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 text-accent text-sm font-body tracking-wider uppercase">
                      <Icon icon="ph:map-pin" />
                      {project.location}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:bg-white group-hover:text-primary transition-all duration-300">
                    <Icon icon="ph:arrow-up-right-light" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={!!selectedCase} onOpenChange={(open) => !open && setSelectedCase(null)}>
        <SheetContent side="right" className="bg-[#F9F9FB] border-l border-gray-200 sm:max-w-md w-[90vw] p-0 flex flex-col">
          {selectedCase && (
            <>
              <div className="w-full h-64 relative">
                <img src={selectedCase.image} alt={selectedCase.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <SheetHeader className="mb-8">
                  <SheetTitle className="font-heading text-3xl text-primary font-light">{selectedCase.title}</SheetTitle>
                  <SheetDescription className="font-body text-muted-foreground flex items-center gap-2 mt-2">
                     <Icon icon="ph:map-pin" /> {selectedCase.location}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex-1">
                  <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-4 border-b border-gray-200 pb-2">Materials Used In This Project</h4>
                  <ul className="flex flex-col gap-4 mt-6">
                    {selectedCase.materialsUsed.map((mat, idx) => (
                      <li key={idx} className="flex items-center gap-3 p-4 bg-white shadow-sm border border-gray-100 rounded-sm">
                        <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-accent">
                          <Icon icon="ph:stack" className="w-5 h-5" />
                        </div>
                        <span className="font-heading font-medium text-primary text-lg">{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm font-body text-muted-foreground mb-4">Want to achieve a similar look?</p>
                  <a href="https://wa.me/message/W74G75DZ5NWNF1" target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white py-4 px-6 hover:bg-primary/90 transition-colors uppercase tracking-widest text-xs font-medium">
                    Inquire About Materials <Icon icon="ph:arrow-right" />
                  </a>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  )
}
