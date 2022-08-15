"use strict";

const { params, plugins: $ } = require("./variables");

module.exports = async () => {
    return $.gulp.src(params.meta,  {base: './meta/'})
        .pipe($.gulp.dest(params.out))
        .pipe($.gulp.dest(params.prod))
};