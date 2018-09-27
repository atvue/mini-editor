

export const logMsg = true

export const clsRichEditor = 'mini-rich-editor'


export const clsPopWrapper = 'mini-rich-editor-pop-wrapper'


export const log = function(){
    if ( logMsg ) {
        let args = [ 'RichEditor:' ]
        console.warn.apply( null , args.concat( [].slice.call( arguments ) ) ) 
    }
}


export const colorReg = /.*tool-color-([0-9A-Fa-f]{6})([\s].*|$)/


export const clsBold = 'tool-bold'

export const clsColor = 'tool-color'

export const clsToolCommand = 'tool-command'

export const clsActive = 'active'
