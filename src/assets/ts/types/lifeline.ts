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
    news_entries: number
    gantt_width: number
    gantt_max_width: number
  }
  header_config: {
    show_about_button: boolean
    show_help_button: boolean
  }
}
