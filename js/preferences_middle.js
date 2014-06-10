$('document').ready(function() {
	
	/* Get fonts and build select */
	var $fontFamily = $('#fontFamily');
	for(var x=0; x<fonts.length; x++) {
		$fontFamily.append('<option>' + fonts[x] + '</option>');
	}
	
	/* Get texture images, append to div */
	$.post('cgi/db_get_bg_textures.php', function(result) {
		$('#textures').append(result);
	});
	
	/* Font size change */
	$('#fnt_sz').spinner({
		spin: function( event, ui ) {
			$('#fnt_prev').css('fontSize', ui.value + 'pt' );
			//$('div.menu_button>div>span').css('fontSize', ui.value + 'pt');
			var $bg = $('input[name=fnt]:checked').val();
			$($bg).css('fontSize', ui.value + 'pt' );
		}
	});
	$('#fnt_sz').keyup(function() {
		$('#fnt_prev').css('fontSize', $(this).val() + 'pt' );
		$('div.menu_button>div>span').css('fontSize', ui.value + 'pt');
	});
	
	/* Color pick event for background color */
	$('#bgcolor').colorPicker( {
		onColorChange : function(id, newValue) {
			var $bg = $('input[name=bg]:checked').val();
			$($bg).css({
				backgroundColor: newValue,
				backgroundImage: ''
			});
		}
	});
	
	/* Font color picker */
	$('#fnt_color').colorPicker( {
		onColorChange : function(id, newValue) {
			var $bg = $('input[name=fnt]:checked').val();
			$($bg).css({
				color: newValue
			});
			$('#fnt_prev').css('color', newValue);
		}
	});
	
	/* Font change event */
	$('#fontFamily').change(function() {
		$('#fnt_prev').css('fontFamily', $(this).val() );
		$('div.menu_button>div>span').css('fontFamily', $(this).val() );
	});
	 
	/* Delegate clicks down to texture images */
	$('#ui_middle_area').delegate('.bg_select', 'click', function() {
		var $this = $(this);
		var src = $this.attr('src');
		var $bg = $('input[type=radio]:checked').val();
		$($bg).css('background-image', 'url("' + src + '"');
	});
});
