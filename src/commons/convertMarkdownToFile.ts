import fs from 'fs'
import path from 'path'
import { convertMd } from 'pretty-markdown-pdf'
import { spawn } from 'child_process'

import marked from 'marked'
import TerminalRenderer from 'marked-terminal'

const convertMarkdownToFile = async ({ format, title, markdown }) => {
  let mdName = `${title}.md`
  // let fileName = format === 'markdown' ? `${title}.md` : `${title}.${format}`

  fs.writeFileSync(mdName, markdown)
  if (['html', 'pdf', 'png', 'jpeg'].includes(format)) {
    await convertMd({ 
      markdownFilePath: mdName, 
      outputFileType: format,
      configFilePath: path.resolve(__dirname, '../config.json')
    })
    fs.unlinkSync(mdName)
  } else if (format === 'markdown') {
    // DO nothing
  } else if (format === 'terminal') {
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