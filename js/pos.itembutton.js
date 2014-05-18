

(function ( $ )
{
    $.fn.itemButton = function( action, option )
    {
        action = action || "initialize";
        
        if(action == 'initialize') {
            //return this.data('settings').json;
        	//alert($(this).html());
        	html = $(this).html();
        	width = $(this).css('width');
        	height = $(this).css('height');
        	top = $(this).css('top');
        	left = $(this).css('left');
        	
        	str = "<div style='background-color: yellow;";
        	str += "width: " + width + ";";
        	str += "height: " + height + ";";
        	str += "top: " + top + ";";
        	str += "left: " + left + ";";
        	str += "'></div>";
        	//alert(str);
        	
        	//$(this).html(str);
        	//$(this).wrap(str);
        	
        }
        
        if(action == 'setImage')
            $(this).data('image_id', option);
        if(action == 'setMenu')
            $(this).data('menu_id', option);
        if(action == 'setItem')
            $(this).data('item_id', option);
        if(action == 'setId')
        	$(this).data('id', option);
        
        if(action == 'setAll') {
        	$(this).data('item_button_id', option.item_button_id);
        	$(this).data('menu_id', option.menu_id);
        }
        
        if(action == 'getId')
        	return $(this).data('item_button_id');
            
        if(action == 'getJSON') {
            // alert('itemButton created');
            var $this = $(this);
            
            var settings = {
                json: {
                	// BUG: CHANGE ALL 'DIV' CHILDREN TO 'SPAN' OR USE THE
                	// .innerButton or whatever it is class!!
                    innerCss: {
                        'fontFamily': this.children('span').css('font-family'),
                        'fontSize': this.children('span').css('font-size'),
                        'fontWeight': this.children('span').css('font-weight'),
                        'fontStyle': this.children('span').css('font-style'),
                        'textDecoration': this.children('span').css('text-decoration'),
                        'textAlign': this.children('span').css('text-align'),
                        'verticalAlign': this.children('span').css('vertical-align'),
                        'color': this.children('span').css('color')
                        //'borderStyle': this.children('div').css('borderTopStyle'),
                        //'borderWidth': Math.ceil(this.children('div').css('borderTopWidth').replace('px', '')),
                        //'borderRadius': Math.ceil(this.children('div').css('borderTopRightRadius').replace('px', '')),
                        //'borderColor': this.children('div').css('borderTopColor'),
                        //'backgroundColor': this.children('div').css('background-color')
                    },
                    outerCss: {
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
                        'item_button_id' : $(this).data('item_button_id'),
                        'menu_id' : $(this).data('menu_id'),
                        'text' : this.children('span').html()
                    }
                }
            };
            $(this).data('settings', settings);
            return this.data('settings').json;
        }

    };

    /*
    $.ltrim = function( str )
    {
        return str.replace( /^\s+/, "" );
    };
    
    $.rtrim = function( str )
    {
        return str.replace( /\s+$/, "" );
    };
	*/
}( jQuery ));

