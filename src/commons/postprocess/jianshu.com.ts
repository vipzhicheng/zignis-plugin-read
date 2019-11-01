export default (markdown, argv) => {

  // 让图片顶格输出
  markdown = markdown.replace(/\n\s+\!\[(.*?)\].*/g,  (match, p1, p2) => {
    return `\n` + match.trim()
  })

  return markdown
}