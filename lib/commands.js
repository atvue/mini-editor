


export default {
    bold(){
        document.execCommand( 'bold', false )
    } ,
    color( color ) {
        document.execCommand( 'foreColor' , false, color )
    }
}