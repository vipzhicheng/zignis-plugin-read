export default (html, opts) => {
  html = html.replace(/<img(.*?)data-src=/g, '<img$1src=')
  html = html.replace(/<img(.*?)data-original-src=/g, '<img$1src=')

  html = html.replace(/<img(.*?)src="\/\//g, (match, p1) => {
    return `<img${p1}src="https://`
  })

  return html
}