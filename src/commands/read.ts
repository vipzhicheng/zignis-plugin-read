import convertUrlToMarkdown from '../commons/convertUrlToMarkdown'
import convertMarkdownToFile from '../commons/convertMarkdownToFile'
import chalk from 'chalk'

export const disabled = false // Set to true to disable this command temporarily
export const command = 'read <url>'
export const desc = 'read main part of a page'
// export const aliases = ''
// export const middleware = (argv) => {}

export const builder = function (yargs: any) {
  yargs.option('title', { default: true, describe: 'prepend title, disable use no-title' })
  yargs.option('footer', { default: true, describe: 'append footer, disable use no-footer' })
  yargs.option('format', { default: 'markdown', describe: 'format, support: markdown, pdf, html, png, jpeg, terminal, default: markdown.', alias: 'F' })
}

export const handler = async function (argv: any) {
  const { title, markdown } = await convertUrlToMarkdown(argv)
  try {
    await convertMarkdownToFile({ format: argv.format, title, markdown })
  } catch (e) {
    console.log(chalk.red(e.message))
  }
}
