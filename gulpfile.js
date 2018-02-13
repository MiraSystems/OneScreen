'use strict';
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');

let handler = {
  'HTML': {
    'DEV': () => { gulp.src('src/*.html').pipe(gulp.dest('dev')); },
    'PROD': () => { gulp.src('src/*.html').pipe(gulp.dest('dist')); }
  },
  'IMG': {
    'DEV': () => { gulp.src('src/img/*').pipe(gulp.dest('dev/img')); },
    'PROD': () => { gulp.src('src/img/*').pipe(imagemin()).pipe(gulp.dest('dist/img')); }
  },
  'JS': {
    'DEV': () => { gulp.src('src/js/*.js').pipe(concat('main.js')).pipe(babel({presets: ['env']})).pipe(gulp.dest('dev/js')); },
    'PROD': () => { gulp.src('src/js/*.js').pipe(concat('main.js')).pipe(babel({presets: ['env']})).pipe(uglify()).pipe(gulp.dest('dist/js')); }
  },
  'TS': {
    'DEV': () => { gulp.src('src/js/*.ts').pipe(concat('main.ts')).pipe(ts({noImplicitAny: true})).pipe(babel({presets: ['env']})).pipe(gulp.dest('dev/js')); },
    'PROD': () => { gulp.src('src/js/*.ts').pipe(concat('main.ts')).pipe(ts({noImplicitAny: true})).pipe(babel({presets: ['env']})).pipe(uglify()).pipe(gulp.dest('dist/js')); }
  },
  'SASS': {
    'DEV': () => { gulp.src('src/scss/*.scss').pipe(sourcemaps.init()).pipe(sass().on('error', sass.logError)).pipe(sourcemaps.write('./maps')).pipe(gulp.dest('dev/css')).pipe(browserSync.stream()); },
    'PROD': () => { gulp.src('src/scss/*.scss').pipe(sass()).pipe(gulp.dest('dist/css')); }
  }
}

// Development Server
gulp.task('serve', ['default'], () => {
  browserSync.init({ server: "./dev" });
  gulp.watch('src/*.html', ['default']).on('change', browserSync.reload);
  gulp.watch('src/img/*', ['default']);
  //gulp.watch('src/js/*.js', ['default']).on('change', browserSync.reload);
  gulp.watch('src/js/*.ts', ['default']).on('change', browserSync.reload);
  gulp.watch('src/scss/*.scss', ['default']);
});

// Run Once (Development)
gulp.task('default', () => {
  gulp.src('src/*.html').pipe(gulp.dest('dev'));
  gulp.src('src/img/*').pipe(gulp.dest('dev/img'));
  //gulp.src('src/js/*.js').pipe(concat('main.js')).pipe(babel({presets: ['env']})).pipe(gulp.dest('dev/js'));
  gulp.src('src/js/*.ts').pipe(concat('main.ts')).pipe(ts({noImplicitAny: true})).pipe(babel({presets: ['env']})).pipe(gulp.dest('dev/js'));
  gulp.src('src/scss/*.scss').pipe(sourcemaps.init()).pipe(sass().on('error', sass.logError)).pipe(sourcemaps.write('./maps')).pipe(gulp.dest('dev/css')).pipe(browserSync.stream());
});

// Build for Production
gulp.task('build', () => {
  // TODO: Define
});