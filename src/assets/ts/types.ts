export type Config = {
  version: number
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
