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

interface ArtitalkRecordAttributes {
  [key: string]: unknown;
  objectId?: string;
  username?: string;
  img?: string;
  imgToken?: string;
  backgroundColor?: string;
  atContentMd?: string;
  atContentHtml?: string;
  userOs?: string;
  avatar?: string;
  authorId?: string;
  authorName?: string;
  authorColor?: string;
  isPinned?: boolean;
  commentContent?: string;
  email?: string;
  nick?: string;
  adminAvatar?: string;
}

interface ArtitalkRecord {
  id: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  attributes: ArtitalkRecordAttributes;
  set(key: string, value: unknown): void;
  save(): Promise<ArtitalkRecord>;
  destroy(): Promise<unknown>;
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

interface ArtitalkUploadResponse {
  data: {
    url: string;
  };
}

interface ArtitalkSanitizer {
  sanitizeHtml(html: string | undefined | null): string;
  markdownToHtml(markdown: string): string;
}

interface ArtitalkInstance {
  config: ArtitalkOptions;
  init(option?: ArtitalkOptions): this;
  _init(): void;
  seeContent(pageNum: number, option: ArtitalkOptions): void;
  beginUpload(file: File): void;
  delete(id: string): void;
  atEdit(id: string): void;
  togglePin(id: string, isPinned: boolean): void;
  atEditsave(id: string): void;
  saveComment(id: string, option?: ArtitalkOptions): void;
  atReply(): void;
  commentInit(id: string, option?: ArtitalkOptions): void;
}

interface AtEveryConstructor {
  new (option?: ArtitalkOptions): ArtitalkInstance;
  prototype: ArtitalkInstance;
}
