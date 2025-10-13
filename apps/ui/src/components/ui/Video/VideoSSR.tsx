import dynamic from "next/dynamic"

import { cn } from "@/lib/styles"

const ReactPlayer = dynamic(() => import("react-player"), { ssr: true })

export default function VideoSSR({
  src,
  className,
}: {
  src: string
  className?: string
}) {
  return (
    <div className="aspect-video h-full min-h-full w-full min-w-full">
      <ReactPlayer
        src={src}
        controls
        width="100%"
        height="100%"
        className={cn("overflow-hidden rounded-[20px]", className)}
      />
    </div>
  )
}
