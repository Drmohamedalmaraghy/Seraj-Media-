"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/styles"

// ---- MOCK ----
const MOCK_POSTS = [
  {
    id: 1,
    title: "Lorem Ipsum Dolor Sit Amet, Consectetur.",
    description:
      "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.",
    date: "July 14, 2025",
    author: "Name",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    image: "https://picsum.photos/id/1011/600/400",
  },
  {
    id: 2,
    title: "Lorem Ipsum Dolor Sit Amet, Consectetur.",
    description:
      "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.",
    date: "July 14, 2025",
    author: "Name",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    image: "https://picsum.photos/id/1015/600/400",
  },
  {
    id: 3,
    title: "Lorem Ipsum Dolor Sit Amet, Consectetur.",
    description:
      "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.",
    date: "July 14, 2025",
    author: "Name",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    image: "https://picsum.photos/id/1016/600/400",
  },
  {
    id: 4,
    title: "Lorem Ipsum Dolor Sit Amet, Consectetur.",
    description:
      "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.",
    date: "July 14, 2025",
    author: "Name",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    image: "https://picsum.photos/id/1019/600/400",
  },
  {
    id: 5,
    title: "Lorem Ipsum Dolor Sit Amet, Consectetur.",
    description:
      "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.",
    date: "July 14, 2025",
    author: "Name",
    avatar: "https://randomuser.me/api/portraits/women/64.jpg",
    image: "https://picsum.photos/id/1020/600/400",
  },
  {
    id: 6,
    title: "Lorem Ipsum Dolor Sit Amet, Consectetur.",
    description:
      "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.",
    date: "July 14, 2025",
    author: "Name",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    image: "https://picsum.photos/id/1024/600/400",
  },
  {
    id: 7,
    title: "Lorem Ipsum Dolor Sit Amet, Consectetur.",
    description:
      "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.",
    date: "July 14, 2025",
    author: "Name",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    image: "https://picsum.photos/id/1035/600/400",
  },
  {
    id: 8,
    title: "Lorem Ipsum Dolor Sit Amet, Consectetur.",
    description:
      "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.",
    date: "July 14, 2025",
    author: "Name",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    image: "https://picsum.photos/id/1040/600/400",
  },
]

export default function PostsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  })

  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="mt-8 w-full lg:mt-16">
      <div className="mb-0 flex items-center px-11 text-lg text-[20px] font-semibold text-[#3E3232] lg:mb-4">
        <div className="me-2 h-[15px] w-[6px] rounded-[12px] bg-[#F81539]" />
        Top Posts
      </div>

      <div className="overflow-hidden py-8 pl-8" ref={emblaRef}>
        <div className="flex">
          {MOCK_POSTS.map((post) => (
            <div
              key={post.id}
              className={cn(
                "group me-4 max-w-[360px] flex-[0_0_85%]",
                "cursor-pointer last:me-0 sm:flex-[0_0_45%] md:flex-[0_0_30%]"
              )}
            >
              <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md">
                <div className="h-[180px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className={cn(
                      "h-full w-full object-cover transition-transform",
                      "duration-300 ease-in-out group-hover:scale-125"
                    )}
                  />
                </div>
                <div className="group-hover:bg-dark/10 flex flex-1 flex-col p-4">
                  <div className="mb-2 line-clamp-2 font-semibold text-[#3E3232]">
                    {post.title}
                  </div>
                  <div className="mt-1 line-clamp-2 text-[14px] text-[#3E3232BF]">
                    {post.description}
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-[12px] bg-[#F5F5F5] px-2 py-3">
                    <div className="flex items-center gap-2">
                      <Image
                        src={post.avatar}
                        alt={post.author}
                        width={32}
                        height={32}
                        className="rounded-[12px]"
                      />
                      <div className="text-[14px]">
                        <div className="font-medium text-[#3E3232]">
                          {post.author}
                        </div>
                        <div className="text-xs text-[#3E3232BF]">
                          {post.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center justify-center gap-2">
          <ChevronLeft size={18} />
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 font-medium transition",
              canPrev
                ? "bg-gray-100 text-red-500 hover:bg-gray-200"
                : "cursor-not-allowed bg-gray-100 text-gray-400"
            )}
          >
            Prev
          </button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 font-medium transition",
              canNext
                ? "bg-red-500 text-white hover:bg-red-600"
                : "cursor-not-allowed bg-red-200 text-white"
            )}
          >
            Next
          </button>
          <ChevronRight size={18} />
        </div>
      </div>
    </div>
  )
}
