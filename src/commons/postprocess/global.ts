export default (markdown, opts) => {

  // 还原 TOC
  markdown = markdown.replace(/\\\[TOC\\\]/, '[TOC]')

  return markdown
}