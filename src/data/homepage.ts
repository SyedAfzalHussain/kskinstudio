/** Section content for the home page, mirroring the live theme's section order. */

const cdn = (file: string) => `https://www.thekskinstudio.com/cdn/shop/files/${file}`

export const ANNOUNCEMENTS = [
  '100% CLEAN, NON-IRRITATING',
  'FREE SHIPPING ON ALL ORDERS OVER RS.2000',
]

export const SLIDES = [
  {
    heading: 'Blend Beauty In You',
    subheading: 'Get the skin you want to feel',
    cta: { label: 'Shop Now', href: '/collections/serum-ampoule' },
    image: cdn('Untitled_design_6.png?v=1759776663'),
  },
  {
    heading: 'Blend Beauty In You',
    subheading: 'Get the skin you want to feel',
    cta: { label: 'Shop Now', href: '/collections/lip-makeup' },
    image: cdn(
      'Assalam_u_Alaikum_Soban_Sir_My_Name_Is_Sajawal_Farooq._I_m_a_Shopify_developer_and_web_designer_with_4_years_of_experience._I_ve_built_and_redesigned_many_stores_local_and_interenatli_01e8be92-8306-4bf5-9aa6-0e736bfcb32a.png?v=1759997005',
    ),
  },
  {
    heading: 'Blend Beauty In You',
    subheading: 'Get the skin you want to feel',
    cta: { label: 'Shop Now', href: '/collections/korean-haircare' },
    image: cdn(
      'Assalam_u_Alaikum_Soban_Sir_My_Name_Is_Sajawal_Farooq._I_m_a_Shopify_developer_and_web_designer_with_4_years_of_experience._I_ve_built_and_redesigned_many_stores_local_and_interenatli.png?v=1759996515',
    ),
  },
]

export const CATEGORY_CARDS = [
  {
    title: 'Serums',
    href: '/collections/serum-ampoule',
    image: cdn('Untitled_design_12.png?v=1759785179'),
  },
  {
    title: 'Mostrurizers',
    href: '/collections/moisturizers',
    image: cdn('Untitled_design_10.png?v=1759783607'),
  },
  {
    title: 'Sunscreens',
    href: '/collections/sunscreens',
    image: cdn('Untitled_design_11.png?v=1759784963'),
  },
]

export const PRODUCT_TABS = [
  { id: 'new', label: 'NEW ARRIVALS', collection: 'new-arrivals' },
  { id: 'best', label: 'BEST SELLERS', collection: 'serum-ampoule' },
  { id: 'sale', label: 'SALE', collection: 'sale' },
] as const

export const HIGHLIGHT = {
  words: ['Make you look', 'and', 'feel glowy', 'and healthy'],
  images: [
    cdn('spa-facial-treatment.jpg?v=1759784407'),
    cdn('woman-side-profile-looking-up.jpg?v=1759784506'),
    cdn('model-in-neutral-colors-by-window.jpg?v=1759784616'),
  ],
}

export const COLLECTION_LIST = {
  eyebrow: 'Care For Your Skin',
  heading: 'Natural self care products',
  body: 'We create safe products that really work and are designed to make you feel good',
  items: [
    { handle: 'serum-ampoule', title: 'Serums & Ampoules', image: cdn('serums-ampoules-and-emulsions_mobilehome.webp?v=1760080137') },
    { handle: 'moisturizers', title: 'Moisturizers', image: cdn('Untitled_design_32.png?v=1760081178') },
    { handle: 'sunscreens', title: 'Sunscreens', image: cdn('Screenshot_2025-10-10_at_12.10.42_PM.png?v=1760080270') },
    { handle: 'cleansers', title: 'Cleansers', image: cdn('Untitled_design_29.png?v=1760080961') },
    { handle: 'toners', title: 'Toners', image: cdn('Screenshot_2025-10-20_at_3.36.24_PM.png?v=1760956618') },
    { handle: 'facial-pads-toner-pads', title: 'Toner Pads', image: cdn('Screenshot_2025-10-20_at_3.40.00_PM.png?v=1760956814') },
    { handle: 'eye-care', title: 'Eye Care', image: cdn('Screenshot_2025-10-20_at_3.41.15_PM.png?v=1760956909') },
    { handle: 'lip-care', title: 'Lip Care', image: cdn('Screenshot_2025-10-20_at_3.42.59_PM.png?v=1760957000') },
    { handle: 'korean-haircare', title: 'Hair Care', image: cdn('Screenshot_2025-10-20_at_3.44.16_PM.png?v=1760957080') },
    { handle: 'body-wash-scrub-lotion', title: 'Body Care', image: cdn('Screenshot_2025-10-20_at_3.45.58_PM.png?v=1760957175') },
    { handle: 'k-suppliments', title: 'K-Supplements', image: cdn('Screenshot_2025-10-20_at_3.47.58_PM.png?v=1760957315') },
  ],
}

