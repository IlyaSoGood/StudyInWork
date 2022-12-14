"use strict";

const { bs, reload } = require("../browserSync");

module.exports = {
    params : {
        out: "public",
        prod: "public/prod",
        htmlSrc: "pug/*.pug",
        levels: ["xs", "sm", "md", "lg", "xl"],
        html: "'pug/*.pug', 'blocks/**/*.pug'",
        blocksName : [
            "header",
            "footer",
            "footer-social",
            "app",
            "menu",
            "title",
            "logo",
            "links",
            "product",
            "catalog",
            "breadcrumbs",
            "buttons",
            "button-contacts",
            "header-contacts",
            "modal",
            "card",
            "card-category",
            "form-product",
            "video-product",
            "product-examples",
            "product-theses",
            "product-characteristics",
            "product-description",
            "reasons",
            "reviews",
            "other-products",
            "watched-products"
        ],
        js: [],
        jsLibs : [
            "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js",
            "node_modules/lazysizes/lazysizes.min.js",
            "node_modules/inputmask/dist/inputmask.min.js",
            "node_modules/swiper/swiper-bundle.min.js"
        ],
        json: "blocks/**/*.json",
        css: [],
        sass: [
            "setting.block/bootstrap.scss",
            "setting.block/custom.scss",
            "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css"
        ],
        images: [],
        imagesDir: "images/",
        type: {
            css    : "blocks/**/**/*.css",
            sass   : "blocks/**/**/*.scss",
            js     : "blocks/**/**/*.js",
            images : "blocks/**/**/*.{gif,jpg,png,ico,svg}",
            json   : "blocks/**/*.json",
            imagesToWebp : "blocks/**/**/*.{jpg,png}" // путь к изображениям для таска imagesToWebp
        },
        fonts : 'fonts/*',
        meta  : 'meta/**/*',
        sprite  : 'sprite/*.svg',
        imagesToResizeDirectory: "blocks/", // путь к изображениям для таска imagesResize
    },
    plugins: {
        gulp          : require("gulp"),
        concat        : require("gulp-concat"),
        rename        : require("gulp-rename"),
        path          : require("path"),
        url           : require("gulp-css-url-adjuster"),
        autoprefixer  : require("autoprefixer"),
        postcss       : require("gulp-postcss"),
        pug           : require("gulp-pug"),
        jshint        : require("gulp-jshint"),
        plumber       : require("gulp-plumber"),
        uglify        : require("gulp-uglify"),
        sass          : require("gulp-sass"),
        svgSprite     : require("gulp-svg-sprite"),
        svgMin        : require("gulp-svgmin"),
        fs            : require("fs"),
        clean         : require("del"),
        replace       : require("gulp-replace"),
        merge         : require("gulp-merge-json"),
        htmlmin       : require("gulp-htmlmin"),
        imagemin      : require("gulp-imagemin"),
        cssnano       : require("cssnano"),
        bs            : bs,
        reload        : reload,
        webpack       : require("webpack"),
        webpackConfig : require("../../webpack.config"),
        webpackGulp   : require("webpack-stream"),
        sharp         : require('sharp'),
        webp          : require("gulp-webp")
    }
};