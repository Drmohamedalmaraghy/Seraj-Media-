"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

import { cn } from "@/lib/styles"
import { PlayButton } from "@/components/icons/PlayButton"

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

export default function VideoCSR({
  src,
  className,
}: {
  readonly src: string
  readonly className?: string
}) {
  const [playing, setPlaying] = useState(false)
  const togglePlay = () => setPlaying((prev) => !prev)

  return (
    <div
      className={cn(
        "group relative aspect-video h-full min-h-full w-full min-w-full overflow-hidden rounded-[12px]",
        className
      )}
    >
      <ReactPlayer
        src={src}
        playing={playing}
        controls={false}
        width="100%"
        height="100%"
        className="bg-dark rounded-[12px]"
      />

      <button
        type="button"
        onClick={togglePlay}
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center",
          "cursor-pointer rounded-[12px]",
          "group-hover:bg-dark/60 transition-all duration-300 ease-in-out"
        )}
      >
        <PlayButton
          className={cn(
            "absolute transition-all duration-300 ease-in-out",
            playing
              ? "pointer-events-none scale-90 opacity-0"
              : "scale-100 opacity-100 hover:scale-110"
          )}
        />

        <div
          className={cn(
            "absolute text-xl text-white transition-all duration-500 ease-in-out",
            playing
              ? "scale-100 opacity-0 group-hover:opacity-100"
              : "pointer-events-none scale-90 opacity-0"
          )}
        >
          ❚❚
        </div>
      </button>
    </div>
  )
}
