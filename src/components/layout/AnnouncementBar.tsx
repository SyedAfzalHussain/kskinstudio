import Marquee from '@/components/ui/Marquee'

export default function AnnouncementBar({ messages }: { messages: string[] }) {
  return (
    <div className="bg-black py-2 text-white">
      <Marquee duration={42}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {messages.map((message) => (
              <span
                key={message}
                className="flex shrink-0 items-center gap-8 whitespace-nowrap px-8 text-[0.6875rem] font-medium tracking-[0.08em]"
              >
                {message}
              </span>
            ))}
          </div>
        ))}
      </Marquee>
    </div>
  )
}
