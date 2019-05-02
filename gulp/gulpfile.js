var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var useref = require("gulp-useref");
var beautify = require("gulp-beautify");
var prettify = require("gulp-prettify");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var cssnano = require("gulp-cssnano");
var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
var swig = require("gulp-swig");
var del = require("del");
var runSequence = require("run-sequence");

//THIS NEEDS ADJUSTED
//var config = require('./config.json');

// Basic Gulp task syntax
gulp.task("hello", function() {
  console.log(
    "//////////////////////////////////////////////////////////   Started"
  );
});
gulp.task("bye", function() {
  console.log(
    "//////////////////////////////////////////////////////////   Finished"
  );
});

// Development Tasks
// -----------------

// Start browserSync server
// gulp.task("browserSync", function() {
//   browserSync({
//     server: {
//       baseDir: "app"
//     }
//   });
// });

//https://www.browsersync.io/docs/gulp
//set for visual studio dev port
gulp.task("browserSync", function() {
  browserSync.init(
    {
      server: { baseDir: "app" }
    }
    // function() {
    //   browserSync2.init({
    //     proxy: "localhost:8910"
    //   });
    // }
  );
});

gulp.task("bs-reload", function() {
  browserSync.reload();
});

//SWIG task (change input / dest)
gulp.task("templates", function() {
  gulp
    .src("./lib/*.html")
    .pipe(swig())
    .pipe(gulp.dest("./dist/"));
});

//Run SASS preprocess
gulp.task("sass", function() {
  //return gulp.src('app/sass/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
  return (
    gulp
      //.src("app/sass/global.scss") // Gets specific file
      .src("app/sass/main.scss") // Gets specific file
      .pipe(sass().on("error", sass.logError)) // Passes it through a gulp-sass, log errors to console
      .pipe(gulp.dest("app/css")) // Outputs it in the css folder
      .pipe(
        browserSync.reload({
          // Reloading with Browser Sync
          stream: true
        })
      )
  );
});

//SASS preprocess of import into an export file
gulp.task("user-grid", function() {
  //return gulp.src('app/sass/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
  return gulp
    .src("app/sass/user-grid.scss")
    .pipe(sass().on("error", sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest("app/css")) // Outputs it in the css folder
    .pipe(
      browserSync.reload({
        // Reloading with Browser Sync
        stream: true
      })
    );
});

//new gulp output
gulp.task("sass-spitout-1", function() {
  return gulp
    .src("app/sass/user-grid.scss")
    .pipe(sass().on("error", sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest("../")) // Outputs it in the css folder
    .pipe(
      browserSync.reload({
        // Reloading with Browser Sync
        stream: true
      })
    );
});

gulp.task("prettify", function() {
  gulp
    .src("app/**/*.html")
    .pipe(prettify({ indent_size: 2 }))
    .pipe(gulp.dest("dist"));
});

// Watchers
gulp.task("watch", function() {
  gulp.watch("app/sass/**/*.scss", ["sass", "user-grid"]);
  gulp.watch("app/*.html", browserSync.reload);
  gulp.watch("app/pages/**/*.html", browserSync.reload);
  gulp.watch("app/js/**/*.js", browserSync.reload);
});

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
gulp.task("useref", function() {
  return gulp
    .src("app/*.html")
    .pipe(useref())
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulpIf("*.css", cssnano()))
    .pipe(gulp.dest("dist"));
});

// Optimizing Images
gulp.task("images", function() {
  return (
    gulp
      .src("app/images/**/*.+(png|jpg|jpeg|gif|svg)")
      // Caching images that ran through imagemin
      .pipe(
        cache(
          imagemin({
            interlaced: true
          })
        )
      )
      .pipe(gulp.dest("dist/images"))
  );
});

// Copying fonts
gulp.task("fonts", function() {
  return gulp.src("app/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

// Cleaning
gulp.task("clean", function() {
  return del.sync("dist").then(function(cb) {
    return cache.clearAll(cb);
  });
});

gulp.task("clean:dist", function() {
  return del.sync(["dist/**/*", "!dist/images", "!dist/images/**/*"]);
});

// Build Sequences
// ---------------

// run gulp
gulp.task("default", function(callback) {
  runSequence(
    [
      "hello",
      "sass",
      "user-grid",
      "sass-spitout-1",
      "prettify",
      "browserSync",
      "bye"
    ],
    "watch",
    callback
  );
});

// run build
gulp.task("build", function(callback) {
  runSequence(
    "hello",
    "clean:dist",
    "prettify",
    "sass",
    //'compile',
    ["useref", "images", "fonts"],
    "browserSync",
    "bye",
    callback
  );
});

gulp.task("dev", function(callback) {
  runSequence(
    ["hello", "clean:dist", "prettify", "sass", "browserSync", "bye"],
    "watch",
    callback
  );
});
