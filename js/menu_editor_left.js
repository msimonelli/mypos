/**
 * 
 */

//var current_menu_id = null;
//var next_button_id = 0;

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
    $('#ui_menu_editor_middle .item_button').remove();

    //var data =  { query: 'SELECT * FROM item_buttons_tbl B LEFT JOIN button_images_tbl I on B.image_id = I.button_img_idx WHERE menu_id = ' + current_menu_id };
    var data = { menu_id: current_menu_id };
    
    //$.post('cgi/db_simple_select.php', data, function(result) {
    $.post('cgi/db_get_item_buttons.php', data, function(result) {
		if(result == 'null') {
			alert('No buttons yet');
			return;
		}
    
		var arr = eval(result);
		
		for(var x=0; x < arr.length; x++)
		{
			str  = '<div class="item_button">';
			str += '  <div class="innerItemButton">';
			str +=      arr[x].other.text;
			str += '</div>';
		
			//$('#ui_middle_area').append(str);
			
			$('#ui_menu_editor_middle').append(str);
			
			button = $('#ui_middle_area .item_button:last-child');
			inner = $('#ui_middle_area .innerItemButton:last-child');
			
			button.css(arr[x].outerCss);
			inner.css(arr[x].innerCss);
			
			button.resizable( { containment: 'parent' } );
			button.draggable( { containment: 'parent' } );
			button.itemButton();
		}
		
	});
});
/*******************************************************************************
    Build menu buttons into the left nav area from the database
*******************************************************************************/
var data = { query: 'SELECT * FROM menus ORDER BY menus.order' };

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
    }
    $('#pos_left_nav_bar_container').alternateScroll('remove');
    $('#pos_left_nav_bar_container').alternateScroll();
});

}); // document.ready()