zignis-plugin-read
------------------

这是一个简单的工具插件，目的是实现一个能够方便的获取网页主体的命令行工具，以方面我们以各种方式搜集整理学习资料，支持各种格式，有一些特色模式，为了简单这里也称之为格式。

## 安装和使用

```bash
npm i -g zignis zignis-plugin-read

# 默认会下载 puppeteer，比较慢，加上这个环境变量就不下了，也可以 `Ctrl+C` 取消下载
# 没有 puppeterr， `html`, `png`, `jpeg` 和 `pdf` 就不能工作了。
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm i -g zignis zignis-plugin-read

# 用法
zignis read [URL|本地 markdown] --format=[FORMAT]

# 帮助
zignis read [url]

Parse and read a url or a md file with your favorate format.

选项：
  --version             显示版本号                                                                                [布尔]
  --format, -F          Output format, support: markdown, md, pdf, html, png, jpeg, less, console, web, epub, mobi,
                        default: markdown.                                                          [默认值: "markdown"]
  --read-only, --ro     Only render html, used with web format.
  --debug               Check middle html code, used with web format.
  --port                Web server port.
  --open-browser, --ob  Auto open browser in web format.                                                  [默认值: true]
  --title               Prepend title, use no-title to disable.                                           [默认值: true]
  --footer              Append footer, use no-footer to disable.                                          [默认值: true]
  --toc                 Include TOC                                                                       [默认值: true]
  --rename              New name, with extension.
  --dir                 Location for downloading.
```

## 举例

```bash
zignis read https://juejin.im/post/5d82e116e51d453b7779d5f6
zignis read --format=web # 打开一个空的 markdown 编辑器
zignis read README.md # 欣赏一下自己项目的 README

```

## 支持的格式

* `markdown` 或 `md`: 基于 `readability`
* `html`: 基于 `puppeteer`
* `png`: 基于 `puppeteer`
* `jpeg`: 基于 `puppeteer`
* `pdf`: 基于 `puppeteer`
* `epub`: 基于 `pandoc` 生成，然后可以用 Mac 自带的图书应用查看
* `mobi`: 基于 `Calibre` 的 `ebook-convert` 生成，然后可以使用 `Kindle` 查看
* `less`: 自定义格式，在终端输出着色的 `markdown`，然后用 `less` 输出
* `console`: 将 `markdown` 直接输出到终端，可以按需处理
* `web`: 把 `markdown` 输出成网页，并集成了 Markdown 编辑器，即可以查看，也可以修改
* `web --read-only`: 把 `markdown` 输出成网页，但是没有编辑器
* `web --debug`: 把 `markdown` 把 markdown 代码以网页输出，用于调试
* `web --debug=html`: 把 `markdown` 把识别到的 HTML 代码以网页输出，用于调试

**这里并没有充分发挥所有 `pandoc` 和 `Calibre` 的威力，只是选择了常用的几种格式，如果不能满足你的需求，可以用下面提到的方法扩展本插件**

## 开发路径

- [x] 支持识别网页主体，并下载成 Markdown
- [x] 支持指定网站的预处理和后处理机制，基于网址识别域名
- [x] data-src等识别，转换为 src
- [x] 支持生成 pdf, html, png, jpeg 格式
- [x] 支持终端阅读，着色，按 q 退出
- [x] 支持直接输出，用于管道处理或自定义保存
- [x] 支持本地 markdown 文件导入
- [x] 优化，使其可以安装时不默认安装 puppeteer
- [x] 依赖 pandoc 支持 epub
- [x] 支持提供本地 web 服务，可以网址 Share 给局域网的其他好友
- [x] 解决readability-js 的安全警告，改用上游包
- [x] 调研 mobi 格式的依赖
- [x] 调研掘金的表格是否有可能修复，https://juejin.im/post/5da34216e51d4578502c24c5
- [x] fork 过时包，做安全更新
- [x] 添加输出目录选项 `--dir`
- [x] 优化 web 模式，可以直接输出成网页，不启用 editor
- [x] 优化 debug 模式，基于 Web 模式输出
- [x] 修复代码块的配置，美化只读模式输出
- [x] 给 editor.md 升级版本，解决 `<ol>` 序号错误的问题
- [x] 支持不传参数，只打开编辑器
- [x] 让插件可以扩展站点预处理和后处理逻辑，让插件可以扩展更多的格式支持
- [ ] 调研 puppeteer 模式，应对动态内容的页面，例如 infoq
- [ ] 让 editor.md 基于包的构建产生，源码不放在这个项目，只保留必要的文件
- [ ] 调研掘金小册

## 预处理和后处理

默认会自动识别网页主体，但是可能会有偏差，所以通过预处理和后处理的方式进行微调，微调分为全局规则和基于域名的个性化规则。

开发过程中发现，默认行为总是不尽如人意，需要针对性的调优，目前只对下列网站做过基本调优，不保证绝对没有问题，遇到一个解决一个

- 掘金
- 简书
- 知乎

## 已知 BUG

1. 生成 `mobi` 格式时，远程图片会丢失，可以先转成 `epub`，然后自己用 `ebook-convert` 转成 `mobi`

## 感谢

本项目只是为了达到开发目的，对各种相关开源项目进行测试，优选和组合，我写的代码不值一提，更多的核心功能都来自于各个依赖包，希望大家能够喜欢我做的整合，并多提宝贵意见。

## 参与贡献

这样的一个简单的项目如果能有更多的人参与和支持可以让其变得更加好用，比如提供更多网站的适配，贡献能够生成更多格式文档的代码或者发现 BUG 以后给我提 issue。

## 插件开发

这里提供了两个钩子给大家扩展，一个用于扩展支持的格式，一个用于扩展支持的站点解析。具体的插件开发方法请参考 `Zignis` 官方文档。

```
hook_read_format
hook_read_domain
```

### 扩展格式示例

```js
// zignis new zignis-plugin-read-extend-format-super
// src/hooks/index.ts
export const hook_read_format = {
  super: async ({ title, markdown, converted, argv }) => {
    // implement your super format.
  }
}
```

### 扩展站点示例

```js
// zignis new zignis-plugin-read-extend-domain-target
// src/hooks/index.ts
export const hook_read_domain = {
  'target.domain': {
    preprocess: (source, argv) => {
      return source
    },
    postprocess: (markdown, argv) => {
      return  markdown
    }
  } 
}
```

`target.domain` 不要包含开头的 `www.`，并且两个处理函数都必须把处理好的内容返回回去，预处理的 source 是文章主题的 HTML 代码，后处理的 markdown 是转换后的 markdown 代码。

### 注意事项

1. 如果你要把自己实现的插件发布到 npm，建议你分开实现这两个钩子，一个插件只做一件事情。如果你只是自己用，那么你可以一个插件实现所有的钩子，维护更加方便。
2. 无法保证插件的隔离性，比如两个插件可能实现的是相同的格式或者站点处理规则，或者有交集，这方面只能交给大家去甄选，让好的插件浮出水面，并变得更好，更强大。


## 关于 Zignis

`Zignis` 是这个插件的驱动，是我开发的一个命令行开发框架，也是在开源项目 `yargs` 基础上做的封装，大家感兴趣的话可以移步[这里](https://zignis.js.org)和[这里](https://github.com/zhike-team/zignis-plugin-starter)，了解一下怎样快速开发一个命令行工具。


## 协议

MIT