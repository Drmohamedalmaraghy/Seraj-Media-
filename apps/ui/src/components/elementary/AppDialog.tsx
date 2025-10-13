"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useTranslations } from "next-intl"

import type { Dispatch, ReactNode, SetStateAction } from "react"

import { cn } from "@/lib/styles"
import { useHash } from "@/components/providers/ClientProviders"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Props {
  readonly Props?: ReactNode
  readonly header: {
    title: string
    description?: string
  }
  readonly modalName: string
  readonly children: ReactNode
  readonly footerChildren?: ReactNode
  readonly dialogContentClassName?: string
  readonly dialogHeaderClassName?: string
  readonly confirmDialogClose?: boolean
  readonly dialogCloseCallback?: () => void
  readonly open: boolean
  readonly setOpen: Dispatch<SetStateAction<boolean>>
}

const DialogContext = createContext({
  closeModal: () => {},
  // eslint-disable-next-line no-unused-vars
  setConfirmDialogClose: (_: boolean) => {},
  confirmClose: false,
})

export const useDialogContext = () => {
  return useContext(DialogContext)
}

export function AppDialog({
  modalName,
  Props: triggerButton,
  header,
  children,
  footerChildren,
  dialogContentClassName,
  dialogHeaderClassName,
  confirmDialogClose,
  dialogCloseCallback,
  open,
  setOpen,
}: Props) {
  const t = useTranslations("comps.dialog")
  const { hash, clearHash } = useHash()

  const [confirmClose, setConfirmClose] = useState<boolean>(
    confirmDialogClose ?? false
  )

  useEffect(() => {
    if (window.location.hash === `#${modalName}`) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [hash, modalName, setOpen])

  const providerValue = useMemo(
    () => ({
      closeModal: () => setOpen(false),
      confirmClose,
      setConfirmDialogClose: (value: boolean) => {
        setConfirmClose(value)
      },
    }),
    [confirmClose]
  )

  const handleOpenChange = (open: boolean) => {
    if (!!confirmClose && open === false && !confirm(t("confirmClose"))) {
      return
    }
    if (open === false) {
      clearHash()

      if (dialogCloseCallback) {
        dialogCloseCallback()
      }
    }

    setConfirmClose(confirmDialogClose ?? false)
    setOpen(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent
        className={cn(
          "h-full max-h-screen overflow-auto",
          dialogContentClassName
        )}
      >
        <DialogHeader className={cn("mb-4", dialogHeaderClassName)}>
          <DialogTitle className="text-2xl font-semibold">
            {header.title}
          </DialogTitle>
          {header.description && (
            <DialogDescription className="text-justify">
              {header.description}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogContext.Provider value={providerValue}>
          {children}
        </DialogContext.Provider>
        {footerChildren && (
          <DialogFooter className="mt-4">{footerChildren}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
