// https://stackoverflow.com/questions/1589721/how-can-i-position-an-element-next-to-user-text-selection/1589912#1589912
import { clsRichEditor } from './variables'

var markSelection = (function() {
    var markerTextChar = "\ufeff";
    var markerTextCharEntity = "&#xfeff;";

    var markerEl ,
        markerId = "sel_" + new Date().getTime() + "_" + Math.random().toString().substr(2);

    return function() {
        var sel, range;

        if (document.selection && document.selection.createRange) {
            // Clone the TextRange and collapse
            range = document.selection.createRange().duplicate();
            range.collapse(false);

            // Create the marker element containing a single invisible character by creating literal HTML and insert it
            range.pasteHTML('<span id="' + markerId + '" style="position: relative;">' + markerTextCharEntity + '</span>');
            markerEl = document.getElementById(markerId);
        } else if (window.getSelection) {
            sel = window.getSelection();

            if (sel.getRangeAt) {
                range = sel.getRangeAt(0).cloneRange();
            } else {
                // Older WebKit doesn't have getRangeAt
                range = document.createRange();
                range.setStart(sel.anchorNode, sel.anchorOffset);
                range.setEnd(sel.focusNode, sel.focusOffset);

                // Handle the case when the selection was selected backwards (from the end to the start in the
                // document)
                if (range.collapsed !== sel.isCollapsed) {
                    range.setStart(sel.focusNode, sel.focusOffset);
                    range.setEnd(sel.anchorNode, sel.anchorOffset);
                }
            }

            range.collapse(false);

            // Create the marker element containing a single invisible character using DOM methods and insert it
            markerEl = document.createElement("span");
            markerEl.id = markerId;
            markerEl.appendChild( document.createTextNode(markerTextChar) );
            range.insertNode(markerEl);
        }

        // Find markerEl position http://www.quirksmode.org/js/findpos.html
        var obj = markerEl;
        var left = 0 ,
            top = 0
        do {
            let ele = obj.offsetParent
            if ( ele ) {
                left += obj.offsetLeft
                top += obj.offsetTop
                if ( ele.classList.contains( clsRichEditor ) ) {
                    obj = false
                } else {
                    obj = ele
                }
            } else {
                obj = false
            }
        } while ( obj )
        return {
            left ,
            top ,
        }
    }
})()


export default markSelection