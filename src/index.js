import events from './events'
import pop from './pop'
import { clsRichEditor , log } from './variables'
import defaultConfig from './config'
import miniEvents from './miniEvents'
/**
 * 
 * editorWrapper 私有属性 __mini_rich_editor_init 是否初始化过
 */

function MiniEditor( ele , config = defaultConfig ) {
    if ( ele === undefined || ele === null ) {
        return log( `参数类型不正确` )
    }
    this.mouseUp = this.mouseUp.bind( this )
    this.popShow = this.popShow.bind( this )
    this.globalClick = this.globalClick.bind( this )
    this.editorInput = this.editorInput.bind( this )
    this.clickDispatch2Pop = this.clickDispatch2Pop.bind( this )

    this.editorWrapper = ele
    this.editorDom = undefined
    this.editorPop = undefined
    this.config = config
    this.init()
    Object.assign( this , miniEvents() )
}

const MiniEditorProtoType = {
    init(){
        let { editorWrapper } = this ,
            inited = this.checkInited()
        if ( inited ) {
            return log( `该dom标签已经被初始化过了` )
        }
        editorWrapper.classList.add( `${clsRichEditor}-wrapper` )
        // 可编辑元素
        let editorDom = document.createElement( 'div' )
        editorDom.classList.add( clsRichEditor )
        editorDom.contentEditable = true
        editorWrapper.appendChild( editorDom )
        // 标记
        this.editorDom = editorDom
        // 绑定事件
        this.bindEvents()
        editorWrapper.__mini_rich_editor_init = true
    } ,
    // 销毁
    destory(){
        this.unBindEvents()
        this.unBindPopEvents()
        this.mouseUp = undefined
        this.popShow = undefined
        this.globalClick = undefined
        this.editorInput = undefined

        this.editorWrapper = undefined
        this.editorDom = undefined
        this.editorPop = undefined
        this.config = undefined
        // destory miniEvents
        this.queue = undefined
        this.on = undefined
        this.fire = undefined
        this.get = undefined
        this.set = undefined
    } ,
    // 检测是否已经初始化
    checkInited(){
        let { editorWrapper } = this
        if ( editorWrapper && editorWrapper.__mini_rich_editor_init === true ) {
            return true
        } else {
            return false
        }
    } ,
    focus(){
        
    } ,
    disable( flag ){
        let { editorDom } = this
        if ( editorDom ) {
            editorDom.contentEditable = flag !== true
        }
    } ,
    content( value ){
        let { editorDom } = this
        if ( editorDom ) {
            editorDom.innerHTML = value
        }
    }
}


Object.assign( 
    MiniEditor.prototype , 
    MiniEditorProtoType ,
    events ,
    pop ,
)



export default MiniEditor

