const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

// Compile SCSS to CSS
function scssTask() {
    return src('src/scss/**/*.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist/css', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
    return src('src/js/**/*.js', { sourcemaps: true })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(terser())
        .pipe(dest('dist/js', { sourcemaps: '.' }));
}

// BrowserSync
function browserSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: '.'
        },
        notify: false
    });
    cb();
}

// BrowserSync Reload
function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch('*.html', browserSyncReload);
    watch(['src/scss/**/*.scss', 'src/js/**/*.js'], series(scssTask, jsTask, browserSyncReload));
}

// Default Gulp Task
exports.default = series(
    scssTask,
    jsTask,
    browserSyncServe,
    watchTask
);