import { clsPopWrapper , log , clsBold , clsLink, clsColor , clsToolCommand , clsActive } from './variables'
import { isNumber } from './check'
import markSelection from './markSelection'
import utils from './utils'
import commands from './commands'

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
        this.bindPopEvents()
    } ,
    setVisible(){
        let { editorPop } = this
        if ( editorPop ) {
            this.checkToolActive()
            editorPop.style.display = 'block'
        }
    } ,
    serInVisible( fromTip ){
        let { editorPop } = this
        if ( editorPop ) {
            editorPop.style.display = 'none'
            log( `关闭pop` , fromTip )
        }
    } ,
    checkToolActive(){
        let formats = [] ,
            { editorPop } = this
        utils.checkForFormatting( window.getSelection().focusNode , formats )
        if ( editorPop === undefined ) {
            return
        }
        let eleCommads = editorPop.querySelectorAll( `.${clsToolCommand}` ) ,
            isBold = formats.includes( 'b' )
        for( let i = 0 ; i < eleCommads.length ; i++ ) {
            let ele = eleCommads[ i ] ,
                isToolBold = ele.classList.contains( clsBold )
            if ( isToolBold ) {
                ele.classList.toggle( clsActive , isBold )
            }
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
            { scrollTop } = editorDom ,
            { left , top } = markSelection() ,
            x = left ,
            y = top - scrollTop

        x -= ( popW / 2 )
        y -= ( popH + 10 ) // padding-bottom 10
        return {
            x ,
            y ,
        }
    } ,
    getToolBar(){
        let { config } = this ,
            { colors } = config ,
            colorHtml = ''
        if ( colors ) {
            colors.forEach( color => {
                colorHtml += `
                    <span class="${clsToolCommand} ${clsColor}" data-color="${color}" data-command="color">
                        <i style="background-color:${color}"></i>
                    </span>
                `
            } )
        }
        return `
            <span class="${clsToolCommand} ${clsBold}" data-command="bold">
                <i>B</i>
            </span>
            <span class="${clsToolCommand} ${clsBold}" data-command="link">
                <i>Link</i>
            </span>
            ${colorHtml}
        `;
    } ,
    bindPopEvents(){
        let { editorPop } = this
        if ( editorPop ) {
            editorPop.addEventListener( 'mousedown' , this.clickDispatch2Pop )
        }
    } ,
    unBindPopEvents(){
        let { editorPop } = this
        if ( editorPop ) {
            editorPop.removeEventListener( 'mousedown' , this.clickDispatch2Pop )
        }
    } ,
    clickDispatch2Pop( event ) {
        let { editorPop } = this ,
            hasPop = editorPop !== undefined
        if ( hasPop ) {
            let { target } = event ,
                { classList , dataset: { command } } = target ,
                isColor = classList.contains( clsColor ) ,
                handler = commands[ command ]
            if ( handler ) {
                let args
                if ( isColor ) {
                    let { dataset: { color } } = target
                    args = color
                }
                handler( args )
            }
            this.checkToolActive()
        }
        event.stopPropagation()
        event.preventDefault()
    }
}