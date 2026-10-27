'use client'

/**
 * Shopify's CDN resizes images itself via `?width=`. Routing them through
 * Next's optimizer instead timed out on the store's multi-megabyte PNG
 * screenshots (HTTP 500), so ask the CDN for the right width directly.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  try {
    const url = new URL(src)
    url.searchParams.set('width', String(width))
    return url.toString()
  } catch {
    return src
  }
}
