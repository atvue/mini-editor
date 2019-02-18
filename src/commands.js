


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
        var rUrl = url !== undefined ? url : window.getSelection().toString(),
            rUrl = rUrl.trim(),
            text = rUrl;
        // @NOTE 简单的格式补充
        if (!/^(http|https):\/\//g.test(rUrl)) {
            rUrl = `//${rUrl}`;
        }
        // addLink命令无法实现在新窗口打开，使用insertHTML, IE浏览器不支持
        document.execCommand(
            'insertHTML',
            false,
            `<a href="${rUrl}" target="_blank">${text}</a>`
        );
    }
}