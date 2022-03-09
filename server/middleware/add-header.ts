import type { IncomingMessage, ServerResponse } from 'http'

const csp = [
  "default-src 'self'",
  "child-src 'self' https://platform.twitter.com",
  "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
  "frame-src 'self' https://platform.twitter.com",
  "img-src 'self' https://i.creativecommons.org/l/by-sa/4.0/88x31.png https://licensebuttons.net/l/by-sa/4.0/88x31.png https://opengraph.githubassets.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://platform.twitter.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net/npm/katex@latest/dist/katex.min.css",
  'report-uri /api/csp-report/',
]

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
  res.setHeader('Content-Security-Policy', csp.join('; '))
  next()
}
