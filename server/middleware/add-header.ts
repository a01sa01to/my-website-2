import type { IncomingMessage, ServerResponse } from 'http'

export default (
  _req: IncomingMessage,
  res: ServerResponse,
  next: () => void
): void => {
  if (!process.env.development) {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
  }
  res.setHeader('X-Content-Type-Options', 'nosniff')
  next()
}
