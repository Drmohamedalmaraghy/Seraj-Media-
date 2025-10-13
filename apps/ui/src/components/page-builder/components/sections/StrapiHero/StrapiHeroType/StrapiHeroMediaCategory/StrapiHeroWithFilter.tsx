"use client"

import {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Data } from "@repo/strapi"

import { cn } from "@/lib/styles"
import { ArrowIcon } from "@/components/icons/ArrowIcon"
import { ChevronIcon } from "@/components/icons/ChevronIcon"
import { MapIcon } from "@/components/icons/MapIcon"
import { PinIcon } from "@/components/icons/PinIcon"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export enum FilterTab {
  Catalog = "catalog",
  Map = "map",
}

type Location = {
  id: number
  documentId: string
  name: string
  type: string
  isMainLocation: boolean
  latitude: number
  longitude: number
  width: number
  height: number
  sizeFormFactor: string
}

type City = {
  id: number
  name: string
  locations: Location[]
}

type Region = {
  id: number
  name: string
  cities: City[]
  latitude?: number
  longitude?: number
}

interface Props {
  className?: string
  regions: { data: Region[] }
  setCardRender: any
  ref: MutableRefObject<HTMLDivElement | null>
  readonly component?: Data.Component<"sections.locations-view">
  // onCapitalPickCameraChange: any
  locale?: "ar" | "en"
}

const TAB_QUERY = "tab"
interface Option {
  label: string
}

interface MultiSelectProps {
  label: string
  value: string[]
  options: Option[]
  onChange: (val: string[]) => void
  allTitle: string
  locale?: "ar" | "en"
}

const arraysEqual = (a: string[], b: string[]) => {
  if (a === b) return true
  if (a.length !== b.length) return false
  const sa = [...a].sort()
  const sb = [...b].sort()
  return sa.every((v, i) => v === sb[i])
}

