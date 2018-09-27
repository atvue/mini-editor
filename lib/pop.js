'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _variables = require('./variables');

var _check = require('./check');

var _markSelection2 = require('./markSelection');

var _markSelection3 = _interopRequireDefault(_markSelection2);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    popShow: function popShow(event) {
        var isSelected = this.isSelectedTxt();
        if (isSelected) {
            var isInserted = this.isInsertedPop();
            if (!isInserted) {
                this.insertPop();
            }
            this.setVisible();

            var _calcPos = this.calcPos(),
                x = _calcPos.x,
                y = _calcPos.y;

            this.setPos({
                x: x,
                y: y
            });
        } else {
            this.serInVisible('没有选中的文本，关闭pop');
        }
    },
    isSelectedTxt: function isSelectedTxt() {
        var txt = window.getSelection().toString();
        return txt.trim() !== '';
    },
    isInsertedPop: function isInsertedPop() {
        var editorWrapper = this.editorWrapper,
            popEle = editorWrapper.querySelector('.' + _variables.clsPopWrapper);

        return popEle !== null;
    },
    insertPop: function insertPop() {
        var editorWrapper = this.editorWrapper,
            editorPop = document.createElement('div');

        editorPop.classList.add(_variables.clsPopWrapper);
        editorPop.innerHTML = this.getToolBar();
        editorWrapper.appendChild(editorPop);
        this.editorPop = editorPop;
    },
    setVisible: function setVisible() {
        var editorPop = this.editorPop;

        if (editorPop) {
            this.checkToolActive();
            editorPop.style.display = 'block';
        }
    },
    serInVisible: function serInVisible(fromTip) {
        var editorPop = this.editorPop;

        if (editorPop) {
            editorPop.style.display = 'none';
            (0, _variables.log)('\u5173\u95EDpop', fromTip);
        }
    },
    checkToolActive: function checkToolActive() {
        var formats = [],
            editorPop = this.editorPop;

        _utils2.default.checkForFormatting(window.getSelection().focusNode, formats);
        if (editorPop === undefined) {
            return;
        }
        var eleCommads = editorPop.querySelectorAll('.' + _variables.clsToolCommand),
            isBold = formats.includes('b');
        for (var i = 0; i < eleCommads.length; i++) {
            var ele = eleCommads[i],
                isToolBold = ele.classList.contains(_variables.clsBold);
            if (isToolBold) {
                ele.classList.toggle(_variables.clsActive, isBold);
            }
        }
    },
    visible: function visible() {
        var flag = false,
            editorPop = this.editorPop;

        if (editorPop) {
            flag = editorPop.style.display === 'block';
        }
        return flag;
    },
    setPos: function setPos(_ref) {
        var x = _ref.x,
            y = _ref.y;
        var editorPop = this.editorPop;

        if ((0, _check.isNumber)(x) && (0, _check.isNumber)(y)) {
            editorPop.style.left = x + 'px';
            editorPop.style.top = y + 'px';
        } else {
            (0, _variables.log)('setPos\u53C2\u6570{x,y}\u5FC5\u987B\u4E3A\u6570\u5B57');
        }
    },
    calcPos: function calcPos() {
        var editorDom = this.editorDom,
            editorPop = this.editorPop,
            popRect = editorPop.getBoundingClientRect(),
            popW = popRect.width,
            popH = popRect.height,
            editorRect = editorDom.getBoundingClientRect(),
            scrollTop = editorDom.scrollTop,
            editorRectX = editorRect.x,
            editorRectY = editorRect.y,
            _utils$pageOffset = _utils2.default.pageOffset(),
            windowX = _utils$pageOffset.left,
            windowY = _utils$pageOffset.top,
            _markSelection = (0, _markSelection3.default)(),
            left = _markSelection.left,
            top = _markSelection.top,
            x = left - editorRectX,
            y = top - editorRectY - scrollTop;

        x -= popW / 2 + windowX;
        y -= popH + 10 + windowY; // padding-bottom 10
        return {
            x: x,
            y: y
        };
    },
    getToolBar: function getToolBar() {
        var config = this.config,
            colors = config.colors,
            colorHtml = '';

        if (colors) {
            colors.forEach(function (color) {
                colorHtml += '\n                    <span class="' + _variables.clsToolCommand + ' ' + _variables.clsColor + '" data-color="' + color + '">\n                        <i style="background-color:' + color + '"></i>\n                    </span>\n                ';
            });
        }
        return '\n            <span class="' + _variables.clsToolCommand + ' ' + _variables.clsBold + '">\n                <i>B</i>\n            </span>\n            ' + colorHtml + '\n        ';
    },
    clickDispatch2Pop: function clickDispatch2Pop(event) {
        var _this = this;

        var editorPop = this.editorPop,
            hasPop = editorPop !== undefined;

        if (hasPop) {
            var target = event.target,
                inPop = editorPop.contains(target);

            if (inPop) {
                var classList = target.classList,
                    isBold = classList.contains(_variables.clsBold),
                    isColor = classList.contains(_variables.clsColor);

                if (isBold) {
                    _commands2.default.bold();
                }
                if (isColor) {
                    var color = target.dataset.color,
                        hasColor = color !== undefined;

                    if (hasColor) {
                        _commands2.default.color(color);
                    }
                }
                this.checkToolActive();
            } else {
                // fix 执行commands，点击空白处，pop不消失的bug
                setTimeout(function () {
                    var selectedTxt = _this.isSelectedTxt();
                    if (!selectedTxt) {
                        _this.serInVisible('全局点击');
                    }
                }, 0);
            }
        }
    }
};