

export const logMsg = false

export const clsRichEditor = 'mini-rich-editor'


export const clsPopWrapper = 'mini-rich-editor-pop-wrapper'


export const log = function(){
    if ( logMsg ) {
        console.warn.apply( null , [ 'RichEditor:' , ...arguments ] ) 
    }
}


export const colorReg = /.*tool-color-([0-9A-F]{6})([\s].*|$)/


export const clsBold = 'tool-bold'

export const clsColor = 'tool-color'
