export function setTabTitle(title: string) {
  document.title = `${title} - Lifeline`
}

export function getFriendlyName(name: string) {
  return name.split('|')[0]
}

export function getFriendlyNameFromAPI(name: string, listOfProducts: string[]) {
  // TODO: just want to acknowledge that we should use some form of binary tree search here...
  for (const i in listOfProducts) {
    let productMachineName = getMachineName(listOfProducts[i])
    let currentMachineName = getMachineName(name)
    if (currentMachineName == productMachineName) {
      return getFriendlyName(listOfProducts[i])
    }
  }
  return false
}

export function getMachineName(name: string) {
  let returnable = name.split('|')

  if (returnable.length > 1) {
    return name.split('|')[1]
  }

  return returnable[0]
}

export async function getData(url: string) {
  let token: string | null = null
  try {
    const config = JSON.parse(localStorage.getItem('config') || '{}')
    token = config.personal_access_token || null
  } catch {}
  const headers: Record<string, string> = token ? { Authorization: `token ${token}` } : {}
  const res = await fetch(url, { headers })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export function toLocalDate(date: string) {
  date = new Date(date).toLocaleDateString(navigator.language)
  return date
}

export function dateToUnixTimestamp(date: string) {
  return Math.floor(new Date(date).getTime() / 1000)
}

export function unixTimestampToLocalDate(date: string) {
  return new Date(Number(date) * 1000).toLocaleDateString(navigator.language)
}

export function todayAsISO() {
  let date = new Date()
  return date.toISOString().split('T')[0]
}

export function unixAsISO(timestamp: number) {
  var date = new Date(timestamp * 1000)
  return date.toISOString().split('T')[0]
}

export function isDateAfterToday(date: string) {
  var providedDate = new Date(date).valueOf()
  var now = new Date().valueOf()
  return providedDate > now
}

export function isDateBeforeToday(date: string) {
  var providedDate = new Date(date).valueOf()
  var now = new Date().valueOf()
  return providedDate < now
}

export function generateAboutLink(dependency: string) {
  return `/dependency/${dependency}`
}

export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}

export function getCurrentYear() {
  return new Date().getFullYear()
}

export function ganttChartUpdate(
  userChartOffset: number,
  userChartWidth: number,
  depJsonString: string,
  focusedDependency: string,
  customMode?: boolean
): string {
  let depJson = JSON.parse(depJsonString)
  let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  let diagram = ``

  if (isDarkMode) {
    diagram = `
%%{
    init: {
        'theme': 'dark',
        'fontFamily': 'Roboto',
        'gantt': {
              'numberSectionStyles': '2'
          }
    }
}%%
      gantt
    dateFormat YYYY-MM-DD
    `
  } else {
    diagram = `
%%{init: {'theme':'neutral', 'fontFamily': 'Roboto' }}%%
      gantt
    dateFormat YYYY-MM-DD
    `
  }

  // One day = 86400 seconds
  let unixOneDay = 86400
  // get the current Unix timestamp
  let unixCurrentTime = Math.trunc(Date.now() / 1000) - userChartOffset * unixOneDay
  // convert the days to unix time
  let unixChartWidth = unixOneDay * (userChartWidth / 2)
  // calculate the seek back in unix
  let unixSeekback = unixCurrentTime - unixChartWidth
  // calculate the seek forward in unix
  let unixSeekforwad = unixCurrentTime + unixChartWidth

  for (var data in depJson) {
    if (focusedDependency != 'all' && depJson[data].name != focusedDependency) {
      continue
    }

    depJson[`${data}`].releases.forEach((eolData: any) => {
      if (customMode) {
        // In custom mode, all releases are milestones at their releaseDate
        const releaseUnix = dateToUnixTimestamp(eolData.releaseDate)
        // Only show milestones that fall within the current window
        if (releaseUnix >= unixSeekback && releaseUnix <= unixSeekforwad) {
          diagram += `\n        section ${data}\n        ${eolData.label}: milestone, ${eolData.releaseDate}, 0d`
        }
        return
      }
      const isSupported =
        !eolData.isEol &&
        (!eolData.eolFrom || dateToUnixTimestamp(eolData.eolFrom) > Math.floor(Date.now() / 1000))
      // Check if the EOL date is after the seekback window
      if (dateToUnixTimestamp(eolData.eolFrom) > unixSeekback) {
        const releaseUnix = dateToUnixTimestamp(eolData.releaseDate)
        // If the release starts after the end of the chart window, don't show it
        if (releaseUnix > unixSeekforwad) {
          return
        }
        // Case 1: Release starts before seekback and ends after seekforward (spans the whole window)
        if (releaseUnix < unixSeekback && dateToUnixTimestamp(eolData.eolFrom) > unixSeekforwad) {
          diagram += `\n        section ${data}\n        ← ${eolData.label} →:${isSupported ? ' crit,' : ''} ${unixAsISO(unixSeekback)}, ${unixAsISO(unixSeekforwad)}`
          // Case 2: Release starts before seekback and ends within the window
        } else if (releaseUnix < unixSeekback) {
          diagram += `\n        section ${data}\n        ← ${eolData.label}:${isSupported ? ' crit,' : ''} ${unixAsISO(unixSeekback)}, ${eolData.eolFrom}`
          // Case 3: Release starts within the window and ends after seekforward
        } else if (dateToUnixTimestamp(eolData.eolFrom) > unixSeekforwad) {
          diagram += `\n        section ${data}\n        ${eolData.label} →:${isSupported ? ' crit,' : ''} ${eolData.releaseDate}, ${unixAsISO(unixSeekforwad)}`
          // Case 4: Release starts and ends within the window
        } else {
          diagram += `\n        section ${data}\n        ${eolData.label}:${isSupported ? ' crit,' : ''} ${eolData.releaseDate}, ${eolData.eolFrom}`
        }
      } else if (!eolData.isEol) {
        // For releases that are still supported and have no stated EOL
        // Show from releaseDate to today, or to the end of the chart window if today is outside the window
        const releaseUnix = dateToUnixTimestamp(eolData.releaseDate)
        const todayUnix = Math.floor(Date.now() / 1000)
        const chartEndUnix = unixCurrentTime + unixChartWidth

        // Determine the end date: either today or chart end, whichever is earlier
        const endUnix = Math.min(todayUnix, chartEndUnix)
        const endISO = unixAsISO(endUnix)

        if (releaseUnix > unixSeekback && releaseUnix < chartEndUnix) {
          // Release starts within the window
          diagram += `\n        section ${data}\n          ${eolData.label}: crit, ${eolData.releaseDate}, ${endISO}`
        } else if (releaseUnix < unixSeekback && endUnix > unixSeekback) {
          // Release starts before window, but is still active in window
          diagram += `\n        section ${data}\n          ← ${eolData.label}: crit, ${unixAsISO(unixSeekback)}, ${endISO}`
        }
      }
    })
  }

  diagram =
    diagram +
    `\n    section Date Info\n         Start - ${unixAsISO(unixSeekback)}: ${unixAsISO(unixSeekback)}, 0d\n         End - ${unixAsISO(unixSeekforwad)}: ${unixAsISO(unixSeekforwad)}, 0d`

  return diagram
}
