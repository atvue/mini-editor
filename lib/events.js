'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    // 绑定事件
    bindEvents: function bindEvents() {
        document.addEventListener('mouseup', this.mouseUp);
        document.addEventListener('click', this.globalClick);
        var editorDom = this.editorDom;

        if (editorDom) {
            editorDom.addEventListener('input', this.editorInput);
        }
    },
    unBindEvents: function unBindEvents() {
        document.removeEventListener('mouseup', this.mouseUp);
        document.removeEventListener('mouseup', this.globalClick);
        var editorDom = this.editorDom;

        if (editorDom) {
            editorDom.removeEventListener('input', this.editorInput);
        }
    },
    mouseUp: function mouseUp(event) {
        this.popShow(event);
    },
    globalClick: function globalClick(event) {
        this.clickDispatch2Pop(event);
    },
    editorInput: function editorInput(event) {
        this.fire('input', event.target.innerHTML);
    }
};