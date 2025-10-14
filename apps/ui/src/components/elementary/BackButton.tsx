"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/styles"
import { ArrowIcon } from "@/components/icons/ArrowIcon"

const BackButton: FC = () => {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => {
        router.back()
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }, 100)
      }}
      className={cn(
        "group hover:bg-primary flex w-fit cursor-pointer",
        "items-center justify-center rounded-full p-2 shadow-lg",
        "transition-transform duration-200 hover:scale-110"
      )}
    >
      <ArrowIcon className="rotate-180 group-hover:text-white" />
    </button>
  )
}
export default BackButton
