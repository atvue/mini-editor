const utils = {
    checkForFormatting( currentNode, formats = [] ) {
        var validFormats = ['b', 'i', 'u', 'h1', 'h2', 'ol', 'ul', 'li', 'a'];
        if (currentNode.nodeName === '#text' ||
            validFormats.indexOf( currentNode.nodeName.toLowerCase() ) != -1 ) {
            if ( currentNode.nodeName != '#text' ) {
                formats.push( currentNode.nodeName.toLowerCase() )
            }
            utils.checkForFormatting( currentNode.parentNode , formats )
        }
    } ,
    pageOffset(){
        var doc = document.documentElement;
        var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0) ;
        var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0) ;
        return {
            left ,
            top
        }
    }
}

export default utils