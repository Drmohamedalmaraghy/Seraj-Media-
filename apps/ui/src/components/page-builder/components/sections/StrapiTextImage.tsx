import { Data } from "@repo/strapi"
import { CircleCheck } from "lucide-react"

import CkEditorSSRRenderer from "@/components/elementary/ck-editor/CkEditorSSRRenderer"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"

export function StrapiTextImage({
  component,
}: {
  readonly component: Data.Component<"sections.text-image">
}) {
  if (!component) {
    return null
  }

  const { items, image, description, title } = component

  return (
    <Section className="bg-dark-5">
      <Container className="flex-col gap-8 md:flex-row">
        <div className="flex flex-col justify-center gap-8 md:w-1/2">
          {title ? (
            <CkEditorSSRRenderer
              htmlContent={title?.content}
              className="text-center text-[32px] font-medium md:text-[40px] lg:text-start"
            />
          ) : null}

          {description ? (
            <CkEditorSSRRenderer
              htmlContent={description?.content}
              className="text-dark-50 text-base"
            />
          ) : null}

          {items ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
              {items?.map(({ description, id, title }) => {
                return (
                  <div key={id}>
                    <div className="flex items-start gap-3">
                      <CircleCheck className="text-primary mt-1.5 h-5 min-w-5" />
                      {title ? (
                        <h5 className="text-xl leading-[150%] font-medium">
                          {title}
                        </h5>
                      ) : null}
                    </div>

                    {description ? (
                      <CkEditorSSRRenderer
                        htmlContent={description?.content}
                        className="text-dark-50 ms-8 text-base leading-[150%] font-normal"
                      />
                    ) : null}
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>

        <div className="flex md:w-1/2">
          {image?.media ? (
            <StrapiBasicImage className="!h-auto !w-full" component={image} />
          ) : null}
        </div>
      </Container>
    </Section>
  )
}

StrapiTextImage.displayName = "StrapiTextImage"

export default StrapiTextImage
