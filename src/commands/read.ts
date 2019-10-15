
import util from 'util'
import fs from 'fs'
import read from 'readability-js'
import TurndownService from 'turndown'

const promiseRead = util.promisify(read)
const turndownService = new TurndownService()
export const disabled = false // Set to true to disable this command temporarily
export const command = 'read <url>'
export const desc = 'read main part of a page'
// export const aliases = ''
// export const middleware = (argv) => {}

export const builder = function (yargs: any) {
  // TODO:
  // format=pdf|doc|html|console|markdown|epub...
  yargs.option('title', { default: true, describe: 'prepend title, disable use no-title', alias: 'T' })
  yargs.option('footer', { default: true, describe: 'append footer, disable use no-footer', alias: 'F' })
}

export const handler = async function (argv: any) {
  const article = await promiseRead(argv.url)
  let content = article.content.html()
  if (argv.title) {
    content = `<h1>${article.title}</h1>\n\n${content}`
  }

  let markdown = turndownService.turndown(content)
  if (argv.footer) {
    markdown = `${markdown}\n\n---\n\nFrom: ${argv.url}`
  }

  fs.writeFileSync(article.title + '.md', markdown)
  console.log('Done!')
}
