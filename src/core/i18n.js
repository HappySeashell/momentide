const ArtitalkI18n = (function () {
  function normalizeLanguage (language) { return typeof language === 'string' && ArtitalkLocales[language] ? language : 'zh'; }
  function getMessages (language) { return ArtitalkLocales[normalizeLanguage(language)]; }
  function translateEmojis (content, customEmojis) { if (typeof content === 'undefined') return; [atEmojiQQ, atEmojiTB, atEmojiBB, customEmojis || {}].forEach(function (set) { for (const key in set) { const token = '[' + key + ']'; const image = "<img class='atemoji gallery-group-img' src='" + set[key] + "'/>"; while (content.indexOf(token) !== -1) content = content.replace(token, image); } }); return content; }
  return { normalizeLanguage: normalizeLanguage, getMessages: getMessages, translateEmojis: translateEmojis };
}());
