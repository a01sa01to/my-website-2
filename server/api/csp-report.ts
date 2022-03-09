import type { IncomingMessage, ServerResponse } from 'http'

type CSP_Report = {
  'csp-report': {
    'blocked-uri': string
    disposition: string
    'document-uri': string
    'effective-directive': string
    'original-policy': string
    referrer: string
    'script-sample': string
    'status-code': number
    'violated-directive': string
  }
}

const time_format = (time: Date) => time.toLocaleString()

const csp_report_format = (report: CSP_Report['csp-report']) =>
  `[CSP Report] ${time_format(new Date())}
* Blocked URI: ${report['blocked-uri'] ?? '(Not set)'}
* Disposition: ${report.disposition ?? '(Not set)'}
* Document URI: ${report['document-uri'] ?? '(Not set)'}
* Effective Directive: ${report['effective-directive'] ?? '(Not set)'}
* Original Policy: ${report['original-policy'] ?? '(Not set)'}
* Referrer: ${report.referrer ?? '(Not set)'}
* Script Sample: ${report['script-sample'] ?? '(Not set)'}
* Status Code: ${report['status-code'] ?? '(Not set)'}
* Violated Directive: ${report['violated-directive'] ?? '(Not set)'}
`

export default (req: IncomingMessage, res: ServerResponse) => {
  // https://developer.mozilla.org/ja/docs/Web/HTTP/CSP#enabling_reporting
  let buf = ''
  req.on('data', (chunk) => {
    buf += chunk
  })
  req.on('end', () => {
    const report: CSP_Report = JSON.parse(buf)
    console.warn(csp_report_format(report['csp-report']))
    res.statusCode = 200
    res.end()
  })
}
