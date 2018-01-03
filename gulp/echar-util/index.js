
const gulp=require('gulp')
const runSequence=require('run-sequence');
const path=require('path');
const del=require('del');
const babel=require('gulp-babel');
const concat=require('gulp-concat');
const eslint=require('gulp-eslint');
const merge = require('merge2');
const plumber=require('gulp-plumber');

gulp.task('clean',()=>{
   return del(['./dist/echar-util/**','!./dist/echar-util']);
});
gulp.task('eslint',()=>{  
    return gulp.src('src/echar-util/**/*.js')
        //  ESLint忽略带有“node_modules”路径的文件。 
        //  所以，最好还是不要忽略目录。 
        //  另外，确保从任务中返回流; 
        //  否则，任务可能会在流完成之前结束。 
        .pipe(eslint())
        // .pipe(eslint.result(result=>{

        //     console.log(`ESLint result: ${result.filePath}`);
        //     console.log(`# Messages: ${result.messages.length}`);
        //     console.log(`# Warnings: ${result.warningCount}`);
        //     console.log(`# Errors: ${result.errorCount}`);
        // }))
        //  eslint.format（）将lint结果输出到控制台。 
        //  或者使用eslint.formatEach（）（请参阅文档）
         .pipe(eslint.format())
        //  让进程退出并显示错误代码（1） 
        // lint错误，最后返回流和管道failAfterError。 
       .pipe(eslint.failAfterError());
});
gulp.task('js',()=>{  
    return gulp.src('src/echar-util/**/*.js')
        .pipe(babel())
        .pipe(concat("index.js"))
        .pipe(gulp.dest('dist/echar-util'));
});
   
 module.exports=function(cb,watch)
 {
     runSequence('clean','eslint','js',cb);
 }