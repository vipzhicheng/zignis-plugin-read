import fs from 'fs'
import path from 'path'

import mkdirp from 'mkdirp'
import { convertMd } from '@vipzhichengfork/pretty-markdown-pdf'
import { spawn } from 'child_process'

import shell from 'shelljs'

import marked from 'marked'
import TerminalRenderer from 'marked-terminal'

import Koa from 'koa'
import views from 'koa-views'
import serve from 'koa-static'
import Router from 'koa-router'

import open from 'open'
import boxen from 'boxen'
import _ from 'lodash'
import chalk from 'chalk'
import axios from 'axios'

import { Utils } from 'zignis'

const convertMarkdownToFile = async ({ format, title, markdown, argv, converted }) => {
  let dir
  if (argv.dir) {
    if (argv.dir[0] === '/') {
      dir = argv.dir
    } else if (argv.dir[0] === '~') {
      dir = argv.dir.replace(/^~/, process.env.HOME)
    } else {
      dir = path.resolve(process.cwd(), argv.dir)
    }
  } else {
    dir = process.cwd()
  }

  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir)
  }

  const extendFormats = await Utils.invokeHook('read_format')
  if (extendFormats[format]) {
    if (Utils._.isFunction(extendFormats[format])) {
      await ((extendFormats[format])({ format, title, markdown, argv, converted }))
      return
    } else {
      throw new Error(`Format ${format} exist, but handler is not a function.`)
    }
  }
  

  if (['html', 'pdf', 'png', 'jpeg'].includes(format)) {

    // markdown is temp file in this process
    const mdName = `/tmp/zignis-plugin-read/${title}.md`

    mkdirp.sync(path.dirname(mdName))
    fs.writeFileSync(mdName, markdown)

    await convertMd({ 
      markdownFilePath: mdName, 
      outputFileType: format,
      outputFilePath: path.resolve(dir, `${title}.${format}`),
      configFilePath: argv.configPath || path.resolve(__dirname, '../config.json'),
      executablePath: argv.executablePath
    })
    fs.unlinkSync(mdName)
  } else if (format === 'markdown' || format === 'md') {
    const mdName = path.resolve(dir, `${title}.md`)
    fs.writeFileSync(mdName, markdown)
  } else if (format === 'less') {
    marked.setOptions({
      renderer: new TerminalRenderer()
    })
    spawn(`cat <<< "${marked(markdown)}" | less -r`, { 
      stdio: 'inherit',
      shell: true
    })
  } else if (format === 'console') {
    console.log(markdown)
  } else if (format === 'epub') {
    if (shell.which('pandoc')) {
      // markdown is temp file in this process
      const mdName = `/tmp/zignis-plugin-read/${title}.md`

      mkdirp.sync(path.dirname(mdName))
      fs.writeFileSync(mdName, markdown)

      shell.exec(`pandoc --metadata title="${title}" "${mdName}" -o "${dir}/${title}.epub" `)

      fs.unlinkSync(mdName)
    } else {
      console.log('.epub format need pandoc installed first.')
    }
  } else if (format === 'mobi') {
    if (shell.which('ebook-convert')) {
      // markdown is temp file in this process
      const mdName = `/tmp/zignis-plugin-read/${title}.md`

      mkdirp.sync(path.dirname(mdName))
      fs.writeFileSync(mdName, markdown)

      shell.exec(`ebook-convert "${mdName}" "${dir}/${title}.mobi" --title ${title} --authors ${argv.domain}`)

      fs.unlinkSync(mdName)
    } else {
      console.log('.mobi format need ebook-convert of Calibre installed first.')
    }
  } else if (format === 'web') {
    const app = new Koa()
    var router = new Router();
 
    router.get('/proxy/(.*)', async (ctx, next) => {
      const proxyUrl = ctx.request.url.substring(7)
      return axios({
        url: proxyUrl,
        responseType: 'stream'
      }).then(response => {
        ctx.type = response.headers['content-type']
        ctx.body = response.data
      })
    });

    app.use(router.routes())

    app.use(views(__dirname + '/../../views', {
      map: {
        html: 'nunjucks',
        extension: 'html'
      }
    }));

    app.use(serve(__dirname + '/../../assets'))

    app.use(async function (ctx) {
      if (argv.debug) {
        if (argv.debug !== 'html') {
          return await ctx.render('index-debug.html', {
            html: markdown
          });
        } else {
          return await ctx.render('index-debug.html', {
            html: converted && converted.content ? converted.content : 'No content'
          });
        }
      } else if (argv.readOnly) {
        return await ctx.render('index-read-only.html', {
          title, body: marked(markdown)
        });
      } else {
        return await ctx.render('index.html', {
          title, markdown
        });
      }
    });

    // 清除终端，copy from package: react-dev-utils
    function clearConsole() {
      process.stdout.write(
        process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
      );
    }

    if (argv.clearConsole) {
      process.stdout.isTTY && clearConsole()
    }

    const box: any = ['Read the article on your default browser...', '']
    box.push(chalk.bold(`Local: `) + chalk.green(argv.localhost))
    if (argv.nethost) {
      box.push(chalk.bold(`WLAN: `) + chalk.green(argv.nethost))
    }

    app.listen(argv.port)
    if (argv.openBrowser) {
      await open(argv.nethost || argv.localhost)
    }
    console.log(boxen(box.join('\n'), {
      margin: 1,
      padding: 1,
      borderColor: 'green'
    }))
  } else {
    throw new Error('Unsupported format!')
  }
}

export default convertMarkdownToFile