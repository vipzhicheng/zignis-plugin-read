export default (html, opts) => {
  // 去掉无意义的标签
  html = html.replace(/<div\s+class="image-caption">(.*?)<\/div>/g, (match) => {
    return ''
  })
  return html
}