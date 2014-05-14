

(function ( $ )
{
    $.fn.itemButton = function( action, option )
    {
        action = action || "initialize";
        
        if(action == 'initialize') {
            //return this.data('settings').json;
        }
        
        if(action == 'setImage')
            $(this).data('image_id', option);
        if(action == 'setMenu')
            $(this).data('menu_id', option);
        if(action == 'setItem')
            $(this).data('item_id', option);
            
        if(action == 'getJSON') {
            // alert('itemButton created');
            var $this = $(this);
            
            var settings = {
                json: {
                    innerCSS: {
                        'fontFamily': this.children('div').css('font-family'),
                        'fontSize': this.children('div').css('font-size'),
                        'fontWeight': this.children('div').css('font-weight'),
                        'fontStyle': this.children('div').css('font-style'),
                        'textDecoration': this.children('div').css('text-decoration'),
                        'textAlign': this.children('div').css('text-align'),
                        'verticalAlign': this.children('div').css('vertical-align'),
                        'color': this.children('div').css('color')
                        //'borderStyle': this.children('div').css('borderTopStyle'),
                        //'borderWidth': Math.ceil(this.children('div').css('borderTopWidth').replace('px', '')),
                        //'borderRadius': Math.ceil(this.children('div').css('borderTopRightRadius').replace('px', '')),
                        //'borderColor': this.children('div').css('borderTopColor'),
                        //'backgroundColor': this.children('div').css('background-color')
                    },
                    CSS: {
                        'top' : Math.ceil(this.css('top').replace('px', '')),
                        'left' : Math.ceil(this.css('left').replace('px', '')),
                        'width' : Math.ceil(this.css('width').replace('px', '')),
                        'height' : Math.ceil(this.css('height').replace('px', '')),
                        'borderStyle': this.css('borderTopStyle'),
                        'borderWidth': Math.ceil(this.css('borderTopWidth').replace('px', '')),
                        'borderRadius': Math.ceil(this.css('borderTopRightRadius').replace('px', '')),
                        'borderColor': this.css('borderTopColor'),
                        'backgroundColor': this.css('background-color'),
                        'backgroundImage' : this.css('background-image'),
                        'zIndex' : 500
                    },
                    other: {
                        'item_id' : $(this).data('item_id'),
                        'menu_id' : $(this).data('menu_id'),
                        'image_id' : $(this).data('image_id'),
                        'text' : this.children('div').html()
                    }
                }
            };
            $(this).data('settings', settings);
            return this.data('settings').json;
        }

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

