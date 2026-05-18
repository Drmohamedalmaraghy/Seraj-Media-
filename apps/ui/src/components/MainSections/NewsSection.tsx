import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"

const NEWS = [
  {
    category: "Network",
    title: "Seraj activates 12 new megascreens across Muscat",
    date: "2 days ago",
    image: "/landing-new/brand-card.png",
  },
  {
    category: "Production",
    title: "Inside the Seraj studio: behind the scenes of the new podcast network",
    date: "5 days ago",
    image: "/landing-new/brand-card.png",
  },
  {
    category: "Broadcast",
    title: "Seraj News expands coverage to Salalah with a permanent bureau",
    date: "1 week ago",
    image: "/landing-new/brand-card.png",
  },
]

export default function NewsSection() {
  return (
    <section
      id="news"
      className="relative w-full bg-[#1F1F1F]/40 px-6 py-32 lg:px-10"
    >
      <div className="mx-auto w-full max-w-[1352px]">
        {/* Heading row */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-[12px] font-medium tracking-[0.3em] text-[#F62828] uppercase">
              Last News
            </p>
            <h2 className="mt-5 text-[clamp(32px,5vw,48px)] leading-[1.05] font-[700] tracking-[-0.01em] text-[#FAFAFA]">
              From the{" "}
              <span className="bg-[linear-gradient(150deg,#F62828_0%,#FF4D4D_100%)] bg-clip-text text-transparent">
                field.
              </span>
            </h2>
          </div>
          <a
            href="#all-news"
            className="inline-flex h-5 items-center gap-2 text-[14px] tracking-[0.05em] text-white uppercase transition-colors hover:text-[#F62828] lg:justify-self-end"
          >
            See all news
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* 3 cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {NEWS.map((n) => (
            <article
              key={n.title}
              className="group relative flex h-[420px] flex-col overflow-hidden rounded-3xl border border-[#292929] bg-[linear-gradient(180deg,#1A1A1A_0%,#0F0F0F_100%)] lg:h-[445px]"
            >
              {/* Image */}
              <div className="relative h-[220px] w-full shrink-0 overflow-hidden">
                <Image
                  src={n.image}
                  alt={n.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 inline-flex items-center rounded-full border border-[#F62828]/40 bg-[#F62828]/20 px-3 py-1.5 text-[10px] font-medium tracking-[0.3em] text-[#F62828] uppercase">
                  {n.category}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <h3 className="text-[20px] leading-[1.3] font-[700] tracking-[-0.01em] text-[#FAFAFA] transition-colors group-hover:text-white">
                  {n.title}
                </h3>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[12px] text-[#A6A6A6]">{n.date}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#292929] bg-[#0D0D0D]/60 text-white transition-colors group-hover:border-[#F62828] group-hover:text-[#F62828]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
