import { FC } from "react"

import { cn } from "@/lib/styles"
import CardLocation from "@/components/elementary/CardLocation"
import { ArrowIcon } from "@/components/icons/ArrowIcon"

interface Props {
  card: any
}

const CardMedia: FC<Props> = ({ card }) => {
  return (
    <div className="px-5 py-5 md:px-10 md:py-10 lg:px-15 lg:py-15">
      <div className="mx-auto grid max-w-320 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {card.map((card: any, index: number) => (
          <CardLocation
            seeMoreHref={""}
            imageContainerClassName="rounded-none"
            className="shadow-[1px_3.5px_12.5px_0_rgba(0,0,0,0.15)]"
            image={{
              id: "",
              media: { src: card.img },
            }}
            leftPart={card.size}
            rightPart={card.type}
            title={card.title}
            key={index}
          />
        ))}
      </div>
      <div className="mt-14 flex w-full flex-wrap items-center justify-center gap-2">
        {card.map((_: any, index: number) => (
          <div
            className={cn(
              "flex size-[50px] items-center justify-center text-[#FF1414] hover:bg-[#FF1414]",
              "cursor-pointer rounded-full bg-[#FF1414]/10 text-[20px] font-semibold hover:text-white"
            )}
            key={index}
          >
            {index + 1}
          </div>
        ))}
        <div className="group flex size-[50px] cursor-pointer items-center justify-center rounded-full bg-[#FF1414]/10 hover:bg-[#FF1414]">
          <ArrowIcon className="text-[#FF1414] group-hover:text-white" />
        </div>
      </div>
    </div>
  )
}

export default CardMedia
