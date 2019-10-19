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
  yargs.option('title', { default: true, describe: 'prepend title, use no-title to disable.' })
  yargs.option('footer', { default: true, describe: 'append footer, use no-footer to disable.' })
  yargs.option('format', { default: 'markdown', describe: 'format, support: markdown, pdf, html, png, jpeg, pager, console, epub, default: markdown.', alias: 'F' })
  yargs.option('rename', { describe: 'new name, with extension.' })
  yargs.option('config-path', { describe: 'config path.' })
}

export const handler = async function (argv: any) {
  let format = argv.format
  let title
  let markdown

  if (argv.url.match(/\.md$/) && !argv.url.match(/^http/)) {
    // local
    let filePath = argv.url[0] !== '/' ? path.resolve(process.cwd(), argv.url) : argv.url
    markdown = fs.readFileSync(filePath)
    title = path.basename(filePath, '.md')
  } else {
    const converted = await convertUrlToMarkdown(argv)
    title = converted.title
    markdown = converted.markdown
  }
  
  try {
    if (argv.rename) {
      title = path.basename(argv.rename, path.extname(argv.rename))
      format = path.extname(argv.rename) ? path.extname(argv.rename).substring(1) : format
    }
    await convertMarkdownToFile({ format, title, markdown, argv })
  } catch (e) {
    console.log(chalk.red(e.message))
  }
}
