import fs from 'fs'
import path from 'path'
import convertUrlToMarkdown from '../commons/convertUrlToMarkdown'
import convertMarkdownToFile from '../commons/convertMarkdownToFile'
import chalk from 'chalk'


export const disabled = false // Set to true to disable this command temporarily
export const command = 'read <url>'
export const desc = 'read main part of a page'
// export const aliases = ''
// export const middleware = (argv) => {}

export const builder = function (yargs: any) {
  yargs.option('title', { default: true, describe: 'Prepend title, use no-title to disable.' })
  yargs.option('footer', { default: true, describe: 'Append footer, use no-footer to disable.' })
  yargs.option('toc', { default: true, describe: 'Include TOC' })
  yargs.option('format', { default: 'markdown', describe: 'Output format, support: markdown, md, pdf, html, png, jpeg, pager, console, web, epub, mobi, default: markdown.', alias: 'F' })
  yargs.option('rename', { describe: 'New name, with extension.' })
  yargs.option('debug', { describe: 'Check middle html code.' })
}

export const handler = async function (argv: any) {
  let format = argv.format
  let title
  let markdown

  try {
    if (argv.url.match(/\.md$/) && !argv.url.match(/^http/)) {
      // local
      let filePath = argv.url[0] !== '/' ? path.resolve(process.cwd(), argv.url) : argv.url
      markdown = fs.readFileSync(filePath)
      title = path.basename(filePath, '.md')
    } else {
      const converted = await convertUrlToMarkdown(argv)
      if (!converted) {
        return
      }
      title = converted.title
      markdown = converted.markdown
    }
  
    if (argv.rename) {
      title = path.basename(argv.rename, path.extname(argv.rename))
      format = path.extname(argv.rename) ? path.extname(argv.rename).substring(1) : format
    }
    await convertMarkdownToFile({ format, title, markdown, argv })
  } catch (e) {
    console.log(chalk.red('Error: ' + e.message))
  }
}
