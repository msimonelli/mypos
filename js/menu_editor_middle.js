/**
 * 
 */

var current_button = 0;
var current_button_inner = 0;

// clear contexts if it exists.  Seems to only be needed
// to prevent duplicate color pickers from forming after
// every load to this page.
$.contextMenu('destroy');

$(document).ready(function() {

	$.contextMenu({
		selector: '.item_button',
		items: obj_context_menu,
		trigger: 'right',
		zIndex: '500',
		callback: function(key, opt) {
			alert('Unhandled Context Event: ' + key);
		}

	});
	
	$('#menu_font_size').on('spin', function(event, ui) {
		current_button_inner.css('font-size', ui.value+'px');
	});

	$('#menu_border_size').on('spin', function(event, ui) {
		current_button_inner.css('border-width', ui.value+'px');
	});

	$('#radius_size').on('spin', function(event, ui) {
		current_button_inner.css('border-radius', ui.value+'px');
	});

	/*
	$('#ui_menu_editor_middle').delegate('.item_button', 'mousedown', function() {
		if(!$(this).hasClass('new_button')) {
			$(this).addClass('changed_button');
		}
		current_button = $(this);
		current_button_inner = current_button.children('div :first-child');

		// Set context menu defaults
		$('#menu_font_size').val( current_button_inner.css('font-size').replace('px', '') );
		$('#menu_border_size').val( current_button_inner.css('borderTopWidth').replace('px', '') );
		$('#radius_size').val( current_button_inner.css('borderTopRightRadius').replace('px', '') );
		$('#menu_border_color').setColor( current_button_inner.css('borderTopColor'));
		$('#background_color_picker').setColor( current_button_inner.css('background-color'));
	});
	*/
	
	/*******************************************************************************
	 * Delegate clicks down to item buttons
	 */
	
	$('#ui_menu_editor_middle').delegate('.item_button', 'click', function() {
		button = $(this);
		$('.button_selected').removeClass('button_selected');
		button.addClass('button_selected');
		alert('removed and added class')
	});
	
	
	
	
	$('#menu_border_color').simpleColor( {
		onSelect: function(color, e) {
			current_button_inner.css('border-color', '#'+color);
		},
		boxHeight: '14px',
		cellWidth: 16,
		cellHeight: 16
	});

	$('#font_color_picker').simpleColor( {
		onSelect: function(color, e) {
			current_button_inner.css('color', '#'+color);
		},
		boxHeight: '14px',
		cellWidth: 16,
		cellHeight: 16
	});

	$('#background_color_picker').simpleColor( {
		onSelect: function(color, e) {
			current_button_inner.css('background-color', '#'+color);
		},
		boxHeight: '14px',
		cellWidth: 16,
		cellHeight: 16
	});

	$('.menu_spinner').spinner();
}); // (document).ready()