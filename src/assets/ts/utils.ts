export function dependencyTitleCase(name: string) {
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
    .replace('bsd', 'BSD')
    .replace('ibm', 'IBM')
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
    .replace('Cfengine', 'CFEngine')
    .replace('Argo CD', 'ArgoCD')
    .replace('Pim', 'PIM')
    .replace('Alma Linux', 'AlmaLinux OS')
    .replace('Alpine', 'Alpine Linux')
    .replace('pro', ' Pro')
    .replace('Proxl', ' Pro XL')
    .replace('fold', ' Fold')
    .replace('h2', 'H2')
    .replace('h1', 'H1')
    .replace('Iot', 'IoT')
    .replace('Lts', 'LTS')
    .replace('Dotnet', '.NET')
    .replace('.NETfx', '.NET Framework')
    .replace('Ckeditor', 'CKEditor')
  return name
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
  return new Date(date).valueOf() > new Date().valueOf()
}

export function isDateBeforeToday(date: string) {
  return new Date(date).valueOf() < new Date().valueOf()
}

export function generateExternalLink(dependency: string) {
  return `https://endoflife.date/${dependency}`
}

export function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}
