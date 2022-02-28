import type { IncomingMessage, ServerResponse } from 'http'
export default async (
  req: IncomingMessage,
  res: ServerResponse,
  next: Function
) => {
  if (req.url.match(/^\/blog\/(.*)$/)) {
    res.writeHead(302, {
      Location: '/uconst/',
    })
    res.end()
  } else if (req.url.match(/^\/opendata\/api\/$/)) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization'
    )

    if (req.method === 'OPTIONS') {
      res.statusCode = 200
      res.end()
    } else {
      res.writeHead(308, {
        Location: '/api/opendata/',
      })
      res.end()
    }
  } else {
    next()
  }
}
