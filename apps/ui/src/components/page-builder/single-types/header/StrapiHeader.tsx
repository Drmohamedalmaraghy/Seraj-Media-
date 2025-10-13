import { Suspense } from "react"

import { AppLocale } from "@/types/general"

import { PublicStrapiClient } from "@/lib/strapi-api"
import AppLink from "@/components/elementary/AppLink"
import StrapiContactUsModal from "@/components/page-builder/components/sections/StrapiContactUsModal"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import StrapiButton from "@/components/page-builder/components/utilities/StrapiButton"
import StrapiHeaderItems from "@/components/page-builder/single-types/header/HeaderItems/HeaderItems"
import HeaderLocaleSwitcher from "@/components/page-builder/single-types/header/HeaderLocaleSwitcher"
import { HeaderMobileMenu } from "@/components/page-builder/single-types/header/HeaderMobileMenu"
import HeaderWrapper from "@/components/page-builder/single-types/header/HeaderWrapper"

async function fetchData(locale: AppLocale) {
  try {
    const response = await PublicStrapiClient.fetchOne(
      "api::header.header",
      undefined,
      {
        locale,
        populate: {
          contactUsForm: {
            populate: {
              businessField: true,
              descriptionField: true,
              mailField: true,
              nameField: true,
              submitButton: {
                populate: {
                  icon: {
                    populate: {
                      media: true,
                    },
                  },
                },
              },
            },
          },
          button: true,
          links: true,
          desktopLogo: {
            populate: {
              media: true,
            },
          },
          mobileLogo: {
            populate: {
              media: true,
            },
          },
        },
      }
    )
    return response
  } catch (e: any) {
    console.error(
      `Data for "api::header.header" content type wasn't fetched: `,
      e?.message
    )
    return undefined
  }
}

export async function StrapiHeader({ locale }: { readonly locale: AppLocale }) {
  const response = await fetchData(locale)
  const header = response?.data

  if (header == null) {
    return null
  }

  const { button, links, desktopLogo, mobileLogo, contactUsForm } = header

  return (
    <>
      <HeaderWrapper>
        {links ? (
          <Suspense fallback={null}>
            <HeaderMobileMenu button={button} links={links} />
          </Suspense>
        ) : null}

        <AppLink href="/">
          <StrapiBasicImage
            className="hidden !h-full !w-auto lg:block"
            component={desktopLogo}
          />
          <StrapiBasicImage
            className="!h-full !w-auto lg:hidden"
            component={mobileLogo}
          />
        </AppLink>

        {links ? (
          <Suspense fallback={null}>
            <StrapiHeaderItems links={links} />
          </Suspense>
        ) : null}

        <div className="relative flex items-center gap-5">
          {button ? (
            <StrapiButton
              className="hidden sm:flex md:h-10 md:rounded-[50px] md:px-5 md:text-base"
              size="sm"
              component={button}
            />
          ) : null}

          <Suspense fallback={null}>
            <HeaderLocaleSwitcher />
          </Suspense>
        </div>
      </HeaderWrapper>

      {contactUsForm ? (
        <StrapiContactUsModal component={contactUsForm} />
      ) : null}
    </>
  )
}

StrapiHeader.displayName = "StrapiHeader"

export default StrapiHeader
