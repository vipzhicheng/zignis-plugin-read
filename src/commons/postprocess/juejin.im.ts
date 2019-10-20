export default (markdown) => {
  
  // 去掉网页复制代码功能带来的干扰
  markdown = markdown.replace(/\s+复制代码\n/g, '')

  // 加上本地代理，反防盗链
  markdown = markdown.replace(/\!\[(.*?)\]\((.*?)\)/g,  (match, p1, p2) => {
    return `![${p1}](/proxy/${p2})`
  })

  return markdown
}