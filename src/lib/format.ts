/** Shopify PK storefronts render money as `Rs.1,234.00`. */
export function formatMoney(amount: number): string {
  return `Rs.${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function discountPercent(price: number, compareAt: number | null | undefined): number | null {
  if (!compareAt || compareAt <= price) return null
  return Math.round(((compareAt - price) / compareAt) * 100)
}

/** Shopify CDN accepts `width`/`height` params; everything else is left alone. */
export function cdnImage(src: string, width: number): string {
  if (!src) return src
  if (!src.includes('/cdn/shop/')) return src
  const [base, query = ''] = src.split('?')
  const params = new URLSearchParams(query)
  params.set('width', String(width))
  return `${base}?${params.toString()}`
}

export function stripHtml(html: string, max = 200): string {
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
}

export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
