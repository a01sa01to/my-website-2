import type { IncomingMessage, ServerResponse } from 'http'
export default async (
  req: IncomingMessage,
  res: ServerResponse,
  next: Function
) => {
  if (!process.env.development) {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    )
  }
  res.setHeader('X-Content-Type-Options', 'nosniff')
  next()
}
