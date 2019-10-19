export default (markdown) => {
  markdown = markdown.replace(/\s+复制代码\n/g, '')
  return markdown
}