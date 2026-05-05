"use client"

// Catches errors in the root layout itself. Replaces the entire HTML document
// (including <html> and <body>). No locale context here - text is English-only.
// https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error
//
// Inline styles are intentional - if the root layout failed, we can't assume
// Tailwind/global CSS loaded successfully.
import { useEffect } from "react"
import * as Sentry from "@sentry/nextjs"

interface Props {
  readonly error: Error
  readonly reset: () => void
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          background: "#000",
          color: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "5rem 1rem 2rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "-15rem",
              width: "27.5rem",
              height: "27.5rem",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(255,20,20,0.52) 0%, rgba(255,20,20,0) 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: "-3.75rem",
              left: "-15rem",
              width: "27.5rem",
              height: "27.5rem",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(255,20,20,0.52) 0%, rgba(255,20,20,0) 100%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              fontSize: "clamp(6rem, 18vw, 15rem)",
              lineHeight: 1.1,
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            500
          </div>

          <h1
            style={{
              fontSize: "clamp(1.375rem, 3vw, 2.5rem)",
              fontWeight: 600,
              margin: "1rem 0 0.5rem",
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            Sorry, a server error occurred
          </h1>
          <p
            style={{
              maxWidth: "32rem",
              margin: "0 0 2rem",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            Please try refreshing the page or come back later.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <a
              href="/"
              style={{
                background: "#dc2626",
                color: "#fff",
                padding: "0.5rem 2.25rem",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Go to home page
            </a>
            <button
              type="button"
              onClick={reset}
              style={{
                background: "transparent",
                color: "#fff",
                padding: "0.5rem 2.25rem",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                cursor: "pointer",
                fontWeight: 500,
                fontSize: "1rem",
              }}
            >
              Refresh page
            </button>
          </div>

        </div>
      </body>
    </html>
  )
}
