export function dependencyTitleCase(name: String) {
  while (name.includes('-')) {
    name = name.replace('-', ' ')
  }
  // All known corrections and exceptions
  name = name
    .replace('os', 'OS')
    .replace('pOS', 'Pos')
    .replace('micrOS', 'Micros')
    .replace('dk', 'DK')
    .replace('ds', 'DS')
    .replace('ks', 'KS')
    .replace('js', 'JS')
    .replace('db', 'DB')
    .replace('sql', 'SQL')
    .replace('Lserver', 'L Server')
    .replace('api', 'API')
    .replace('ms', 'MS ')
    .replace('saMS ', 'sams')
    .replace('cd', 'CD')
    .replace('aws', 'AWS')
    .replace('devops', 'DevOps')
    .replace('php', 'PHP')
    .replace('APIsix', 'APISIX')
    .replace('activemq', 'ActiveMQ')
    .replace('linux', ' Linux')
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase()) // to title case
    .replace('OpenjDK', 'OpenJDK')
    .replace('BuilDS', 'Builds')
    .replace('Redhat', 'Red Hat')
    .replace('Esxi', 'VMware ESXi')
    .replace('ComPoser', 'Composer')
    .replace('IOS', 'iOS')
    .replace('MacOS', 'macOS')
    .replace('Ip', 'iP')
    .replace('Postmarketos', 'postmarketOS')
    .replace('C OS', 'Google Container-Optimized OS (COS)')
    .replace('R OS', 'Robot Operating System (ROS)')
    .replace('Pop OS', 'Pop!_OS')
    .replace('Pim', 'PIM')
    .replace('Alma Linux', 'AlmaLinux OS')
    .replace('Alpine', 'Alpine Linux')
  return name
}

export async function getData(url: String) {
  const res = await fetch(url)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export function toLocalDate(date: String) {
  date = new Date(date).toLocaleDateString(navigator.language)
  return date
}

export function dateToUnixTimestamp(date: String) {
  return Math.floor(new Date(date).getTime() / 1000)
}

export function unixTimestampToLocalDate(date: String) {
  return new Date(Number(date) * 1000).toLocaleDateString(navigator.language)
}

export function isDateAfterToday(date: String) {
  return new Date(date).valueOf() > new Date().valueOf()
}

export function generateExternalLink(dependency: String) {
  return `https://endoflife.date/${dependency}`
}

export function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}
