var gulp        = require('gulp')
var concat      = require('gulp-concat')
var sass        = require('gulp-sass')
var browserSync = require('browser-sync')
var ejsMonster  = require('gulp-ejs-monster')
var folderName  = "dist"
var reload      = browserSync.reload;

gulp.task('copy',function(){
  gulp.src('source/*.html')
  .pipe(gulp.dest(folderName))
})

gulp.task('ejs',function(){
  gulp.src(['source/**/*.ejs', '!source/**/_*.ejs'])
  .pipe(ejsMonster({},{ext:'.html',layout:'source/layout'}))
  .pipe(gulp.dest(folderName))
})

gulp.task('style',function(){
  gulp.src('source/**/*.scss')
  .pipe(sass({outputStyle:'compact'}))
  .pipe(gulp.dest(folderName))
})

gulp.task('js',function(){
  gulp.src('source/**/*.js')
  .pipe(gulp.dest(folderName))
})

gulp.task('images',function(){
  gulp.src([
    'source/**/*.jpg',
    'source/**/*.jpeg',
    'source/**/*.png',
    'source/**/*.svg',
    'source/**/*.gif'
  ])
  .pipe(gulp.dest(folderName))
})

gulp.task('build',['copy','ejs','style','js','images'])

gulp.task('watch',function(){
  gulp.watch(['source/**/*.html','source/**/*.scss','source/**/*.ejs', 'source/**/*.js'], ['build',reload])
})

gulp.task('serve',['watch'],function(){
  browserSync({
    notify : false,
    logPrefix : 'BS',
    startPath:'/',
    server : {baseDir:'dist'},
    port : 8080,
    ui : {port : 8081}
  })
})