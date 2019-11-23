import fs from 'fs'
import path from 'path'
import convertUrlToMarkdown from '../commons/convertUrlToMarkdown'
import convertMarkdownToFile from '../commons/convertMarkdownToFile'
import chalk from 'chalk'
import os from 'os'
import getPort from 'get-port'
import _ from 'lodash'
import { Utils } from 'zignis'

export const disabled = false // Set to true to disable this command temporarily
export const command = 'read [url]'
export const desc = 'Parse and read a url or a md file with your favorate format.'
// export const aliases = ''
// export const middleware = (argv) => {}

export const builder = function (yargs: any) {
  yargs.option('format', { default: 'markdown', describe: 'Output format, use --available-formats to see all supported formats, default: markdown.', alias: 'F' })
  
  // web format related
  yargs.option('read-only', { describe: 'Only render html, used with web format.', alias: 'ro' })
  yargs.option('debug', { describe: 'Check middle code, used with web format, default is parsed markdown, debug=html will show parsed html' })
  yargs.option('proxy', { describe: 'Proxy images to prevent anti-hotlinking.', alias: 'P' })
  yargs.option('port', { describe: 'Web server port.' })
  yargs.option('localhost', { describe: 'Localhost host with port, auto set and you can change.' })
  yargs.option('nethost', { describe: 'WLAN host with port, auto set and you can change.' })
  yargs.option('open-browser', { describe: 'Auto open browser in web format.', alias: ['open', 'ob'] })
  yargs.option('clear-console', { describe: 'Auto clear console.', alias: 'clear' })

  yargs.option('title', { default: true, describe: 'Prepend title, use no-title to disable.' })
  yargs.option('footer', { default: true, describe: 'Append footer, use no-footer to disable.' })
  yargs.option('toc', { default: true, describe: 'Include TOC' })

  yargs.option('rename', { describe: 'New name, with extension.', alias: 'R' })
  yargs.option('directory', { describe: 'Location for output.', alias: 'dir' })

  yargs.option('available-formats', { describe: 'List supported formats', alias: 'A' })
}

export const handler = async function (argv: any) {
  if (argv.availableFormats) {
    const formats = await Utils.invokeHook('read_define_format')
    const headers = ['格式', '说明', '别名']
    const rows = [headers]
    Object.keys(formats).forEach(key => {
      const format = formats[key]
      const describe = _.isObject(format) ? format.describe : format
      const alias = _.isObject(format) ? format.alias : ''
      rows.push([
        key, describe, alias
      ])
    })

    console.log(Utils.chalk.green('\nSupported formats: --format=[FORMAT]\n'))
    console.log(Utils.table(rows))
    process.exit(1)
  }

  // Even the format is not web or mobi, other plugins may need these values
  let port = await getPort()
  argv.port = argv.port || port
  
  // HOST地址检测
  argv.localhost = `http://localhost:${argv.port}`
  const interfaceFounded = _.chain(os.networkInterfaces()).flatMap().find(o => o.family === 'IPv4' && o.internal === false).value()
  argv.nethost = interfaceFounded ? `http://${interfaceFounded.address}:${argv.port}` : null

  let format = argv.format
  let title
  let markdown
  let converted

  try {
    if (!argv.url || argv.url.match(/\.md$/) && !argv.url.match(/^http/)) {
      if (!argv.url) {
        title = markdown = ''
      } else {
        // local
        let filePath = argv.url[0] !== '/' ? path.resolve(process.cwd(), argv.url) : argv.url
        markdown = fs.readFileSync(filePath, { encoding: 'utf8' })
        title = path.basename(filePath, '.md')
      }
    } else {
      converted = await convertUrlToMarkdown(argv)
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
    await convertMarkdownToFile({ format, title, markdown, argv, converted })
  } catch (e) {
    console.log(chalk.red('Error: ' + e.stack))
  }
}
