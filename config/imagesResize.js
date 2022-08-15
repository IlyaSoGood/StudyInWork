"use strict";

const { params, plugins: $ } = require("./variables");

// рэжэм
const cut = (item, width, height, prefs, end) =>
    $.sharp(`${params.imagesToResizeDirectory}${item}.jpg`)
        .resize(width, height, prefs)
        .toFile(`${params.out}/images/${item}${end}.jpg`, (err, info) => {});

module.exports = () => {
    return new Promise(function(resolve, reject) {
        // берём все файлы из указанной директории
        const files = $.fs.readdir($.path.resolve(__dirname, "../" + params.imagesToResizeDirectory), (err, files) => {
            if (err)
                console.log(err);
            else {
                let images = [];
                // все файлы должны быть в формате jpg!
                files.forEach(file => {
                    images.push($.path.basename(file, '.jpg'));
                })

                images.forEach(function (item) {

                    // задать ширину, высоту, режим нарезки (если надо) и постфикс (если надо)
                    cut(item, 100, 140, {}, "-thumb");

                })
                resolve();
            }
        })
    });
}
