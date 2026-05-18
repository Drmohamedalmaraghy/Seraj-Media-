"use client"

import { usePathname } from "next/navigation"

export default function LayoutHider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  if (pathname?.includes("/landing-new")) return null
  return <>{children}</>
}
