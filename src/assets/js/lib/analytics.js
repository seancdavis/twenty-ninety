import Analytics from "analytics"
import googleAnalytics from "@analytics/google-analytics"

onInit(() => {
  if (ENV !== "production" || !GOOGLE_ANALYTICS_ID) return

  const analytics = Analytics({
    app: ANALYTICS_APP_NAME,
    plugins: [
      googleAnalytics({
        trackingId: GOOGLE_ANALYTICS_ID
      })
    ]
  })

  /* Track a page view */
  analytics.page()
})
