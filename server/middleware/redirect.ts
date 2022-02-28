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
    res.writeHead(308, {
      Location: '/api/opendata/',
    })
    res.end()
  } else {
    next()
  }
}
