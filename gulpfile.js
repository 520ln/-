const gulp = require('gulp');


gulp.task('hello',()=>{// 创建一个简单的gulp任务
    console.log('hello world')
});

gulp.task('copyfile',()=>{ //复制文件
    return gulp.src('src/thirdplugins/*.js')
    .pipe(gulp.dest('dist/thirdplugins'));
});

const babel = require('gulp-babel'); //主要
const babelcore = require('babel-core');
const es2015 = require('babel-preset-es2015');


const html = require('gulp-minify-html');
const css = require('gulp-clean-css');

gulp.task('uglifyhtml',()=>{//压缩HTML文件
    return gulp.src('src/*.html')
    .pipe(html()).pipe(gulp.dest('dist/'));
})
gulp.task('uglifycss',()=>{//压缩css文件
    return gulp.src('src/css/*.css')
    .pipe(css())
    .pipe(gulp.dest('dist/'));
});

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plugins = require('gulp-load-plugins')();
const script = require('gulp-uglify');

gulp.task('compilesass',()=>{//sass编译css 插件
    return gulp.src('src/sass/*.sass')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
        outputStyle:'compressed'
    }))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('uglifyjs',()=>{//js压缩插件
    return gulp.src('src/script/*.js')
    .pipe(babel({
        presets:['es2015']
    }))
    .pipe(script())
    .pipe(gulp.dest('dist/script'))
});

const imagemin = require('gulp-imagemin'); //图片压缩
const watch = require('gulp-watch'); //gulp监听

//7.图片压缩 - jpg/gif/bmp/webp/ [png] - imagemin
gulp.task('uglifyimg', () => {
    return gulp.src('src/img/*.{jpg,png,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('default', () => {//监听插件
    watch(['src/*.html', 'src/sass/*.scss', 'src/script/*.js'], gulp.parallel('uglifyhtml', 'compilesass', 'uglifyjs'));
});