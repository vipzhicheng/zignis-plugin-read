export default (markdown, opts) => {
  
  // 加上本地代理，反防盗链
  if (opts.format === 'web') {
    markdown = markdown.replace(/\!\[(.*?)\]\((.*?)\)/g,  (match, p1, p2) => {
      return `![${p1}](/proxy/${p2})`
    })
  }

  // 让图片顶格输出
  markdown = markdown.replace(/\n\s+\!\[(.*?)\].*/g,  (match, p1, p2) => {
    return `\n` + match.trim()
  })

  return markdown
}