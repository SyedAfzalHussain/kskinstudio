/** Store policy pages. Swap this copy for the merchant's legally reviewed text. */

export type Policy = {
  title: string
  sections: { heading: string; paragraphs: string[] }[]
}

export const POLICIES: Record<string, Policy> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'Information we collect',
        paragraphs: [
          'When you place an order we collect the details needed to fulfil it: your name, delivery address, phone number and email address. Payment details are handled by our payment processor and are never stored on our servers.',
          'We also collect basic analytics about how the store is used so we can improve it.',
        ],
      },
      {
        heading: 'How we use it',
        paragraphs: [
          'Your information is used to process orders, arrange delivery, respond to support requests and — if you opt in — send occasional marketing emails. You can unsubscribe at any time.',
        ],
      },
      {
        heading: 'Sharing',
        paragraphs: [
          'We share delivery details with our courier partners and payment details with our payment processor. We do not sell your personal information.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'For any privacy question, or to request deletion of your data, contact us through the Contact Us page.',
        ],
      },
    ],
  },
  'refund-policy': {
    title: 'Refund Policy',
    sections: [
      {
        heading: 'Returns',
        paragraphs: [
          'Unopened products in their original packaging can be returned within 7 days of delivery. For hygiene reasons, opened skincare and makeup cannot be returned unless the item arrived damaged or incorrect.',
        ],
      },
      {
        heading: 'Damaged or incorrect items',
        paragraphs: [
          'If your order arrives damaged or you received the wrong item, contact us within 48 hours of delivery with photos and we will arrange a replacement or refund at no cost to you.',
        ],
      },
      {
        heading: 'Refund timing',
        paragraphs: [
          'Approved refunds are issued to the original payment method within 7–10 business days of us receiving the returned item.',
        ],
      },
    ],
  },
  'shipping-policy': {
    title: 'Shipping Policy',
    sections: [
      {
        heading: 'Processing',
        paragraphs: [
          'Orders are packed and dispatched within 1–2 business days. You will receive a tracking number by SMS or email once your parcel leaves our warehouse.',
        ],
      },
      {
        heading: 'Delivery times and cost',
        paragraphs: [
          'Delivery takes 3–7 business days depending on your location. Shipping is free on all orders over Rs.2000; below that a flat delivery charge applies at checkout.',
          'We deliver nationwide across Pakistan.',
        ],
      },
    ],
  },
  'terms-of-service': {
    title: 'Terms of Service',
    sections: [
      {
        heading: 'Using this store',
        paragraphs: [
          'By placing an order you confirm that the information you provide is accurate and that you are authorised to use the chosen payment method.',
        ],
      },
      {
        heading: 'Products and pricing',
        paragraphs: [
          'We work to keep product descriptions, availability and prices accurate. If an error affects an order you have placed, we will contact you before dispatch and offer a correction, cancellation or refund.',
        ],
      },
      {
        heading: 'Liability',
        paragraphs: [
          'Products are cosmetics, not medical treatments. Always patch test and read the ingredient list if you have sensitivities. Discontinue use if irritation occurs.',
        ],
      },
    ],
  },
  'contact-information': {
    title: 'Contact Information',
    sections: [
      {
        heading: 'Customer care',
        paragraphs: [
          'Our team is available Monday to Saturday, 10am to 7pm PKT. The fastest way to reach us is the form on the Contact Us page or a direct message on Instagram.',
        ],
      },
      {
        heading: 'Order support',
        paragraphs: [
          'Include your order number in any message about an existing order so we can help straight away.',
        ],
      },
    ],
  },
}
