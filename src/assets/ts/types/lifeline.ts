export type ConfigV1 = {
  version: 1
  dependencies: string[]
  dashboardConfig: {
    latestNews: boolean
    upcomingEOL: boolean
    pastEOL: boolean
    ganttChart: boolean
    newsEntries: number
    ganttWidth: number
    ganttMaxWidth: number
  }
  headerConfig: {
    showAbout: boolean
    showHelp: boolean
  }
}

export type ConfigV2 = {
  version: 2
  dependencies: string[]
  tracked_repos: string[]
  personal_access_token: string | null
  dashboard_config: {
    show_latest_news: boolean
    show_upcoming_EOL: boolean
    show_past_EOL: boolean
    show_gantt_chart: boolean
    show_github_releases: boolean // New setting for GitHub releases
    highlight_this_month_EOL: boolean
    highlight_recent_releases: boolean // Highlight releases from the last 7 days
    highlight_today_and_yesterday: boolean // Highlight releases from today and yesterday
    news_entries: number
    gantt_width: number
    gantt_max_width: number
  }
  header_config: {
    show_about_button: boolean
    show_help_button: boolean
  }
}

export const defaultDashboardConfigV2 = {
  show_latest_news: true,
  show_upcoming_EOL: true,
  show_past_EOL: true,
  show_gantt_chart: true,
  show_github_releases: false,
  highlight_this_month_EOL: false,
  highlight_recent_releases: false,
  highlight_today_and_yesterday: false, // Highlight releases from today and yesterday
  news_entries: 10,
  gantt_width: 3650,
  gantt_max_width: 3650 * 2
}
