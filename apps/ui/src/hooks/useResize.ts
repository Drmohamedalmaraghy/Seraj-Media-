import { useEffect, useRef } from "react"
import { throttle } from "lodash"

type ResizeFunction = (event: Event) => void

const useResize = (callback: ResizeFunction, delay: number): void => {
  const throttled = useRef(throttle(callback, delay)).current

  useEffect(() => {
    if (typeof window === "undefined") return

    throttled({
      target: { innerWidth: window.innerWidth },
    } as unknown as Event)

    window.addEventListener("resize", throttled)

    return () => {
      throttled.cancel()

      window.removeEventListener("resize", throttled)
    }
  }, [throttled])
}

export default useResize
