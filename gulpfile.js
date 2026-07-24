const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const fs = require('node:fs');
const path = require('node:path');
const { Transform } = require('node:stream');
const typescript = require('typescript');
const { syncVersion } = require('./scripts/sync-version');
const { createSvgModule } = require('./scripts/create-svg-module');

const typescriptCompilerOptions = typescript.convertCompilerOptionsFromJson(
  require('./tsconfig.json').compilerOptions,
  __dirname
).options;
const firstPartySource = source => fs.existsSync(path.join(__dirname, source + '.ts')) ? source + '.ts' : source + '.js';

const syncVersionTask = () => syncVersion({
  packagePath: path.join(__dirname, 'package.json'),
  versionPath: path.join(__dirname, firstPartySource('src/core/version'))
});

const minifyCSS = () => (
  gulp.src('src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename('artitalk.min.css'))
    .pipe(gulp.dest('dist/css'))
);

const localeModulePath = path.join(__dirname, 'dist/js/.artitalk-locales.js');
const svgModulePath = path.join(__dirname, 'dist/js/.artitalk-svg.js');
const createLocaleModule = done => { const locales = ['zh', 'en', 'es'].reduce((m, l) => { m[l] = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/core/locales', l + '.json'), 'utf8')); return m; }, {}); fs.writeFileSync(localeModulePath, 'const ArtitalkLocales = ' + JSON.stringify(locales) + ';\n'); done(); };
const createSvgModuleTask = done => { createSvgModule({ svgDirectory: path.join(__dirname, 'src/svg'), outputPath: svgModulePath }); done(); };
const transpileTypeScript = () => new Transform({
  objectMode: true,
  transform (file, encoding, callback) {
    if (file.isNull() || path.extname(file.path) !== '.ts') {
      callback(null, file);
      return;
    }
    if (file.isStream()) {
      callback(new Error('TypeScript source streams are not supported'));
      return;
    }

    const result = typescript.transpileModule(file.contents.toString(), {
      compilerOptions: typescriptCompilerOptions,
      fileName: file.path,
      reportDiagnostics: true
    });
    const diagnostic = result.diagnostics && result.diagnostics.find(item => item.category === typescript.DiagnosticCategory.Error);
    if (diagnostic) {
      callback(new Error(typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n')));
      return;
    }

    file.contents = Buffer.from(result.outputText);
    file.extname = '.js';
    callback(null, file);
  }
});
const concatJS = () => (
    gulp.src([
        firstPartySource('src/plugins/artitalk-av'),
        firstPartySource('src/plugins/browser'),
        'src/plugins/md5.js',
        'src/plugins/showdown.min.js',
        firstPartySource('src/core/version'),
        firstPartySource('src/core/emoji'),
        localeModulePath,
        svgModulePath,
        firstPartySource('src/core/i18n'),
        firstPartySource('src/core/dom'),
        firstPartySource('src/core/sanitize'),
        firstPartySource('src/core/data'),
        firstPartySource('src/main'),
        firstPartySource('src/modules/init'),
        firstPartySource('src/modules/upload'),
        firstPartySource('src/modules/content')
    ])
    .pipe(transpileTypeScript())
    .pipe(concat('artitalk.js', { newLine: ';\n' }))
    .pipe(gulp.dest('dist/js'))
    .on('end', () => {
      fs.unlinkSync(localeModulePath);
      fs.unlinkSync(svgModulePath);
    })
);

const minifyJS = () => (
  gulp.src('dist/js/artitalk.js')
    .pipe(uglify())
    .pipe(rename('artitalk.min.js'))
    .pipe(gulp.dest('dist/js'))
);

module.exports = {
  syncVersion: syncVersionTask,
  minifyCSS: minifyCSS,
  concatJS: concatJS,
  minifyJS: minifyJS
};

gulp.task('dist', gulp.parallel(
  minifyCSS,
  gulp.series(
    createLocaleModule,
    createSvgModuleTask,
    concatJS,
    minifyJS
  )
));

gulp.task('default', gulp.series(syncVersionTask, 'dist'));
