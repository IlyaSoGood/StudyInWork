"use strict";

const { params, plugins: $ } = require("./variables");

const processors = [
    $.autoprefixer(),
    $.cssnano()
];
params.sass.push(...( params.levels.map( (level) => `blocks/**/${level}/*.scss`) ) );


module.exports = () => {

    $.clean(["./public/cache.scss"]);

    return $.gulp.src("./public/cache.scss")
        .pipe($.plumber())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.url({
            replace:  ["../",""],
            prepend: "images/"
        }))
        .pipe($.url({
            replace:  ["images/fonts/", "fonts/"],
        }))
        .pipe($.postcss(processors))
        .pipe($.rename("styles.css"))
        .pipe($.gulp.dest(params.out))
        .pipe($.gulp.dest(params.prod))
        .pipe($.reload({ stream: true }));
};