export const LOOKBOOK = {
  heading: 'Shop the look',
  slides: [
    {
      image: cdn('d37b9eb9-1882-465b-8dd4-57882b6f2b1b.jpg?v=1758987135'),
      hotspots: [
        { x: 30, y: 38, handle: 'medicube-booster-pro-mini-pakistan' },
        { x: 62, y: 66, handle: 'medicube-zero-pore-pad-70-pads-deep-pore-cleansing-skin-smoothing-toner-pads' },
      ],
    },
    {
      image: cdn('IMG_6556.webp?v=1758536417'),
      hotspots: [
        { x: 44, y: 30, handle: 'tocobo-cotton-soft-sun-stick-spf50-pa' },
        { x: 68, y: 72, handle: 'tocobo-bio-watery-sun-cream-spf50-pa' },
      ],
    },
  ],
}

export const PRESS = {
  heading: 'Featured by Press',
  items: [
    {
      quote: 'Also the customer service is phenomenal. I would purchase again.',
      logo: cdn('Untitled_design_15.png?v=1759819157'),
    },
    {
      quote: 'Great product line. Very attentive staff to deal with.',
      logo: cdn('Untitled_design_16.png?v=1759819157'),
    },
    {
      quote: 'Authentic Korean skincare, delivered across Pakistan without the markup.',
      logo: cdn('Untitled_design_17.png?v=1759819157'),
    },
  ],
}

export const CARD_IMAGES = {
  heading: 'Hot this week',
  cards: [
    {
      eyebrow: 'The Vacation Shop',
      heading: 'Show your Sparkle',
      body: 'We create safe products that really work and are designed to make you feel good',
      cta: 'Shop Skincare',
      href: '/collections/lip-makeup-2',
      image: cdn('lipstick-shade-of-red.jpg?v=1759922883'),
    },
    {
      eyebrow: 'The Vacation Shop',
      heading: 'Care for Your Beauty',
      body: 'We create safe products that really work and are designed to make you feel good',
      cta: 'Shop Accessories',
      href: '/collections/face-makeup-1',
      image: cdn('a-bunch-of-clean-makeup-brushes-together.jpg?v=1759923603'),
    },
    {
      eyebrow: 'The Vacation Shop',
      heading: 'Care for Your Beauty',
      body: 'We create safe products that really work and are designed to make you feel good',
      cta: 'Shop Serums',
      href: '/collections/serum-ampoule',
      image: cdn('spa-supplies.jpg?v=1759922550'),
    },
  ],
}

export const BRAND_STRIP = [
  cdn('349101616_921520839120861_197267746274627207_n.jpg?v=1759818012'),
  cdn('Untitled_design_14.png?v=1759818288'),
  cdn('Untitled_design_13.png?v=1759818196'),
  cdn('Screenshot_2025-10-07_at_11.14.58_AM.png?v=1759818032'),
  cdn('id9C0ec-Dv_logos.jpg?v=1759818012'),
  cdn('461880891_989744366496569_4113520317092076903_n.jpg?v=1759818359'),
]

export const FEATURES = [
  'Free Shipping',
  'Money Guarantee',
  'Flexible Payment',
  'Online Support',
  'Return within 7 days',
]

export const RICH_TEXT_1 = {
  heading: 'Because you need time for yourself. Blend beauty in you',
  cta: { label: 'Shop All Products', href: '/collections/all' },
}

export const SUNSCREEN_SHOWCASE = {
  eyebrow: 'Care For Your Skin',
  heading: 'Made for sensitive skin',
  cta: { label: 'Shop All Products', href: '/collections/sunscreens' },
  image: cdn('Untitled_design_22.png?v=1759924941'),
  handles: [
    'skin1004-hyalu-cica-water-fit-sun-serum-spf50-pa',
    'tocobo-bio-watery-sun-cream-spf50-pa',
    'tocobo-cotton-soft-sun-stick-spf50-pa',
    'tocobo-vita-waterproof-sun-stick-spf-50-pa',
  ],
}

export const IMAGE_WITH_TEXT = {
  eyebrow: 'Gentle And Safe',
  heading: 'Made for sensitive skin',
  body: 'We create safe products that really work and are designed to make you feel good',
  cta: { label: 'Shop Now', href: '/collections/all' },
  image: cdn('Screenshot_2025-10-06_at_11.19.00_PM.png?v=1759774825'),
}

