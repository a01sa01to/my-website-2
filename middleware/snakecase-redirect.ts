import type { Middleware } from '@nuxt/types'
const snakecaseRedirect: Middleware = ({ route, redirect }) => {
  if (route.path && route.path.includes('_')) {
    redirect(301, String(route.path.replace(/_/g, '-')))
  }
}

export default snakecaseRedirect
