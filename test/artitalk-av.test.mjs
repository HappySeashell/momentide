import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

function harness () {
  const source = readFileSync(new URL('../src/plugins/artitalk-av.ts', import.meta.url), 'utf8');
  const script = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
  const requests = [];
  const data = new Map();
  const localStorage = {
    getItem: key => data.get(key) || null,
    setItem: (key, value) => data.set(key, value),
    removeItem: key => data.delete(key)
  };
  const window = {
    localStorage,
    fetch: async (url, options = {}) => {
      requests.push({ url, options });
      const path = new URL(url).pathname;
      const body = path.endsWith('/login')
        ? { objectId: 'admin-id', username: 'admin', sessionToken: 'session-secret', attributes: {} }
        : path.includes('/classes/') && options.method === 'POST'
          ? { objectId: 'record-id', createdAt: new Date(0).toISOString(), updatedAt: new Date(0).toISOString(), attributes: JSON.parse(options.body) }
          : {};
      return { ok: true, json: async () => body };
    }
  };
  const context = { window, globalThis: window, URL, URLSearchParams, console };
  vm.runInNewContext(script, context);
  window.AV.init({ serverURL: 'https://momentide.example' });
  return { window, requests, data };
}

test('public reads and anonymous comments never carry an admin session', async () => {
  const { window, requests } = harness();
  await new window.AV.Query('shuoshuo').find();
  const Comment = window.AV.Object.extend('atComment');
  const comment = new Comment();
  comment.set('atId', 'talk');
  comment.set('nick', 'guest');
  await comment.save();
  assert.equal(requests[0].options.headers['X-LC-Session'], undefined);
  assert.equal(requests[1].options.headers['X-LC-Session'], undefined);
});

test('administrator writes carry the session and logout revokes before clearing it', async () => {
  const { window, requests, data } = harness();
  await window.AV.User.logIn('admin', 'password');
  const Talk = window.AV.Object.extend('shuoshuo');
  const talk = new Talk();
  talk.set('atContentMd', 'hello');
  await talk.save();
  assert.equal(requests[1].options.headers['X-LC-Session'], 'session-secret');
  await window.AV.User.logOut();
  assert.equal(requests[2].options.headers['X-LC-Session'], 'session-secret');
  assert.equal(data.has('artitalk:currentUser'), false);
});
