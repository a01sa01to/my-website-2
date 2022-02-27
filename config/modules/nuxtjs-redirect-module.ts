export default [
  { from: '^/blog/(.*)$', to: '/uconst/', statusCode: 302 },
  {
    // POSTリクエスト対応のため、301ではなく308にする
    // Ref: https://developer.mozilla.org/ja/docs/Web/HTTP/Status/308
    from: '^/opendata/api/(.*)$',
    to: '/api/opendata/$1',
    statusCode: 308,
  },
]
