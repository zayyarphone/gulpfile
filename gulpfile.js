// load the required modules
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');


// declare the project base path
var projectName   = 'Soundblaster_Revamp/axx200/';
var sassSrc       = projectName + 'sass/main.scss';
var cssDest       = projectName + 'css';
var imgDest       = projectName + 'images/';
var jsDest        = projectName + 'js';

// declare the directory path which need to be watched by gulp
// any changes occur in those directory will trigger the gulp
var sassWatchPath = projectName + 'sass/**/*.scss';
var jsWatchPath   = [projectName + 'js/plugins/*.js',projectName + 'js/script.js']
var imgSrc        = [projectName + 'images/**/*', '!' + projectName + 'images/icon/*'];
var jsSrc         = [projectName + 'js/plugins/*.js', projectName + 'js/script.js'];

// for the css styles
gulp.task('styles',function(){
	return gulp.src(sassSrc)
			.pipe(sass({style:'compressed'}))
			.pipe(autoprefixer('last 15 version'))
			.pipe(gulp.dest(cssDest));
});

// for the images
gulp.task('images',function(){
	return gulp.src(imgSrc)
			.pipe(imagemin())
			.pipe(gulp.dest(imgDest));
});


// for the javascripts
gulp.task('scripts',function(){
	return gulp.src(jsSrc)
			.pipe(concat('production.min.js'))
			.pipe(gulp.dest(jsDest))
			.pipe(uglify())
			.pipe(gulp.dest(jsDest));
});

gulp.task('default',function(){
	gulp.watch(sassWatchPath,function(){
		gulp.run('styles');
	});

	 gulp.watch(jsWatchPath,function(){
	 	gulp.run('scripts');
	 });
});
