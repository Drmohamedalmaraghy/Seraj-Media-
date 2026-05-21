"use client"

import { ChevronDownIcon } from "@radix-ui/react-icons"
import { Data } from "@repo/strapi"

import { cn } from "@/lib/styles"
import CkEditorCSRRenderer from "@/components/elementary/ck-editor/CkEditorCSRRenderer"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()

export function StrapiFAQ({
  component,
}: {
  readonly component: Data.Component<"sections.faq">
}) {
  if (!component?.items?.length) {
    return null
  }

  const { title, description, items } = component

  const faqMainEntity = items
    .filter((item) => item.question && item.answer?.content)
    .map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(item.answer!.content!),
      },
    }))

  const faqJsonLd = faqMainEntity.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqMainEntity,
      }
    : null

  return (
    <Section className="bg-white">
      {faqJsonLd ? (
        <script id="faqJsonLd" type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      ) : null}

      <Container className="flex-col gap-7 md:gap-12">
        <div className="flex flex-col items-center gap-3 md:gap-5">
          {title ? (
            <CkEditorCSRRenderer
              htmlContent={title.content}
              className="text-center text-[27px] font-medium text-black lg:text-[40px]"
            />
          ) : null}

          {description ? (
            <CkEditorCSRRenderer
              htmlContent={description.content}
              className="text-dark-50 max-w-160 text-center text-base leading-6"
            />
          ) : null}
        </div>

        <Accordion
          type="single"
          collapsible
          className="border-stroke flex w-full flex-col overflow-hidden rounded-2xl border bg-white"
          defaultValue={items[0]?.id ? `${items[0].id}` : undefined}
        >
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={`${item.id}`}
              className={cn(
                "border-stroke border-b last:border-b-0",
                "data-[state=open]:bg-primary-5"
              )}
            >
              <AccordionTrigger
                className={cn(
                  "cursor-pointer text-start text-base font-medium text-black hover:no-underline",
                  "px-5 py-5 md:px-8 md:py-6 md:text-lg",
                  "data-[state=open]:text-primary",
                  "[&_.faq-arrow]:transition-transform [&_.faq-arrow]:duration-200",
                  "[&[data-state=open]_.faq-arrow]:rotate-180",
                  "[&[data-state=open]_.faq-arrow]:border-primary",
                  "[&[data-state=open]_.faq-arrow_svg]:text-primary"
                )}
              >
                <span className="flex-1">{item.question}</span>
                <span
                  aria-hidden="true"
                  className="faq-arrow border-stroke flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-white md:h-10 md:w-10"
                >
                  <ChevronDownIcon className="text-dark-50 h-4 w-4 md:h-5 md:w-5" />
                </span>
              </AccordionTrigger>

              {item.answer?.content ? (
                <AccordionContent className="px-5 pb-6 md:px-8 md:pb-8">
                  <CkEditorCSRRenderer
                    htmlContent={item.answer.content}
                    className="text-dark-50 text-sm leading-6 md:text-base"
                  />
                </AccordionContent>
              ) : null}
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  )
}

StrapiFAQ.displayName = "StrapiFAQ"

export default StrapiFAQ
