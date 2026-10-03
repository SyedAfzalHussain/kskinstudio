const METHODS = ['Visa', 'Mastercard', 'COD', 'Bank']

/** Neutral payment chips — the live store renders provider marks here. */
export default function PaymentIcons() {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {METHODS.map((method) => (
        <li
          key={method}
          className="rounded border border-[--color-border] bg-white px-2 py-1 text-[0.625rem] font-medium uppercase tracking-wide text-[--color-fg-muted]"
        >
          {method}
        </li>
      ))}
    </ul>
  )
}
