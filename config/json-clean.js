"use strict";

const { params, plugins: $ } = require("./variables");

module.exports = async () =>
    $.clean(["./blocks/data.json"]);