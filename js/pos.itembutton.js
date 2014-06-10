
(function ( $ )
{
    $.fn.itemButton = function( action, option, option2 )
    {
        action = action || "initialize";
        $this = $(this);
        
        if(action == 'initialize') {
        	jQuery('<div/>', {
        	    html: '<div class="ib_wrapper"><div class="ib_table"><span>Test</span><div></div>'
        	}).appendTo($this);
        }
        
        if(action == 'setImage')
            $this.data('image_id', option);
        if(action == 'setMenu')
            $this.data('menu_id', option);
        if(action == 'setItem')
            $this.data('item_id', option);
        if(action == 'setId')
        	$this.data('id', option);
        if(action == 'setText')
        	$this.find('span').text(option);
        if(action == 'setAll') {
        	$this.data('item_button_id', option.item_button_id);
        	$this.data('menu_id', option.menu_id);
        }
        
        if(action == 'css') {
        	if( (option == 'textAlign') ||
        		(option == 'verticalAlign') ||
        		(option == 'fontFamily') ) {
        		$this.find('span').css(option, option2);
        	}
        	else if( (option == 'borderStyle') ||
        			(option == 'backgroundColor') ||
        			(option == 'backgroundImage') ) {
        		$this.find('.ib_wrapper').css(option, option2);
        	}
        }
        
        if(action == 'setCss') {
        	$this.css('top', option.top).
        		css('left', option.left).
        		css('width', option.width).
        		css('height', option.height).
        		css('border-radius', option.borderRadius);
        	
        	$wrapper = $this.find('.ib_wrapper');
        	$wrapper.css('background-color', option.backgroundColor).
        		css('border-radius', option.borderRadius).
        		css('border-style', option.borderStyle).
        		css('border-width', option.borderWidth).
        		css('border-color', option.borderColor).
        		css('background-image', option.backgroundImage);
        	
        	$span = $this.find('span');
        	$span.css(option2);
        }
        
        if(action == 'getId')
        	return $this.data('item_button_id');
            
        if(action == 'getJSON') {
        	$wrapper = $this.find('.ib_wrapper');
        	$span = $this.find('span');
        	
            var settings = {
                json: {
                    innerCss: {
                        'fontFamily': $span.css('font-family'),
                        'fontSize': $span.css('font-size'),
                        'fontWeight': $span.css('font-weight'),
                        'fontStyle': $span.css('font-style'),
                        'textDecoration': $span.css('text-decoration'),
                        'textAlign': $span.css('text-align'),
                        'verticalAlign': $span.css('vertical-align'),
                        'color': $span.css('color')
                    },
                    outerCss: {        	
                        'top' : Math.ceil($this.css('top').replace('px', '')),
                        'left' : Math.ceil($this.css('left').replace('px', '')),
                        'width' : Math.ceil($this.css('width').replace('px', '')),
                        'height' : Math.ceil($this.css('height').replace('px', '')),

                        'borderStyle': $wrapper.css('borderTopStyle'),
                        'borderWidth': Math.ceil($wrapper.css('borderTopWidth').replace('px', '')),
                        'borderRadius': Math.ceil($wrapper.css('borderTopRightRadius').replace('px', '')),
                        'borderColor': $wrapper.css('borderTopColor'),
                        'backgroundColor': $wrapper.css('background-color'),
                        'backgroundImage' : $wrapper.css('background-image')
                        //'zIndex' : 500
                    },
                    other: {
                        'item_id' : $this.data('item_id'),
                        'item_button_id' : $this.data('item_button_id'),
                        'menu_id' : $this.data('menu_id'),
                        'text' : $this.find('span').text()
                    }
                }
            };
            $this.data('settings', settings);
            return $this.data('settings').json;
        }
    };
}( jQuery ));
