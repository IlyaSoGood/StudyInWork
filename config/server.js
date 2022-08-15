"use strict";

const { params, plugins: $ } = require("./variables");

module.exports = function () {

    $.bs.init({
        server: $.path.resolve(params.out)
    });

    $.gulp.watch(['pug/*.pug', 'blocks/**/*.pug', params.type.json, '!blocks/data.json'], {usePolling: true}, $.gulp.parallel("htmlReload"));
    $.gulp.watch([params.type.sass, "./setting.block/*.scss"], {usePolling: true}, $.gulp.parallel("css"));
    $.gulp.watch(params.type.images, $.gulp.parallel("images"));
    $.gulp.watch(params.type.js, $.gulp.parallel("js"));
    $.gulp.watch(params.sprite, $.gulp.parallel("sprite"));
};