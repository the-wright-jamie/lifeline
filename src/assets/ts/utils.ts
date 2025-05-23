export function setTabTitle(title: string) {
  document.title = `Lifeline - ${title}`
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
