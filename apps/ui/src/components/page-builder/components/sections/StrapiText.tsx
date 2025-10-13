import { Data } from "@repo/strapi"

import CkEditorSSRRenderer from "@/components/elementary/ck-editor/CkEditorSSRRenderer"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"
import StrapiButton from "@/components/page-builder/components/utilities/StrapiButton"

export function StrapiText({
  component,
}: {
  readonly component: Data.Component<"sections.text">
}) {
  if (!component) {
    return null
  }

  const { text, description, buttons } = component

  return (
    <Section>
      <Container className="flex-col items-center">
        {text ? (
          <h1 className="text-center text-4xl leading-[normal] font-medium md:leading-[150%] md:font-medium lg:text-[40px]">
            {text}
          </h1>
        ) : null}
        {description ? (
          <CkEditorSSRRenderer
            htmlContent={description?.content}
            className="text-dark-50 text-base leading-6 font-medium tracking-[0.5px]"
          />
        ) : null}

        {buttons ? (
          <div className="flex flex-col gap-5 md:flex-row md:gap-10">
            {buttons.map((button) => {
              return (
                <StrapiButton key={button.id} size="lg" component={button} />
              )
            })}
          </div>
        ) : null}
      </Container>
    </Section>
  )
}

StrapiText.displayName = "StrapiText"

export default StrapiText
