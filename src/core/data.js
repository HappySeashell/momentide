'use strict';

const ArtitalkData = {
  ensureReady: function (config, callback) {
    if (window.AV) {
      callback();
      return;
    }
  },
  init: function (config) {
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
  currentUser: function () {
    return AV.User.current();
  },
  login: function (username, password) {
    return AV.User.logIn(username, password);
  },
  logout: function () {
    return AV.User.logOut();
  },
  updateCurrentUser: function (attributes) {
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
  createTalk: function () {
    const Shuoshuo = AV.Object.extend('shuoshuo');
    return new Shuoshuo();
  },
  talkById: function (id) {
    return AV.Object.createWithoutData('shuoshuo', id);
  },
  commentById: function () {
    const Comment = AV.Object.extend('atComment');
    return new Comment();
  },
  queryTalks: function (pageSize, pageNum) {
    function sortTalks (talks) {
      return talks.sort(function (first, second) {
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
    return query.find().catch(function (error) {
      if (!/Unsupported order field/.test(error.message || '')) throw error;
      const legacyQuery = new AV.Query('shuoshuo');
      legacyQuery.descending('createdAt');
      legacyQuery.limit(1000);
      return legacyQuery.find().then(function (talks) {
        return sortTalks(talks).slice(pageSize * pageNum, pageSize * (pageNum + 1));
      });
    });
  },
  queryTalkById: function (id) {
    const query = new AV.Query('shuoshuo');
    query.equalTo('objectId', id);
    return query.find();
  },
  queryComments: function (talkId) {
    const query = new AV.Query('atComment');
    query.equalTo('atId', talkId);
    query.descending('createdAt');
    return query.find();
  }
};
