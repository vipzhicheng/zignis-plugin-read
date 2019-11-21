export default (html: string, argv) => {

  // 这个是某一个微信公众号代码片段的过滤规则，可能不代表所有，仅供参考
  html = html.replace(/<pre[\s\S]*?>[\s\S]*?<\/pre>/g, (match1) => {
    match1 = match1.replace(/<code[\s\S]*?>[\s\S]*?<span[\s\S]*?>([\s\S]*?)<\/span>[\s\S]*?<\/code>/g, (match2, p1) => {
      p1 = p1.replace(/<br.*?\/?>/g, '')
      return `${p1}\n`
    })

    return `<pre><code>${match1.trim()}</code></pre>`
  })

  return html
}