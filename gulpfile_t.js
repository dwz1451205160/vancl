//  require 引入模块
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var connect = require('gulp-connect');
// var minify = require('gulp-minify');
// task
// 创建一个任务
// 在cmd中, 执行任务 gulp + 任务名称
// src() 查找文件
// .pipe()  下一步
// .dest()  文件输出

gulp.task('default', ['minihtml', 'minijs', 'watch', 'connect']);

// 压缩js
gulp.task('minijs', function() {
    gulp.src('app/**/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    // .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename({
        // 添加后缀
        suffix: '.min'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
    // 可以再次合并文件, 给文件重命名
    // .pipe(concat('all.min.js'))
    // .pipe(gulp.dest('dist'))
})

gulp.task('minihtml', function() {
    gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
})
// gulp.task('minicss', function() {
//     console.log('我要开始压缩css');
// })
// gulp.task('miniimage', function() {
//     console.log('我要开始压缩image');
// })
gulp.task('watch', function() {
    gulp.watch('app/**/*.html', ['minihtml'])
    gulp.watch('app/**/*.js', ['minijs'])
})

// 开启服务器
gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: '7777',
        livereload: true
    });
  });