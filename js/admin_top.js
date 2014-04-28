/**
 * Process Admin Top Navigation clicks
 */
$(document).ready(function() {
	$('#id_menu_option_config').click(function() {
		$('#ui_left_nav_bar').load('config_left_nav_bar.html');
	});

	$('#id_menu_option_menu').click(function()  {
		group_load('Menu Editor');
		//$('#ui_left_nav_bar').load('menu_editor_left_nav_bar.html');
		//$('#ui_middle_area').load('menu_editor_middle.html');
		//$('#ui_right_ticket_area').load('test.html');
	});

	$('#id_menu_option_home').click(function() {
		group_load('Pos Home');
		//$('#ui_left_nav_bar').load('pos_left_nav_bar.html');
		//$('#ui_top_nav_bar').load('pos_top_nav_bar.html');
		//$('#ui_bottom_nav_bar').load('pos_bottom_nav_bar.html');
	});
});