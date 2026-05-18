import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const BRANDS = [
  {
    tag: "Network",
    title: "Seraj OOH",
    description: "Out-of-home advertising network across\nOman.",
    image: "/landing-new/brand-card.png",
  },
  {
    tag: "Broadcast",
    title: "Seraj News",
    description: "Independent broadcasts from across the\nSultanate.",
    image: "/landing-new/brand-card.png",
  },
  {
    tag: "Audio",
    title: "Seraj Podcast",
    description: "Long-form conversations with the\nregion's voices.",
    image: "/landing-new/brand-card.png",
  },
  {
    tag: "Studio",
    title: "Seraj Production",
    description: "Full-service creative production for\nbrands and broadcasters.",
    image: "/landing-new/brand-card.png",
  },
]

export default function BrandsSection() {
  return (
    <section
      id="brands"
      className="relative w-full bg-[#1F1F1F]/40 px-6 py-32 lg:px-10"
    >
      <div className="mx-auto w-full max-w-[1352px]">
        {/* Heading row */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-[12px] font-medium tracking-[0.3em] text-[#F62828] uppercase">
              Our Brands
            </p>
            <h2 className="mt-5 text-[clamp(32px,5vw,48px)] leading-[1.05] font-[700] tracking-[-0.01em] text-[#FAFAFA]">
              One name.{" "}
              <span className="bg-[linear-gradient(163deg,#F62828_0%,#FF4D4D_100%)] bg-clip-text text-transparent">
                Four powerhouses.
              </span>
            </h2>
          </div>
          <p className="max-w-[440px] text-[16px] leading-[1.5] text-[#A6A6A6] lg:justify-self-end">
            From massive megascreens to intimate studio sessions — every Seraj
            brand is engineered to capture attention.
          </p>
        </div>

        {/* 2×2 cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {BRANDS.map((b) => (
            <article
              key={b.title}
              className="group relative h-[420px] overflow-hidden rounded-3xl border border-[#292929] bg-[linear-gradient(180deg,#1A1A1A_0%,#0F0F0F_100%)] lg:h-[498px]"
            >
              {/* Bg image faded */}
              <div className="absolute inset-px overflow-hidden rounded-[23px]">
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,#0D0D0D_0%,rgba(13,13,13,0.4)_50%,rgba(13,13,13,0)_100%)]" />
              </div>

              {/* Tag pill */}
              <div className="absolute top-8 left-8 inline-flex items-center rounded-full border border-[#F62828]/40 bg-[#F62828]/20 px-3 py-1.5 text-[10px] font-medium tracking-[0.3em] text-[#F62828] uppercase">
                {b.tag}
              </div>

              {/* Bottom content */}
              <div className="absolute right-8 bottom-8 left-8 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-[clamp(28px,3.5vw,36px)] leading-[1.1] font-[700] tracking-[-0.01em] text-[#FAFAFA]">
                    {b.title}
                  </h3>
                  <p className="mt-3 max-w-[320px] text-[15px] leading-[1.5] whitespace-pre-line text-[#A6A6A6]">
                    {b.description}
                  </p>
                </div>
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#292929] bg-[#0D0D0D]/60 text-white sm:flex">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
