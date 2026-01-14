"use client"

import { useEffect, createContext, useContext, useCallback } from "react"
import { ApplicationInsights } from "@microsoft/applicationinsights-web"

let appInsights: ApplicationInsights | null = null

type EventProperties = Record<string, string | number | boolean | undefined>

interface SessionContext {
  sessionId: string | null
  userId: string | null
}

interface AnalyticsContextType {
  trackEvent: (name: string, properties?: EventProperties) => void
  trackSectionView: (sectionName: string) => void
  trackClick: (elementName: string, properties?: EventProperties) => void
  trackDownload: (fileName: string) => void
  trackExternalLink: (url: string, linkName: string) => void
  trackAIChatMessage: (conversationId: string, userMessage: string, aiResponse?: string) => void
  getSessionContext: () => SessionContext
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    // Return no-op functions if analytics not available
    return {
      trackEvent: () => {},
      trackSectionView: () => {},
      trackClick: () => {},
      trackDownload: () => {},
      trackExternalLink: () => {},
      trackAIChatMessage: () => {},
      getSessionContext: () => ({ sessionId: null, userId: null }),
    }
  }
  return context
}

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

  const trackEvent = useCallback((name: string, properties?: EventProperties) => {
    if (appInsights) {
      appInsights.trackEvent({ name }, properties)
    }
  }, [])

  const trackSectionView = useCallback((sectionName: string) => {
    if (appInsights) {
      appInsights.trackEvent(
        { name: "SectionView" },
        { section: sectionName, timestamp: new Date().toISOString() }
      )
    }
  }, [])

  const trackClick = useCallback((elementName: string, properties?: EventProperties) => {
    if (appInsights) {
      appInsights.trackEvent(
        { name: "Click" },
        { element: elementName, ...properties }
      )
    }
  }, [])

  const trackDownload = useCallback((fileName: string) => {
    if (appInsights) {
      appInsights.trackEvent(
        { name: "ResumeDownload" },
        { fileName, timestamp: new Date().toISOString() }
      )
    }
  }, [])

  const trackExternalLink = useCallback((url: string, linkName: string) => {
    if (appInsights) {
      appInsights.trackEvent(
        { name: "ExternalLinkClick" },
        { url, linkName, timestamp: new Date().toISOString() }
      )
    }
  }, [])

  const trackAIChatMessage = useCallback((conversationId: string, userMessage: string, aiResponse?: string) => {
    if (appInsights) {
      appInsights.trackEvent(
        { name: "AIChatMessage" },
        {
          conversationId,
          userMessage: userMessage.substring(0, 500), // Truncate for analytics
          hasResponse: !!aiResponse,
          responseLength: aiResponse?.length || 0,
          timestamp: new Date().toISOString(),
        }
      )
    }
  }, [])

  const getSessionContext = useCallback((): SessionContext => {
    if (appInsights) {
      const context = appInsights.context
      return {
        sessionId: context?.session?.id || null,
        userId: context?.user?.id || null,
      }
    }
    return { sessionId: null, userId: null }
  }, [])

  const value: AnalyticsContextType = {
    trackEvent,
    trackSectionView,
    trackClick,
    trackDownload,
    trackExternalLink,
    trackAIChatMessage,
    getSessionContext,
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}
