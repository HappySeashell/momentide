interface AVRecord extends ArtitalkRecord {}

interface AVUser extends AVRecord {}

interface AVQuery {
  descending(field: string): this;
  addDescending(field: string): this;
  limit(count: number): this;
  skip(count: number): this;
  equalTo(field: string, value: unknown): this;
  find(): Promise<AVRecord[]>;
}

interface AVNamespace {
  init(options: { appId?: string; appKey?: string; serverURL?: string }): void;
  User: {
    current(): AVUser | null;
    logIn(username: string, password: string): Promise<AVUser>;
    logOut(): Promise<void>;
  };
  Object: {
    extend(className: string): new () => AVRecord;
    createWithoutData(className: string, id: string): AVRecord;
  };
  Query: new (className: string) => AVQuery;
}

interface BrowserInfo {
  name: string | null;
  version: string | number | null;
}

interface EngineInfo {
  name: string | null;
  version: string | number | null;
}

interface SystemInfo {
  name: string | null;
  version: string | number | null;
}

interface ClientResult {
  browser: BrowserInfo;
  engine: EngineInfo;
  system: SystemInfo;
}

interface ClientConstructor {
  new (): ClientResult;
}

interface ShowdownConverter {
  setOption(name: string, value: unknown): void;
  makeHtml(markdown: string): string;
}

interface ShowdownStatic {
  Converter: new () => ShowdownConverter;
}

interface ArtitalkSvgModule {
  render(name: string, values?: Record<string, string | number>): string;
}

interface ArtitalkTemplateModule {
  [name: string]: string | ((name: string, values: Record<string, unknown>) => string);
  render(name: string, values: Record<string, unknown>): string;
}

interface Window {
  AV?: AVNamespace;
  Client: ClientConstructor;
  turnstile?: {
    render(target: HTMLElement, options: Record<string, unknown>): string;
    reset(widgetId?: string): void;
  };
}

declare const AV: AVNamespace;
declare const Client: ClientConstructor;
declare const showdown: ShowdownStatic;
declare const ArtitalkLocales: Record<string, ArtitalkMessages>;
declare const ArtitalkSvg: ArtitalkSvgModule;
declare const ArtitalkTemplates: ArtitalkTemplateModule;
declare function md5(value: string): string;
declare function insertEmoji(value: string): void;
