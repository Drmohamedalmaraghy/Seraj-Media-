import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

const NETWORK = [
  { label: "OOH Locations", href: "#" },
  { label: "Megascreens", href: "#" },
  { label: "Street Furniture", href: "#" },
  { label: "Coverage Map", href: "#" },
]

const BRANDS = [
  { label: "Seraj OOH", href: "#" },
  { label: "Seraj News", href: "#" },
  { label: "Seraj Podcast", href: "#" },
  { label: "Seraj Production", href: "#" },
]

const COMPANY = [
  { label: "About", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Press", href: "#" },
  { label: "Contact", href: "#" },
]

const SOCIALS = [
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
]

export default function MainFooter() {
  return (
    <footer className="relative w-full border-t border-[#292929] bg-[#1F1F1F]/30 px-6 pt-24 pb-8 lg:px-10">
      <div className="mx-auto w-full max-w-[1352px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1fr_repeat(3,200px)]">
          {/* Brand column */}
          <div>
            <Link href="/" aria-label="Seraj by ONEIC Media" className="block">
              <Image
                src="/landing-new/logo.png"
                alt="Seraj by ONEIC Media"
                width={206}
                height={64}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="mt-6 max-w-[360px] text-[16px] leading-[1.5] text-[#A6A6A6]">
              Oman&apos;s largest out-of-home network. Built to make brands
              impossible to miss.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map(({ Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#292929] text-[#A6A6A6] transition-colors hover:border-[#F62828] hover:text-[#F62828]"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn title="Network" items={NETWORK} />
          <FooterColumn title="Brands" items={BRANDS} />
          <FooterColumn title="Company" items={COMPANY} />
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#292929] pt-8">
          <p className="text-[12px] tracking-[0.05em] text-[#A6A6A6] uppercase">
            © 2026 Seraj by ONEIC Media. All rights reserved.
          </p>
          <p className="text-[12px] tracking-[0.05em] text-[#A6A6A6] uppercase">
            Muscat · Sultanate of Oman
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  items,
}: {
  title: string
  items: { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="text-[12px] font-medium tracking-[0.3em] text-[#F62828] uppercase">
        {title}
      </h3>
      <ul className="mt-6 flex list-none flex-col gap-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-[16px] text-[#A6A6A6] transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
