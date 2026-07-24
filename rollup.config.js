const fs = require('node:fs');
const path = require('node:path');
const typescript = require('typescript');
const terser = require('@rollup/plugin-terser');
const postcss = require('postcss');
const cssnano = require('cssnano');
const sass = require('sass');
const { syncVersion } = require('./scripts/sync-version');
const { createSvgModule } = require('./scripts/create-svg-module');
const { createTemplateModule } = require('./scripts/create-template-module');

const root = __dirname;
const generatedDirectory = path.join(root, 'src/generated');
const localeModulePath = path.join(generatedDirectory, 'artitalk-locales.js');
const svgModulePath = path.join(generatedDirectory, 'artitalk-svg.js');
const templateModulePath = path.join(generatedDirectory, 'artitalk-templates.js');
const entryId = '\0artitalk-entry.ts';
const exposeGlobals = 'globalThis.Artitalk = Artitalk; globalThis.atEvery = atEvery; globalThis.Logout = Logout; globalThis.insertEmoji = insertEmoji; globalThis.preview = preview;';
const typescriptCompilerOptions = typescript.convertCompilerOptionsFromJson(
  require('./tsconfig.json').compilerOptions,
  root
).options;
const firstPartySource = source => fs.existsSync(path.join(root, source + '.ts')) ? source + '.ts' : source + '.js';
const sourceFiles = [
  firstPartySource('src/plugins/artitalk-av'),
  firstPartySource('src/plugins/browser'),
  'src/plugins/md5.js',
  'src/plugins/showdown.min.js',
  firstPartySource('src/core/version'),
  firstPartySource('src/core/emoji'),
  localeModulePath,
  svgModulePath,
  templateModulePath,
  firstPartySource('src/core/i18n'),
  firstPartySource('src/core/dom'),
  firstPartySource('src/core/sanitize'),
  firstPartySource('src/core/data'),
  firstPartySource('src/main'),
  firstPartySource('src/modules/init'),
  firstPartySource('src/modules/upload'),
  firstPartySource('src/modules/content')
].map(source => path.resolve(root, source));

function createLocaleModule () {
  const locales = ['zh', 'en', 'es'].reduce((all, locale) => {
    all[locale] = JSON.parse(fs.readFileSync(path.join(root, 'src/core/locales', locale + '.json'), 'utf8'));
    return all;
  }, {});

  fs.writeFileSync(localeModulePath, 'const ArtitalkLocales = ' + JSON.stringify(locales) + ';\n');
}

function prepareGlobalSources () {
  fs.mkdirSync(generatedDirectory, { recursive: true });
  createLocaleModule();
  createSvgModule({
    svgDirectory: path.join(root, 'src/svg'),
    outputPath: svgModulePath
  });
  createTemplateModule({
    templates: {
      main: path.join(root, 'src/html/main.html'),
      lazy: path.join(root, 'src/html/lazy.html'),
      operator: path.join(root, 'src/html/operator.html'),
      talk: path.join(root, 'src/html/talk.html'),
      emptyTalk: path.join(root, 'src/html/empty-talk.html'),
      comment: path.join(root, 'src/html/comment.html'),
      pinnedBadge: path.join(root, 'src/html/pinned-badge.html'),
      pinButton: path.join(root, 'src/html/pin-button.html'),
      reply: path.join(root, 'src/html/reply.html'),
      focusedTalk: path.join(root, 'src/html/focused-talk.html'),
      endOfList: path.join(root, 'src/html/end-of-list.html'),
      timeline: path.join(root, 'src/html/timeline.html'),
      editTalk: path.join(root, 'src/html/edit-talk.html'),
      loginRequired: path.join(root, 'src/html/login-required.html'),
      deleteActions: path.join(root, 'src/html/delete-actions.html')
    },
    outputPath: templateModulePath
  });
}

function orderedGlobalSources () {
  return {
    name: 'ordered-global-sources',
    async buildStart () {
      await syncVersion({
        packagePath: path.join(root, 'package.json'),
        versionPath: path.join(root, firstPartySource('src/core/version'))
      });
      prepareGlobalSources();
    },
    resolveId (id) {
      return id === entryId ? entryId : null;
    },
    load (id) {
      return id === entryId ? sourceFiles.map(file => fs.readFileSync(file, 'utf8')).join(';\n') : null;
    },
    closeBundle () {
      fs.rmSync(localeModulePath, { force: true });
      fs.rmSync(svgModulePath, { force: true });
      fs.rmSync(templateModulePath, { force: true });
    }
  };
}

function compileStyles () {
  return {
    name: 'compile-styles',
    async transform (_code, id) {
      if (id !== path.resolve(root, 'src/css/main.scss')) return null;

      const result = await sass.compileAsync(id);
      const minified = await postcss([cssnano({
        preset: ['default', {
          overrideBrowserslist: ['ie 8'],
          reduceTransforms: false,
          convertValues: { angle: false, length: false }
        }]
      })]).process(result.css, { from: id });

      this.emitFile({
        type: 'asset',
        fileName: 'artitalk.min.css',
        source: minified.css
      });

      return { code: 'export default {};', map: null };
    },
    generateBundle (outputOptions, bundle) {
      delete bundle[path.basename(outputOptions.file)];
    }
  };
}

function transpileGlobalScript () {
  return {
    name: 'transpile-global-script',
    transform (code, id) {
      if (id !== entryId) return null;

      const result = typescript.transpileModule(code, {
        compilerOptions: typescriptCompilerOptions,
        fileName: id,
        reportDiagnostics: true
      });
      const diagnostic = result.diagnostics && result.diagnostics.find(item => item.category === typescript.DiagnosticCategory.Error);
      if (diagnostic) {
        this.error(typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
      }

      return { code: result.outputText, map: null };
    }
  };
}

module.exports = [
  {
    input: entryId,
    context: 'globalThis',
    treeshake: false,
    output: [
      {
        file: 'dist/js/artitalk.js',
        format: 'iife',
        name: 'artitalk',
        outro: exposeGlobals
      },
      {
        file: 'dist/js/artitalk.min.js',
        format: 'iife',
        name: 'artitalk',
        outro: exposeGlobals,
        plugins: [terser({ maxWorkers: 1 })]
      }
    ],
    plugins: [
      orderedGlobalSources(),
      transpileGlobalScript()
    ]
  },
  {
    input: 'src/css/main.scss',
    output: { file: 'dist/css/.artitalk-css-stub.js', format: 'es' },
    plugins: [
      compileStyles()
    ]
  }
];
