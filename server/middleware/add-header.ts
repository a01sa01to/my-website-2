import type { IncomingMessage, ServerResponse } from 'http'

const csp: { [key: string]: string[] } = {
  'default-src': ["'self'"],
  'child-src': ["'self'", 'https://platform.twitter.com'],
  'connect-src': [
    "'self'",
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
  ],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'frame-src': ["'self'", 'https://platform.twitter.com'],
  'img-src': [
    "'self'",
    'data:',
    'https://i.creativecommons.org/l/by-sa/4.0/88x31.png',
    'https://licensebuttons.net/l/by-sa/4.0/88x31.png',
    'https://opengraph.githubassets.com',
  ],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://platform.twitter.com',
    'https://www.googletagmanager.com/gtag/js',
  ],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'report-uri': ['/api/csp-report/'],
}

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
  res.setHeader(
    'Content-Security-Policy',
    Object.entries(csp)
      .map(([key, value]) => `${key} ${value.join(' ')}`)
      .join('; ')
  )
  next()
}
