'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var logMsg = exports.logMsg = false;

var clsRichEditor = exports.clsRichEditor = 'mini-rich-editor';

var clsPopWrapper = exports.clsPopWrapper = 'mini-rich-editor-pop-wrapper';

var log = exports.log = function log() {
    if (logMsg) {
        var args = ['RichEditor:'];
        console.warn.apply(null, args.concat([].slice.call(arguments)));
    }
};

var colorReg = exports.colorReg = /.*tool-color-([0-9A-Fa-f]{6})([\s].*|$)/;

var clsBold = exports.clsBold = 'tool-bold';

var clsColor = exports.clsColor = 'tool-color';

var clsToolCommand = exports.clsToolCommand = 'tool-command';

var clsActive = exports.clsActive = 'active';