"use client"

import { useState } from "react"
import { Data } from "@repo/strapi"
import { useTranslations } from "next-intl"

import { AppDialog } from "@/components/elementary/AppDialog"
import { ContactUsForm } from "@/components/elementary/forms/ContactUsForm"

export const contactUsModalName = "contact-us"

export function StrapiContactUsModal({
  component,
}: {
  readonly component: Data.Component<"sections.contact-us-form">
}) {
  const t = useTranslations("general")
  const [open, setOpen] = useState<boolean>(false)

  if (!component) {
    return null
  }

  const onSuccess = () => {
    setOpen(false)
  }

  return (
    <AppDialog
      modalName={contactUsModalName}
      open={open}
      setOpen={setOpen}
      header={{ title: t("contactUs") }}
      dialogHeaderClassName="sr-only"
    >
      <ContactUsForm onSuccess={onSuccess} component={component} />
    </AppDialog>
  )
}

StrapiContactUsModal.displayName = "StrapiContactUsModal"

export default StrapiContactUsModal
