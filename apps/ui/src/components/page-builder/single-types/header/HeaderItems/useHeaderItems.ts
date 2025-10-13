import { RefObject, useEffect, useRef, useState } from "react"
import { Data } from "@repo/strapi"

import useResize from "@/hooks/useResize"

import { calculateVisibleItems } from "./utils"

interface Output {
  visibleItemsCount: number
  navRef: RefObject<HTMLDivElement>
  isClient: boolean
}

interface Input {
  readonly links: Data.Component<"utilities.link">[]
}

const PADDING = 0
const RESIZE_THROTTLING = 500

const useHeaderItems = ({ links }: Input): Output => {
  const [isClient, setIsClient] = useState<boolean>(false)
  const navRef = useRef<HTMLDivElement | null>(null)
  const [visibleItemsCount, setVisibleItemsCount] = useState(links.length)
  const handleResize = () => {
    setVisibleItemsCount(
      calculateVisibleItems(navRef.current, '[id="nav-bar"]', PADDING)
    )
  }
  useResize(() => {
    handleResize()
  }, RESIZE_THROTTLING)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!links.length) return
    handleResize()
  }, [links.length])

  return { visibleItemsCount, navRef, isClient }
}

export default useHeaderItems
