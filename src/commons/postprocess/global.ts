export default (markdown, argv) => {

  // 还原 TOC
  markdown = markdown.replace(/\\\[TOC\\\]/, '[TOC]')

  return markdown
}