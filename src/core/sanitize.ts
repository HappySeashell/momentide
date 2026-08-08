var ArtitalkSanitizer: ArtitalkSanitizer = (function (): ArtitalkSanitizer {
  const allowedTags: Record<string, string[]> = {
    a: ['href', 'title'],
    blockquote: [],
    br: [],
    code: [],
    del: [],
    em: [],
    h1: [], h2: [], h3: [], h4: [], h5: [], h6: [],
    hr: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: ['start'],
    p: [],
    pre: [],
    strong: [],
    table: [],
    tbody: [],
    td: [],
    th: [],
    thead: [],
    tr: [],
    ul: []
  };
  const discardTags: Record<string, boolean> = { base: true, embed: true, iframe: true, link: true, math: true, meta: true, object: true, script: true, style: true, svg: true };

  function isSafeUrl (value: string | null, image: boolean): boolean {
    const url = String(value || '').trim();
    if (url === '' || /[\u0000-\u001F\u007F]/.test(url)) return false;
    if (/^(https?:|mailto:|tel:|\/|#|\.\.?\/)/i.test(url)) return true;
    return image && /^data:image\/(?:gif|jpe?g|png|webp);base64,[a-z0-9+/=\s]+$/i.test(url);
  }

  function sanitizeHtml (html: string | undefined | null): string {
    const parser = new DOMParser();
    const source = parser.parseFromString(String(html || ''), 'text/html');
    const output = document.createElement('div');

    function copyNodes (from: Node, to: Node): void {
      Array.prototype.forEach.call(from.childNodes, function (node: Node): void {
        if (node.nodeType === 3) {
          to.appendChild(document.createTextNode(node.nodeValue || ''));
          return;
        }
        if (node.nodeType !== 1) return;

        const element = node as Element;
        const tag = element.tagName.toLowerCase();
        if (discardTags[tag]) return;
        if (!Object.prototype.hasOwnProperty.call(allowedTags, tag)) {
          copyNodes(node, to);
          return;
        }

        const clean = document.createElement(tag);
        allowedTags[tag].forEach(function (attribute) {
          if (!element.hasAttribute(attribute)) return;
          const value = element.getAttribute(attribute);
          if (value === null) return;
          if ((attribute === 'href' && !isSafeUrl(value, false)) || (attribute === 'src' && !isSafeUrl(value, true))) return;
          clean.setAttribute(attribute, value);
        });
        copyNodes(node, clean);
        to.appendChild(clean);
      });
    }

    copyNodes(source.body, output);
    return output.innerHTML;
  }

  function markdownToHtml (markdown: string): string {
    const converter = new showdown.Converter();
    converter.setOption('strikethrough', 1);
    return sanitizeHtml(converter.makeHtml(markdown));
  }

  return { sanitizeHtml: sanitizeHtml, markdownToHtml: markdownToHtml };
}());
