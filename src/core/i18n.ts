const ArtitalkI18n: ArtitalkI18n = (function (): ArtitalkI18n {
  function normalizeLanguage (language: unknown): string { return typeof language === 'string' && ArtitalkLocales[language] ? language : 'zh'; }
  function getMessages (language: unknown): ArtitalkMessages { return ArtitalkLocales[normalizeLanguage(language)]; }
  function translateEmojis (content: string | undefined, customEmojis?: ArtitalkEmojiMap): string | undefined { if (typeof content === 'undefined') return; let translatedContent = content; [atEmojiQQ, atEmojiTB, atEmojiBB, customEmojis || {}].forEach(function (set: ArtitalkEmojiMap): void { for (const key in set) { const token = '[' + key + ']'; const image = "<img class='atemoji gallery-group-img' src='" + set[key] + "'/>"; while (translatedContent.indexOf(token) !== -1) translatedContent = translatedContent.replace(token, image); } }); return translatedContent; }
  return { normalizeLanguage: normalizeLanguage, getMessages: getMessages, translateEmojis: translateEmojis };
}());
