"use strict";

const { plugins: { gulp } } = require("./config/variables");
// const { series } = require('gulp');

const createTask = function (taskName, beforeTasks, ...additionalTasks) {
    if (!beforeTasks)  return gulp.task( taskName, require(`./config/${taskName}`) );
    return gulp.task( taskName, gulp.series(beforeTasks, ...additionalTasks) );
};

const tasks = [
    [ "server" ],
    [ "json-clean" ],
    [ "json" ],
    [ "fonts" ],
    [ "meta" ],
    [ "htmlTask" ],
    [ "preCss" ],
    [ "cssTask" ],
    [ "images" ],
    [ "imgMin" ], // миницикация изображений, можно подключить вместо таска images
    [ "jsLibs" ],
    [ "jsTask" ],
    [ "jquery" ],
    [ "sprite" ], // сборка svg-спрайта
    [ "createFirstLevelBlocks" ],
    [ "createBlocks" ],
    [ "htmlReloadTask" ],
    [ "imagesToWebp" ], // автоматическая конвертация изображений в webp
    [ "imagesResize" ], // автоматическая нарезка товаров в каталоге
    [ "createAllBlocks", "createFirstLevelBlocks", "createBlocks" ],
    [ "html", "json-clean", "json", "htmlTask" ],
    [ "htmlReload", "html", "htmlReloadTask"],
    [ "css", "preCss", "cssTask" ],
    [ "js", "jsLibs", "jsTask" ],
];

for( let taskName of tasks ) {
    createTask(...taskName);
}

gulp.task("build", gulp.parallel("html", "fonts", "meta", "css", "images", "js", "jquery", "sprite"));

gulp.task("default", gulp.parallel("server", "build"));