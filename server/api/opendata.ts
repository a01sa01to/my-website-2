import { execFile } from 'child_process'
import { resolve } from 'path'
import { parse } from 'url'
import type { ServerMiddleware } from '@nuxt/types'

const api: ServerMiddleware = async (req, res) => {
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

  const __dirname = resolve(...(process.env.development ? ['server'] : ['']))
  const rawFileRoot = resolve(...(process.env.development ? ['static'] : ['']))
  const exe = execFile(resolve(__dirname, 'opendata', 'opendata-api'), [
    rawFileRoot,
  ])
  exe.stderr.on('data', (data) => {
    console.error(data.toString())
  })

  if (req.method === 'POST') {
    const stdin = []
    for await (const chunk of req) stdin.push(chunk)
    exe.stdin.write(JSON.parse(Buffer.concat(stdin).toString()).query)
  } else if (req.method === 'GET') {
    const { query } = parse(req.url, true).query
    if (!query) {
      res.statusCode = 400
      res.end("Missing query parameter 'query'")
      return
    }
    exe.stdin.write(query)
  } else {
    res.statusCode = 405
    res.end('Method not allowed')
    return
  }
  exe.stdin.end()

  for await (const chunk of exe.stdout) res.write(chunk)
  res.end()
}

export default api
