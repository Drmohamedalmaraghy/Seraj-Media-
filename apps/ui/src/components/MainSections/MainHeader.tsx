import Image from "next/image"
import Link from "next/link"

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About us", href: "#about" },
  { label: "OOH", href: "#locations" },
  { label: "News", href: "#news" },
  { label: "Podcast", href: "#podcast" },
  { label: "Production", href: "#production" },
  { label: "Contact us", href: "#contact" },
]

export default function MainHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[81px] border-b border-[#292929]/50 bg-[#0D0D0D]/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-full w-full max-w-[1352px] items-center justify-between px-6 lg:px-10 2xl:px-0">
        <Link href="/" aria-label="Seraj by ONEIC Media" className="block">
          <Image
            src="/landing-new/logo.png"
            alt="Seraj by ONEIC Media"
            width={142}
            height={44}
            priority
            className="h-11 w-auto object-contain"
          />
        </Link>

        <nav className="hidden xl:block">
          <ul className="flex list-none items-center gap-8 text-[14px] tracking-[0.05em] text-[#A6A6A6] uppercase">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-9 w-[77px] items-center justify-center gap-1 rounded-full border border-[#292929] text-[12px] tracking-[0.2em] uppercase"
            aria-label="Toggle language"
          >
            <span className="text-[#F62828]">EN</span>
            <span className="text-[#A6A6A6]">/</span>
            <span className="text-[#A6A6A6]">ع</span>
          </button>

          <Link
            href="#contact"
            className="relative inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(163deg,#F62828_0%,#FF4D4D_100%)] px-8 text-[14px] font-bold tracking-[0.025em] text-white shadow-[0_20px_60px_-20px_rgba(246,40,40,0.5)] transition-transform hover:scale-[1.02]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  )
}
