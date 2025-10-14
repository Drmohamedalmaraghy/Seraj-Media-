import { Data } from "@repo/strapi"

import CardIndustries from "@/components/elementary/CardIndustries"
import CkEditorSSRRenderer from "@/components/elementary/ck-editor/CkEditorSSRRenderer"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"

export function StrapiIndustries({
  component,
}: {
  readonly component: Data.Component<"sections.industries">
}) {
  if (!component) {
    return null
  }

  const { description, items, title } = component
  return (
    <Section>
      <Container className="flex-col gap-3 md:gap-10">
        <div className="flex flex-col items-center md:gap-7 gap-3">
          {title ? (
            <CkEditorSSRRenderer
              htmlContent={title?.content}
              className="lg:text-[40px] text-[27px] font-medium text-black"
            />
          ) : null}

          {description ? (
            <CkEditorSSRRenderer
              htmlContent={description?.content}
              className="text-dark-50 max-w-160 text-center text-base"
            />
          ) : null}
        </div>

        {items ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-12">
            {items.map((item) => (
              <CardIndustries
                image={item.image}
                title={item.title ?? ""}
                textDescription={item.description ?? ""}
                key={item.id}
                icon={item?.icon}
              />
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  )
}

StrapiIndustries.displayName = "StrapiIndustries"

export default StrapiIndustries
