export type ProductImage = {
  src: string
  width: number
  height: number
  alt: string | null
}

export type ProductVariant = {
  id: number
  title: string
  sku: string | null
  price: number
  compareAtPrice: number | null
  available: boolean
  options: string[]
  featuredImage: string | null
}

export type ProductOption = {
  name: string
  values: string[]
}

export type Product = {
  id: number
  handle: string
  title: string
  vendor: string
  type: string
  tags: string[]
  publishedAt: string
  descriptionHtml: string
  options: ProductOption[]
  images: ProductImage[]
  variants: ProductVariant[]
}

export type Collection = {
  id: number
  handle: string
  title: string
  description: string
  image: string | null
  productHandles: string[]
}

export type Catalog = {
  shop: string
  scrapedAt: string
  currency: string
  products: Product[]
  collections: Collection[]
}

export type CartLine = {
  variantId: number
  productHandle: string
  quantity: number
}
