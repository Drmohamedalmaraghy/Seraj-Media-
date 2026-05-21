import { Data } from "@repo/strapi"

import AppLink from "@/components/elementary/AppLink"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"

export function MainFooter({
  component,
}: {
  readonly component: Data.Component<"sections.main-footer"> | null | undefined
}) {
  if (!component) return null

  const { logo, brandDescription, socials, columns, copyright, locationLine } =
    component

  const columnsList = columns ?? []
  const socialsList = socials ?? []

  return (
    <footer className="relative w-full border-t border-[#292929] bg-[#1F1F1F]/30 px-6 pt-24 pb-8 lg:px-10">
      <div className="mx-auto w-full max-w-[1352px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1fr_repeat(3,200px)]">
          <div>
            <AppLink href="/" aria-label="Home" className="block">
              <StrapiBasicImage
                component={logo}
                className="h-14 w-auto object-contain"
                useNativeNextImageOnly
              />
            </AppLink>
            {brandDescription ? (
              <p className="mt-6 max-w-[360px] text-[16px] leading-[1.5] text-[#A6A6A6]">
                {brandDescription}
              </p>
            ) : null}
            {socialsList.length ? (
              <div className="mt-7 flex items-center gap-3">
                {socialsList.map((social, i) => (
                  <StrapiLink
                    key={social.id ?? i}
                    component={social.link}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#292929] text-[#A6A6A6] transition-colors hover:border-[#F62828] hover:text-[#F62828]"
                  >
                    <StrapiBasicImage
                      component={social.image}
                      className="h-4 w-4 object-contain"
                      useNativeNextImageOnly
                    />
                  </StrapiLink>
                ))}
              </div>
            ) : null}
          </div>

          {columnsList.map((column, i) => (
            <div key={column.id ?? i}>
              <h3 className="text-[12px] font-medium tracking-[0.3em] text-[#F62828] uppercase">
                {column.title}
              </h3>
              <ul className="mt-6 flex list-none flex-col gap-3">
                {(column.links ?? []).map((link, j) => (
                  <li key={link.id ?? j}>
                    <StrapiLink
                      component={link}
                      className="text-[16px] text-[#A6A6A6] transition-colors hover:text-white"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#292929] pt-8">
          {copyright ? (
            <p className="text-[12px] tracking-[0.05em] text-[#A6A6A6] uppercase">
              {copyright}
            </p>
          ) : null}
          {locationLine ? (
            <p className="text-[12px] tracking-[0.05em] text-[#A6A6A6] uppercase">
              {locationLine}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  )
}

MainFooter.displayName = "MainFooter"

export default MainFooter
