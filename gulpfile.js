const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const path = require('node:path');
const { syncVersion } = require('./scripts/sync-version');

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

const concatJS = () => (
    gulp.src([
        'src/plugins/*.js',
        'src/core/version.js',
        'src/core/emoji.js',
        'src/core/dom.js',
        'src/core/data.js',
        'src/main.js',
        'src/modules/init.js',
        'src/modules/upload.js',
        'src/modules/content.js'
    ])
    .pipe(concat('artitalk.js', { newLine: ';\n' }))
    .pipe(gulp.dest('dist/js'))
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
    concatJS,
    minifyJS
  )
));

gulp.task('default', gulp.series(syncVersionTask, 'dist'));
