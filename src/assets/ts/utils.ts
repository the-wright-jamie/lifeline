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
  const res = await fetch(url)
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

export function getRandomInt(min, max) {
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
  focusedDependency: string
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

    // for each entry in the array for each of the KEYS in the dependency JSON
    depJson[`${data}`].releases.forEach((eolData) => {
      // if the EOL is greater than the seekback...
      if (dateToUnixTimestamp(eolData.eolFrom) > unixSeekback) {
        // ...and
        if (
          dateToUnixTimestamp(eolData.releaseDate) < unixSeekback &&
          dateToUnixTimestamp(eolData.eolFrom) > unixSeekforwad
        ) {
          diagram =
            diagram +
            `
    section ${data}
        ← ${eolData.label} →: ${unixAsISO(unixSeekback)}, ${unixAsISO(unixSeekforwad)}`
        } else if (dateToUnixTimestamp(eolData.releaseDate) < unixSeekback) {
          diagram =
            diagram +
            `
    section ${data}
        ← ${eolData.label}: ${unixAsISO(unixSeekback)}, ${eolData.eolFrom}`
        } else if (dateToUnixTimestamp(eolData.eolFrom) > unixSeekforwad) {
          diagram =
            diagram +
            `
    section ${data}
        ${eolData.label} →: ${eolData.releaseDate}, ${unixAsISO(unixSeekforwad)}`
        } else {
          diagram =
            diagram +
            `
    section ${data}
        ${eolData.label}: ${eolData.releaseDate}, ${eolData.eolFrom}`
        }
      } else if (!eolData.isEol) {
        if (
          dateToUnixTimestamp(eolData.releaseDate) > unixSeekback &&
          dateToUnixTimestamp(eolData.releaseDate) < unixCurrentTime + unixChartWidth
        ) {
          diagram =
            diagram +
            `
    section ${data}
        ${eolData.label} (Supported, unknown EOL): milestone, ${eolData.releaseDate}, 0d`
        } else {
          if (dateToUnixTimestamp(eolData.releaseDate) < unixCurrentTime + unixChartWidth) {
            diagram =
              diagram +
              `
    section ${data}
        ← ${eolData.label} (Supported, unknown EOL): ${unixAsISO(unixSeekback)}, 0d`
          }
        }
      }
    })
  }

  diagram =
    diagram +
    `
    section Date Info
         Start - ${unixAsISO(unixSeekback)}: ${unixAsISO(unixSeekback)}, 0d
         End - ${unixAsISO(unixSeekforwad)}: ${unixAsISO(unixSeekforwad)}, 0d`

  return diagram
}
