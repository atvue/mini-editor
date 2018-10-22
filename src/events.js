

export default {
    // 绑定事件
    bindEvents(){
        document.addEventListener( 'mouseup' , this.mouseUp )
        document.addEventListener( 'click' , this.globalClick )
        let { editorDom } = this
        if ( editorDom ) {
            editorDom.addEventListener( 'input' , this.editorInput )
        }
    } ,
    unBindEvents(){
        document.removeEventListener( 'mouseup' , this.mouseUp )
        document.removeEventListener( 'mouseup' , this.globalClick )
        let { editorDom } = this
        if ( editorDom ) {
            editorDom.removeEventListener( 'input' , this.editorInput )
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
        this.fire( 'input' , event.target.innerHTML )
    }
}