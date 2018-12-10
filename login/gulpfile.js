// 引入插件
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

// 默认任务大合集
gulp.task('default', ['minijs','minicss','minihtml', 'watch', 'connect']);

// 压缩JS并生成新文件
gulp.task('minijsssss', function () {
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

// 压缩css
gulp.task('minicss', function () {
    gulp.src(['css/login.css'])
        .pipe(uglifycss())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

// 压缩js
gulp.task('minijs', function () {
    gulp.src(['js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

// html
gulp.task('minihtml', function () {
    gulp.src(['login.html'])
        .pipe(htmlmin())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

// 合并JS
gulp.task('concatjs', function () {
    gulp.src(['app/static/js/a.js', 'app/static/js/b.js', 'app/static/js/c.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
});

// 合并html
gulp.task('concathtml', function () {
    gulp.src(['app/b.html', 'server/a.html'])
        .pipe(concat('all.html'))         
        .pipe(gulp.dest('dist'));
});

// 监听同步
gulp.task('watch', function () {
    // gulp.watch("server/**/*.html", ['minihtml']);
     gulp.watch("js/*.js", ['minijs']);
    gulp.watch("login.html", ['minihtml']);
    gulp.watch("css/login.css", ['minicss']);
})

// 开启服务器
gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: '9999',
        livereload: true
    });
});

// 删除某个（dist）文件
gulp.task("clean", () => {
    del(['dist'])
})