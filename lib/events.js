

export default {
    // 绑定事件
    bindEvents(){
        document.addEventListener( 'mouseup' , this.mouseUp )
        document.addEventListener( 'click' , this.globalClick )
    } ,
    unBindEvents(){
        document.removeEventListener( 'mouseup' , this.mouseUp )
        document.addEventListener( 'mouseup' , this.globalClick )
    } ,
    mouseUp( event ){
        this.popShow( event )
    } ,
    globalClick( event ){
        this.clickDispatch2Pop( event )
    }
}