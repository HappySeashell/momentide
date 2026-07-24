'use strict';

const ArtitalkDom: ArtitalkDom = {
  byId: function (id: string): HTMLElement | null {
    return document.getElementById(id);
  },
  show: function (id: string): void {
    const ele = this.byId(id);
    if (!ele) return;
    ele.style.display = '';
  },
  hide: function (id: string): void {
    const ele = this.byId(id);
    if (!ele) return;
    ele.style.display = 'none';
  },
  setHtml: function (id: string, html: string): void {
    const ele = this.byId(id);
    if (!ele) return;
    ele.innerHTML = html;
  },
  html: function (id: string): string {
    const ele = this.byId(id);
    return ele ? ele.innerHTML : '';
  },
  setValue: function (id: string, value: string): void {
    const ele = this.byId(id);
    if (!ele || !('value' in ele)) return;
    ele.value = value;
  },
  value: function (id: string): string {
    const ele = this.byId(id);
    return ele && 'value' in ele && typeof ele.value === 'string' ? ele.value : '';
  },
  appendToBody: function (ele: Node): void {
    document.body.appendChild(ele);
  },
  appendToHead: function (ele: Node): void {
    document.head.appendChild(ele);
  },
  loadScript: function (src: string, onload: () => void): HTMLScriptElement {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.src = src;
    this.appendToBody(script);
    const legacyWindow = window as Window & { ActiveXObject?: unknown };
    const legacyScript = script as HTMLScriptElement & { readyState?: string; onreadystatechange?: () => void };
    if (legacyWindow.ActiveXObject || 'ActiveXObject' in window) {
      if (legacyScript.readyState) {
        legacyScript.onreadystatechange = function () {
          if (legacyScript.readyState === 'loaded' || legacyScript.readyState === 'complete') {
            onload();
          }
        };
      } else {
        script.onload = onload;
      }
    } else {
      script.onload = onload;
    }
    return script;
  }
};

function Logout (): void {
  ArtitalkData.logout();
  location.reload();
}

function insertEmoji (str: string): void {
  const now = ArtitalkDom.byId('neirong');
  if (!now || !('value' in now) || typeof now.value !== 'string' || !(now instanceof HTMLTextAreaElement || now instanceof HTMLInputElement)) return;
  const nowlength = now.value.length;
  now.focus();
  const legacyDocument = document as Document & { selection?: { createRange(): { text: string } } };
  if (typeof legacyDocument.selection !== 'undefined') {
    legacyDocument.selection.createRange().text = str;
  } else {
    const selectionStart = now.selectionStart || 0;
    now.value = now.value.substr(0, selectionStart) + str + now.value.substring(selectionStart, nowlength);
  }
  preview();
}

function preview (): void {
  const clickPre = ArtitalkDom.byId('clickForPreview');
  if (!clickPre) return;
  clickPre.click();
}
