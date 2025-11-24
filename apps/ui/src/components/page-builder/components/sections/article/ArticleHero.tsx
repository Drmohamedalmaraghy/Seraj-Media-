import { Calendar } from "lucide-react"
import { getTranslations } from "next-intl/server"

import type { Data } from "@repo/strapi"
import { AppLocale } from "@/types/general"

import { getFormattedDate } from "@/lib/dates"
import { cn } from "@/lib/styles"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"

export function ArticleHero({
  image,
  title,
  author,
  articlePublicationDate,
}: {
  readonly image: Data.Component<"utilities.basic-image"> | undefined | null
  readonly title: string | null | undefined
  readonly author: Data.Entity<"api::author.author"> | null | undefined
  articlePublicationDate?: any
}) {
  return (
    <Section className="bg-gray">
      <Container
        className="mt-15 flex-col gap-5 md:mt-10 lg:mt-5 lg:gap-7"
        size="2xl"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <div className="flex h-full flex-1 flex-col justify-between gap-5">
            {title ? (
              <h1
                className={cn(
                  "w-full text-[20px] leading-[120%] font-normal text-black",
                  "md:text-[30px]",
                  "lg:text-[40px]"
                )}
              >
                {title}
              </h1>
            ) : null}

            {author ? (
              <div className="flex justify-between gap-12.5">
                <AuthorBlock author={author} />

                {articlePublicationDate ? (
                  <div className="text-dark-50 flex items-center gap-1 text-xs leading-5 font-medium lg:ms-auto">
                    <Calendar className="h-4 w-4" />
                    {getFormattedDate(
                      articlePublicationDate,
                      (author.locale as AppLocale) ?? "en"
                    )}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* RIGHT SIDE (IMAGE) */}
          {image ? (
            <div className="w-full shrink-0 lg:w-[45%]">
              <StrapiBasicImage
                component={image}
                className="!h-auto max-h-123 !w-full rounded-[10px] object-cover"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}

const AuthorBlock = async ({
  author,
  className,
}: {
  readonly author: Data.Entity<"api::author.author">
  readonly className?: string
}) => {
  const t = await getTranslations("general")

  return (
    <div className={cn("flex items-center gap-2 lg:gap-3", className)}>
      {author.avatar ? (
        <StrapiBasicImage
          component={author.avatar}
          className="!h-8 !w-auto rounded-md lg:!h-12.5"
        />
      ) : null}

      {(author.name || author.pages?.length) && (
        <div className="flex flex-col gap-0.5">
          {author.name ? (
            <span className="text-xs leading-[normal] font-medium lg:text-sm">
              {author.name}
            </span>
          ) : null}

          {author.pages?.length ? (
            <span className="text-[10px] leading-[10.37px] font-normal">
              {author.pages?.length} {t("post")}
            </span>
          ) : null}
        </div>
      )}
    </div>
  )
}

ArticleHero.displayName = "ArticleHero"

export default ArticleHero
