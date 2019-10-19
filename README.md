zignis-plugin-read
------------------

这是一个简单的工具插件，目的是实现一个能够方便的获取网页主体的命令行工具，我们可以选择生成 markdown, pdf, html 或者直接提供一个本地网址进行查看，以方面我们以各种方式搜集整理学习资料

## 安装和使用

```
npm i -g zignis zignis-plugin-read
zignis read URL --format=[FORMAT]
```

## 举例

```
zignis read https://juejin.im/post/5d82e116e51d453b7779d5f6

```

## 支持的格式

* `markdown`
* `html`
* `png`
* `jpeg`
* `pdf`
* `pager`: 自定义格式，在终端输出着色的 `markdown`，然后用 `less` 输出
* `console`: 将 `markdown` 直接输出到终端，可以按需处理
* `epub`: 借助 `pandoc` 生成，然后可以用 Mac 自带的图书应用查看

## 开发计划

- [*] 支持识别网页主体，并下载成 Markdown
- [*] 支持指定网站的预处理和后处理机制，基于网址识别域名
- [*] data-src 识别，转换为 src
- [*] 支持生成 pdf, html, png, jpeg 格式
- [*] 支持终端阅读，着色，按 q 退出
- [*] 支持直接输出，用于管道处理或自定义保存
- [*] 支持本地 markdown 文件导入
- [*] 优化，使其可以安装时不默认安装 puppeteer
- [*] 依赖 pandoc 支持 epub
- [] 支持提供本地 web 服务，可以网址 Share 给局域网的其他好友，参考 outline.com
- [] 解决readability-js 的安全警告，基于上游包重写

## 预处理和后处理

默认会自动识别网页主体，但是可能会有偏差，所以通过预处理和后处理的方式进行微调，微调分为全局规则和基于域名的个性化规则。

## 感谢

本项目只是为了达到开发目的，对各种相关开源项目进行测试，优选和组合，我写的代码不值一提，更多的核心功能都来自于各个依赖包，希望大家能够喜欢我做的整合，并多提宝贵意见。

## 参与贡献

这样的一个简单的项目如果能有更多的人参与和支持可以让其变得更加好用，比如提供更多网站的适配，贡献能够生成更多格式文档的代码或者发现 BUG 以后给我提 issue。

## 关于 Zignis

`Zignis` 是这个插件的驱动，是我开发的一个命令行开发框架，也是在开源项目 `yargs` 基础上做的封装，大家感兴趣的话可以移步[这里](https://zignis.js.org)和[这里](https://github.com/zhike-team/zignis-plugin-starter)，了解一下怎样快速开发一个命令行工具。


## 协议

MIT