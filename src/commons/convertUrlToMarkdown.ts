import fs from 'fs'
import path from 'path'
import util from 'util'
import read from '@vipzhichengfork/node-readability'
import TurndownService from 'turndown'
import { tables } from 'turndown-plugin-gfm'
import parse from 'url-parse'

import globalPreprocess from '../commons/preprocess/global'
import globalPostprocess from '../commons/postprocess/global'

import { Utils } from 'zignis'

const promiseRead = util.promisify(read)

const convertUrlToMarkdown = async (argv) => {
  // 获取域名标识
  const url = parse(argv.url)
  const domain = url.host.replace(/^www\./, '')
  argv.domain = domain

  const extendDomains = await Utils.invokeHook('read_domain')

  // 初始化转换库
  const turndownService = new TurndownService({
    codeBlockStyle: 'fenced',
    fence: argv.format === 'web' ? '\n```' : '```'
  })
  turndownService.use(tables)

  // 获取 HTML
  const article = await promiseRead(argv.url, {
    preprocess: function(source, response, contentType, callback) {
      // HTML 预处理
      source = globalPreprocess(source, argv)
      try {
        if (extendDomains[domain] && extendDomains[domain].preprocess && Utils._.isFunction(extendDomains[domain].preprocess)) {
          const newSource = extendDomains[domain].preprocess(source, argv)
          if (newSource && Utils._.isString(newSource)) {
            markdown = newSource
          }
        } else {
          if (fs.existsSync(require.resolve(path.resolve(__dirname, `preprocess/${domain}`)))) {
            const domainPreprocess = require(path.resolve(__dirname, `preprocess/${domain}`)).default
            source = domainPreprocess(source, argv)
          }
        }
      } catch (e) {}

      callback(null, source);
    }
  })

  if (!article.content) {
    throw new Error('Parse failed, not a supported url!')
  }
  let content = article.content
  if (argv.title) {
    if (argv.toc) {
      content = `[TOC]\n\n${content}`
    }
    content = `<h1>${article.title}</h1>\n\n${content}`
  }

  // 转化为 Markdown
  let markdown = turndownService.turndown(content)

  if (argv.footer) {
    markdown = `${markdown}\n\n---\n\n[Original URL](${argv.url})`
  }

  // Markdown 后处理
  markdown = globalPostprocess(markdown, argv)
  try {
    if (extendDomains[domain] && extendDomains[domain].postprocess && Utils._.isFunction(extendDomains[domain].postprocess)) {
      const newMarkdown = extendDomains[domain].postprocess(markdown, argv)
      if (newMarkdown && Utils._.isString(newMarkdown)) {
        markdown = newMarkdown
      }
    } else {
      if (fs.existsSync(require.resolve(path.resolve(__dirname, `postprocess/${domain}`)))) {
        const domainPostprocess = require(path.resolve(__dirname, `postprocess/${domain}`)).default
        markdown = domainPostprocess(markdown, argv)
      }
    }

    
  } catch (e) {}

  return { title: article.title, markdown, content, article }
}

export default convertUrlToMarkdown