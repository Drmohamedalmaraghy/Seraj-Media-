import { Data } from "@repo/strapi"

import AppLink from "@/components/elementary/AppLink"
import MainHeaderLocaleSwitcher from "@/components/page-builder/components/sections/main/MainHeaderLocaleSwitcher"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import StrapiButton from "@/components/page-builder/components/utilities/StrapiButton"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"

export function MainHeader({
  component,
}: {
  readonly component: Data.Component<"sections.main-header"> | null | undefined
}) {
  if (!component) return null

  const { desktopLogo, navLinks, ctaButton, withLanguageSwitch } = component

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[81px] border-b border-[#292929]/50 bg-[#0D0D0D]/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-full w-full max-w-[1352px] items-center justify-between px-6 lg:px-10 2xl:px-0">
        <AppLink href="/" aria-label="Home" className="block">
          <StrapiBasicImage
            component={desktopLogo}
            className="h-11 w-auto object-contain"
            useNativeNextImageOnly
            priority
          />
        </AppLink>

        {navLinks?.length ? (
          <nav className="hidden xl:block">
            <ul className="flex list-none items-center gap-8 text-[14px] tracking-[0.05em] text-[#A6A6A6] uppercase">
              {navLinks.map((link, i) => (
                <li key={link.id ?? i}>
                  <StrapiLink
                    component={link}
                    className="transition-colors hover:text-white"
                  />
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="flex items-center gap-3">
          {withLanguageSwitch ? <MainHeaderLocaleSwitcher /> : null}
          {ctaButton ? (
            <StrapiButton
              component={ctaButton}
              className="relative inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(163deg,#F62828_0%,#FF4D4D_100%)] px-8 text-[14px] font-bold tracking-[0.025em] text-white shadow-[0_20px_60px_-20px_rgba(246,40,40,0.5)] transition-transform hover:scale-[1.02]"
              withIconArrow={false}
            />
          ) : null}
        </div>
      </div>
    </header>
  )
}

MainHeader.displayName = "MainHeader"

export default MainHeader
