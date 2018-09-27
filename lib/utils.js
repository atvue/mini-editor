'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var utils = {
    checkForFormatting: function checkForFormatting(currentNode) {
        var formats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        var validFormats = ['b', 'i', 'u', 'h1', 'h2', 'ol', 'ul', 'li', 'a'];
        if (currentNode.nodeName === '#text' || validFormats.indexOf(currentNode.nodeName.toLowerCase()) != -1) {
            if (currentNode.nodeName != '#text') {
                formats.push(currentNode.nodeName.toLowerCase());
            }
            utils.checkForFormatting(currentNode.parentNode, formats);
        }
    },
    pageOffset: function pageOffset() {
        var doc = document.documentElement;
        var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        return {
            left: left,
            top: top
        };
    }
};

exports.default = utils;