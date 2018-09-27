

export default {
    // 绑定事件
    bindEvents() {
        document.addEventListener('mouseup', this.mouseUp);
        document.addEventListener('click', this.globalClick);
        let { editorDom } = this;
        if (editorDom) {
            editorDom.addEventListener('input', this.editorInput);
        }
    },
    unBindEvents() {
        document.removeEventListener('mouseup', this.mouseUp);
        document.removeEventListener('mouseup', this.globalClick);
        let { editorDom } = this;
        if (editorDom) {
            editorDom.removeEventListener('input', this.editorInput);
        }
    },
    mouseUp(event) {
        this.popShow(event);
    },
    globalClick(event) {
        this.clickDispatch2Pop(event);
    },
    editorInput(event) {
        this.fire('input', event.target.innerHTML);
    }
};