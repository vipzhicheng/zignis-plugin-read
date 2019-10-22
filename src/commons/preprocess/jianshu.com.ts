export default (html, opts) => {
  html = html.replace(/<div\s+class="image-caption">(.*?)<\/div>/g, (match) => {
    return ''
  })
  return html
}