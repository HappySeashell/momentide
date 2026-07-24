const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const fs = require('node:fs');
const path = require('node:path');
const { syncVersion } = require('./scripts/sync-version');
const { createSvgModule } = require('./scripts/create-svg-module');

const syncVersionTask = () => syncVersion({
  packagePath: path.join(__dirname, 'package.json'),
  versionPath: path.join(__dirname, 'src/core/version.js')
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
const concatJS = () => (
    gulp.src([
        'src/plugins/*.js',
        'src/core/version.js',
        'src/core/emoji.js',
        localeModulePath,
        svgModulePath,
        'src/core/i18n.js',
        'src/core/dom.js',
        'src/core/sanitize.js',
        'src/core/data.js',
        'src/main.js',
        'src/modules/init.js',
        'src/modules/upload.js',
        'src/modules/content.js'
    ])
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
