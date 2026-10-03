import { MAIN_MENU, BRAND_HANDLES } from '@/data/navigation'
import { getBrandCollections } from '@/lib/catalog'
import { ANNOUNCEMENTS } from '@/data/homepage'
import AnnouncementBar from './AnnouncementBar'
import HeaderClient from './HeaderClient'

/** Server shell: resolves brand titles from the catalog, then hands off to the client header. */
export default function Header() {
  const brands = getBrandCollections(BRAND_HANDLES).map((c) => ({
    id: c.id,
    handle: c.handle,
    title: c.title,
    description: '',
    image: null,
    productHandles: [],
  }))

  return (
    <>
      <AnnouncementBar messages={ANNOUNCEMENTS} />
      <HeaderClient menu={MAIN_MENU} brands={brands} />
    </>
  )
}
