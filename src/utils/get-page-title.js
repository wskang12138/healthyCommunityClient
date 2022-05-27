import defaultSettings from '@/settings'

const title = defaultSettings.title || '健康社区'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
