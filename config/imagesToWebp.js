"use strict";

const { params, plugins: $ } = require("./variables");

module.exports = () =>
    $.gulp.src(params.type.imagesToWebp)
    .pipe($.webp({quality: 90, method: 6}))
    .pipe($.rename( {dirname: ""} ))
    .pipe($.gulp.dest(`${params.out}/images`))
    .pipe($.gulp.dest(`${params.prod}/images`))
    .pipe($.reload({stream: true}));