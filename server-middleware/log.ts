import { ServerMiddleware } from '@nuxt/types'

const log: ServerMiddleware = (req, _res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.url)
  next()
}

export default log
