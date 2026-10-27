import { FEATURES } from '@/data/homepage'
import {
  CardIcon,
  ChatIcon,
  ReturnIcon,
  ShieldIcon,
  TruckIcon,
} from '@/components/ui/icons'

const ICONS = [TruckIcon, ShieldIcon, CardIcon, ChatIcon, ReturnIcon]

export default function Features() {
  return (
    <section className="page-width py-10">
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {FEATURES.map((feature, i) => {
          const Icon = ICONS[i] ?? TruckIcon
          return (
            <li key={feature} className="flex items-center gap-3">
              <Icon className="h-6 w-6 shrink-0 text-(--color-fg-muted)" />
              <span className="text-sm font-medium">{feature}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
