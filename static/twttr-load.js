window.twttr = (function (d, s, id) {
  const js = d.createElement(s),
    [fjs] = d.getElementsByTagName(s),
    t = window.twttr || {}
  if (d.getElementById(id)) return t
  js.id = id
  js.src = 'https://platform.twitter.com/widgets.js'
  fjs.parentNode.insertBefore(js, fjs)

  t._e = []
  t.ready = function (f) {
    t._e.push(f)
  }

  return t
})(document, 'script', 'twitter-wjs')
