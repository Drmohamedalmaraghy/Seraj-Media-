"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Data } from "@repo/strapi"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/styles"
import { AppField } from "@/components/forms/AppField"
import { AppForm } from "@/components/forms/AppForm"
import { AppTextArea } from "@/components/forms/AppTextArea"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import { useHash } from "@/components/providers/ClientProviders"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const botToken = "8481218082:AAEo_iSB-F8l2QRIXBfawr8zCsRzKavzlxc"
const chatId = "-4807699241"

export function ContactUsForm({
  component,
  onSuccess,
  className,
}: Readonly<{
  readonly component: Data.Component<"sections.contact-us-form">
  readonly onSuccess?: () => void
  readonly className?: string
}>) {
  const t = useTranslations("general")
  const { toast } = useToast()
  const { clearHash } = useHash()
  const [isLoading, setIsLoading] = useState(false)

  const {
    nameField,
    mailField,
    businessField,
    descriptionField,
    submitButton,
  } = component

  const form = useForm<z.infer<ContactUsFormSchemaType>>({
    resolver: zodResolver(contactUsFormSchema),
    mode: "onBlur",
    reValidateMode: "onSubmit",
    disabled: isLoading,
  })

  async function onSubmit(values: z.infer<ContactUsFormSchemaType>) {
    try {
      const res = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `
<strong>Contact US</strong>
<b>Full name:</b> ${values.name}
<b>Email:</b> ${values.email}
<b>Business Name:</b> ${values.businessName}
<b>Description:</b> ${values.description}
          `,
            parse_mode: "HTML",
          }),
        }
      )

      if (res.ok) {
        clearHash()

        toast({
          variant: "default",
          description: t("successMessage"),
        })
        if (onSuccess) {
          onSuccess()
        }
      } else {
        toast({
          variant: "warning",
          description: t("errorMessage"),
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error: " + error,
      })
    } finally {
      setIsLoading(false)
      form.reset()
    }
  }

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <AppForm
        form={form}
        onSubmit={onSubmit}
        id={contactUsFormName}
        className="h-full w-full"
      >
        <div className="flex w-full flex-col gap-2 lg:flex-row lg:gap-6">
          <AppField
            name="name"
            type="text"
            containerClassName="w-full"
            label={nameField?.label}
            placeholder={nameField?.placeholder ?? ""}
          />

          <AppField
            name="email"
            type="text"
            autoComplete="email"
            containerClassName="w-full"
            label={mailField?.label}
            placeholder={mailField?.placeholder ?? ""}
          />
        </div>

        <AppField
          name="businessName"
          type="text"
          label={businessField?.label}
          placeholder={businessField?.placeholder ?? ""}
        />

        <AppTextArea
          textAreaWrapperClassName="bg-white rounded-[10px] h-75 px-4 py-4.5 shadow-[0_0_26px_0_rgba(0,0,0,0.07)]"
          fieldClassName="min-h-30"
          name="description"
          type="text"
          placeholder={descriptionField?.placeholder ?? ""}
          label={descriptionField?.label}
          aria-label="description"
        />

        <Button
          disabled={isLoading}
          isLoading={isLoading}
          type="submit"
          className="w-full gap-2 lg:ms-auto lg:w-fit"
          size="lg"
          form={contactUsFormName}
        >
          {submitButton?.icon ? (
            <StrapiBasicImage component={submitButton.icon} />
          ) : null}
          {submitButton?.label}
        </Button>
      </AppForm>
    </div>
  )
}

export const contactUsFormSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().min(1).email(),
  businessName: z.string().trim(),
  description: z.string().trim(),
})

type ContactUsFormSchemaType = typeof contactUsFormSchema

export const contactUsFormName = "contactUsForm"
