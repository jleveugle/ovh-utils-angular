"use strict";
module.exports = {
    src: {
        js: [
            "src/*/*.js",
            "!src/*/*-*.js",
            "src/*/**/**.js",
            "src/*.js"
        ],
        css: [
            "src/*/**/**.css"
        ],
        less: [
            "src/*/**/**.less"
        ],
        html: [
            "src/*/**/**.html"
        ]
    }
};
