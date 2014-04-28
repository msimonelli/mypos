/**
 * JavaScript for global dialogs and other things
 */

$(document).ready(function() {
	
	// Tony Says Dialog
	$('#dlg_tonySay').dialog({
		autoOpen: false,
		draggable: true,
		height: '340',
		width: '400',
		modal: true,
		title: 'Tony Says:'
	});
	
	$('#ui_topleft>img').click(function() {
		tonySays('Click me for helpful hints!')
	})
});
