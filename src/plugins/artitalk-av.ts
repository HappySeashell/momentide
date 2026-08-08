(function (global: Window & typeof globalThis): void {
  interface ApiConfig {
    appId?: string;
    appKey?: string;
    serverURL?: string;
  }

  interface ApiRecord {
    objectId?: string;
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    attributes?: ArtitalkRecordAttributes;
  }

  interface RequestOptions extends RequestInit {
    params?: QueryParameters;
    authenticated?: boolean;
  }

  interface QueryParameters {
    [key: string]: string;
  }

  interface AVObjectRecord extends ArtitalkRecord {
    className: string;
  }

  interface AVObjectConstructor {
    new (): AVObjectRecord;
  }

  interface AVQuery {
    equalTo(key: string, value: unknown): this;
    descending(key: string): this;
    addDescending(key: string): this;
    limit(value: number): this;
    skip(value: number): this;
    find(): Promise<AVObjectRecord[]>;
  }

  interface AVQueryConstructor {
    new (className: string): AVQuery;
  }

  interface AVUser extends AVObjectRecord {
    sessionToken?: string;
  }

  interface AVNamespace {
    init(options?: ApiConfig): void;
    User: {
      current(): AVUser | null;
      logIn(username: string, password: string): Promise<AVUser>;
      logOut(): Promise<void>;
    };
    Object: {
      extend(className: string): AVObjectConstructor;
      createWithoutData(className: string, id: string): AVObjectRecord;
    };
    Query: AVQueryConstructor;
  }

  let config: ApiConfig = { serverURL: '' };
  const storageKey = 'artitalk:currentUser';

  function storedUser (): AVUser | null {
    const raw = global.localStorage && global.localStorage.getItem(storageKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AVUser;
    } catch {
      global.localStorage.removeItem(storageKey);
      return null;
    }
  }

  function baseUrl (): string {
    return (config.serverURL || '').replace(/\/$/, '');
  }

  function apiUrl (path: string, params?: QueryParameters): string {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return baseUrl() + '/api' + path + query;
  }

  function request<T> (path: string, options?: RequestOptions): Promise<T> {
    options = options || {};
    options.headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers || {});
    if (options.authenticated) {
      const token = storedUser()?.sessionToken;
      if (token) (options.headers as Record<string, string>)['X-LC-Session'] = token;
    }
    delete options.authenticated;
    return global.fetch(apiUrl(path, options.params), options).then(function (response): Promise<T> {
      return response.json().then(function (json: T & { error?: string }): T {
        if (!response.ok) {
          const error = new Error(json.error || 'Request failed') as Error & { rawMessage?: string };
          error.rawMessage = json.error;
          throw error;
        }
        return json;
      });
    });
  }

  function inflateObject (className: string, raw: ApiRecord): AVObject {
    const object = new AVObject(className, raw.objectId || raw.id);
    object.id = (raw.objectId || raw.id) as string;
    object.createdAt = raw.createdAt ? new Date(raw.createdAt) : undefined as unknown as Date;
    object.updatedAt = raw.updatedAt ? new Date(raw.updatedAt) : undefined;
    object.attributes = Object.assign({}, raw.attributes || {});
    return object;
  }

  class AVObject implements AVObjectRecord {
    className: string;
    id!: string;
    createdAt!: Date;
    updatedAt?: Date;
    attributes: ArtitalkRecordAttributes;

    constructor (className: string, id?: string) {
      this.className = className;
      this.id = id as string;
      this.attributes = {};
    }

    set (key: string, value: unknown): void {
      this.attributes[key] = value;
    }

    save (): Promise<this> {
      const method = this.id ? 'PUT' : 'POST';
      const path = '/classes/' + encodeURIComponent(this.className) + (this.id ? '/' + encodeURIComponent(this.id) : '');
      const self = this;
      return request<ApiRecord>(path, {
        method: method,
        body: JSON.stringify(this.attributes),
        authenticated: this.className !== 'atComment' || storedUser() !== null
      }).then(function (raw): typeof self {
        const saved = inflateObject(self.className, raw);
        self.id = saved.id;
        self.createdAt = saved.createdAt;
        self.updatedAt = saved.updatedAt;
        self.attributes = saved.attributes;
        return self;
      });
    }

    destroy (): Promise<unknown> {
      return request<unknown>('/classes/' + encodeURIComponent(this.className) + '/' + encodeURIComponent(this.id), {
        method: 'DELETE',
        authenticated: true
      });
    }
  }

  class Query implements AVQuery {
    private className: string;
    private _where: Record<string, unknown>;
    private _order: string[];
    private _limit?: number;
    private _skip?: number;

    constructor (className: string) {
      this.className = className;
      this._where = {};
      this._order = [];
      this._limit = undefined;
      this._skip = undefined;
    }

    equalTo (key: string, value: unknown): this {
      this._where[key] = value;
      return this;
    }

    descending (key: string): this {
      this._order = ['-' + key];
      return this;
    }

    addDescending (key: string): this {
      this._order.push('-' + key);
      return this;
    }

    limit (value: number): this {
      this._limit = value;
      return this;
    }

    skip (value: number): this {
      this._skip = value;
      return this;
    }

    find (): Promise<AVObjectRecord[]> {
      const params: QueryParameters = {};
      if (Object.keys(this._where).length) params.where = JSON.stringify(this._where);
      if (this._order.length) params.order = this._order.join(',');
      if (this._limit !== undefined) params.limit = String(this._limit);
      if (this._skip !== undefined) params.skip = String(this._skip);
      const className = this.className;
      return request<{ results?: ApiRecord[] }>('/classes/' + encodeURIComponent(className), { params: params }).then(function (json): AVObjectRecord[] {
        return (json.results || []).map(function (raw): AVObjectRecord {
          return inflateObject(className, raw);
        });
      });
    }
  }

  const AV: AVNamespace = {
    init: function (options?: ApiConfig): void {
      config = Object.assign({}, config, options || {});
    },
    User: {
      current: function (): AVUser | null {
        return storedUser();
      },
      logIn: function (username: string, password: string): Promise<AVUser> {
        return request<AVUser>('/login', {
          method: 'POST',
          body: JSON.stringify({ username: username, password: password })
        }).then(function (response): AVUser {
          const raw = response as AVUser & { objectId?: string; username?: string };
          const user = {
            id: raw.id || raw.objectId,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            attributes: Object.assign({}, raw.attributes || {}, { username: raw.username || raw.attributes?.username }),
            sessionToken: raw.sessionToken
          } as AVUser;
          if (global.localStorage) global.localStorage.setItem(storageKey, JSON.stringify(user));
          return user;
        });
      },
      logOut: function (): Promise<void> {
        return request<void>('/logout', { method: 'POST', authenticated: true }).then(function (): void {
          if (global.localStorage) global.localStorage.removeItem(storageKey);
        });
      }
    },
    Object: {
      extend: function (className: string): AVObjectConstructor {
        return class LeanCloudObject extends AVObject {
          constructor () {
            super(className);
          }
        };
      },
      createWithoutData: function (className: string, id: string): AVObjectRecord {
        return new AVObject(className, id);
      }
    },
    Query: Query
  };

  global.AV = AV;
})((typeof window !== 'undefined' ? window : globalThis) as Window & typeof globalThis);
