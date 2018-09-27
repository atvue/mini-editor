import { clsPopWrapper , log , colorReg , clsBold , clsColor } from './variables'
import { isNumber } from './check'
import markSelection from './markSelection'
import utils from './utils'

export default {
    popShow( event ){
        let isSelected = this.isSelectedTxt()
        if ( isSelected ) {
            let isInserted = this.isInsertedPop()
            if ( !isInserted ) {
                this.insertPop()
            }
            this.setVisible()
            let { x , y } = this.calcPos()
            this.setPos( {
                x ,
                y ,
            } )
        } else {
            this.serInVisible( '没有选中的文本，关闭pop' )
        }
    } ,
    isSelectedTxt(){
        let txt = window.getSelection().toString()
        return txt.trim() !== ''
    } ,
    isInsertedPop(){
        let { editorWrapper } = this ,
            popEle = editorWrapper.querySelector( `.${clsPopWrapper}` )
        return popEle !== null
    } ,
    insertPop(){
        let { editorWrapper } = this ,
            editorPop = document.createElement( 'div' )
        editorPop.classList.add( clsPopWrapper )
        editorPop.innerHTML = this.getToolBar()
        editorWrapper.appendChild( editorPop )
        this.editorPop = editorPop
        this.renderColor()
    } ,
    setVisible(){
        let { editorPop } = this
        if ( editorPop ) {
            editorPop.style.display = 'block'
            let formats = []
            utils.checkForFormatting( window.getSelection().focusNode , formats )
        }
    } ,
    serInVisible( fromTip ){
        let { editorPop } = this
        if ( editorPop ) {
            editorPop.style.display = 'none'
            log( `关闭pop` , fromTip )
        }
    } ,
    visible(){
        let flag = false ,
            { editorPop } = this
        if ( editorPop ) {
            flag = editorPop.style.display === 'block'
        }
        return flag
    } ,
    setPos( { x , y } ) {
        let { editorPop } = this
        if ( isNumber( x ) && isNumber( y ) ) {
            editorPop.style.left = `${x}px`
            editorPop.style.top = `${y}px`
        } else {
            log( `setPos参数{x,y}必须为数字` )
        }
    } ,
    calcPos() {
        let { editorDom , editorPop } = this ,
            popRect = editorPop.getBoundingClientRect() ,
            { width: popW , height: popH } = popRect ,
            editorRect = editorDom.getBoundingClientRect() ,
            { scrollTop } = editorDom ,
            { x: editorRectX , y: editorRectY } = editorRect ,
            { left: windowX , top: windowY } = utils.pageOffset() ,
            { left , top } = markSelection() ,
            x = left - editorRectX ,
            y = top - editorRectY - scrollTop

        x -= ( popW / 2 + windowX )
        y -= ( popH + 10 + windowY ) // padding-bottom 10
        return {
            x ,
            y ,
        }
    } ,
    renderColor(){
        let { editorPop } = this ,
            colorEle = editorPop.querySelectorAll( '.tool-color' )
        Array.prototype.forEach.call( colorEle , ele => {
            let { className } = ele ,
                matched = className.match( colorReg )
            if ( matched !== null ) {
                let color = matched[ 1 ] ,
                    colorHex = `#${color}` ,
                    i = ele.querySelector( 'i' )
                if ( i ) {
                    i.style.backgroundColor = colorHex
                }
            }
        } )
    } ,
    getToolBar(){
        return `
            <span class="tool-command ${clsBold}">
                <i>B</i>
            </span>
            <span class="tool-command ${clsColor} tool-color-333333">
                <i></i>
            </span>
            <span class="tool-command ${clsColor} tool-color-EF8D2A">
                <i></i>
            </span>
        `
    } ,
    clickDispatch2Pop( event ) {
        let { editorPop } = this ,
            hasPop = editorPop !== undefined
        if ( hasPop ) {
            let { target } = event ,
                inPop = editorPop.contains( target )
            if ( inPop ) {
                let { classList , className } = target ,
                    isBold = classList.contains( clsBold ) ,
                    isColor = classList.contains( clsColor )
                if ( isBold ) {
                    this.bold()
                }
                if ( isColor ) {
                    let matched = className.match( colorReg )
                    if ( matched !== null ) {
                        let color = matched[ 1 ] ,
                            colorStr = `#${color}`
                        this.color( colorStr )
                    } 
                }
            } else {
                // fix 执行commands，点击空白处，pop不消失的bug
                setTimeout( () => {
                    let selectedTxt = this.isSelectedTxt()
                    if ( !selectedTxt ) {
                        this.serInVisible( '全局点击' )
                    }
                } , 0 )
            }
        }
    }
}