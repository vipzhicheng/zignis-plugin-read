export default (html, argv) => {
  // 把前端图片性能优化转化成真实路径
  html = html.replace(/<img(.*?)data-src=/g, '<img$1src=')
  html = html.replace(/<img(.*?)data-original-src=/g, '<img$1src=')

  // 加域名
  html = html.replace(/<img(.*?)src="\/\//g, (match, p1) => {
    // TODO: 根据输入 URL 判断到底是 https 还是 http
    return `<img${p1}src="https://`
  })

  return html
}