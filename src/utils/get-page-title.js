import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Apus Jobs'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
