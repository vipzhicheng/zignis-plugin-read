export default (markdown) => {
  markdown = markdown.replace(/\\\[TOC\\\]/, '[TOC]')
  return markdown
}