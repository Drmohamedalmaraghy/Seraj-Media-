import { Data } from "@repo/strapi"

import { cn } from "@/lib/styles"
import CkEditorSSRRenderer from "@/components/elementary/ck-editor/CkEditorSSRRenderer"
import { Container } from "@/components/elementary/Container"
import { ContactUsForm } from "@/components/elementary/forms/ContactUsForm"
import { Section } from "@/components/elementary/Section"
import ContactsMap from "@/components/page-builder/components/sections/contacts/ContactsMap"

export function StrapiContacts({
  component,
}: {
  readonly component: Data.Component<"sections.contacts">
}) {
  if (!component) {
    return null
  }

  const { cards, customMapPin, form, mapZoom, pinLongitude, pinLatitude } =
    component

  return (
    <Section className={cn()}>
      <Container size="2xl" className="flex-col gap-10 md:gap-15 lg:gap-20">
        {cards ? (
          <div className="flex flex-col gap-3 md:flex-row md:gap-6 lg:gap-12">
            {cards.map(({ id, title, description }) => {
              return (
                <div
                  className="bg-dark-5 flex flex-col gap-3 rounded-[10px] p-3 md:p-6 lg:p-12"
                  key={id}
                >
                  {title ? (
                    <h3 className="text-[25px] font-medium">{title}</h3>
                  ) : null}{" "}
                  {description ? (
                    <CkEditorSSRRenderer
                      htmlContent={description.content}
                      className="text-dark-50 text-base font-medium"
                    />
                  ) : null}
                </div>
              )
            })}
          </div>
        ) : null}

        <div className="m flex flex-col gap-10 p-3 shadow-[1px_3.5px_12.5px_0_rgba(0,0,0,0.15)] sm:flex-row-reverse md:p-6 lg:gap-15 lg:p-12">
          <div className="min-h-[300px] flex-1 overflow-hidden rounded-md shadow-[1px_3.5px_12.5px_0_rgba(0,0,0,0.15)]">
            <ContactsMap
              mapPin={customMapPin}
              mapZoom={mapZoom ?? 1}
              initialCenter={{ lat: pinLatitude ?? 0, lng: pinLongitude ?? 0 }}
            />
          </div>

          {form ? <ContactUsForm className="flex-1" component={form} /> : null}
        </div>
      </Container>
    </Section>
  )
}

StrapiContacts.displayName = "StrapiContacts"

export default StrapiContacts
