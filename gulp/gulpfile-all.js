/*js代码校验(gulp-jshint)
合并js文件(gulp-concat)
压缩js代码(gulp-uglify)
sass的编译(gulp-sass)
less的编译(gulp-less)
es6 (gulp-babel，babel-preset-es2015)
压缩css(gulp-minify-css)
重命名(gulp-rename)
服务器(gulp-connect)
* */

//npm install gulp gulp-jshint gulp-concat gulp-uglify gulp-minify-css gulp-rename gulp-babel babel-preset-es2015 --save-dev


// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
// 检查js脚本
gulp.task('lint', function() {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//ES6编译
gulp.task('default', function(){
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist/js'));
});

// 合并,压缩js文件
gulp.task('scripts', function() {
    gulp.src('./src/js/*.js')
        //合并js文件
        .pipe(concat('all.js'))
        //给文件添加.min后缀
        .pipe(rename({ suffix: '.min' }))
        //压缩脚本文件
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// 编译sass
gulp.task('sass', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// 编译less
gulp.task('sass', function() {
    gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./css'));
});

// 压缩css
gulp.task('style', function() {
    gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./dist/style'))
        .pipe(rename('all.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/style'));
});

// 默认任务
gulp.task('default', function(){
    //gulp.run('lint', 'sass', 'scripts');

    // 监听文件变化
//  gulp.watch('./src/js/*.js', function(){
//      gulp.run('lint', 'scripts');
//  });
    gulp.watch('./src/sass/*.scss', function(){
        gulp.run('sass');
    });
    gulp.watch('./src/less/*.less', function(){
        gulp.run('less');
    });
    gulp.watch('./src/css/*.css', function(){
        gulp.run('style');
    });
});