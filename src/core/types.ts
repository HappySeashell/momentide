interface ArtitalkEmojiMap {
  [name: string]: string;
}

interface ArtitalkImageUploadOptions {
  api?: string;
  tokenHeader?: string;
}

interface ArtitalkOptions {
  appId?: string;
  appKey?: string;
  serverURL?: string;
  lang?: string;
  pageSize?: number | string;
  atEmoji?: ArtitalkEmojiMap;
  atComment?: number | boolean;
  bgImg?: string;
  motion?: number | boolean;
  cssUrl?: string;
  shuoPla?: string;
  avatarPla?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  blackAndWhiteTheme?: boolean;
  imageUpload?: ArtitalkImageUploadOptions;
  onLogin?: (username: string) => void;
  onShuoPublished?: (username: string, content: string) => void;
  onCommentsPublished?: (nickname: string, content: string) => void;
}

interface ArtitalkRecord {
  id?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  attributes: Record<string, unknown>;
  set(key: string, value: unknown): void;
  save(): Promise<ArtitalkRecord>;
  destroy?(): Promise<unknown>;
}

interface ArtitalkUser extends ArtitalkRecord {}

interface ArtitalkMessages {
  [key: string]: string;
}

interface ArtitalkData {
  ensureReady(config: ArtitalkOptions | undefined, callback: () => void): void;
  init(config: ArtitalkOptions): void;
  currentUser(): ArtitalkUser | null;
  login(username: string, password: string): Promise<ArtitalkUser>;
  logout(): Promise<void>;
  updateCurrentUser(attributes: Record<string, unknown>): Promise<ArtitalkUser>;
  createTalk(): ArtitalkRecord;
  talkById(id: string): ArtitalkRecord;
  commentById(): ArtitalkRecord;
  queryTalks(pageSize: number, pageNum: number): Promise<ArtitalkRecord[]>;
  queryTalkById(id: string): Promise<ArtitalkRecord[]>;
  queryComments(talkId: string): Promise<ArtitalkRecord[]>;
}

interface ArtitalkDom {
  byId(id: string): HTMLElement | null;
  show(id: string): void;
  hide(id: string): void;
  setHtml(id: string, html: string): void;
  html(id: string): string;
  setValue(id: string, value: string): void;
  value(id: string): string;
  appendToBody(element: Node): void;
  appendToHead(element: Node): void;
  loadScript(src: string, onload: () => void): HTMLScriptElement;
}

interface ArtitalkI18n {
  normalizeLanguage(language: unknown): string;
  getMessages(language: unknown): ArtitalkMessages;
  translateEmojis(content: string | undefined, customEmojis?: ArtitalkEmojiMap): string | undefined;
}

interface ArtitalkSanitizer {
  sanitizeHtml(html: string | undefined | null): string;
  markdownToHtml(markdown: string): string;
}
