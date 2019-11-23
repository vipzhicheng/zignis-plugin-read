export const hook_hook = {
  read_define_format: 'Define plugin supported formats.',
  read_format: 'Custom your own format to convert input markdown code.',
  read_domain: 'Custom preprocessor and postprocessor of your favorate domain.'
}

/**
 * 实现钩子： read_define_format
 * 定义支持的格式
 */
export const hook_read_define_format = {
  markdown: {
    describe: 'Markdown 格式',
    alias: 'md'
  },
  pdf: 'PDF 格式，基于 puppeteer',
  png: 'PNG 格式，基于 puppeteer',
  jpeg: 'JPEG 格式，基于 puppeteer',
  html: 'HTML 格式，基于 puppeteer',
  less: '终端阅读，Markdown 语法高亮',
  console: '终端直接输出',
  web: 'Markdown 在线编辑器模式',
  epub: 'EPUB 格式，基于 Pandoc',
  mobi: 'MOBI 格式，基于 Calibre 的 ebook-convert',
}