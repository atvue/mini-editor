


export default {
    bold(){
        document.execCommand( 'bold', false )
    } ,
    color( color ) {
        document.execCommand( 'styleWithCSS' , false , true )
        document.execCommand( 'foreColor' , false , color )
    }
}