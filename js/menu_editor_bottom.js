/**
 * JS for menu editor bottom
 */

/*******************************************************************************
    readURL(input)
    Functions to load and show the image preview
*******************************************************************************/
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#prev_menu_button>div>img').attr('src', e.target.result);
            //alert(e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// selector: file input on new menu dialog
$('#dlg_new_menu>div>div>div:nth-child(2)>label>input').change(function() {
	readURL(this);
});

/*
$('.menu_button').click(function() {
	var e = $('#prev_menu_button>div>img').attr('src');
	alert(e);
});
*/

/******************************************************************************/

$(document).ready(function() {
	
	$('#dlg_new_menu').dialog({ 
		autoOpen: false,
		modal: true,
		width: 650
	});
	
	$('#dlg_new_menu_font_color').simpleColor({
		boxWidth: '12px',
		boxHeight: '12px',
		displayCSS: {
			'margin-left': '4px',
			'margin-top' : '3px'
	    },
	    onSelect: function(color, e) {
	        $('#prev_menu_button span').css('color', '#'+color);
	    }
	});

	$('#new_menu_button').click(function() {
		$('#dlg_new_menu').dialog('open');
	});
	
	// Selectors: Display input element and <span> inside menu button preview
	$('#dlg_new_menu>div>div>div>label:nth-child(2)>input').keyup(function() {
		$('#prev_menu_button>div>span').html( $(this).val() );
	});
	
	$('.option').click(function() {
		var oldC = $('#prev_menu_button').attr('class').split(' ')[1];
		var newC = $(this).attr('class').split(' ')[1];
		$('#prev_menu_button').removeClass(oldC);
		$('#prev_menu_button').addClass(newC);
	});

/*******************************************************************************
    Execute PHP script to save to database
*******************************************************************************/
	
	//$('#save_menu_button').click(function() {
	$('#save_menu_button').off('click').on('click', function() {
		$('#dlg_new_menu').dialog('close');
		var title = $('#dlg_new_menu>div>div>div>label:first-child>input').val();
		var display = $('#prev_menu_button span').html();
		var image = $('#prev_menu_button img').attr('src');
		var bg = $('#prev_menu_button').attr('class').split(' ')[1].replace('menu_button-', '');
		var active = $('#dlg_new_menu input[type=checkbox]').is(':checked');
		var color = $('#prev_menu_button span').css('color');
		
		if(active) active = 1;
		else active = 0;
		
		var data = {
			title: title,
			display: display,
			background: bg,
			color: color,
			active: active,
			image: image 
        };

		var str = JSON.stringify(data);

		$.post('cgi/db_insert_menu_button.php', data, function(result) {
			$('#dlg_new_menu').dialog('close');
		});

	});
/*******************************************************************************
    Execute PHP script to delete a menu from the DB
*******************************************************************************/
	$('#delete_menu_button').click(function() {
		var id = $('.menu_button_selected').attr('id').replace('menu_button', '');
		//prompt('This will delete the menu and all menu buttons.  Are you sure?');
		$('#dlg_tonySay p').html('Are you sure you wish to delete this menu? This will also delete all buttons associated with it.');
		$('#dlg_tonySay').dialog({
			buttons: {
				Yes: function () {
					$.post('cgi/db_delete_menu.php', { id: id });
					// no need to reload, just remove the elements from the DOM
					//$('#ui_left_nav_bar').load('menu_editor_left.html');
					$('.menu_button_selected').remove();
					$('.item_button').remove();
					$('#dlg_tonySay').dialog('close');
					
				},
				No: function() {
					$('#dlg_tonySay').dialog('close');
				}
			}
		});
		$('#dlg_tonySay').dialog('open');

		//tonySays('Are you sure?')
		
	});
});