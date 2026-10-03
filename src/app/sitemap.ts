import type { MetadataRoute } from 'next'
import { getAllCollections, getAllProducts } from '@/lib/catalog'
import { POLICIES } from '@/data/policies'

const BASE = 'https://www.thekskinstudio.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/collections', '/brands', '/search', '/pages/contact'].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }))

  return [
    ...staticRoutes,
    ...getAllCollections().map((c) => ({
      url: `${BASE}/collections/${c.handle}`,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...getAllProducts().map((p) => ({
      url: `${BASE}/products/${p.handle}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...Object.keys(POLICIES).map((slug) => ({
      url: `${BASE}/policies/${slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]
}
