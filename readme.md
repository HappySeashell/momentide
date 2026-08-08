# Momentide

[中文](#中文) | [English](#english)

## 中文

Momentide 是基于 MIT 许可 [Artitalk](https://github.com/ArtitalkJS/Artitalk) 的独立社区 Fork。0.1 版本以 HCLonely/Artitalk 4.1.0 为兼容基线，保留原作者声明与许可证。Momentide 不是 Artitalk 的官方继任项目，也不代表原维护者。

项目保留 `new Artitalk(...)`、主要 DOM 类名和界面行为，让旧静态站点无需重写页面即可迁移。它连接独立的 Blog API HTTP 协议；当前后端使用 PostgreSQL/Supabase 托管，但公开浏览器 API 不绑定任何数据库厂商。

### 浏览器使用

IIFE 与独立 CSS：

```html
<link rel="stylesheet" href="/vendor/momentide/0.1.0/artitalk.min.css">
<script src="/vendor/momentide/0.1.0/artitalk.min.js"></script>
<div id="artitalk_main"></div>
<script>
new Artitalk({
  target: '#artitalk_main',
  serverURL: 'https://api.example.com',
  turnstileSiteKey: 'YOUR_PUBLIC_TURNSTILE_SITE_KEY',
  pageSize: 10,
  mediaUploadEnabled: false
});
</script>
```

ESM：

```js
import Artitalk from './artitalk.esm.js';

new Artitalk({
  serverURL: 'https://api.example.com',
  turnstileSiteKey: 'YOUR_PUBLIC_TURNSTILE_SITE_KEY'
});
```

本地开发可将 `serverURL` 设置为 `http://127.0.0.1:3000`，并使用 Cloudflare 官方测试 Site Key `1x00000000000000000000AA`。正式站点必须改用只允许正式 hostname 的真实 Site Key。Site Key 本来就是公开值；Turnstile Secret 必须只存在后端环境变量中。

### 安全与兼容改动

- 管理员写操作携带可撤销的 `X-LC-Session`，注销会先让服务器撤销会话。
- 匿名评论携带一次性 Turnstile 响应、蜜罐字段和客户端幂等键，避免重复提交。
- 邮箱只在浏览器中规范化并转换为小写 MD5，用于头像；原始邮箱不发送到服务器。
- Markdown 生成的 HTML 在插入页面前会进行清理；访客评论不允许原始 HTML。
- 第三方媒体上传默认关闭，只有显式设置 `mediaUploadEnabled: true` 才显示入口。项目本身不附带上传令牌。

### 开发、测试与构建

```bash
npm ci
npm run typecheck
npm test
npm run build
npm pack --dry-run
```

`npm run build` 在 `dist/` 生成浏览器 IIFE、ESM 和独立 CSS。博客将精确版本的压缩 IIFE 与 CSS 固定保存在同源 `/vendor/momentide/0.1.0/` 下。若未来改用 CDN，应固定 Release 版本和完整性信息，不能引用 `latest` 或可变分支。

## English

Momentide is an independent community fork of the MIT-licensed [Artitalk](https://github.com/ArtitalkJS/Artitalk) project. Version 0.1 uses HCLonely/Artitalk 4.1.0 as its compatibility baseline and retains the original notices and license. Momentide is not an official Artitalk successor and is not affiliated with the original maintainers.

The project preserves `new Artitalk(...)`, the primary DOM class names, and UI behavior so existing static sites can migrate without rewriting their page. It talks to the independent Blog API HTTP contract. The current backend is hosted on PostgreSQL/Supabase, but the public browser API is not tied to any database vendor.

### Browser usage

IIFE and standalone CSS:

```html
<link rel="stylesheet" href="/vendor/momentide/0.1.0/artitalk.min.css">
<script src="/vendor/momentide/0.1.0/artitalk.min.js"></script>
<div id="artitalk_main"></div>
<script>
new Artitalk({
  target: '#artitalk_main',
  serverURL: 'https://api.example.com',
  turnstileSiteKey: 'YOUR_PUBLIC_TURNSTILE_SITE_KEY',
  pageSize: 10,
  mediaUploadEnabled: false
});
</script>
```

ESM:

```js
import Artitalk from './artitalk.esm.js';

new Artitalk({
  serverURL: 'https://api.example.com',
  turnstileSiteKey: 'YOUR_PUBLIC_TURNSTILE_SITE_KEY'
});
```

For local development, use `http://127.0.0.1:3000` as `serverURL` and Cloudflare's official test Site Key `1x00000000000000000000AA`. Production must use a real Site Key restricted to the production hostname. Site Keys are public by design; the Turnstile Secret must exist only in backend environment variables.

### Security and compatibility changes

- Administrator writes carry a revocable `X-LC-Session`; logout revokes the server session before local state is cleared.
- Anonymous comments carry a one-time Turnstile response, a honeypot field, and a client idempotency key.
- Email is normalized and converted to lowercase MD5 in the browser for avatar lookup; raw email is never sent to the server.
- HTML generated from Markdown is sanitized before insertion; visitor comments do not allow raw HTML.
- Third-party media upload is disabled by default and appears only when `mediaUploadEnabled: true` is explicit. No upload token is bundled.

### Development, testing, and builds

```bash
npm ci
npm run typecheck
npm test
npm run build
npm pack --dry-run
```

`npm run build` creates browser IIFE files, an ESM module, and standalone CSS under `dist/`. The blog vendors the exact minified IIFE and CSS release under the same-origin `/vendor/momentide/0.1.0/` path. If a CDN is introduced later, pin an exact release and integrity metadata; never reference `latest` or a mutable branch.

## Attribution and license

Momentide retains the original MIT license and copyright notices. See [LICENSE](LICENSE).
