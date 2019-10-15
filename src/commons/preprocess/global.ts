export default (html) => {
  return html.replace(/<img(.*?)data-src=/g, '<img$1src=')
}