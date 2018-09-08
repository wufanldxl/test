var gulp = require('gulp');
var connect = require('gulp-connect');
var jsmin = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
gulp.task('webserver', function() {    
    connect.server({        
        livereload: true,
        port: 8083    
    });
});
gulp.task('scriptmin', () => {
    gulp.src('./js/*.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(jsmin())
        .pipe(gulp.dest('./dist/js'))
});
gulp.task('babel',()=>{
    gulp.src('./js/*.js')
        .pipe(babel({
            presets: ['env','es2017']
        }))
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('default', ['webserver']);