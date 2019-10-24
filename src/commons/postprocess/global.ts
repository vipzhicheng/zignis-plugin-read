export default (markdown) => {

  // 还原 TOC
  markdown = markdown.replace(/\\\[TOC\\\]/, '[TOC]')
  
  return markdown
}