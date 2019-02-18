
import commands from './commands'

export default {
    // 绑定事件
    bindEvents(){
        document.addEventListener( 'mouseup' , this.mouseUp )
        document.addEventListener( 'click' , this.globalClick )
        let { editorDom } = this
        if ( editorDom ) {
            editorDom.addEventListener( 'input' , this.editorInput )
            editorDom.addEventListener( 'paste' , this.pasteHandler )
        }
    } ,
    unBindEvents(){
        document.removeEventListener( 'mouseup' , this.mouseUp )
        document.removeEventListener( 'mouseup' , this.globalClick )
        let { editorDom } = this
        if ( editorDom ) {
            editorDom.removeEventListener( 'input' , this.editorInput )
            editorDom.removeEventListener( 'paste' , this.pasteHandler )
        }
    } ,
    mouseUp( event ){
        let { editorDom } = this
        if ( editorDom ) {
            let { target } = event
            if ( editorDom.contains( target ) ) {
                this.popShow( event )
            }
        }
    } ,
    globalClick( event ){
        let { editorPop } = this ,
            hasPop = editorPop !== undefined
        if ( hasPop ) {
            let { target } = event ,
                inPop = editorPop.contains( target )
            if ( !inPop ) {
                // fix 执行commands，点击空白处，pop不消失的bug
                setTimeout( () => {
                    let selectedTxt = this.isSelectedTxt()
                    if ( !selectedTxt ) {
                        this.serInVisible( '全局点击' )
                    }
                } , 0 )
            }
        }
    } ,
    editorInput( event ){
        this.isNeedClearBr()
        this.fire( 'input' , event.target.innerHTML )
    } ,
    pasteHandler (event) {
        var plainHTML = event.clipboardData.getData('text/plain'); // 获取纯文本格式
        // 如果符合url规范，则自动转化为a标签执行link命令
        if (
            /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/g.test(
                plainHTML
            )
        ) {
            commands.link(plainHTML);
            event.preventDefault();
        }
    },
    isNeedClearBr(){
        let { editorDom } = this ,
            flag = false ,
            onlyOneChild = editorDom.childNodes.length === 1
        if ( onlyOneChild ) {
            let child = editorDom.childNodes[ 0 ] ,
                { tagName } = child
            if ( tagName && tagName.toLowerCase() === 'br' ) {
                flag = true
            }
        }
        if ( flag ) {
            editorDom.childNodes[ 0 ].remove()
        }
    }
}