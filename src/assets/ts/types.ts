type Config = {
    version = Number,
    dependencies = String[],
    dashboardConfig = {
        latestNews = boolean,
        upcomingEOL = boolean,
        ganttChart = boolean,
        newsEntries = Number,
    },
    headerConfig = {
        showAbout = boolean,
        showHelp = boolean,
    }
}