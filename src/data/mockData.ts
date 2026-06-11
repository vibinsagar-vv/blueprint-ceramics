export const siteMetadata = {
  phone: "98050265",
  location: "Amerat Phase 5",
  whatsapp: "https://wa.me/message/W74G75DZ5NWNF1",
  instagram: "https://www.instagram.com/blueprintinvestmentsoman/",
  rating: "5.0",
  tagline: "Oman's trusted supplier of premium tiles, bathware, and building materials.",
}

// ─── Category Types ───────────────────────────────────────────────────────────

export type ProductCategory =
  | "Floor Tiles"
  | "Wall Tiles"
  | "Outdoor & Parking Tiles"
  | "Sanitaryware"
  | "Faucets & Showers"
  | "Bathroom Accessories"
  | "Adhesives & Grouts"
  | "Waterproofing Solutions"
  | "Construction Chemicals"

export type TopLevelCategory = "Tiles" | "Bathware" | "Building Solutions"

export const categoryMap: Record<TopLevelCategory, ProductCategory[]> = {
  Tiles: ["Floor Tiles", "Wall Tiles", "Outdoor & Parking Tiles"],
  Bathware: ["Sanitaryware", "Faucets & Showers", "Bathroom Accessories"],
  "Building Solutions": [
    "Adhesives & Grouts",
    "Waterproofing Solutions",
    "Construction Chemicals",
  ],
}

// ─── Tile Sub‑Types ─────────────────────────────

export const tileSubTypes = [
  "Vitrified Tiles",
  "Glazed Vitrified Tiles (GVT)",
  "Double Charge Tiles",
  "Polished Glazed Vitrified Tiles (PGVT)",
  "Full Body Vitrified Tiles",
  "Ceramic Tiles",
  "Porcelain Tiles",
] as const

export const tileApplicationAreas = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Balcony & Terrace",
  "Outdoor & Parking",
  "Commercial Spaces",
  "Elevation",
] as const

