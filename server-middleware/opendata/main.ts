import { readFileSync } from 'fs'
import { IncomingMessage } from 'http'
import { join } from 'path'
import { ServerMiddleware } from '@nuxt/types'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import Covid19Ibaraki from './cov19_ibaraki'

const api: ServerMiddleware = (_req, res, _next) => {
  const req = _req as (IncomingMessage & {url: string})
  req.url = '/opendata/api' + req.url

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization'
  )
  if (req.method === 'OPTIONS') { res.statusCode = 200 }

  const schema = buildSchema(
    readFileSync(
      join(__dirname, 'schema.graphql'),
      'utf8'
    ).toString()
  )

  const root = {
    covid19_ibaraki: () => {
      return Covid19Ibaraki.getData()
    }
  }

  graphqlHTTP({
    graphiql: false,
    pretty: true,
    rootValue: root,
    schema
  })(req, res)
}

export default api
