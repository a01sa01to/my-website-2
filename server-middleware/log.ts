import { ServerMiddleware } from '@nuxt/types'

const log: ServerMiddleware = (req, _res, next) => {
  console.log(req.url)
  next()
}

export default log
