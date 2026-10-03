import Slideshow from '@/components/home/Slideshow'
import CategoryCards from '@/components/home/CategoryCards'
import ProductTabs, { type TabPanel } from '@/components/home/ProductTabs'
import HighlightText from '@/components/home/HighlightText'
import CollectionList from '@/components/home/CollectionList'
import Lookbook from '@/components/home/Lookbook'
import Press from '@/components/home/Press'
import CardImages from '@/components/home/CardImages'
import BrandStrip from '@/components/home/BrandStrip'
import Features from '@/components/home/Features'
import RichText from '@/components/home/RichText'
import SunscreenShowcase from '@/components/home/SunscreenShowcase'
import ImageWithText from '@/components/home/ImageWithText'
import PromoTiles from '@/components/home/PromoTiles'
import Testimonials from '@/components/home/Testimonials'
import FaqSection from '@/components/home/FaqSection'
import { COLLECTION_LIST, LOOKBOOK, RICH_TEXT_1, RICH_TEXT_2, SUNSCREEN_SHOWCASE } from '@/data/homepage'
import { toHotspotProduct, type HotspotProduct } from '@/lib/hotspot'
import {
  getCollection,
  getCollectionProducts,
  getNewArrivals,
  getProduct,
  getSaleProducts,
} from '@/lib/catalog'

export default function HomePage() {
  const newArrivals = getNewArrivals(12)
  const newHandles = newArrivals.map((p) => p.handle)

  const saleProducts = getSaleProducts(12)
  const tabs: TabPanel[] = [
    { id: 'new', label: 'NEW ARRIVALS', href: '/collections/new-arrivals', products: newArrivals },
    {
      id: 'best',
      label: 'BEST SELLERS',
      href: '/collections/serum-ampoule',
      products: getCollectionProducts('serum-ampoule').slice(0, 12),
    },
    ...(saleProducts.length
      ? [{ id: 'sale', label: 'SALE', href: '/collections/all', products: saleProducts }]
      : []),
  ]

  const counts = Object.fromEntries(
    COLLECTION_LIST.items.map((item) => [
      item.handle,
      getCollection(item.handle)?.productHandles.length ?? 0,
    ]),
  )

  const hotspotProducts = Object.fromEntries(
    LOOKBOOK.slides
      .flatMap((slide) => slide.hotspots)
      .map((spot) => {
        const product = getProduct(spot.handle)
        return product ? ([spot.handle, toHotspotProduct(product)] as const) : null
      })
      .filter((entry): entry is readonly [string, HotspotProduct] => Boolean(entry)),
  )

  const sunscreens = SUNSCREEN_SHOWCASE.handles
    .map((handle) => getProduct(handle))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  const showcase = sunscreens.length
    ? sunscreens
    : getCollectionProducts('sunscreens').slice(0, 8)

  return (
    <>
      <Slideshow />
      <CategoryCards />
      <ProductTabs tabs={tabs} newHandles={newHandles} />
      <HighlightText />
      <CollectionList counts={counts} />
      <Lookbook products={hotspotProducts} />
      <Press />
      <CardImages />
      <BrandStrip />
      <Features />
      <RichText heading={RICH_TEXT_1.heading} cta={RICH_TEXT_1.cta} />
      <SunscreenShowcase products={showcase} />
      <ImageWithText />
      <PromoTiles />
      <Testimonials />
      <FaqSection />
      <RichText heading={RICH_TEXT_2.heading} cta={RICH_TEXT_2.cta} />
    </>
  )
}
