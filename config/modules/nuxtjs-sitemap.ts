import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const allFiles = (path: string): string[] => {
  const files = readdirSync(path)
  return files
    .map((filename) => {
      const filepath = join(path, filename)
      const stats = statSync(filepath)
      if (stats.isFile()) {
        return [filepath]
      } else if (stats.isDirectory()) {
        return [filepath, ...allFiles(filepath)]
      }
    })
    .flat()
}

export default {
  hostname: 'https://a01sa01to.com',
  gzip: true,
  exclude: ['/admin/**', '/uconst/'],
  routes: () => {
    let blog = allFiles('./content/articles/')
      .map((file) => file.replace('.md', ''))
      .map((file) => file.replace(/\\/g, '/'))
      .map((file) => file.replace('content/articles/', 'blog/'))
      .filter((file) => !/(.*)\/\d{4}\/\d{2}$/.test(file))
    return [...blog]
  },
  trailingSlash: true,
  i18n: false,
}
