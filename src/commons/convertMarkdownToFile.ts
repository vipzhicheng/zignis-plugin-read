import fs from 'fs'
import path from 'path'
import { convertMd } from 'pretty-markdown-pdf';

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
  } else {
    throw new Error('Unsupported format!')
  }
}

export default convertMarkdownToFile