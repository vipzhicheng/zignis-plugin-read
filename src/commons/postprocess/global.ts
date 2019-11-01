export default (markdown, argv) => {

  // 还原 TOC
  markdown = markdown.replace(/\\\[TOC\\\]/, '[TOC]')

  // 加上本地代理，反防盗链
  if (argv.format === 'web' && argv.proxy) {
    markdown = markdown.replace(/\!\[(.*?)\]\((.*?)\)/g,  (match, p1, p2) => {
      return `![${p1}](/proxy/${p2})`
    })
  }

  return markdown
}