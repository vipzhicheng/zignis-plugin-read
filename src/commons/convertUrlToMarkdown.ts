import fs from 'fs'
import path from 'path'
import util from 'util'
import read from 'readability-js'
import TurndownService from 'turndown'
import parse from 'url-parse'

import globalPreprocess from '../commons/preprocess/global'
import globalPostprocess from '../commons/postprocess/global'

const promiseRead = util.promisify(read)
const turndownService = new TurndownService()

const convertUrlToMarkdown = async (opts) => {
  // 获取域名标识
  const url = parse(opts.url)
  const domain = url.host.replace(/^www\./, '')

  // 获取 HTML
  const article = await promiseRead(opts.url)

  if (!article.content) {
    throw new Error('Parse failed, not a supported url!')
  }
  let content = article.content.html()
  if (opts.title) {
    content = `<h1>${article.title}</h1>\n\n${content}`
  }

  // HTML 预处理
  content = globalPreprocess(content)
  try {
    if (fs.existsSync(require.resolve(path.resolve(__dirname, `preprocess/${domain}`)))) {
      const domainPreprocess = require(path.resolve(__dirname, `preprocess/${domain}`)).default
      content = domainPreprocess(content)
    }
  } catch (e) {}

  // 转化为 Markdown
  let markdown = turndownService.turndown(content)
  if (opts.footer) {
    markdown = `${markdown}\n\n---\n\n[Original URL](${opts.url})`
  }

  // Markdown 后处理
  markdown = globalPostprocess(markdown)
  try {
    if (fs.existsSync(require.resolve(path.resolve(__dirname, `postprocess/${domain}`)))) {
      const domainPostprocess = require(path.resolve(__dirname, `postprocess/${domain}`)).default
      markdown = domainPostprocess(markdown)
    }
  } catch (e) {}

  return { title: article.title, markdown, article }
}

export default convertUrlToMarkdown