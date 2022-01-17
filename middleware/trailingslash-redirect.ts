import { Middleware } from '@nuxt/types'
const trailingSlashRedirect: Middleware = ({ route, redirect, next }) => {
  if (route.path && route.path.slice(-1) !== '/') {
    redirect(301, route.path + '/')
  }
}

export default trailingSlashRedirect
