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
  return name
}
