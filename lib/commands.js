'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    bold: function bold() {
        document.execCommand('bold', false);
    },
    color: function color(_color) {
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('foreColor', false, _color);
    }
};