const { src, dest, watch, series, parallel } = require('gulp');

//CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
 
//Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

function css( done ) {
    src('src/scss/app.scss')
    .pipe( sourcemaps.init())
        .pipe( sass() )
        .pipe( postcss( [autoprefixer(), cssnano()] ) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css'))
    done();
}

function imagenes() {
    return src('src/img/**/*')
    .pipe( imagemin( {optimizationLevel: 3}) )
    .pipe( dest('build/img'))
}

function versionwebp() {
    return src('src/img/**/*.{png,jpg}')
    .pipe( webp() )
    .pipe( dest('build/img') )
}

function versionavif() {
    return src('src/img/**/*.{png,jpg}')
    .pipe( avif() )
    .pipe( dest('build/img') )
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionwebp = versionwebp;
exports.versionavif = versionavif;
exports.default = series( imagenes, versionwebp, versionavif, css, dev);