const MultiSelect: FC<MultiSelectProps> = ({
  label,
  value,
  options,
  onChange,
  allTitle,
  locale,
}) => {
  const [open, setOpen] = useState(false)

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <div className="relative flex w-full max-w-[50px] flex-col gap-1 sm:max-w-[150px]">
      <span className="text-xs text-white">{label}</span>

      <Select open={open} onOpenChange={setOpen}>
        <SelectTrigger className="relative cursor-pointer appearance-none !border-none px-0 text-white">
          <div className="max-w-[calc(100%-18px)] truncate">
            {value.length > 0 ? value.join(", ") : allTitle}
          </div>
          <ChevronIcon
            className={cn(
              "pointer-events-none absolute top-1/2 transition-transform",
              "right-0 z-50 h-4 w-4 -translate-y-1/2 text-white",
              open ? "rotate-180" : "rotate-0"
            )}
          />
        </SelectTrigger>

        <SelectContent
          dir={locale === "en" ? "ltr" : "rtl"}
          position="popper"
          side="bottom"
          sideOffset={4}
          className="max-h-60 w-full overflow-auto bg-white p-2"
        >
          {options.map((item) => (
            <button
              type="button"
              key={item.label}
              className={cn(
                "mb-1 flex w-full cursor-pointer items-center gap-2 rounded-[3px] hover:text-[#ff4d4d]",
                value.includes(item.label)
                  ? "text-[#ff4d4d]"
                  : "text-[#3E3232BF]"
              )}
              onClick={() => toggleOption(item.label)}
            >
              <div className="flex size-4 items-center justify-center rounded-[2px] border-[1px] border-[#606060]">
                <div
                  className={cn(
                    "size-2.5 rounded-[2px]",
                    value.includes(item.label) && "bg-[#F00]"
                  )}
                />
              </div>
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

const FilterHeader: FC<Props> = ({
  className,
  regions,
  setCardRender,
  ref,
  component,
  // onCapitalPickCameraChange,
  locale,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab =
    (searchParams.get(TAB_QUERY) as FilterTab) || FilterTab.Catalog

  const responseRegionsData = regions.data

  const [regionFilter, setRegionFilter] = useState<string[]>([])
  const [cityFilter, setCityFilter] = useState<string[]>([])
  const [sizesFilter, setSizesFilter] = useState<string[]>([])
  const [typeFilter, setTypeFilter] = useState<string[]>([])

  // --- flatten locations ---
  const allLocations = useMemo(() => {
    return (
      responseRegionsData?.flatMap((region) =>
        region.cities.flatMap((city) =>
          city.locations.map((loc) => ({
            ...loc,
            city: city.name,
            region: region.name,
            fullName: `${region.name} ${city.name} ${loc.name}`,
            regionId: region.id,
            cityId: city.id,
          }))
        )
      ) || []
    )
  }, [responseRegionsData])

  // --- helpers to read URL params ---
  const parseParam = useCallback(
    (key: string) => {
      const v = searchParams.get(key)
      if (!v) return [] as string[]
      return v.split(",").filter(Boolean)
    },
    [searchParams]
  )

  const buildAndReplace = useCallback(
    (next: {
      region?: string[]
      city?: string[]
      type?: string[]
      sizes?: string[]
      tab?: string
    }) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      if (next.region !== undefined) {
        if (next.region.length) params.set("region", next.region.join(","))
        else params.delete("region")
      }
      if (next.city !== undefined) {
        if (next.city.length) params.set("city", next.city.join(","))
        else params.delete("city")
      }
      if (next.type !== undefined) {
        if (next.type.length) params.set("type", next.type.join(","))
        else params.delete("type")
      }
      if (next.sizes !== undefined) {
        if (next.sizes.length) params.set("sizes", next.sizes.join(","))
        else params.delete("sizes")
      }
      if (next.tab !== undefined) {
        if (next.tab) params.set(TAB_QUERY, next.tab)
        else params.delete(TAB_QUERY)
      }
      const qs = params.toString()
      const url = qs ? `${pathname}?${qs}` : pathname
      router.replace(url, { scroll: false })
    },
    [searchParams, router, pathname]
  )

  // --- derived option lists ---
  const regionOptions: Option[] = useMemo(
    () => responseRegionsData.map((r) => ({ label: r.name })),
    [responseRegionsData]
  )

  const cityOptions: Option[] = useMemo(() => {
    return responseRegionsData
      .filter((r) => regionFilter.length === 0 || regionFilter.includes(r.name))
      .flatMap((r) => r.cities.map((c) => ({ label: c.name })))
  }, [responseRegionsData, regionFilter])

  // filtered by region+city
  const filteredByRegionCity = useMemo(() => {
    return allLocations.filter((loc) => {
      if (regionFilter.length && !regionFilter.includes(loc.region))
        return false
      if (cityFilter.length && !cityFilter.includes(loc.city)) return false
      return true
    })
  }, [allLocations, regionFilter, cityFilter])

  const typeOptions: Option[] = useMemo(() => {
    const uniq = Array.from(new Set(filteredByRegionCity.map((l) => l.type)))
    return uniq.map((t) => ({ label: t }))
  }, [filteredByRegionCity])

  const sizeOptions: Option[] = useMemo(() => {
    const uniq = Array.from(
      new Set(
        filteredByRegionCity.map(
          (l) => `${l.width}x${l.height} - ${l.sizeFormFactor}`
        )
      )
    )

    const sorted = uniq.sort((a, b) => {
      const [aw, ah] = a.match(/\d+/g)!.map(Number)
      const [bw, bh] = b.match(/\d+/g)!.map(Number)
      return aw! * ah! - bw! * bh!
    })

    return sorted.map((s) => ({ label: s }))
  }, [filteredByRegionCity])

  // --- compute rendered locations after all filters ---
  const filteredLocations = useMemo(() => {
    return allLocations.filter((loc) => {
      if (regionFilter.length && !regionFilter.includes(loc.region))
        return false
      if (cityFilter.length && !cityFilter.includes(loc.city)) return false
      if (typeFilter.length && !typeFilter.includes(loc.type)) return false
      if (
        sizesFilter.length &&
        !sizesFilter.includes(
          `${loc.width}x${loc.height} - ${loc.sizeFormFactor}`
        )
      )
        return false
      return true
    })
  }, [allLocations, regionFilter, cityFilter, typeFilter, sizesFilter])

  useEffect(() => {
    setCardRender(filteredLocations)
  }, [filteredLocations, setCardRender])

  // --- sync FROM URL ---
  useEffect(() => {
    const nextRegion = parseParam("region")
    const nextCity = parseParam("city")
    const nextType = parseParam("type")
    const nextSizes = parseParam("sizes")

    if (!arraysEqual(nextRegion, regionFilter)) setRegionFilter(nextRegion)
    if (!arraysEqual(nextCity, cityFilter)) setCityFilter(nextCity)
    if (!arraysEqual(nextType, typeFilter)) setTypeFilter(nextType)
    if (!arraysEqual(nextSizes, sizesFilter)) setSizesFilter(nextSizes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // --- handlers ---
  const handleRegionChange = useCallback(
    (nextRegions: string[]) => {
      const availableCities = responseRegionsData
        .filter((r) => nextRegions.length === 0 || nextRegions.includes(r.name))
        .flatMap((r) => r.cities.map((c) => c.name))

      const prunedCities = cityFilter.filter((c) => availableCities.includes(c))

      const availableTypes = Array.from(
        new Set(
          allLocations
            .filter(
              (loc) =>
                (nextRegions.length === 0 ||
                  nextRegions.includes(loc.region)) &&
                (prunedCities.length === 0 || prunedCities.includes(loc.city))
            )
            .map((l) => l.type)
        )
      )
      const prunedTypes = typeFilter.filter((t) => availableTypes.includes(t))

      const availableSizes = Array.from(
        new Set(
          allLocations
            .filter(
              (loc) =>
                (nextRegions.length === 0 ||
                  nextRegions.includes(loc.region)) &&
                (prunedCities.length === 0 ||
                  prunedCities.includes(loc.city)) &&
                (prunedTypes.length === 0 || prunedTypes.includes(loc.type))
            )
            .map((l) => `${l.width}x${l.height} - ${l.sizeFormFactor}`)
        )
      )
      const prunedSizes = sizesFilter.filter((s) => availableSizes.includes(s))

      setRegionFilter(nextRegions)
      setCityFilter(prunedCities)
      setTypeFilter(prunedTypes)
      setSizesFilter(prunedSizes)

      buildAndReplace({
        region: nextRegions,
        city: prunedCities,
        type: prunedTypes,
        sizes: prunedSizes,
      })
    },
    [
      responseRegionsData,
      cityFilter,
      allLocations,
      typeFilter,
      sizesFilter,
      buildAndReplace,
    ]
  )

  const handleCityChange = useCallback(
    (nextCities: string[]) => {
      const availableTypes = Array.from(
        new Set(
          allLocations
            .filter(
              (loc) =>
                (regionFilter.length === 0 ||
                  regionFilter.includes(loc.region)) &&
                (nextCities.length === 0 || nextCities.includes(loc.city))
            )
            .map((l) => l.type)
        )
      )
      const prunedTypes = typeFilter.filter((t) => availableTypes.includes(t))

      const availableSizes = Array.from(
        new Set(
          allLocations
            .filter(
              (loc) =>
                (regionFilter.length === 0 ||
                  regionFilter.includes(loc.region)) &&
                (nextCities.length === 0 || nextCities.includes(loc.city)) &&
                (prunedTypes.length === 0 || prunedTypes.includes(loc.type))
            )
            .map((l) => `${l.width}x${l.height} - ${l.sizeFormFactor}`)
        )
      )
      const prunedSizes = sizesFilter.filter((s) => availableSizes.includes(s))

      setCityFilter(nextCities)
      setTypeFilter(prunedTypes)
      setSizesFilter(prunedSizes)

      buildAndReplace({
        region: regionFilter,
        city: nextCities,
        type: prunedTypes,
        sizes: prunedSizes,
      })
    },
    [allLocations, regionFilter, typeFilter, sizesFilter, buildAndReplace]
  )

  const handleTypeChange = useCallback(
    (nextTypes: string[]) => {
      const availableSizes = Array.from(
        new Set(
          allLocations
            .filter(
              (loc) =>
                (regionFilter.length === 0 ||
                  regionFilter.includes(loc.region)) &&
                (cityFilter.length === 0 || cityFilter.includes(loc.city)) &&
                (nextTypes.length === 0 || nextTypes.includes(loc.type))
            )
            .map((l) => `${l.width}x${l.height} - ${l.sizeFormFactor}`)
        )
      )
      const prunedSizes = sizesFilter.filter((s) => availableSizes.includes(s))

      setTypeFilter(nextTypes)
      setSizesFilter(prunedSizes)

      buildAndReplace({
        region: regionFilter,
        city: cityFilter,
        type: nextTypes,
        sizes: prunedSizes,
      })
    },
    [allLocations, regionFilter, cityFilter, sizesFilter, buildAndReplace]
  )

  const handleSizesChange = useCallback(
    (nextSizes: string[]) => {
      const availableTypes = Array.from(
        new Set(
          allLocations
            .filter(
              (loc) =>
                (regionFilter.length === 0 ||
                  regionFilter.includes(loc.region)) &&
                (cityFilter.length === 0 || cityFilter.includes(loc.city)) &&
                (nextSizes.length === 0 ||
                  nextSizes.includes(
                    `${loc.width}x${loc.height} - ${loc.sizeFormFactor}`
                  ))
            )
            .map((l) => l.type)
        )
      )
      const prunedTypes = typeFilter.filter((t) => availableTypes.includes(t))

      setSizesFilter(nextSizes)
      setTypeFilter(prunedTypes)

      buildAndReplace({
        region: regionFilter,
        city: cityFilter,
        type: prunedTypes,
        sizes: nextSizes,
      })
    },
    [allLocations, regionFilter, cityFilter, typeFilter, buildAndReplace]
  )

  const handleTabChange = useCallback(
    (value: string) => {
      buildAndReplace({
        region: regionFilter,
        city: cityFilter,
        type: typeFilter,
        sizes: sizesFilter,
        tab: value,
      })
    },
    [regionFilter, cityFilter, typeFilter, sizesFilter, buildAndReplace]
  )

  // reset
  const handleResetAll = () => {
    setRegionFilter([])
    setCityFilter([])
    setTypeFilter([])
    setSizesFilter([])
    router.replace("/locations", { scroll: false })
  }

  const tabs = [
    {
      value: FilterTab.Catalog,
      label: component?.catalogTitle,
      icon: <PinIcon />,
    },
    { value: FilterTab.Map, label: component?.mapTitle, icon: <MapIcon /> },
  ]

  useEffect(() => {
    if (regionFilter.length === 0) return

    // const selectedRegions = responseRegionsData.filter((r) =>
    //   regionFilter.includes(r.name)
    // )

    // const regionWithCoords = selectedRegions.find(
    //   (r) => r.latitude && r.longitude
    // )

    // if (regionWithCoords) {
    //   onCapitalPickCameraChange({
    //     lat: regionWithCoords.latitude,
    //     lng: regionWithCoords.longitude,
    //   })
    // }
  }, [regionFilter, responseRegionsData])

  return (
    <div
      ref={ref}
      className={cn(
        "relative z-50 mx-auto w-full max-w-[780px]",
        "overflow-hidden rounded-2xl border border-white/10",
        className
      )}
    >
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        dir={locale === "en" ? "ltr" : "rtl"}
        className={cn("-mb-8 bg-white/10 pb-8")}
      >
        <TabsList className="flex h-fit justify-start gap-2 bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg px-4",
                "py-2 data-[state=active]:bg-white data-[state=active]:text-black"
              )}
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div
          className={cn(
            "flex flex-col gap-5 rounded-2xl border border-white/10",
            "bg-[#1a1a1a] p-3 pb-2 text-white shadow-[inset_0_5px_10px_rgba(255,255,255,0.1)] lg:p-6 lg:pb-2"
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <MultiSelect
              label={component?.regionTitle || ""}
              value={regionFilter}
              options={regionOptions}
              onChange={handleRegionChange}
              allTitle={component?.all || ""}
              locale={locale}
            />
            <div className="h-10 w-[2px] bg-white opacity-30" />

            <MultiSelect
              label={component?.cityTitle || ""}
              value={cityFilter}
              options={cityOptions}
              onChange={handleCityChange}
              allTitle={component?.all || ""}
              locale={locale}
            />
            <div className="h-10 w-[2px] bg-white opacity-30" />

            <MultiSelect
              label={component?.typeTitle || ""}
              value={typeFilter}
              options={typeOptions}
              onChange={handleTypeChange}
              allTitle={component?.all || ""}
              locale={locale}
            />
            <div className="h-10 w-[2px] bg-white opacity-30" />

            <MultiSelect
              label={component?.sizeTitle || ""}
              value={sizesFilter}
              options={sizeOptions}
              onChange={handleSizesChange}
              allTitle={component?.all || ""}
              locale={locale}
            />
          </div>

          <Button
            className={cn(
              "ms-0 h-11 w-full cursor-pointer rounded-[7px] bg-white hover:text-white",
              "text-black hover:bg-[#f5f5f56f] md:px-3 lg:w-[calc(100%+36px)]"
            )}
            onClick={handleResetAll}
          >
            <div className="flex w-full items-center justify-between">
              <div className="text-[14px]">{component?.continueTitle}</div>
              <ArrowIcon className={cn(locale === "ar" && "rotate-180")} />
            </div>
          </Button>
        </div>
      </Tabs>
    </div>
  )
}

export default FilterHeader
