


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
    }
}