"use strict";

const { params,  plugins : $ } = require("./variables");

let jsTask = params.js.slice();
jsTask.push(params.type.js);

module.exports = () =>
    $.gulp.src(jsTask)
        .pipe($.plumber())
        .pipe($.jshint({
            esversion: 6
        }))
        .pipe($.jshint.reporter("jshint-stylish"))
        .pipe($.webpackGulp($.webpackConfig, $.webpack))
        .pipe($.gulp.dest(params.out))
        .pipe($.uglify())
        .pipe($.gulp.dest(params.prod))
        .pipe($.reload({ stream: true }));