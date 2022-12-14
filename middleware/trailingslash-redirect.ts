import type { Middleware } from '@nuxt/types'
const trailingSlashRedirect: Middleware = ({ route, redirect }) => {
  if (route.path && route.path.slice(-1) !== '/') {
    redirect(301, String(route.path) + String('/'))
  }
}

export default trailingSlashRedirect
