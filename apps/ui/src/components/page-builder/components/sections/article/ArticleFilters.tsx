"use client"

import { FC, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"

import { usePathname, useRouter } from "@/lib/navigation"
import { TagsType } from "@/lib/strapi-api/content/tags"
import { cn } from "@/lib/styles"
import { ArrowDown } from "@/components/icons/ArrowDown"
import { SearchIcon } from "@/components/icons/SearchIcon"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface Props {
  searchPlaceholder?: string | null
  filterPlaceholder?: string | null
  tagsFilter: TagsType
  initialSearch: string
  initialTagIds: number[]
}

const ArticleFilters: FC<Props> = ({
  searchPlaceholder,
  filterPlaceholder,
  tagsFilter,
  initialSearch,
  initialTagIds,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [localSearch, setLocalSearch] = useState(initialSearch)
  const [openDropdown, setOpenDropdown] = useState(false)

  // Skip the first debounce so we don't echo the URL back to itself on mount.
  const skipDebounceRef = useRef(true)

  const pushWith = (
    next: Partial<{ search: string; tags: number[] }>
  ) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "")

    if (next.search !== undefined) {
      if (next.search) params.set("search", next.search)
      else params.delete("search")
    }

    if (next.tags !== undefined) {
      if (next.tags.length) params.set("tags", next.tags.join(","))
      else params.delete("tags")
    }

    // Any filter change resets to first page.
    params.delete("page")

    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  useEffect(() => {
    if (skipDebounceRef.current) {
      skipDebounceRef.current = false
      return
    }
    const handler = setTimeout(() => {
      pushWith({ search: localSearch })
    }, 500)
    return () => clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearch])

  const selectedTagNames = (tagsFilter?.data ?? [])
    .filter((tag) => initialTagIds.includes(Number(tag.id)))
    .map((tag) => tag.name || "")

  const toggleTag = (tagId: number) => {
    const next = initialTagIds.includes(tagId)
      ? initialTagIds.filter((id) => id !== tagId)
      : [...initialTagIds, tagId]
    pushWith({ tags: next })
  }

  return (
    <div className="bg-dark-5 -mx-5 md:-mx-10 lg:-mx-15">
      <div
        className={cn(
          "mx-auto grid w-full max-w-[700px]",
          "grid-cols-1 gap-6 px-5 py-6 md:grid-cols-2 lg:py-14"
        )}
      >
        <div className="flex items-center border-b-[2px] border-black hover:border-b-[#ff4d4d]">
          <Input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder={searchPlaceholder || ""}
            className="placeholder:text-dark flex-1 border-none bg-inherit p-0 shadow-none"
          />
          <SearchIcon className="cursor-pointer" />
        </div>

        <div className="flex items-center border-b-[2px] border-black hover:border-b-[#ff4d4d]">
          <DropdownMenu onOpenChange={setOpenDropdown}>
            <DropdownMenuTrigger asChild>
              <div className="flex w-full cursor-pointer items-center justify-between">
                <span>
                  {selectedTagNames.length > 0
                    ? selectedTagNames.join(", ")
                    : filterPlaceholder}
                </span>
                <ArrowDown
                  className={cn(
                    "transition-transform duration-200",
                    openDropdown && "rotate-180"
                  )}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-0 w-[290px] bg-white shadow-lg md:mt-2 md:w-[318px]">
              {tagsFilter?.data?.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag.id}
                  checked={initialTagIds.includes(Number(tag.id))}
                  onCheckedChange={() => toggleTag(Number(tag.id))}
                  className={cn(
                    initialTagIds.includes(Number(tag.id)) && "text-[#ff4d4d]",
                    "cursor-pointer p-2 hover:text-[#ff4d4d]"
                  )}
                >
                  {tag.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

ArticleFilters.displayName = "ArticleFilters"

export default ArticleFilters
