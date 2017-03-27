const gulp = require("gulp");
const csslint = require('gulp-csslint');
const eslint = require("gulp-eslint");
const eslintConfigFile = "./eslint.json";
const del = require("del");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const gulpsync = require("gulp-sync")(gulp);
//const minifyJs = require('gulp-minify');
//const uglifyJs = require("gulp-uglify");


gulp.task("default", () => {
    console.log("I am default!");
});


// Clean
gulp.task("clean", () => {
    return del("dist");
});

//  Copy
gulp.task("copy:imgs", () => {
    return gulp.src("imgs/*")
        .pipe(gulp.dest("dist/imgs"));
});

gulp.task("copy:fonts", () => {
    return gulp.src("css/fonts/*")
        .pipe(gulp.dest("dist/css/fonts"));
});

gulp.task("copy", ["copy:imgs", "copy:fonts"]);

// Lint
gulp.task("lint:css", () => {
    gulp.src('css/*.css')
    .pipe(csslint({
        'shorthand': false
    }))
    .pipe(csslint.formatter());
});

gulp.task("lint:js", () => {
    return gulp.src(["**/*.js", "!node_modules/**"])
        .pipe(eslint({
            configFile: eslintConfigFile
        })
        )
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("lint", ["lint:css", "lint:js"]);

//Minify
gulp.task("minify:css", () => {
    return gulp.src("css/*.css")
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css/"));
});

// gulp.task('minify:js', function() {
//   gulp.src('js/*.js')
//     .pipe(minifyJs({
//         ext:{
//             src:'-debug.js',
//             min:'min.js'
//         },
//         ignoreFiles: ['animations.js', 'events.js']
//     }))
//     .pipe(gulp.dest('dist/js/'))
// });

// gulp.task("uglify:js", () => {
//     return gulp.src("/js/*.js")
//         .pipe(uglifyJs())
//         .pipe(gulp.dest("dist/js/"));
// });

gulp.task("minify", gulpsync.sync(["clean", "copy", "minify:css"]));

// All
gulp.task("build", gulpsync.sync(["lint", "clean", "copy", "minify"]));