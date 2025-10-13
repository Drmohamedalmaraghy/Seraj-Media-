"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider, signOut, useSession } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { z } from "zod"

import { setupLibraries } from "@/lib/general-helpers"
import { useTranslatedZod } from "@/hooks/useTranslatedZod"

// Setup libraries in client environment
setupLibraries()

const queryClient = new QueryClient()

export function ClientProviders({
  children,
}: {
  readonly children: React.ReactNode
}) {
  useTranslatedZod(z)

  return (
    <SessionProvider>
      <HashProvider>
        <TokenProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            forcedTheme="light"
          >
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </ThemeProvider>
        </TokenProvider>
      </HashProvider>
    </SessionProvider>
  )
}

function TokenProvider({ children }: { readonly children: React.ReactNode }) {
  const session = useSession()

  useEffect(() => {
    if (session.data?.error === "invalid_strapi_token") {
      signOut({ callbackUrl: "/auth/signin" })
    }
  }, [session])

  return <>{children}</>
}

export const HashContext = createContext<
  | {
      hash: string | null
      clearHash: () => void
    }
  | undefined
>(undefined)

const HashProvider = ({ children }: { readonly children: React.ReactNode }) => {
  const [hash, setHash] = useState<string | null>(null)

  const clearHash = () => {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    )
    setHash(null)
  }

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash || null)
    }

    updateHash()
    window.addEventListener("hashchange", updateHash)
    window.addEventListener("popstate", updateHash)

    return () => {
      window.removeEventListener("hashchange", updateHash)
      window.removeEventListener("popstate", updateHash)
    }
  }, [])

  return (
    <HashContext.Provider value={{ hash, clearHash }}>
      {children}
    </HashContext.Provider>
  )
}

export const useHash = () => {
  const context = useContext(HashContext)
  if (context === undefined) {
    throw new Error("useHash must be used within a HashProvider")
  }
  return context
}
