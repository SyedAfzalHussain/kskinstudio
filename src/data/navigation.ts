/** Mirrors the storefront's main menu, including the A–Z brand mega menu. */

export type NavLink = { title: string; href: string }

export type NavItem = {
  title: string
  href: string
  /** Rendered as an A–Z grid rather than titled columns. */
  layout?: 'columns' | 'brands'
  columns?: { title: string; href?: string; links: NavLink[] }[]
  brands?: string[]
  feature?: { image: string; heading: string; caption: string; href: string }
}

const collection = (handle: string) => `/collections/${handle}`

/** Brand collections, in the order the live mega menu lists them. */
export const BRAND_HANDLES = [
  'axis-y-1', 'abib', 'anua', 'arencia', 'amuse', 'aestura', 'a-pieu', 'ample-n',
  'banila-co', 'bb-lab', 'beauty-of-joseon', 'benton', 'biodance', 'bonabella',
  'cosrx', 'celmax', 'cell-fusion-c', 'clio-1', 'cnp', 'cantella',
  'd-alba', 'dear-klairs', 'dewycel', 'dr-g', 'dr-ceuracle', 'dr-jart', 'dr-althea',
  'eqqualberry', 'espoir', 'etude',
  'fino', 'fwee', 'food-a-holic', 'foodology',
  'genabelle', 'goodal', 'gracia',
  'happy-bath', 'haruharu-wonder', 'heimish', 'hera', 'holika-holika',
  'illiyoon', 'ilso', 'innisfree', 'i-m-from-1',
  'unove', 'kundal', '2kiss-me', '4klavuu', '3kahi',
  'lacto-fit', 'laneige',
  'manyo-factory', 'mask-pack', 'medi-peel', 'medicube', 'merzy', 'mediheal', 'missha',
  'numbuzin',
  'peripera', 'primera', 'purito',
  'romand', 'rejuran', 'round-lab', 'ryo',
  'secret-key', 'skin-1004', 'skin-food', 'some-by-mi',
  'the-ordinary', 'the-saem', 'tia-m', 'tirtir', 'tocobo', 'tonymoly', 'torriden',
  'vaseline', 'vdl', 'vt-cosmetics',
  'whipped',
] as const

export const MAIN_MENU: NavItem[] = [
  { title: 'Home', href: '/' },
  {
    title: 'Brands',
    href: '/brands',
    layout: 'brands',
    brands: [...BRAND_HANDLES],
  },
  {
    title: 'Skin Care',
    href: collection('serum-ampoule'),
    layout: 'columns',
    columns: [
      {
        title: 'Cleanse & Tone',
        links: [
          { title: 'Cleansers', href: collection('cleansers') },
          { title: 'Toners', href: collection('toners') },
          { title: 'Facial Pads & Toner Pads', href: collection('facial-pads-toner-pads') },
        ],
      },
      {
        title: 'Treat',
        links: [
          { title: 'Serum & Ampoule', href: collection('serum-ampoule') },
          { title: 'Anti Aging', href: collection('anti-aging') },
          { title: 'Acne & Skin Repair', href: collection('acne-skin-repair') },
          { title: 'Eye Care', href: collection('eye-care') },
        ],
      },
      {
        title: 'Moisturise & Protect',
        links: [
          { title: 'Moisturizers', href: collection('moisturizers') },
          { title: 'Sunscreens', href: collection('sunscreens') },
          { title: 'Lip Care', href: collection('lip-care') },
          { title: 'Body Wash, Scrub & Lotion', href: collection('body-wash-scrub-lotion') },
        ],
      },
      {
        title: 'Masks & Tools',
        links: [
          { title: 'Sheet Mask', href: collection('sheet-mask') },
          { title: 'Sleeping Mask', href: collection('sleeping-mask') },
          { title: 'Mask Pack', href: collection('mask-pack') },
          { title: 'Electronics', href: collection('electronics') },
        ],
      },
    ],
    feature: {
      image: 'https://www.thekskinstudio.com/cdn/shop/files/Untitled_design_12.png?v=1759785179',
      heading: 'Serums',
      caption: 'Targeted treatments for every concern',
      href: collection('serum-ampoule'),
    },
  },
  {
    title: 'Hair Care',
    href: collection('korean-haircare'),
    layout: 'columns',
    columns: [
      {
        title: 'Korean Hair Care',
        links: [
          { title: 'All Hair Care', href: collection('korean-haircare') },
          { title: 'Shampoo & Conditioner', href: collection('hair-care') },
          { title: 'Kundal', href: collection('kundal') },
          { title: 'Ryo', href: collection('ryo') },
          { title: "Unove", href: collection('unove') },
        ],
      },
    ],
  },
  {
    title: 'Makeup',
    href: collection('lip-makeup'),
    layout: 'columns',
    columns: [
      {
        title: 'Face',
        links: [
          { title: 'Face Makeup', href: collection('face-makeup') },
          { title: 'Cushion & Foundation', href: collection('face-makeup-1') },
        ],
      },
      {
        title: 'Eyes',
        links: [{ title: 'Eye Makeup', href: collection('eye-makeup') }],
      },
      {
        title: 'Lips',
        links: [
          { title: 'Lip Makeup', href: collection('lip-makeup') },
          { title: 'Lip Tint & Gloss', href: collection('lip-makeup-2') },
        ],
      },
      {
        title: 'Brands',
        links: [
          { title: 'Clio', href: collection('clio-1') },
          { title: 'Peripera', href: collection('peripera') },
          { title: 'Rom&nd', href: collection('romand') },
          { title: 'Etude', href: collection('etude') },
        ],
      },
    ],
    feature: {
      image: 'https://www.thekskinstudio.com/cdn/shop/files/lipstick-shade-of-red.jpg?v=1759922883',
      heading: 'Show your Sparkle',
      caption: 'Lip shades made to be layered',
      href: collection('lip-makeup-2'),
    },
  },
  { title: 'K-Pharmacy', href: collection('k-pharmacy') },
  { title: 'Olive Young Gift Sets', href: collection('olive-young-gift-sets') },
  { title: 'K-Supplements', href: collection('k-suppliments') },
  { title: 'Contact Us', href: '/pages/contact' },
]

export const FOOTER_MENUS = [
  {
    title: 'Menu',
    links: [
      { title: 'Privacy Policy', href: '/policies/privacy-policy' },
      { title: 'Refund Policy', href: '/policies/refund-policy' },
      { title: 'Shipping Policy', href: '/policies/shipping-policy' },
      { title: 'Terms of Service', href: '/policies/terms-of-service' },
      { title: 'Contact Information', href: '/policies/contact-information' },
    ],
  },
  {
    title: 'Customer care',
    links: [
      { title: 'Search', href: '/search' },
      { title: 'All Products', href: '/collections/new-arrivals' },
      { title: 'Brands', href: '/brands' },
      { title: 'Contact Us', href: '/pages/contact' },
    ],
  },
]

export const SOCIAL_LINKS = [
  { title: 'Facebook', href: 'https://www.facebook.com/' },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/koreanskinstore01?igsh=MWtwZHNwM2szNzZjYQ%3D%3D&utm_source=qr',
  },
  { title: 'YouTube', href: 'https://www.youtube.com/' },
]
