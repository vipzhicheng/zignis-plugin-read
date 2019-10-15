import fs from 'fs'
import convertUrlToMarkdown from '../commons/convertUrlToMarkdown'

export const disabled = false // Set to true to disable this command temporarily
export const command = 'read <url>'
export const desc = 'read main part of a page'
// export const aliases = ''
// export const middleware = (argv) => {}

export const builder = function (yargs: any) {
  // TODO:
  // format=pdf|doc|html|markdown|epub...
  yargs.option('title', { default: true, describe: 'prepend title, disable use no-title', alias: 'T' })
  yargs.option('footer', { default: true, describe: 'append footer, disable use no-footer', alias: 'F' })
}

export const handler = async function (argv: any) {
  const { title, markdown } = await convertUrlToMarkdown(argv)
  fs.writeFileSync(title + '.md', markdown)
  console.log(`${title} has been saved!`)
}
