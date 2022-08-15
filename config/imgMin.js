"use strict";

const { params, plugins: $ } = require("./variables");

params.images.push(params.type.images);

module.exports = async () =>
    $.gulp.src(params.images)
        .pipe($.imagemin([
            $.imagemin.optipng({
                optimizationLevel: 5
            }),
            $.imagemin.mozjpeg({
                progressive: true
            }),
            $.imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]));