var gulp = require('gulp')
    , rename = require('gulp-rename')
    , sass = require('gulp-sass')
    , autoprefixer = require('gulp-autoprefixer')
    , sourcemaps = require('gulp-sourcemaps')
    , cleanCss = require('gulp-clean-css')
    , pug = require('gulp-pug')
    , uglify = require('gulp-uglify')
    , imagemin = require('gulp-imagemin')
    , browserSync = require('browser-sync').create();

function css_style(done) {
    gulp.src('./assets/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true
        }))
        .on('error', console.error.bind(console)) 
        .pipe(autoprefixer({
            browsers: ['last 100 versions'],
            cascade: false
        }))

        .pipe(sourcemaps.write('./'))
        .pipe( gulp.dest('./assets/css/') )

    done();
}

function min_css(done) {
    gulp.src('./assets/css/main.css') 

        // .pipe(rename({suffix: '.min'}))
        .pipe(cleanCss({compatibility: "ie8"}))
        .pipe(gulp.dest('./assets/cssmin/'))
        .pipe(browserSync.stream());

    done();
}

function min_js(done) {
    gulp.src('./assets/js/*.js') 

        // .pipe(rename({suffix: '.min'}))
        .pipe(uglify({toplevel: true}))
        .pipe(gulp.dest('./assets/jsmin/'))
        .pipe(browserSync.stream());
    done();
}

function min_img(done) {
    gulp.src('./assets/img/**') 
        .pipe(imagemin(
            // {progressive: true}
            [ 
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]
        ))
        .pipe(gulp.dest('./assets/imgmin/'))
        .pipe(browserSync.stream());
    done();
}

function pug2html(done) {
    gulp.src('./assets/pug/pages/*.pug') 
        .pipe(pug({
            pretty: true
        }))
        // .pipe(htmlValidator)
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
    done();
}

function sync(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    })

    done();
}

function browserReload(done) {
    browserSync.reload();

    done();
}

function watchFiles() {
    gulp.watch("./assets/scss/*.scss", css_style);
    gulp.watch("./assets/css/main.css", min_css);
    gulp.watch("./assets/js/*.js", min_js);
    gulp.watch("./assets/img/**", min_img);
    // gulp.watch("./assets/pug/*/*.pug", pug2html);
    gulp.watch("./*.html", browserReload);
}

gulp.task('default', gulp.parallel(watchFiles, sync));