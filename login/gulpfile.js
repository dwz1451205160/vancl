var gulp = require('gulp');
var uglify = require("gulp-uglify");
var uglifycss = require('gulp-uglifycss');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var rename = require("gulp-rename");
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var rev = require('gulp-rev');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('default', ['minijs', 'minihtml', 'watch', 'connect']);

gulp.task('minijs', function () {
    gulp.src('app/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'))
        .pipe(connect.reload());
});

gulp.task('concatjs', function () {
    gulp.src(['app/static/js/a.js', 'app/static/js/b.js', 'app/static/js/c.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task('minihtml', function () {
    gulp.src(['server/a.html'])
        .pipe(htmlmin())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('concathtml', function () {
    gulp.src(['app/b.html', 'server/a.html'])
        .pipe(concat('all.html'))         
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch("server/**/*.html", ['minihtml'])
    gulp.watch("app/**/*.js", ['minijs'])
})

// 开启服务器
gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: '9999',
        livereload: true
    });
});

gulp.task("clean", () => {
    del(['dist'])
})