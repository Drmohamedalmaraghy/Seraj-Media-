import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import type { ClassValue } from "clsx"

export const DEFAULT_PADDINGS = "px-5 md:px-10 lg:px-15 py-10 md:py-15 lg:py-20"

export const DEFAULT_TITLE = "px-5 md:px-10 lg:px-15 py-10 md:py-15 lg:py-20"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
