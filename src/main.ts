function Artitalk (options?: ArtitalkOptions): ArtitalkInstance {
  return new atEvery(options);
}

var atEvery: AtEveryConstructor = function (this: ArtitalkInstance, option?: ArtitalkOptions): ArtitalkInstance {
  const root = this;
  root.init(option);
  return root;
} as unknown as AtEveryConstructor;

atEvery.prototype.init = function (option?: ArtitalkOptions): ArtitalkInstance {
  const root = this;
  root.config = option || {};
  ArtitalkData.ensureReady(option, function () {
    !!option && root._init();
  });
  return root;
};
