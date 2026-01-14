"use client"

import { useEffect } from "react"
import { ApplicationInsights } from "@microsoft/applicationinsights-web"

let appInsights: ApplicationInsights | null = null

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined" || appInsights) return

    const instrumentationKey = process.env.NEXT_PUBLIC_APPINSIGHTS_KEY
    if (!instrumentationKey) return

    appInsights = new ApplicationInsights({
      config: {
        instrumentationKey,
        enableAutoRouteTracking: true,
        disableFetchTracking: false,
        enableCorsCorrelation: true,
        enableRequestHeaderTracking: true,
        enableResponseHeaderTracking: true,
      },
    })

    appInsights.loadAppInsights()
    appInsights.trackPageView()
  }, [])

  return <>{children}</>
}
