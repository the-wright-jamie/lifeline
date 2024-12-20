type Config = {
  version: number
  dependencies: string[]
  dashboardConfig: {
    latestNews: boolean
    upcomingEOL: boolean
    pastEOL: boolean
    ganttChart: boolean
    newsEntries: number
    ganttWidth: number
  }
  headerConfig: {
    showAbout: boolean
    showHelp: boolean
  }
}
