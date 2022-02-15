import { Middleware } from '@nuxt/types'
const BlogRedirectTemp: Middleware = ({ route, redirect, next, error }) => {
  if (route.path && route.path.includes('/blog/')) {
    redirect('/uconst/')
  }
}

export default BlogRedirectTemp