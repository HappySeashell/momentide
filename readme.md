# Momentide

Momentide is an independent community fork of the MIT-licensed
[Artitalk](https://github.com/ArtitalkJS/Artitalk) project. It is not an
official successor and is not affiliated with the original maintainers.

Version 0.1 keeps the Artitalk 4.1 browser API and UI so existing static sites
can migrate without rewriting their page:

```html
<link rel="stylesheet" href="/vendor/momentide/0.1.0/artitalk.min.css">
<script src="/vendor/momentide/0.1.0/artitalk.min.js"></script>
<div id="artitalk_main"></div>
<script>
new Artitalk({
  serverURL: 'http://127.0.0.1:3000',
  turnstileSiteKey: '1x00000000000000000000AA',
  pageSize: 10
});
</script>
```

The component targets the independent `momentide-server` HTTP contract. That
server uses standard PostgreSQL; the public browser API is not tied to
Supabase or any other database vendor.

## Security changes

- Administrator writes carry a revocable `X-LC-Session` token.
- Anonymous comments carry a Turnstile response and an idempotency key.
- Email input is normalized and MD5-hashed in the browser for avatar lookup;
  raw email is never submitted.
- HTML produced from Markdown is sanitized before rendering.
- Third-party media upload is disabled unless `mediaUploadEnabled: true` is
  explicitly configured.

## Build outputs

`npm run build` creates the compatible IIFE files, an ESM script, and standalone
CSS under `dist/`. Production sites should vendor a fixed release instead of
loading the latest version from a CDN.

## Attribution and license

Momentide retains the original MIT license and copyright notices. The 0.1
baseline is HCLonely/Artitalk 4.1.0, which itself is derived from Artitalk.
