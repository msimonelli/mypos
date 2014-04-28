/**
 * 
 */

var current_menu_id = null;
var next_button_id = 0;

$(document).ready(function() {


/*******************************************************************************
    Delegate clicks from container down to menu buttons
*******************************************************************************/
$('#pos_left_nav_bar_container').delegate('.menu_button', 'click', function() {
    
	$('.menu_button_selected').removeClass('menu_button_selected');
	$(this).addClass('menu_button_selected');
	
    current_menu_id = this.id.replace('menu_button', '');

    // clear out anything in the middle
    //$('#ui_middle_area').load('menu_editor_middle.html');
    $('.item_button').remove();

    var data =  { query: 'SELECT * FROM item_buttons_tbl B LEFT JOIN button_images_tbl I on B.image_id = I.button_img_idx WHERE menu_id = ' + current_menu_id };
    
    $.post('cgi/db_simple_select.php', data, function(result) {
		if(result == 'null') {
			alert('No buttons yet');
			return;
		}
    
		var arr = eval(result);
		for(var x=0; x < arr.length; x++)
		{
			var id1 = 'item_button_container_' + arr[x].item_button_id;
			var id2 = 'id_item_button_' + arr[x].item_button_id;
			next_button_id = arr[x].item_button_id+1;
        
			var css = {
				position: 'absolute',
                display: 'table',
                top: arr[x].top + 'px',
                left: arr[x].left + 'px',
                width: arr[x].width + 'px',
                height: arr[x].height + 'px'
            };
			
			// build the button div          
			var str =  '<div id="' + id1 + '">';
            	str += '   <div class="item_btn_inner" id="' + id2 + '">';
            	str += arr[x].text;
            	str += '</div>';
            	str += '</div>';
            	// fix CSS.  If we save the 'px' in the DB we can avoid
            	// fixing it here.  Ask Rob? Saves 3 lines of code.
            	arr[x].width='100%';
            	arr[x].height='100%';
            	arr[x].position='relative';
            	arr[x].display='table-cell';
            	arr[x].fontSize += 'px';
            	arr[x].borderWidth += 'px';
            	arr[x].borderRadius += 'px';
            	// this needs to get unset if there is no image, otherwise JS throughs a file not found error
            	if(arr[x].img != null) {
            		arr[x].backgroundImage = ' url("' + arr[x].img + '")';
            		arr[x].backgroundSize = '100% 100%';
            		arr[x].backgroundRepeat = 'no-repeat';
            	}
            	$('#ui_middle_area').append(str);
        
            	// apply css to both container and button
            	var button = $('#'+id1);
            	button.css(css);
            	$('#'+id2).css(arr[x]);

            	button.itemButton();
            	button.addClass('item_button');
		}
	});
});
/*******************************************************************************
    Build menu buttons into the left nav area from the database
*******************************************************************************/
var data = { query: 'SELECT * FROM menus' };

$.post('cgi/db_simple_select.php', data, function(result) {

    var arr = eval(result);
    
    for(var x=0; x<arr.length; x++)
    {
        var title = arr[x].title;
        var display = arr[x].display;
        var image = arr[x].image;
        var menu_id = arr[x].menu_id;
        var active = arr[x].active;
        var bg = 'menu_button-' + arr[x].background;
        
        if(active == 0) bg += ' menu_button-inactive';
        
        var str = '';
		str += '<div class="menu_button ' + bg + '" id="menu_button' + menu_id + '">';
	    str += '	<div>';
	    str += '    	<img src=' + image + ' />';
	    str += '    </div>';
	    str += '    <div>';
	    str += '    	<span>' + display + '</span>';
	    str += '    </div>';
	    str += '</div>';
        
        $('#pos_left_nav_bar_container').append(str);
        $('#pos_left_nav_bar_container').alternateScroll('remove');
        $('#pos_left_nav_bar_container').alternateScroll();
    }
});

}); // document.ready()