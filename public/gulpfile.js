const gulp = require("gulp");
const eslint = require("gulp-eslint");


gulp.task("default", () => {
    console.log("I am default!");
});

gulp.task("lint:js", () => {
    return gulp.src(["**/*.js", "!node_modules/**"])
        .pipe(eslint({
            configFile: "./eslint.json"
        })
        )
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});