'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _pop = require('./pop');

var _pop2 = _interopRequireDefault(_pop);

var _variables = require('./variables');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _miniEvents = require('./miniEvents');

var _miniEvents2 = _interopRequireDefault(_miniEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * editorWrapper 私有属性 __mini_rich_editor_init 是否初始化过
 */

function MiniEditor(ele) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config2.default;

    if (ele === undefined || ele === null) {
        return (0, _variables.log)('\u53C2\u6570\u7C7B\u578B\u4E0D\u6B63\u786E');
    }
    this.mouseUp = this.mouseUp.bind(this);
    this.popShow = this.popShow.bind(this);
    this.globalClick = this.globalClick.bind(this);
    this.editorInput = this.editorInput.bind(this);

    this.editorWrapper = ele;
    this.editorDom = undefined;
    this.editorPop = undefined;
    this.config = config;
    this.init();
    Object.assign(this, (0, _miniEvents2.default)());
}

var MiniEditorProtoType = {
    init: function init() {
        var editorWrapper = this.editorWrapper,
            inited = this.checkInited();

        if (inited) {
            return (0, _variables.log)('\u8BE5dom\u6807\u7B7E\u5DF2\u7ECF\u88AB\u521D\u59CB\u5316\u8FC7\u4E86');
        }
        editorWrapper.classList.add(_variables.clsRichEditor + '-wrapper');
        // 可编辑元素
        var editorDom = document.createElement('div');
        editorDom.classList.add(_variables.clsRichEditor);
        editorDom.contentEditable = true;
        editorWrapper.appendChild(editorDom);
        // 标记
        this.editorDom = editorDom;
        // 绑定事件
        this.bindEvents();
        editorWrapper.__mini_rich_editor_init = true;
    },

    // 销毁
    destory: function destory() {
        this.unBindEvents();
        this.mouseUp = undefined;
        this.popShow = undefined;
        this.globalClick = undefined;
        this.editorInput = undefined;

        this.editorWrapper = undefined;
        this.editorDom = undefined;
        this.editorPop = undefined;
        this.config = undefined;
        // destory miniEvents
        this.queue = undefined;
        this.on = undefined;
        this.fire = undefined;
        this.get = undefined;
        this.set = undefined;
    },

    // 检测是否已经初始化
    checkInited: function checkInited() {
        var editorWrapper = this.editorWrapper;

        if (editorWrapper && editorWrapper.__mini_rich_editor_init === true) {
            return true;
        } else {
            return false;
        }
    },
    focus: function focus() {},
    disable: function disable(flag) {
        var editorDom = this.editorDom;

        if (editorDom) {
            editorDom.contentEditable = flag !== true;
        }
    },
    content: function content(value) {
        var editorDom = this.editorDom;

        if (editorDom) {
            editorDom.innerHTML = value;
        }
    }
};

Object.assign(MiniEditor.prototype, MiniEditorProtoType, _events2.default, _pop2.default);

exports.default = MiniEditor;