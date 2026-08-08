'use strict';

const ArtitalkTurnstile: ArtitalkTurnstileApi = (function () {
  let siteKey = '';
  let responseToken = '';
  let widgetId = '';
  let loading = false;

  function render (containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container || !siteKey || !window.turnstile) return;
    container.style.display = '';
    if (widgetId) {
      window.turnstile.reset(widgetId);
      return;
    }
    widgetId = window.turnstile.render(container, {
      sitekey: siteKey,
      callback: function (token: string): void { responseToken = token; },
      'expired-callback': function (): void { responseToken = ''; },
      'error-callback': function (): void { responseToken = ''; }
    });
  }

  return {
    configure: function (value?: string): void { siteKey = value || ''; },
    show: function (containerId: string): void {
      if (!siteKey) return;
      if (window.turnstile) { render(containerId); return; }
      if (loading) return;
      loading = true;
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = function (): void { loading = false; render(containerId); };
      document.head.appendChild(script);
    },
    token: function (): string { return responseToken; },
    reset: function (): void {
      responseToken = '';
      if (window.turnstile && widgetId) window.turnstile.reset(widgetId);
    }
  };
})();
