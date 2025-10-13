"use client"

import { FC, useEffect, useState } from "react"

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
  setSearch: React.Dispatch<React.SetStateAction<string>>
  search: string
  blogTags: number[]
  setBlogTags: React.Dispatch<React.SetStateAction<number[]>>
  infoContentFilter?: {
    searchPlaceholder?: string | null
    filterPlaceholder?: string | null
    tagsFilter: TagsType
  }
}

export const Filters: FC<Props> = ({
  infoContentFilter,
  setBlogTags,
  setSearch,
  search,
  blogTags,
}) => {
  const [tags, setTags] = useState<string[]>([])
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)

  const [localSearch, setLocalSearch] = useState(search)

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localSearch)
    }, 500)
    return () => {
      clearTimeout(handler)
    }
  }, [localSearch, setSearch])

  useEffect(() => {
    if (!infoContentFilter?.tagsFilter?.data) return

    const selectedTagNames = infoContentFilter.tagsFilter.data
      .filter((tag) => blogTags.includes(Number(tag.id)))
      .map((tag) => tag.name || "")

    setTags(selectedTagNames)
  }, [blogTags, infoContentFilter])

  const toggleTag = (tag: string, tagId: number) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )

    setBlogTags((prev: number[]) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    )
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
            placeholder={infoContentFilter?.searchPlaceholder || ""}
            className="placeholder:text-dark flex-1 border-none bg-inherit p-0 shadow-none"
          />
          <SearchIcon className="cursor-pointer" />
        </div>

        <div className="flex items-center border-b-[2px] border-black hover:border-b-[#ff4d4d]">
          <DropdownMenu onOpenChange={setOpenDropdown}>
            <DropdownMenuTrigger asChild>
              <div className="flex w-full cursor-pointer items-center justify-between">
                <span>
                  {tags.length > 0
                    ? tags.join(", ")
                    : infoContentFilter?.filterPlaceholder}
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
              {infoContentFilter?.tagsFilter.data.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag.id}
                  checked={tags.includes(tag?.name || "")}
                  onCheckedChange={() =>
                    toggleTag(tag?.name || "", Number(tag.id))
                  }
                  className={cn(
                    tags.includes(tag?.name || "") && "text-[#ff4d4d]",
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

export default Filters
