import fs from 'fs'
import path from 'path'
import os from 'os'
import mkdirp from 'mkdirp'
import { convertMd } from 'pretty-markdown-pdf'
import { spawn } from 'child_process'

import marked from 'marked'
import TerminalRenderer from 'marked-terminal'

const convertMarkdownToFile = async ({ format, title, markdown, argv }) => {
  if (['html', 'pdf', 'png', 'jpeg'].includes(format)) {

    // markdown is temp file in this process
    const mdName = `/tmp/zignis-plugin-read/${title}.md`

    mkdirp.sync(path.dirname(mdName))
    fs.writeFileSync(mdName, markdown)

    await convertMd({ 
      markdownFilePath: mdName, 
      outputFileType: format,
      outputFilePath: path.resolve(process.cwd(), `${title}.${format}`),
      configFilePath: argv.configPath || path.resolve(__dirname, '../config.json'),
      executablePath: argv.executablePath
    })
    fs.unlinkSync(mdName)
  } else if (format === 'markdown' || format === 'md') {
    const mdName = path.resolve(process.cwd(), `${title}.md`)
    console.log(mdName)
    fs.writeFileSync(mdName, markdown)
  } else if (format === 'pager') {
    marked.setOptions({
      renderer: new TerminalRenderer()
    })
    spawn(`cat <<< "${marked(markdown)}" | less -r`, { 
      stdio: 'inherit',
      shell: true
    })
  } else if (format === 'console') {
    console.log(markdown)
  } else {
    throw new Error('Unsupported format!')
  }
}

export default convertMarkdownToFile