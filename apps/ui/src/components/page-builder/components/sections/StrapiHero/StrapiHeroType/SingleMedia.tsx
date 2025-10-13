import { FC } from "react"

import { cn } from "@/lib/styles"
import { InfoCarousel } from "@/components/elementary/InfoCarousel"
import { Button } from "@/components/ui/button"

const isButton = false
const MOCK_TEXT = [
  { text: "Digital Screen", id: "1" },
  { text: "Outdoor", id: "2" },
  { text: "Media", id: "3" },
  { text: "OutdoorasdaA", id: "4" },
  { text: "OAsdasfasdasd", id: "5" },
]

const BG_GRADIENT =
  "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,20,20,0.52)_0%,rgba(255,20,20,0)_100%)] z-[120]"

const SingleMedia: FC = () => {
  const isArrayText = MOCK_TEXT.length > 1

  return (
    <section
      className={cn(
        "relative isolate flex h-full w-full flex-col py-14 lg:h-[100vh] lg:py-0",
        "items-center justify-center overflow-hidden bg-cover bg-center text-white"
      )}
      style={
        !isArrayText
          ? {
              background:
                "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/hero-test.png') lightgray 50% / cover no-repeat",
            }
          : { background: "#000" }
      }
    >
      <div className="text-stroke max-w-[90%] px-6 text-center text-base lg:px-0">
        Whether you re interested in installing a
      </div>
      <div className="flex flex-col items-center justify-center px-3 text-center lg:px-0">
        {isArrayText ? (
          <div className="relative mx-auto max-w-[100vw] lg:max-w-[900px]">
            <InfoCarousel textArray={MOCK_TEXT} />
          </div>
        ) : (
          <div className="text-[50px] font-medium uppercase md:text-[80px]">
            {MOCK_TEXT[0]?.text}
          </div>
        )}
        <div className="max-w-[420px] px-6 text-base text-[#C4C4C4] md:max-w-[780px] lg:px-0">
          Seraj Media operates a powerful DOOH network with 300+ digital screens
          across 100+ key locations in Oman — including fuel stations,
          supermarkets, government centers, and malls.
        </div>
        {isButton && (
          <Button
            variant="primary"
            className="mt-11 h-10 w-[120px] lg:mt-10 lg:h-10 lg:w-10"
          >
            Become a Partner
          </Button>
        )}
      </div>

      {isArrayText && (
        <>
          <div
            className={cn(
              BG_GRADIENT,
              "absolute top-[40px] right-[-300px] h-[439px] w-[439px] md:right-[-250px]"
            )}
          />
          <div
            className={cn(
              BG_GRADIENT,
              "absolute bottom-0 left-[-300px] h-[439px] w-[439px] md:left-[-250px]"
            )}
          />
        </>
      )}
    </section>
  )
}
export default SingleMedia
