import cheerio from 'cheerio'

export default (html) => {

  const $ = cheerio.load(html)
  html = $('.article-content').html()

  return html
}