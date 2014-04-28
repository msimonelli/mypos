/**
 * Javascript to process clicks from the top_pos navigation menu
 */

$(document).ready(function() {

	$('#id_menu_option_admin').click(function() {
		group_load('Admin Home');
	});

	$('#id_menu_option_login').click(function() {
		$('#dlg_login').dialog('open');
	});
});