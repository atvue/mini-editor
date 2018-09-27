"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNumber = isNumber;
var numReg = exports.numReg = /^-?\d+(\.\d+)?$/;

function isNumber(num) {
    return numReg.test(num);
}