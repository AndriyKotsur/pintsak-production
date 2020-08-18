let project_folder = require('path').basename(__dirname);
let source_folder = '#source';

let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        images: project_folder + '/images/'
    },
    source: {
        html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
        css: source_folder + '/scss/style.scss',
        images: source_folder + '/images/**/*.{jpg,png,svg,ico,webp}'
    },
    watch: {
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.scss',
        images: source_folder + '/images/**/*.{jpg,png,svg,ico,webp}'
    },
    clean: './' + project_folder + '/'
};

const {
    src,
    dest
} = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const del = require('del');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const groupmedia = require('gulp-group-css-media-queries');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const svgsprite = require('gulp-svg-sprite');


function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/'
        },
        port: 3000,
        notify: false
    })
};

function html() {
    return src(path.source.html)
        .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
};

function css() {
    return src(path.source.css)
        .pipe(scss({
            outputStyle: "expanded"
        }))
        .pipe(groupmedia())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true
        }))
        .pipe(dest(path.build.css))
        .pipe(cleancss())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
};

function images() {
    return src(path.source.images)
        .pipe(imagemin())
        .pipe(dest(path.build.images))
        .pipe(browsersync.stream())
};

function sprite() {
    return src([source_folder + '/assets/icons/*.svg'])
        .pipe(svgsprite({
            mode: {
                stack: {
                    sprite: '../icons/sprite.svg'
                }
            },
        }))
        .pipe(dest(path.build.images))
        .pipe(browsersync.stream())
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.images], images)
    gulp.watch([source_folder + '/assets/icons/*.svg'], sprite)

};

function clean(params) {
    return del(path.clean);
};

const build = gulp.series(clean, gulp.parallel(css, html, images, sprite));
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.sprite = sprite;
exports.images = images;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;