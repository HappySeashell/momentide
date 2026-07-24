interface AVRecord extends ArtitalkRecord {}

interface AVUser extends AVRecord {}

interface AVQuery {
  descending(field: string): void;
  addDescending(field: string): void;
  limit(count: number): void;
  skip(count: number): void;
  equalTo(field: string, value: unknown): void;
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

interface ClientPart {
  name: string | null;
  version: string | number | null;
}

interface ClientResult {
  browser: ClientPart;
  engine: ClientPart;
  system: ClientPart;
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

interface Window {
  AV?: AVNamespace;
}

declare const AV: AVNamespace;
declare const Client: ClientConstructor;
declare const showdown: ShowdownStatic;
declare const ArtitalkLocales: Record<string, ArtitalkMessages>;
declare const ArtitalkSvg: ArtitalkSvgModule;
