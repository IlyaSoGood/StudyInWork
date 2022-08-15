"use strict";

const { params, plugins: $ } = require("./variables");

module.exports = async () =>
    $.gulp.src(params.sprite)
        .pipe($.svgMin({
            plugins: [{
                    name: 'cleanupIDs',
                    params: {
                        minify: true,
                    }
                },
                {
                    name: 'removeViewBox',
                    active: true,
                },
            ],
        }))
        .pipe($.svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"  //sprite file name
                    }
                },
                svg: {
                    dimensionAttributes: false
                }
            }
        ))
        .pipe($.replace(/viewBox/, "viewBoxTemp"))
        .pipe($.gulp.dest(`${params.out}/images`))
        .pipe($.gulp.dest(`${params.prod}/images`));