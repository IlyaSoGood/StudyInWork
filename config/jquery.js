"use strict";

const { params, plugins: $ } = require("./variables");

module.exports = async () =>
    $.gulp.src("node_modules/jquery/dist/jquery.min.js")
        .pipe($.gulp.dest(`${params.out}/js`))
        .pipe($.gulp.dest(`${params.prod}/js`));