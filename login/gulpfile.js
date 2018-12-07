var gulp = require('gulp');
var uglify = require("gulp-uglify");
var uglifycss = require('gulp-uglifycss');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var rename = require("gulp-rename");
var connect = require('gulp-connect');
var clean = require('gulp-clean');
gulp.task('default', ['minihtml','watch','connect']);
gulp.task('minijs', function () {
    gulp.src('app/**/*.js')
        .pipe(uglify())                 // 直接压缩hello.js
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('concatjs', function () {
    gulp.src(['app/static/js/a.js', 'app/static/js/b.js', 'app/static/js/c.js'])
        .pipe(concat('all.js'))         // 按照[]里的顺序合并文件
        .pipe(gulp.dest('dist'));
});

gulp.task('minihtml', function () {
    gulp.src(['server/a.html'])
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('concathtml', function () {
    gulp.src(['app/b.html', 'server/a.html'])
        .pipe(concat('all.html'))         // 按照[]里的顺序合并文件
        .pipe(gulp.dest('dist'));
});

gulp.task('watch',function(){
    gulp.watch("app/**/*.html",['minihtml'])
})

// 开启服务器
gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: '7777',
        livereload: true
    });
});
