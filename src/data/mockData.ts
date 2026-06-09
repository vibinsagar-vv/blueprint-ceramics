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

// ─── Tile Sub‑Types (Somany-style classification) ─────────────────────────────

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
    textureUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
    mockupUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    isBestseller: true,
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
    textureUrl:
      "https://images.unsplash.com/photo-1546412414-8035e1776c92?w=800&q=80",
    mockupUrl:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
    isNewArrival: true,
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
    textureUrl:
      "https://images.unsplash.com/photo-1510006851064-e6056cd0e3a8?w=800&q=80",
    mockupUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
    isBestseller: true,
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
    textureUrl:
      "https://images.unsplash.com/photo-1615529151169-7b1d8a6b2311?w=800&q=80",
    mockupUrl:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80",
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
    textureUrl:
      "https://images.unsplash.com/photo-1588628566587-bf5ec47eebe6?w=800&q=80",
    mockupUrl:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80",
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
    textureUrl:
      "https://images.unsplash.com/photo-1596395819057-cb31a61356f9?w=800&q=80",
    mockupUrl:
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=1200&q=80",
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
    textureUrl:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    mockupUrl:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80",
    isBestseller: true,
  },
  {
    id: "b2",
    name: "Rimless Wall-Hung WC",
    code: "W.WC-RIM02",
    topCategory: "Bathware",
    subCategory: "Sanitaryware",
    dimensions: "370x560 mm",
    finish: "Ceramic White",
    textureUrl:
      "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=800&q=80",
    mockupUrl:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
    isNewArrival: true,
  },
  {
    id: "b3",
    name: "Rainfall Shower System",
    code: "F.RAIN-SS04",
    topCategory: "Bathware",
    subCategory: "Faucets & Showers",
    dimensions: "300 mm head",
    finish: "Chrome",
    textureUrl:
      "https://images.unsplash.com/photo-1585821569331-f071db2abd8d?w=800&q=80",
    mockupUrl:
      "https://images.unsplash.com/photo-1600607687710-146b245bf793?w=1200&q=80",
  },
  {
    id: "b4",
    name: "Concealed Cistern Set",
    code: "A.CISTERN-07",
    topCategory: "Bathware",
    subCategory: "Bathroom Accessories",
    dimensions: "Universal Fit",
    finish: "Matte Chrome",
    textureUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    mockupUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
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
    textureUrl:
      "https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?w=800&q=80",
    mockupUrl:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80",
    isBestseller: true,
  },
  {
    id: "bs2",
    name: "AquaShield Waterproofing",
    code: "WP-AQUA-20",
    topCategory: "Building Solutions",
    subCategory: "Waterproofing Solutions",
    dimensions: "20 litre drum",
    finish: "Liquid Applied",
    textureUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    mockupUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  },
  {
    id: "bs3",
    name: "FlexiGrout Premium",
    code: "GRT-FLEX-05",
    topCategory: "Building Solutions",
    subCategory: "Adhesives & Grouts",
    dimensions: "5 kg bag",
    finish: "12 Colour Options",
    textureUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    mockupUrl:
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=1200&q=80",
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
