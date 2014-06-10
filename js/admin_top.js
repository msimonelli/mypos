/**
 * Process Admin Top Navigation clicks
 */
$(document).ready(function() {
	/*
	$('#id_menu_option_config').click(function() {
		$('#ui_left_nav_bar').load('config_left_nav_bar.html');
	});
	*/
	$('#id_menu_option_menu').click(function()  {
		group_load('Menu Editor');
	});

	$('#id_menu_option_home').click(function() {
		group_load('Pos Home');
	});
	
	$('#adm_top_config').click(function() {
		group_load('Config Editor');
		alert('loading config');
	});
});