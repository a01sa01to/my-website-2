export default {
  strategies: {
    github: {
      cliendId: process.env.GITHUB_CLI_ID,
      clientSecret: process.env.GITHUB_CLI_SEC,
    },
  },
  cookie: {
    options: {
      path: '/admin/',
      maxAge: 60 * 60 * 24 * 7,
    },
  },
  localStorage: false,
  redirect: {
    home: '/admin/',
    callback: '/admin/callback/',
    login: '/admin/login/',
    logout: '/admin/login/',
  },
}
