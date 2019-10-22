import cheerio from 'cheerio'

export default (html, opts) => {

  const $ = cheerio.load(html)

  const title = $('title').html()
  const content = $('.article-content').html()
  html = `<title>${title}</title>${content}`

  return html
}