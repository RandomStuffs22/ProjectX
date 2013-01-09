(function(jQuery) {

jQuery.fn.extend({
    expandable: function(givenOptions) {
        var options = jQuery.extend({
            duration: 'normal',
            interval: 750,
            within: 0,
            by: 1,
            init: false 
        }, givenOptions);
        
        return this.filter('textarea').each(function() {
            var jQuerythis = jQuery(this).css({ display: 'block', overflow: 'hidden' }),
                minHeight = jQuerythis.height(),
                heightDiff = this.offsetHeight - minHeight,
                rowSize = ( parseInt(jQuerythis.css('lineHeight'), 10) || parseInt(jQuerythis.css('fontSize'), 10) ),
                // jQuerymirror is used for determining the height of the text within the textarea
                // it isn't perfect but is pretty close
                // white-space rules from: http://petesbloggerama.blogspot.com/2007/02/firefox-ie-word-wrap-word-break-tables.html
                jQuerymirror = jQuery('<div style="position:absolute;top:-999px;left:-999px;border-color:#000;border-style:solid;overflow-x:hidden;visibility:hidden;z-index:0;white-space: pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;" />').appendTo('body'),
                interval;
            
            // copy styles from textarea to mirror to mirror the textarea as best possible
            jQuery.each('borderTopWidth borderRightWidth borderBottomWidth borderLeftWidth paddingTop paddingRight paddingBottom paddingLeft fontSize fontFamily fontWeight fontStyle fontStretch fontVariant wordSpacing lineHeight width'.split(' '), function(i,prop) {
                jQuerymirror.css(prop, jQuerythis.css(prop));
            });
            
            // setup events
            jQuerythis
                .bind('keypress', function(event) { if ( event.keyCode == '13' ) check(); })
                .bind('focus blur', function(event) {
                    if ( event.type == 'blur' ) clearInterval( interval );
                    if ( event.type == 'focus' ) interval = setInterval(check, options.interval);
                });

            function check() {
                var text = jQuerythis.val(), newHeight, height, usedHeight, usedRows, availableRows;
                // copy textarea value to the jQuerymirror
                // encode any html passed in and replace new lines with a <br>
                // the &nbsp; is to try and normalize browser behavior
                jQuerymirror.html( encodeHTML(text).replace(/\n/g, '&nbsp;<br>') );
                
                height = jQuerythis[0].offsetHeight - heightDiff;
                usedHeight = jQuerymirror[0].offsetHeight - heightDiff;
                usedRows = Math.floor(usedHeight / rowSize);
                availableRows = Math.floor((height / rowSize) - usedRows);
                
                // adjust height if needed by either growing or shrinking the text area to within the specified bounds
                if ( availableRows <= options.within ) {
                    newHeight = rowSize * (usedRows + Math.max(availableRows, 0) + options.by);
                    jQuerythis.stop().animate({ height: newHeight }, options.duration);
                } else if ( availableRows > options.by + options.within ) {
                    newHeight = Math.max( height - (rowSize * (availableRows - (options.by + options.within))), minHeight );
                    jQuerythis.stop().animate({ height: newHeight }, options.duration);
                }
            };
            if ( options.init ) check();
        }).end();
    }
});
    
function encodeHTML(text) {
    var characters = {
        '<' : '&lt;',
        '>' : '&gt;',
        '&' : '&amp;',
        '"' : '&quot;',
        '\'': '&#x27;',
        '/' : '&#x2F;'
    };
    return (text + '').replace(/[<>&"'\/]/g, function(c) {
        return characters[c];
    });
}

})(jQuery);
jQuery(document).ready(function(){
	jQuery('ul.menu li a[title]').tooltip({
        effect: 'slide',
        position: 'top center',
        direction: "down",
        bounce: true
    });
	jQuery('textarea').expandable();
});