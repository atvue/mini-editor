


export default {
    bold(){
        document.execCommand( 'bold', false , null )
    } ,
    color( color ) {
        if ( color === undefined || color === null ) {
            return
        }
        document.execCommand( 'styleWithCSS' , false , true )
        document.execCommand( 'foreColor' , false , color )
    } ,
    link( url ) {
        var text = window.getSelection().toString();
        // @NOTE 简单的格式检查
        if (!/^(http|https):\/\//g.test(text)) {
            url = `//${text}`;
        }
        document.execCommand(
            'insertHTML',
            false,
            `<a href="${url}" target="_blank">${text}</a>`
        );
    }
}