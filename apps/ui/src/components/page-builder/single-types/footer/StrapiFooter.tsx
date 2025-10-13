import { AppLocale } from "@/types/general"

import { PublicStrapiClient } from "@/lib/strapi-api"
import { cn, DEFAULT_PADDINGS } from "@/lib/styles"
import { Container } from "@/components/elementary/Container"
import StrapiImageWithLink from "@/components/page-builder/components/utilities/StrapiImageWithLink"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"

async function fetchData(locale: AppLocale) {
  try {
    return await PublicStrapiClient.fetchOne("api::footer.footer", undefined, {
      locale,
      populate: {
        address: true,
        icons: {
          populate: {
            image: {
              populate: {
                media: true,
              },
            },
            link: true,
          },
        },
        items: {
          populate: {
            links: true,
          },
        },
      },
    })
  } catch (e: any) {
    console.error(
      `Data for "api::footer.footer" content type wasn't fetched: `,
      e?.message
    )
    return undefined
  }
}

export async function StrapiFooter({ locale }: { readonly locale: AppLocale }) {
  const response = await fetchData(locale)
  const footer = response?.data

  if (!footer) {
    return null
  }

  const { address, items, icons, title } = footer

  return (
    <footer className={cn("bg-dark overflow-hidden", DEFAULT_PADDINGS)}>
      <Container size="2xl" className="relative flex-col gap-6 lg:gap-15">
        {title ? (
          <div
            className={cn(
              "relative me-0 w-full text-[47px] md:me-[20px] md:w-fit",
              "text-white md:text-[60px] lg:text-[100px]"
            )}
          >
            {title}
            <span className="absolute right-0 bottom-0 z-10 h-[1px] w-full bg-white" />
          </div>
        ) : null}

        <div className="z-20 flex flex-col justify-between gap-6 md:flex-row md:gap-[80px]">
          <div
            className={cn(
              "order-2 flex flex-row justify-between gap-6",
              "md:order-0 md:flex-col md:justify-start"
            )}
          >
            {address ? (
              <div className="flex flex-col gap-3 md:gap-6">
                {address?.title ? (
                  <div className="text-[13px] font-semibold text-white md:text-[18px]">
                    {address.title}
                  </div>
                ) : null}

                {address?.description ? (
                  <div className="text-xs text-white md:text-base">
                    {address.description}
                  </div>
                ) : null}
              </div>
            ) : null}

            {icons ? (
              <div
                className={cn(
                  "mt-0 flex h-fit self-end md:gap-6",
                  "gap-2 md:mt-[85px] md:self-start"
                )}
              >
                {icons.map((icon) => (
                  <StrapiImageWithLink
                    imageProps={{
                      className:
                        "size-6 transition-transform duration-300 hover:scale-125 hover:opacity-80",
                    }}
                    key={icon.id}
                    component={icon}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {items?.length ? (
            <div className="flex flex-wrap gap-[80px] gap-y-6">
              {items.map((item) => (
                <div className="flex flex-col gap-3 lg:gap-6" key={item.id}>
                  {item.title ? (
                    <div className="text-[18px] font-semibold text-white">
                      {item.title}
                    </div>
                  ) : null}

                  {item.links?.length ? (
                    <ul className="m-0 list-none p-0">
                      {item.links.map((link) => (
                        <li key={link.id}>
                          <StrapiLink
                            component={link}
                            className="py-2 text-base leading-6 font-normal tracking-[0.15px] text-white underline-offset-4 hover:underline"
                          />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="bg-radial-gradient absolute top-[40px] right-[-300px] size-[439px] md:right-[-250px]" />
        <div className="bg-radial-gradient absolute bottom-0 left-[-300px] size-[439px] md:left-[-250px]" />
      </Container>
    </footer>
  )
}

StrapiFooter.displayName = "StrapiFooter"

export default StrapiFooter
