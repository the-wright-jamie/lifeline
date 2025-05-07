import { DEPENDENCY_STRING_TYPE } from './enums'

export function dependencyTitleCase(name: string, type?: DEPENDENCY_STRING_TYPE) {
  while (name.includes('-')) {
    // first, replace all hyphens with spaces
    name = name.replace('-', ' ')
  }
  name = name
    // next, every new word becomes capitalized
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
    // next, handle common acronyms and shorthands
    .replace('Api', 'API')
    .replace('Aws', 'AWS')
    .replace('Bsd', 'BSD')
    .replace('bsd', 'BSD')
    .replace('Cd', 'CD')
    .replace('db', 'DB')
    .replace('Devops', 'DevOps')
    .replace('dk', 'DK')
    .replace('ds', 'DS')
    .replace('Ibm', 'IBM')
    .replace('js', '.js')
    .replace('ks', 'KS')
    .replace('Ms', 'MS ')
    .replace('os', 'OS')
    .replace('Ui', 'UI')
    .replace('Php', 'PHP')
    .replace('sql', 'SQL')
    .replace('Gpu', 'GPU')
    // next, handle corrections for acronyms
    .replace('SaMS ', 'sams')
    .replace('POS', 'Pos')
    .replace('MicrOS', 'Micros')
    .replace('CompOSer', 'Composer')
    .replace('JbOSs', 'JBoss')
    .replace('MattermOSt', 'Mattermost')
    .replace('CDk', 'CDK')
    .replace('NeOS', 'Neos')
    // finally, handle any special cases
    .replace('Activemq', 'ActiveMQ')
    .replace('Aix', 'AIX')
    .replace('Alma Linux', 'AlmaLinux OS')
    .replace('Angular.js', 'AngularJS')
    .replace('Antix', 'antiX Linux')
    .replace('APIsix', 'APISIX')
    .replace('Argo CD', 'ArgoCD')
    .replace('Big Ip', 'BIG-IP')
    .replace('Bigbluebutton', 'BigBlueButton')
    .replace('BuilDS', 'Builds')
    .replace('C OS', 'Google Container-Optimized OS (COS)')
    .replace('Cert Manager', 'cert-manager')
    .replace('Cfengine', 'CFEngine')
    .replace('Citrix Vad', 'Citrix Virtual Apps and Desktops')
    .replace('Ckeditor', 'CKEditor')
    .replace('Clamav', 'ClamAV')
    .replace('Cnspec', 'cnspec')
    .replace('Coldfusion', 'Adobe ColdFusion')
    .replace('Consul', 'Hashicorp Consul')
    .replace('Containerd', 'containerd')
    .replace('Controlm', 'Control-M')
    .replace('Cortex Xdr', 'Palo Alto Networks Cortex XDR agent')
    .replace('COS', 'Google Container-Optimized OS (COS)')
    .replace('Craft Cms', 'Craft CMS')
    .replace('Csi', 'CSI')
    .replace('Dbt Core', 'dbt Core')
    .replace('Dce', 'DaoCloud Enterprise')
    .replace('Dotnet', '.NET')
    .replace('Ember.js', 'Ember')
    .replace('Eslint', 'ESLint')
    .replace('Esxi', 'VMware ESXi')
    .replace('Etcd', 'etcd')
    .replace('Eurolinux', 'EuroLinux')
    .replace('Ffmpeg', 'FFmpeg')
    .replace('Filemaker', 'FileMaker')
    .replace('fold', ' Fold')
    .replace('Ghc', 'Glasgow Haskell Compiler (GHC)')
    .replace('Gitlab', 'GitLab')
    .replace('Goaccess', 'GoAccess')
    .replace('Graalvm', 'GraalVM')
    .replace('Grails', 'Grails Framework')
    .replace('Gstreamer', 'GStreamer')
    .replace('Haproxy', 'HAProxy')
    .replace('Hbase', 'Apache HBase')
    .replace('IBM I', 'IBM iSeries')
    .replace('Inspec', 'InSpec')
    .replace('Ionic', 'Ionic Framework')
    .replace('Isc Dhcp', 'ISC DHCP')
    .replace('JBoss Eap', 'JBoss Enterprise Application Platform')
    .replace('Jhipster', 'JHipster')
    .replace('Joomla', 'Joomla!')
    .replace('Jquery', 'jQuery')
    .replace('Jreleaser', 'JReleaser')
    .replace('Kde', 'KDE')
    .replace('Keda', 'KEDA')
    .replace('Libreoffice', 'LibreOffice')
    .replace('linux', ' Linux')
    .replace('Linuxmint', 'Linux Mint')
    .replace('Log4j', ' Log4J')
    .replace('Lserver', 'L Server')
    .replace('Mx Linux', 'MX Linux')
    .replace('Nginx', 'nginx')
    .replace('Nifi', 'NiFi')
    .replace('Nix', 'nix')
    .replace('Nvidia', 'NVIDIA')
    .replace('Nvm', 'nvm')
    .replace('Office', 'Microsoft Office')
    .replace('Oneplus', 'OnePlus')
    .replace('OpenjDK', 'OpenJDK')
    .replace('Opensearch', 'OpenSearch')
    .replace('Openshift', 'OpenShift')
    .replace('Openssl', 'OpenSSL')
    .replace('Opensuse', 'openSUSE')
    .replace('Opentofu', 'OpenTofu')
    .replace('Openvpn', 'OpenVPN')
    .replace('Openwrt', 'OpenWrt')
    .replace('Openzfs', 'OpenZFS')
    .replace('Opnsense', 'OPNsense')
    .replace('Ovirt', 'oVirt')
    .replace('Pangp', 'Palo Alto Networks GlobalProtect App')
    .replace('PanOS', 'Palo Alto Networks PAN-OS')
    .replace('Pci Dss', 'PCI-DSS')
    .replace('PHPbb', 'phpBB')
    .replace('PHPmyadmin', 'phpMyAdmin')
    .replace('Pim', 'PIM')
    .replace('Pnpm', 'pnpm')
    .replace('Pop Os', 'Pop!_OS')
    .replace('Postmarketos', 'postmarketOS')
    .replace('Powershell', 'PowerShell')
    .replace('Privatebin', 'PrivateBin')
    .replace('R OS', 'Robot Operating System (ROS)')
    .replace('Rabbitmq', 'RabbitMQ')
    .replace('Readynas', 'Netgear ReadyNAS')
    .replace('Redhat', 'Red Hat')
    .replace('Rhel', 'Red Hat Enterprise Linux')
    .replace('Rocket Chat', 'Rocket.Chat')
    .replace('Rtpengine', 'rtpengine')
    .replace('Sapmachine', 'SapMachine')
    .replace('Slackware', 'Slackware Linux')
    .replace('Sles', 'SUSE Linux Enterprise Server')
    .replace('Solr', 'Apache Solr')
    .replace('Sonar', 'SonarQube')
    .replace('Sqlite', 'SQLite')
    .replace('Suse Manager', 'SUSE Manager')
    .replace('Typo3', 'TYPO3')
    .replace('Unrealircd', 'UnrealIRCd')
    .replace('Vcenter', 'VMware vCenter Server')
    .replace('Virtualbox', 'VirtualBox')
    .replace('Vmware', 'VMware')
    .replace('Xcp Ng', 'XCP-ng')
    .replace(' exchange', ' Exchange')
    .replace('.NETfx', '.NET Framework')
    // Apple's special cases
    .replace('IOS', 'iOS')
    .replace('Ip', 'iP')
    .replace('MacOS', 'macOS')
    .replace('TvOS', 'tvOS')
    .replace('VisionOS', 'visionOS')
    .replace('WatchOS', 'watchOS')
  if (type == DEPENDENCY_STRING_TYPE.RELEASE) {
    name = name
      // Optionally, sub-dependency corrections (for releases etc)
      // Pixels and similar phones
      .replace('pro', ' Pro')
      .replace('Proxl', ' Pro XL')
      // Modern Windows Releases
      .replace('h1', 'H1')
      .replace('h2', 'H2')
      .replace('Iot', 'IoT')
      .replace('Lts', 'LTS')
      // Legacy Windows Releases
      .replace('Sp', 'Service Pack ')
  }
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

export function getCurrentYear() {
  return new Date().getFullYear()
}