export const applicationImages = [
  { name: "Living Room", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80" },
  { name: "Bedroom", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80" },
  { name: "Bathroom", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80" },
  { name: "Kitchen", image: "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80" },
  { name: "Outdoor", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
  { name: "Commercial", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
]

export const spaceImages = [
  { name: "Residential", application: "Bedroom", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80" },
  { name: "Commercial", application: "Commercial", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { name: "Hospitality", application: "Commercial", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80" },
]

export const sizeImages = [
  { name: "800x1600 mm", size: "800x1600 mm", image: "https://images.unsplash.com/photo-1618221195710-dd6b1e846510?w=800&q=80" },
  { name: "600x1200 mm", size: "600x1200 mm", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
  { name: "600x600 mm", size: "600x600 mm", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80" },
]

export const finishImages = [
  { name: "Glossy", finish: "Glossy", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80" },
  { name: "Matte", finish: "Matte", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80" },
  { name: "Rustic", finish: "Rustic", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80" },
  { name: "Carving", finish: "Carving", image: "https://images.unsplash.com/photo-1618221195710-dd6b1e846510?w=800&q=80" },
]


export const tileSizes = [
  "300x300 mm",
  "300x450 mm",
  "300x600 mm",
  "400x400 mm",
  "600x600 mm",
  "600x1200 mm",
  "800x800 mm",
  "800x1600 mm",
  "1000x1000 mm",
  "1200x1200 mm",
  "1200x1800 mm",
] as const

export const tileFinishes = [
  "Glossy",
  "Matte",
  "Satin/Silk",
  "Sugar",
  "Carving",
  "Rustic",
  "High Gloss",
  "Anti-Skid",
  "Lapato",
  "Book Match",
] as const

// ─── Product Type ─────────────────────────────────────────────────────────────

export type Product = {
  id: string
  name: string
  code: string
  topCategory: TopLevelCategory
  subCategory: ProductCategory
  tileType?: string
  applicationArea?: string
  dimensions: string
  finish: string
  textureUrl: string
  mockupUrl: string
  isNewArrival?: boolean
  isBestseller?: boolean
  description: string
  features: { icon: string; label: string }[]
  lookbookImages: string[]
  faqs?: { question: string; answer: string }[]
}

// ─── Products ──────────────────────────────────────────────────────────────────

export const mockProducts: Product[] = [
  // ── Tiles ────────────────────────────────────────────────────────────────
  {
    id: "t1",
    name: "Bianco Marble GVT",
    code: "B.VELA-692626",
    topCategory: "Tiles",
    subCategory: "Floor Tiles",
    tileType: "Glazed Vitrified Tiles (GVT)",
    applicationArea: "Living Room",
    dimensions: "600x1200 mm",
    finish: "Glossy",
    textureUrl: "https://images.unsplash.com/photo-1595814436573-00e5720bc2dd?w=800&q=80",
    mockupUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
    isBestseller: true,
    description: "Experience the timeless elegance of Italian marble with the durability of glazed vitrified porcelain. Bianco Marble GVT features a stunning white base with dramatic grey veining, perfect for elevating contemporary living spaces.",
    features: [
      { icon: "ph:drop-thin", label: "Water Resistant" },
      { icon: "ph:shield-check-thin", label: "Scratch Resistant" },
      { icon: "ph:broom-thin", label: "Easy to Clean" },
      { icon: "ph:leaf-thin", label: "Eco-Friendly" }
    ],
    
    faqs: [
      { question: "What is the recommended grout joint size?", answer: "For these large format slabs, we recommend a minimum grout joint of 2mm to accommodate for any micro-movements." },
      { question: "Can this be installed over existing flooring?", answer: "Yes, provided the existing substrate is structurally sound, perfectly flat, and properly primed before installation." },
      { question: "Does it require sealing?", answer: "No, as a fully vitrified porcelain product with virtually zero water absorption, it does not require additional sealing." }
    ],
    lookbookImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80"
    ]
  },
  {
    id: "t2",
    name: "Corda Sandstone PGVT",
    code: "6.CORDA-692676M",
    topCategory: "Tiles",
    subCategory: "Floor Tiles",
    tileType: "Polished Glazed Vitrified Tiles (PGVT)",
    applicationArea: "Bedroom",
    dimensions: "600x1200 mm",
    finish: "Satin/Silk",
    textureUrl: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&q=80",
    mockupUrl: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80",
    isNewArrival: true,
    description: "Bring the warmth of natural sandstone indoors. The Corda series offers a soft, tactile satin finish that mimics fine-grained sedimentary rock, providing a serene foundation for minimalist and organic interior designs.",
    features: [
      { icon: "ph:shield-check-thin", label: "High Durability" },
      { icon: "ph:sun-thin", label: "Fade Resistant" },
      { icon: "ph:verified-thin", label: "Stain Resistant" }
    ],
    lookbookImages: [
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
      "https://images.unsplash.com/photo-1600210491369-0824e4745db1?w=800&q=80"
    ]
  },
  {
    id: "t3",
    name: "Belmar Statuario",
    code: "B.BELMAR-692596-M",
    topCategory: "Tiles",
    subCategory: "Floor Tiles",
    tileType: "Polished Glazed Vitrified Tiles (PGVT)",
    applicationArea: "Living Room",
    dimensions: "800x1600 mm",
    finish: "High Gloss",
    textureUrl: "https://images.unsplash.com/photo-1510006851064-e6056cd0e3a8?w=800&q=80",
    mockupUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    isBestseller: true,
    description: "A breathtaking large-format slab replicating the world's most sought-after Statuario marble. Its high-gloss finish reflects light beautifully, making rooms feel more spacious and opulent. Ideal for luxury residential and premium commercial spaces.",
    features: [
      { icon: "ph:stars-thin", label: "High Gloss Finish" },
      { icon: "ph:maximize-thin", label: "Large Format" },
      { icon: "ph:drop-thin", label: "Zero Moisture Absorption" }
    ],
    lookbookImages: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
    ]
  },
  {
    id: "t4",
    name: "Almond Décor Wall",
    code: "W.ALMOND-304515",
    topCategory: "Tiles",
    subCategory: "Wall Tiles",
    tileType: "Ceramic Tiles",
    applicationArea: "Bathroom",
    dimensions: "300x450 mm",
    finish: "Glossy",
    textureUrl: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=800&q=80",
    mockupUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80",
    description: "A versatile ceramic wall tile with a subtle geometric decor pattern. The warm almond tone and glossy surface make it perfect for creating inviting bathroom feature walls or elegant kitchen splashbacks.",
    features: [
      { icon: "ph:wall-thin", label: "Lightweight Ceramic" },
      { icon: "ph:drop-thin", label: "Water Repellent" },
      { icon: "ph:broom-thin", label: "Low Maintenance" }
    ],
    lookbookImages: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80"
    ]
  },
  {
    id: "t5",
    name: "Gris Cement Outdoor",
    code: "O.GRIS-400412",
    topCategory: "Tiles",
    subCategory: "Outdoor & Parking Tiles",
    tileType: "Full Body Vitrified Tiles",
    applicationArea: "Outdoor & Parking",
    dimensions: "400x400 mm",
    finish: "Anti-Skid",
    textureUrl: "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=800&q=80",
    mockupUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80",
    description: "Engineered for extreme durability, this full-body vitrified tile features a robust anti-skid surface. Designed to withstand heavy footfall and vehicular traffic, it's the ultimate choice for driveways, patios, and commercial exteriors.",
    features: [
      { icon: "ph:shield-thin", label: "Heavy Duty" },
      { icon: "ph:ruler-thin", label: "Anti-Skid Surface" },
      { icon: "ph:snowflake-thin", label: "Frost Proof" },
      { icon: "ph:weight-thin", label: "High Load Bearing" }
    ],
    lookbookImages: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
    ]
  },
  {
    id: "t6",
    name: "Emperador Dark GVT",
    code: "F.EMPR-600602",
    topCategory: "Tiles",
    subCategory: "Floor Tiles",
    tileType: "Glazed Vitrified Tiles (GVT)",
    applicationArea: "Commercial Spaces",
    dimensions: "600x600 mm",
    finish: "Matte",
    textureUrl: "https://images.unsplash.com/photo-1507502707541-f369a3b18502?w=800&q=80",
    mockupUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    description: "Rich, dark, and sophisticated. The Emperador Dark GVT captures the essence of Spanish brown marble with delicate lighter veins. The matte finish adds a contemporary edge while providing excellent slip resistance for commercial applications.",
    features: [
      { icon: "ph:buildings-thin", label: "Commercial Grade" },
      { icon: "ph:shield-check-thin", label: "High Traffic Rated" },
      { icon: "ph:verified-thin", label: "Chemical Resistant" }
    ],
    lookbookImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
    ]
  },

  // ── Bathware ─────────────────────────────────────────────────────────────
  {
    id: "b1",
    name: "Elena Wall-Hung Basin",
    code: "W.BASIN-01",
    topCategory: "Bathware",
    subCategory: "Sanitaryware",
    dimensions: "550x450 mm",
    finish: "Ceramic White",
    textureUrl: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80",
    mockupUrl: "https://images.unsplash.com/photo-1613214149579-909895e71416?w=1200&q=80",
    isBestseller: true,
    description: "The Elena Wall-Hung Basin features clean, geometric lines that appear to float effortlessly. Crafted from high-density vitreous china, its non-porous surface resists stains and bacteria, ensuring lasting brilliance.",
    features: [
      { icon: "ph:minimize-thin", label: "Space Saving" },
      { icon: "ph:bacteria-thin", label: "Anti-Bacterial Glaze" },
      { icon: "ph:waterdrop-thin", label: "Easy to Clean" }
    ],
    lookbookImages: [
      "https://images.unsplash.com/photo-1613214149579-909895e71416?w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80"
    ]
  },
  {
    id: "b2",
    name: "Rimless Wall-Hung WC",
    code: "W.WC-RIM02",
    topCategory: "Bathware",
    subCategory: "Sanitaryware",
    dimensions: "370x560 mm",
    finish: "Ceramic White",
    textureUrl: "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=800&q=80",
    mockupUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80",
    isNewArrival: true,
    description: "Next-generation hygiene meets minimalist design. Our Rimless Wall-Hung WC eliminates hidden crevices where dirt can accumulate. The powerful vortex flush cleans the entire bowl efficiently while using less water.",
    features: [
      { icon: "ph:wash-thin", label: "Rimless Technology" },
      { icon: "ph:waterdrop-thin", label: "Water Saving Flush" },
      { icon: "ph:armchair-thin", label: "Soft-Close Seat" }
    ],
    lookbookImages: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
      "https://images.unsplash.com/photo-1613214149579-909895e71416?w=800&q=80"
    ]
  },
  {
    id: "b3",
    name: "Rainfall Shower System",
    code: "F.RAIN-SS04",
    topCategory: "Bathware",
    subCategory: "Faucets & Showers",
    dimensions: "300 mm head",
    finish: "Chrome",
    textureUrl: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80",
    mockupUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
    description: "Transform your daily routine into a spa-like experience. The 300mm ultra-thin rainfall showerhead delivers a drenching, voluminous flow. Finished in multi-layered chrome to resist tarnishing and corrosion.",
    features: [
      { icon: "ph:cloud-thin", label: "Air-Injection Tech" },
      { icon: "ph:shield-thin", label: "Anti-Rust Chrome" },
      { icon: "ph:hand-thin", label: "Silicone Nozzles" }
    ],
    lookbookImages: [
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80"
    ]
  },

  // ── Building Solutions ───────────────────────────────────────────────────
  {
    id: "bs1",
    name: "TileFix Pro Adhesive",
    code: "ADH-PRO-25",
    topCategory: "Building Solutions",
    subCategory: "Adhesives & Grouts",
    dimensions: "25 kg bag",
    finish: "Grey / White",
    textureUrl: "https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?w=800&q=80",
    mockupUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    isBestseller: true,
    description: "A high-polymer modified, cement-based tile adhesive suitable for fixing large format ceramic and vitrified tiles on interior and exterior floor/wall surfaces. Excellent adhesion and workability.",
    features: [
      { icon: "ph:hammer-thin", label: "High Bond Strength" },
      { icon: "ph:waterdrop-thin", label: "Water Resistant" },
      { icon: "ph:clock-thin", label: "Extended Open Time" }
    ],
    lookbookImages: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
    ]
  },
]

// ─── Case Studies / Project Sites ──────────────────────────────────────────────

export const caseStudies = [
  {
    id: "c1",
    title: "The Alabaster Villa",
    location: "Amerat Phase 5",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    materialsUsed: ["B.VELA-692626 · Bianco Marble GVT", "W.BASIN-01 · Elena Wall-Hung Basin"],
  },
  {
    id: "c2",
    title: "Oasis Executive Suites",
    location: "Muscat",
    image:
      "https://images.unsplash.com/photo-1600607687710-146b245bf793?w=1600&q=80",
    materialsUsed: [
      "6.CORDA-692676M · Corda Sandstone PGVT",
      "F.RAIN-SS04 · Rainfall Shower System",
    ],
  },
  {
    id: "c3",
    title: "Lumina Residences",
    location: "Qurum",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    materialsUsed: [
      "B.BELMAR-692596-M · Belmar Statuario",
      "ADH-PRO-25 · TileFix Pro Adhesive",
    ],
  },
]
