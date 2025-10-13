export const calculateVisibleItems = (
  navElement: HTMLDivElement | null,
  itemSelector: string,
  padding = 32,
  openBtnWidth = 150
): number => {
  if (!navElement) return 0

  const navWidth = navElement.offsetWidth
  let totalItemsWidth = 0
  let newVisibleCount = 0

  const itemElements = Array.from(
    navElement.querySelectorAll(itemSelector)
  ) as HTMLElement[]

  itemElements.forEach((item) => {
    Object.assign(item.style, {
      display: "block",
      visibility: "hidden",
      position: "absolute",
    })
  })

  for (let i = 0; i < itemElements.length; i += 1) {
    const itemWidth = (itemElements[i]?.offsetWidth || 0) + padding

    if (totalItemsWidth + itemWidth > navWidth - (openBtnWidth + padding)) {
      break
    }

    totalItemsWidth += itemWidth
    newVisibleCount += 1
  }

  itemElements.forEach((item) => {
    Object.assign(item.style, {
      display: "",
      visibility: "",
      position: "",
    })
  })

  return newVisibleCount
}
