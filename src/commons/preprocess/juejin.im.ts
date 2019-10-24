import cheerio from 'cheerio'

export default (html, opts) => {
  // 预解析，取文章的主要部分
  const $ = cheerio.load(html)
  const title = $('title').html()
  const content = $('.article-content').html()
  html = `<title>${title}</title>${content}`

  return html
}