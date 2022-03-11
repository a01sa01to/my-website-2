import type { ServerMiddleware } from '@nuxt/types'
import { graphqlHTTP } from 'express-graphql'
import { readFileSync } from 'fs'
import { buildSchema } from 'graphql'
import type { IncomingMessage } from 'http'
import { join, resolve } from 'path'
import Covid19Ibaraki from './cov19-ibaraki'

const __dirname = resolve(...(process.env.development ? ['static'] : ['']))

const api: ServerMiddleware = (req: IncomingMessage & { url: string }, res) => {
  req.url = '/api/opendata' + String(req.url ?? '')

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization'
  )

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  const schema = buildSchema(
    readFileSync(
      join(__dirname, 'opendata', 'schema.graphql'),
      'utf8'
    ).toString()
  )

  const root = {
    covid19_ibaraki: () => {
      return Covid19Ibaraki.getData()
    },
  }

  graphqlHTTP({
    graphiql: false,
    pretty: true,
    rootValue: root,
    schema,
  })(req, res)
}
export default api
