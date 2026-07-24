'use strict';

const ArtitalkData: ArtitalkData = {
  ensureReady: function (config: ArtitalkOptions | undefined, callback: () => void): void {
    if (window.AV) {
      callback();
      return;
    }
  },
  init: function (config: ArtitalkOptions): void {
    if (config.serverURL !== '') {
      AV.init({
        appId: config.appId,
        appKey: config.appKey,
        serverURL: config.serverURL
      });
    } else {
      AV.init({
        appId: config.appId,
        appKey: config.appKey
      });
    }
  },
  currentUser: function (): ArtitalkUser | null {
    return AV.User.current();
  },
  login: function (username: string, password: string): Promise<ArtitalkUser> {
    return AV.User.logIn(username, password);
  },
  logout: function (): Promise<void> {
    return AV.User.logOut();
  },
  updateCurrentUser: function (attributes: Record<string, unknown>): Promise<ArtitalkUser> {
    const currentUser = AV.User.current();
    if (!currentUser) return Promise.reject(new Error('User is not logged in'));

    if (typeof currentUser.set === 'function' && typeof currentUser.save === 'function') {
      Object.keys(attributes).forEach(function (key) {
        currentUser.set(key, attributes[key]);
      });
      return currentUser.save();
    }

    currentUser.attributes = Object.assign({}, currentUser.attributes, attributes);
    if (window.localStorage) window.localStorage.setItem('artitalk:currentUser', JSON.stringify(currentUser));
    return Promise.resolve(currentUser);
  },
  createTalk: function (): ArtitalkRecord {
    const Shuoshuo = AV.Object.extend('shuoshuo');
    return new Shuoshuo();
  },
  talkById: function (id: string): ArtitalkRecord {
    return AV.Object.createWithoutData('shuoshuo', id);
  },
  commentById: function (): ArtitalkRecord {
    const Comment = AV.Object.extend('atComment');
    return new Comment();
  },
  queryTalks: function (pageSize: number, pageNum: number): Promise<ArtitalkRecord[]> {
    function sortTalks (talks: ArtitalkRecord[]): ArtitalkRecord[] {
      return talks.sort(function (first: ArtitalkRecord, second: ArtitalkRecord): number {
        const firstPinned = first.attributes.isPinned === true ? 1 : 0;
        const secondPinned = second.attributes.isPinned === true ? 1 : 0;
        if (firstPinned !== secondPinned) return secondPinned - firstPinned;
        return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime();
      });
    }

    const query = new AV.Query('shuoshuo');
    query.descending('isPinned');
    query.addDescending('createdAt');
    query.limit(pageSize);
    query.skip(pageSize * pageNum);
    return query.find().catch(function (error: { message?: string }) {
      if (!/Unsupported order field/.test(error.message || '')) throw error;
      const legacyQuery = new AV.Query('shuoshuo');
      legacyQuery.descending('createdAt');
      legacyQuery.limit(1000);
      return legacyQuery.find().then(function (talks: ArtitalkRecord[]): ArtitalkRecord[] {
        return sortTalks(talks).slice(pageSize * pageNum, pageSize * (pageNum + 1));
      });
    });
  },
  queryTalkById: function (id: string): Promise<ArtitalkRecord[]> {
    const query = new AV.Query('shuoshuo');
    query.equalTo('objectId', id);
    return query.find();
  },
  queryComments: function (talkId: string): Promise<ArtitalkRecord[]> {
    const query = new AV.Query('atComment');
    query.equalTo('atId', talkId);
    query.descending('createdAt');
    return query.find();
  }
};
