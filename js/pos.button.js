/**
 * 
 */

(function ( $ )
{
    $.fn.posButton = function( options )
    {
        options = $.extend({
            image: 'images/blue_button.png',
            hover_image: 'images/item_buttons/round_button_yellow2.png',
            width: '60px',
            height: '30px',
            text_align: 'center',
            vertical_align: 'middle',
            text: 'button'
        }, options );
        
        this.css('width', options.width);
        this.css('height', options.height);
        this.css('background-image', 'url("' + options.image + '")');
        
        this.css('display', 'table-cell');
        this.css('background-size', '100% 100%');
        this.css('text-align', options.text_align);
        this.css('vertical-align', options.vertical_align);
        this.css('margin', '10px');
        
        this.html(options.text);
        
        this.data('selected', 'false');
        
        $(this).hover(function(e) {
            if($(this).data('selected')) {
                $(this).css('background-image', 'url("' + options.hover_image + '")');
                $(this).data('selected', false);
            }
            else {
                $(this).data('selected', true);
                $(this).css('background-image', 'url("' + options.image + '")');
            }
        });
    };
    
    $.ltrim = function( str )
    {
        return str.replace( /^\s+/, "" );
    };
    
    $.rtrim = function( str )
    {
        return str.replace( /\s+$/, "" );
    };

}( jQuery ));