import fs from 'fs'
import path from 'path'
import util from 'util'
import read from '@vipzhichengfork/node-readability'
import TurndownService from 'turndown'
import { tables } from 'turndown-plugin-gfm'
import parse from 'url-parse'

import globalPreprocess from '../commons/preprocess/global'
import globalPostprocess from '../commons/postprocess/global'

const promiseRead = util.promisify(read)
const turndownService = new TurndownService({
  codeBlockStyle: 'fenced',
  fence: '\n```'
})
turndownService.use(tables)

const convertUrlToMarkdown = async (opts) => {
  // 获取域名标识
  const url = parse(opts.url)
  const domain = url.host.replace(/^www\./, '')
  opts.domain = domain

  // 获取 HTML
  const article = await promiseRead(opts.url, {
    preprocess: function(source, response, contentType, callback) {
      // HTML 预处理
      source = globalPreprocess(source, opts)
      try {
        if (fs.existsSync(require.resolve(path.resolve(__dirname, `preprocess/${domain}`)))) {
          const domainPreprocess = require(path.resolve(__dirname, `preprocess/${domain}`)).default
          source = domainPreprocess(source, opts)
        }
      } catch (e) {}

      callback(null, source);
    }
  })

  if (!article.content) {
    throw new Error('Parse failed, not a supported url!')
  }
  let content = article.content
  if (opts.title) {
    if (opts.toc) {
      content = `[TOC]\n\n${content}`
    }
    content = `<h1>${article.title}</h1>\n\n${content}`
  }

  // 转化为 Markdown
  let markdown = turndownService.turndown(content)

  if (opts.footer) {
    markdown = `${markdown}\n\n---\n\n[Original URL](${opts.url})`
  }

  // Markdown 后处理
  markdown = globalPostprocess(markdown, opts)
  try {
    if (fs.existsSync(require.resolve(path.resolve(__dirname, `postprocess/${domain}`)))) {
      const domainPostprocess = require(path.resolve(__dirname, `postprocess/${domain}`)).default
      markdown = domainPostprocess(markdown, opts)
    }
  } catch (e) {}

  return { title: article.title, markdown, content, article }
}

export default convertUrlToMarkdown