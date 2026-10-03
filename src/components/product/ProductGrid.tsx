import ProductCard from './ProductCard'
import type { Product } from '@/lib/types'

export default function ProductGrid({
  products,
  newHandles,
  className = '',
}: {
  products: Product[]
  newHandles?: Set<string>
  className?: string
}) {
  return (
    <ul
      className={`grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ${className}`}
    >
      {products.map((product, i) => (
        <li key={product.handle}>
          <ProductCard
            product={product}
            isNew={newHandles?.has(product.handle)}
            priority={i < 5}
          />
        </li>
      ))}
    </ul>
  )
}
