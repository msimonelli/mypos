/**
 * 
 */

(function ( $ )
{
    $.fn.toggleSwitch = function( options )
    {
        options = $.extend({
            css_on_val: 'bold',
            css_off_val: 'normal',
            css: 'font-weight',
            target: '#div_prev'
        }, options );
        
        //alert(settings.on_css);
        
        $(this).change(function(e) {
            if(this.checked) {
                //alert('clicked');
                $(options.target).css(options.css, options.css_on_val);
            }
            else
                $(options.target).css(options.css, options.css_off_val);
        });
    };
}( jQuery ));