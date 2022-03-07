import type { IncomingMessage, ServerResponse } from 'http'

export default (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
): void => {
  if (/^\/opendata\/api\/(\?.+)?$/.test(req.url)) {
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
