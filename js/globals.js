/**
 * Global variables used by the POS needed by some or all modules
 */

// Array containing definitions of loadable groups.  
var pos_groups = {
    'Pos Home' : {
        'top' : 'pos_top.html',
        'bottom' : 'pos_bottom.html',
        'left' : 'pos_left.html',
        'right' : 'pos_right.html',
        'bottomLeft' : 'pos_bottomLeft.html'
    },
    'Admin Home' : {
        'top' : 'admin_top.html',
        'bottom' : 'admin_bottom.html',
        'left' : 'admin_left.html',
        'right' : 'admin_right.html',
        'middle' : 'admin_middle.html'
    },
	'Menu Editor' : {
        'top' : 'admin_top.html',
        'bottom' : 'menu_editor_bottom.html',
        'left' : 'menu_editor_left.html',
        'right' : 'menu_editor_right.html',
        'middle' : 'menu_editor_middle.html',
        'bottomLeft' : 'menu_editor_bottomLeft.html'
    }
};

// Function to load groups of files at once as defined in pos_groups
// array.  Example: group_load('Menu Editor') will load all required
// layout modules to create and edit menus.
function group_load(group)
{
    $('#ui_top_nav_bar').load(pos_groups[group].top);
    $('#ui_left_nav_bar').load(pos_groups[group].left);
    $('#ui_bottom_nav_bar').load(pos_groups[group].bottom);
    $('#ui_right_ticket_area').load(pos_groups[group].right);
    $('#ui_middle_area').load(pos_groups[group].middle);
    //alert(pos_groups[group].bottomLeft);
    $('#ui_bottomleft').load(pos_groups[group].bottomLeft);
    //$('#ui_bottomLeft').html('test');
}

function tonySays(msg)
{
	$('#dlg_tonySay>div>div>p').html(msg);
	$('#dlg_tonySay').dialog('open');
	//$('#dlg_tonySay').css('z-index', 20000)
	//alert('function');
}
