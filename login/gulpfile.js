// 引入插件
var gulp = require('gulp'); 
var uglify = require("gulp-uglify");
var uglifycss = require('gulp-uglifycss');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var babel = require('gulp-babel'); // 识别ES6的插件
var rename = require("gulp-rename"); // 重命名的插件
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var rev = require('gulp-rev');
var del = require('del'); // 删除文件的插件
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');

// 压缩JS并生成新文件
// gulp.task('minijsssss', function () {
//     gulp.src('app/**/*.js')
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(uglify())
//         .pipe(rev())
//         .pipe(gulp.dest('dist'))
//         .pipe(rev.manifest())
//         .pipe(gulp.dest('rev/js'))
//         .pipe(connect.reload());
// });

// // 压缩css
// gulp.task('minicss', function () {
//     gulp.src(['css/lunbo.css'])
//         .pipe(uglifycss())
//         .pipe(gulp.dest('dist/css'))
//         .pipe(connect.reload());
// });

// // 压缩js
// gulp.task('minijs', function () {
//     gulp.src(['js/lunbo.js'])
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'))
//         .pipe(connect.reload());
// });

// // 压缩html
// gulp.task('minihtml', function () {
//     gulp.src(['lunbo.html'])
//         .pipe(htmlmin())
//         .pipe(gulp.dest('dist'))
//         .pipe(connect.reload());
// });

// 编译scss文件
// gulp.task('sass', function () {
//     return gulp.src('app/**/*.scss')
//       .pipe(sass().on('error', sass.logError))
//       .pipe(gulp.dest('dist/static/css'));
//   });

// 所有文件
gulp.task('all', function () {
    gulp.src(['app/**/*.*'])
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

// 监听同步
gulp.task('watch', function () {
    gulp.watch("app/**/*.*", ['all']);
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
// gulp.task('clean', () => {
//     del(['dist'])
// })

// 开发环境使用
gulp.task('default', function() {
    runSequence('all',
                'connect',
                'watch');
  });