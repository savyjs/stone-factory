export type ProductKey =
  | "wood-travertine"
  | "white-travertine"
  | "silver-travertine"
  | "marble-tramit"
  | "cnc-roman-facade";

export type BlogSlug =
  | "travertine-facade-guide"
  | "stone-stairs-buying-checklist"
  | "export-ready-stone-quality"
  | "faq-travertine-vs-marble"
  | "faq-which-travertine-for-facade"
  | "faq-how-stone-price-is-calculated"
  | "faq-does-travertine-need-resin"
  | "faq-best-stone-for-hot-climates"
  | "faq-stone-thickness-for-exterior"
  | "faq-white-vs-silver-travertine"
  | "faq-stone-for-stairs"
  | "faq-cnc-facade-benefits"
  | "faq-how-to-order-export-stone";

export const companyInfo = {
  name: "Berlian Stone Factory",
  manager: "Afshari",
  city: "Qom",
  country: "Iran",
  email: "savvyversa@gmail.com",
  internationalPhone: "+989376953800",
  phones: ["+989132301099", "+989392301099"],
  instagramPrimary: "https://instagram.com/ehsanafshary",
  instagramFactory: "https://instagram.com/berelian_stone",
  telegramPrimary: "https://t.me/berelian_stone",
  whatsappPrimary: "https://wa.me/989376953800",
  telegramHandle: "t.me/berelian_stone",
  balePhone1: "https://ble.ir/09132301099",
  eitaaPhone1: "https://eitaa.com/09132301099",
  balePhone2: "https://ble.ir/09392301099",
  eitaaPhone2: "https://eitaa.com/09392301099",
  addressPrimary:
    "اتوبان تهران قم - شهرک صنعتی محمودآباد - خ برلیان - سنگبری برلیان",
  addressWarehouse: "انبار ۲: جاده قم کاشان - سنگبری آریا",
  video: "/video/stone-factory.mp4",
} as const;

export const exportMarkets = [
  "Iran",
  "Iraq",
  "Azerbaijan",
  "Turkey",
  "Armenia",
  "Pakistan",
  "Turkmenistan",
  "English-speaking buyers",
] as const;

export const products: Array<{
  key: ProductKey;
  image: string;
  gallery: string[];
  stoneFamily: string;
  application: string;
}> = [
  {
    key: "wood-travertine",
    image: "/photo/2/torshab.jpg",
    gallery: ["/photo/2/torshab.jpg", "/photo/3/sku-4567.jpg", "/photo/3/sange-21345.jpg"],
    stoneFamily: "Wood-grain Travertine",
    application: "Facade, exterior wall, and flooring",
  },
  {
    key: "white-travertine",
    image: "/photo/2/teravertan.jpg",
    gallery: ["/photo/2/teravertan.jpg", "/photo/3/sku45.jpg", "/photo/2/photo_2025-02-10_22-45-12.jpg"],
    stoneFamily: "Travertine",
    application: "Facade and cladding",
  },
  {
    key: "silver-travertine",
    image: "/photo/3/shiardar.jpg",
    gallery: ["/photo/3/shiardar.jpg", "/photo/3/torshab.jpg", "/photo/2/photo_2025-02-10_22-42-30.jpg"],
    stoneFamily: "Travertine",
    application: "Exterior facades and feature walls",
  },
  {
    key: "marble-tramit",
    image: "/photo/3/marmarit.jpg",
    gallery: ["/photo/3/marmarit.jpg", "/photo/3/chini.jpg", "/photo/3/haji.jpg"],
    stoneFamily: "Marble and Chinese stone",
    application: "Flooring, stairs, and lobbies",
  },
  {
    key: "cnc-roman-facade",
    image: "/photo/2/darpoosh.jpg",
    gallery: ["/photo/2/darpoosh.jpg", "/photo/3/haji abad.jpg", "/photo/1/IMG_3334.JPG"],
    stoneFamily: "CNC Roman facade",
    application: "Architectural facade projects",
  },
];

export const galleryImages = [
  "/photo/1/berlian-travertine-slab-factory-01.jpg",
  "/photo/1/berlian-stone-workshop-qom-01.jpg",
  "/photo/1/berlian-stone-workshop-qom-02.jpg",
  "/photo/1/berlian-travertine-slab-factory-02.jpg",
  "/photo/1/berlian-travertine-blocks-yard-01.jpg",
  "/photo/1/berlian-stone-factory-floor-01.jpg",
  "/photo/1/berlian-travertine-finished-tiles-01.jpg",
  "/photo/1/berlian-travertine-polished-slabs-01.jpg",
  "/photo/1/berlian-stone-machinery-qom-01.jpg",
  "/photo/1/berlian-travertine-stacked-slabs-01.jpg",
  "/photo/1/berlian-travertine-blocks-yard-02.jpg",
  "/photo/1/berlian-stone-machinery-qom-02.jpg",
  "/photo/1/berlian-stone-yard-overview-01.jpg",
];

export const blogPosts: Array<{
  slug: BlogSlug;
  image: string;
  publishedAt: string;
  readingMinutes: number;
}> = [
  {
    slug: "travertine-facade-guide",
    image: "/photo/2/teravertan.jpg",
    publishedAt: "2026-05-01",
    readingMinutes: 4,
  },
  {
    slug: "stone-stairs-buying-checklist",
    image: "/photo/3/marmarit.jpg",
    publishedAt: "2026-05-06",
    readingMinutes: 5,
  },
  {
    slug: "export-ready-stone-quality",
    image: "/photo/2/darpoosh.jpg",
    publishedAt: "2026-05-12",
    readingMinutes: 4,
  },
  { slug: "faq-travertine-vs-marble", image: "/photo/1/IMG_3325.JPG", publishedAt: "2026-05-14", readingMinutes: 4 },
  { slug: "faq-which-travertine-for-facade", image: "/photo/1/IMG_3339.JPG", publishedAt: "2026-05-15", readingMinutes: 4 },
  { slug: "faq-how-stone-price-is-calculated", image: "/photo/1/IMG_3338.JPG", publishedAt: "2026-05-16", readingMinutes: 5 },
  { slug: "faq-does-travertine-need-resin", image: "/photo/1/IMG_3326.JPG", publishedAt: "2026-05-17", readingMinutes: 4 },
  { slug: "faq-best-stone-for-hot-climates", image: "/photo/1/IMG_3322.JPG", publishedAt: "2026-05-18", readingMinutes: 4 },
  { slug: "faq-stone-thickness-for-exterior", image: "/photo/1/IMG_3320.JPG", publishedAt: "2026-05-19", readingMinutes: 4 },
  { slug: "faq-white-vs-silver-travertine", image: "/photo/1/IMG_3330.JPG", publishedAt: "2026-05-20", readingMinutes: 4 },
  { slug: "faq-stone-for-stairs", image: "/photo/1/IMG_3332.JPG", publishedAt: "2026-05-21", readingMinutes: 4 },
  { slug: "faq-cnc-facade-benefits", image: "/photo/1/IMG_3323.JPG", publishedAt: "2026-05-22", readingMinutes: 4 },
  { slug: "faq-how-to-order-export-stone", image: "/photo/1/IMG_3331.JPG", publishedAt: "2026-05-23", readingMinutes: 5 },
];