export const PROMO_TILES = {
  words: ['New Season Essential', 'Rescue Your Skin', 'Made with love', 'New Season Essential'],
  images: [
    cdn('makeup-brush-set.jpg?v=1759819395'),
    cdn('woman-holds-a-jade-face-massager-to-her-face.jpg?v=1759819421'),
    cdn('beauty-product-with-qr.jpg?v=1759819725'),
    cdn('shiny-lipstick-in-black-and-white.jpg?v=1759819630'),
  ],
}

export const TESTIMONIALS = {
  heading: 'Over 500+ Happy reviews',
  items: [
    {
      name: 'Danielle S.',
      quote:
        'The serum noticeably reduced my fine lines after a few weeks. Lightweight and absorbs quickly. Highly recommend!',
      handle: 'dong-a-korean-pharmacy-acnon-cream-13g-acne-treatment-spot-repair-cream-for-clear-skin',
      image: cdn('Screenshot_2025-10-10_at_2.11.42_PM.png?v=1760087520'),
    },
    {
      name: 'Elizabeth R.',
      quote:
        'Great cleanser! It removes makeup effortlessly without drying out my skin. My face feels refreshed and clean.',
      handle: null,
      image: cdn('Screenshot_2025-10-10_at_2.13.40_PM.png?v=1760087635'),
    },
    {
      name: 'Kimberly J.',
      quote:
        "Love this sunscreen! It's non-greasy and blends well with makeup. Offers great protection without causing breakouts.",
      handle: 'tocobo-cotton-soft-sun-stick-spf50-pa',
      image: cdn('Screenshot_2025-10-10_at_2.15.25_PM.png?v=1760087743'),
    },
    {
      name: 'Victoria H.',
      quote:
        'This eye cream is a game-changer. Reduced puffiness and dark circles significantly. Gentle on sensitive skin.',
      handle: null,
      image: cdn('Screenshot_2025-10-10_at_2.17.21_PM.png?v=1760087855'),
    },
    {
      name: 'Jaroslava K.',
      quote:
        'This clay mask deeply cleanses my pores and leaves my skin feeling smooth and refreshed. Perfect for weekly use.',
      handle: null,
      image: cdn('cellfusion.jpg?v=1760083527'),
    },
    {
      name: 'Alexandra M.',
      quote:
        'This moisturizer left my skin feeling incredibly soft and hydrated. No greasy residue. Perfect for daily use!',
      handle: null,
      image: cdn('2af6b814-60a2-4d4b-90fc-6ad417d1205c.jpg?v=1759820861'),
    },
  ],
}

export const FAQ = {
  heading: "We're answerable!",
  body: 'We create safe products that really work and are designed to make you feel good. Any question about our products?',
  note: 'Check if you can find them here or',
  cta: { label: 'Contact Us', href: '/pages/contact' },
  image: cdn('Suudeltavan_sopot_huulet.jpg?v=1758539016'),
  items: [
    {
      q: 'How long does shipping take?',
      a: 'Shipping usually takes 3-7 business days, depending on your location. Expedited shipping options are available for faster delivery. Contact us for any specific shipping inquiries.',
    },
    {
      q: 'Does my piece come in any packaging?',
      a: 'Yes. Every order is packed in protective, sealed packaging so your products arrive exactly as they left us. Gift sets ship in their original branded boxes.',
    },
    {
      q: 'Do you ship all over pakistan?',
      a: 'Yes, we deliver nationwide across Pakistan. Orders over Rs.2000 qualify for free shipping.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept cash on delivery, bank transfer, and all major debit and credit cards at checkout.',
    },
  ],
}

export const RICH_TEXT_2 = {
  heading: 'Spring styles to wear together or apart, whatever the weather.',
  cta: { label: 'Contact Us', href: '/pages/contact' },
}

export const NEWSLETTER = {
  heading: 'Subscribe to get 10% OFF',
  body: 'Subscribe for store updates and discounts.',
  note: 'By subscribing you agree to the Terms of Use & Privacy Policy.',
}

export const FOOTER_ABOUT = {
  heading: 'About',
  body: 'We only carry designs we believe in ethically and aesthetically original, authentic pieces that are made to last.',
  cta: { label: 'Learn More', href: '/pages/contact' },
}

export const POPUP = {
  heading: 'Get 10% Off',
  subheading: 'be in the know',
  body: 'Sexy and sustainable goodies? Sign me up',
  cta: 'Get 10% Off',
  image: cdn('Untitled_design_7.png?v=1759782704'),
}
