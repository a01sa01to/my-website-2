export default {
  markdown: {
    prism: {
      theme: '~/assets/styles/markdown-code-highlight.scss',
    },
    remarkPlugins: ['remark-math'],
    rehypePlugins: ['rehype-katex'],
  },
}
