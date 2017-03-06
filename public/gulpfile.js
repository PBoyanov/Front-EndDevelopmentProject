const gulp = require("gulp");
const eslint = require("gulp-eslint");
const del = require("del");
const cleanCSS = require("gulp-clean-css");
const gulpsync = require("gulp-sync")(gulp);
const eslintConfigFile = "./eslint.json";


gulp.task("default", () => {
    console.log("I am default!");
});

gulp.task("clean", () => {
    return del("dist");
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

gulp.task("lint:css", () => {

});

gulp.task("lint", ["lint:js", "lint:css"]);

//
//Minify

gulp.task("minify:css", () => {
    return gulp.src("css/*.css")
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("dist/css"));
});

gulp.task("minify", gulpsync.sync(["clean", "minify:css"]));