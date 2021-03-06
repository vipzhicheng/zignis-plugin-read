export default (html: string, argv) => {

  // 这个是某一个微信公众号代码片段的过滤规则，可能不代表所有，仅供参考
  html = html.replace(/<pre[\s\S]*?>([\s\S]*?)<\/pre>/g, (match1, p1) => {
    p1 = p1.replace(/<code[\s\S]*?>[\s\S]*?<span[\s\S]*?>([\s\S]*?)<\/span>[\s\S]*?<\/code>/g, (match2, p2) => {
      p2 = p2.replace(/<br.*?\/?>/g, '')
      return `${p2}\n`
    })

    return `<pre><code>${p1.trim()}</code></pre>`
  })

  return html
}