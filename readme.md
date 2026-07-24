# Artitalk.js

Artitalk 是一个轻量级说说/动态发布组件，适合嵌入个人博客或静态站点。当前版本保留前端组件用法，并提供基于 Vercel + Neon Postgres 的服务端实现，用于替代 LeanCloud 依赖。

![](https://img.shields.io/github/stars/HCLonely/Artitalk)
![](https://img.shields.io/npm/dm/@hclonely/artitalk.svg)
![](https://img.shields.io/npm/v/@hclonely/artitalk.svg)
![](https://img.shields.io/badge/language-JavaScript-red)

由于[原项目](https://github.com/ArtitalkJS/Artitalk)不再更新，LeanCloud即将关闭服务，所以本项目诞生了。

详细使用教程请移步 [官方文档](https://artitalk-docs.hclonely.com/)。

## 特性

- 发布、预览、删除说说内容
- 支持 Markdown/HTML 内容渲染
- 支持图片、音乐、视频等媒体上传入口
- 支持评论、表情
- 提供 Vercel 服务端，支持从 LeanCloud 数据迁移

## 快速开始

在页面中引入构建后的脚本，并准备挂载容器：

```html
<script src="https://unpkg.com/@hclonely/artitalk"></script>
<div id="artitalk_main"></div>
<script>
  new Artitalk({
    serverURL: 'https://your-vercel-app.vercel.app',
    pageSize: 5,
    blackAndWhiteTheme: true
  });
</script>
```

如果使用本仓库的测试页面，可以直接打开 `test/test_page.html` 查看集成示例。部署 Vercel 服务端的说明见 [server/README.md](server/README.md)。

## 目录结构

```text
.
├─ dist/                         # 构建产物
│  ├─ css/artitalk.min.css
│  └─ js/artitalk.js
├─ server/                       # Vercel + Neon Postgres 服务端
├─ src/
│  ├─ core/                      # 数据、DOM、版本、表情等核心逻辑
│  ├─ css/main.scss              # 组件样式
│  ├─ html/                      # HTML 片段
│  ├─ modules/                   # 初始化、内容渲染、上传等模块
│  ├─ plugins/                   # Markdown、MD5、浏览器识别和 AV 兼容层
│  └─ main.js                    # Artitalk 入口
├─ test/test_page.html           # 前端集成测试页面
├─ gulpfile.js                   # 构建配置
└─ package.json
```

## 资源说明

- `lazy.html`: 加载动画源自 CodePen: https://codepen.io/tholman/pen/yenku
- `showdown.min.js`: https://github.com/showdownjs/showdown
- `browser.js`: https://github.com/ok-dok/judge-browser/blob/master/judge-browser.js
- `md5.js`: https://github.com/blueimp/JavaScript-MD5

## 参与贡献

1. Fork 本项目
2. 基于目标分支创建新分支并提交修改
3. 执行必要的构建、Lint 和测试
4. 发起 Pull Request，并说明变更内容和验证结果
