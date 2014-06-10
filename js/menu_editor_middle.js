/**
 * 
 */

$(document).ready(function() {
	/*******************************************************************************
	 * Delegate clicks down to item buttons
	 */
	
	$('#ui_menu_editor_middle').delegate('.item_button', 'click', function() {
		$this = $(this);
		$ib_prev = $('.ib_prev');

		$('.button_selected').removeClass('button_selected');
		$this.addClass('button_selected');
		$this.css('borderColor', $this.find('.ib_wrapper').css('backgroundColor'));
		if(!$this.hasClass('new_button'))
			$this.addClass('changed_button');
	});
}); // (document).ready()