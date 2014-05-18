/**
 * 
 */

//var new_button_count = 0;
//var current_image_id = 0;

$(document).ready(function() {

/*******************************************************************************
This handles spin events for all spinners with the 'spinner' class.  Adds
extra 'options' for target, property and unit (ex: pt, px )
*******************************************************************************/
$('.spinner').on('spin', function(event, ui) 
{
    var spin = $(this);
    var target=spin.spinner('option', 'target');
    var css=spin.spinner('option', 'css');
    var unit=spin.spinner('option', 'unit');
    $(target).css(css, ui.value+unit);
});

/*******************************************************************************
Get button Images, append to selection div
*******************************************************************************/
/*
var data = { query: 'SELECT * FROM button_images_tbl' };
$.post('cgi/db_simple_select.php', data, function(result) {
    var arr = eval(result);
    var div = $('#div_image_select');
    for(var x=0; x<arr.length; x++)
    {
        var id = 'btn_img_id_' + arr[x].button_img_idx;
        var str="<img id='" + id + "' class='image_select' src='" + arr[x].img + "' width=45 height=45>";
        div.append(str);
    }
});
*/
// Neatly did it all in the PHP script.
$.post('cgi/db_get_button_images.php', function(result) {
	$('#div_image_select').append(result);
});


/*******************************************************************************
Experemental
/******************************************************************************/

$('.item_button').click(function() {
	//alert('test');
	$('.button_selected').removeClass('button_selected');
	$(this).addClass('button_selected');
});

/*******************************************************************************
Process click on button image and set to background of preview
*******************************************************************************/
$('#div_image_select').on('click', '.image_select', function() {
    var image = $(this).attr('src');
    
    $('.button_selected').css('background-image', 'url("' + image + '")');
    
    // Do we need this still?
    $('.button_selected').css('background-repeat', 'no-repeat');

    $('.selected_image').removeClass('selected_image');
    $(this).addClass('selected_image');
});
/*******************************************************************************
Process Insert - clone object, set some stuff up, and append to middle area
*******************************************************************************/

$('#insert_button').click(function() {
	try {
		current_menu_id = parseInt($('.menu_button_selected').attr('id').replace('menu_button', ''));
	}
	catch(err) {
		tonySays('You must first select a menu from the left or create a new one before you can insert a button.');
		return;
	}
	
    var prev = $('.prev_button');
    
    prev.resizable('destroy')
    button = prev.clone();
    button.removeClass('prev_button');
    prev.resizable();
    
    button.itemButton();
    button.itemButton('setMenu', current_menu_id);
    
    button.addClass('new_button');
    button.addClass('item_button');
    
    button.appendTo($('#ui_menu_editor_middle'));
    button.css('top', '0px');
    button.css('left', '0px');
    button.css('position', 'absolute');
    //button.first().css('backgroundRepeat', 'noRepeat');
    
    button.draggable( {containment: 'parent' } );
    button.resizable( {containment: 'parent' } );
        
    button.css('z-index', '500');
});

/*******************************************************************************
Delete - delete ITEM BUTTONS from database
*******************************************************************************/
$('#delete_button').click(function() {
	$('.button_selected').addClass('button_deleted');
	$('.button_selected').css('display', 'none');
});

/*******************************************************************************
Save -
*******************************************************************************/
$('#save_button').click(function() {
    var buttons = [];
    output = '';
    
    // New Buttons
    $('.new_button').each(function(i, obj) {
        buttons[buttons.length] =  $(obj).itemButton('getJSON');
        $(obj).removeClass('new_button');
    });
    
    var json = JSON.stringify(buttons).replace(/px/g, '');
    json = json.replace(/'/g, '');
    
    if(buttons.length > 0) {
    	$.ajax({
    		type: 'POST',
    		url: 'cgi/db_insert_item_buttons.php',
    		data: { 'buttons' : json },
    		datatype: 'json',
    		async: false,
    		success: function(data, textStatus, jqXHR) {
    			output = data;
    		}
    	});
    }
    
   // Changed buttons
    buttons = [];
    $('.changed_button').each(function(i, obj) {
        buttons[buttons.length] = $(obj).itemButton('getJSON');
        $(obj).removeClass('changed_button');
    });
    json = JSON.stringify(buttons).replace(/px/g, '');
    json = json.replace(/'/g, '');
    
    if(buttons.length > 0) {
    	$.ajax({
    		type: 'POST',
    		url: 'cgi/db_update_item_buttons.php',
    		data: { 'buttons' : json },
    		datatype: 'json',
    		async: false,
    		success: function(data, textStatus, jqXHR) {
    			output += data;
    		}
    	});
    }
    // Deleted buttons
    // BUG: CHANGE THIS LIKE THE NEW AND CHANGED BUTTONS
    buttons = [];
    $('.deleted_button').each(function(i, obj) {
        //alert('adding to array');
        buttons[buttons.length] = $(obj).attr('id').replace('item_button_container_', '');
    });
    json = JSON.stringify(buttons);
    if(buttons.length > 0) {
        //alert('posting');
        $.ajax({   
        	type: 'POST',
            url: 'db_delete_item_buttons.php',
            data: {'buttons' : json }, //JSON.stringify(buttons).replace(/px/g,'') },
            dataType: 'json',
            async: false,
            success: function(res) {
            	alert(res);
            }
        });
    }
    tonySays('Menu Saved<br><br>' + output);
});

/******************************************************************************/

$('input[name="halign_group"]:radio').change(function() {
    var radio = $('input[name="halign_group"]:checked');
    $('.button_selected .innerItemButton').css('text-align', radio.val());
});

$('input[name="valign_group"]:radio').change(function() {
    var radio = $('input[name="valign_group"]:checked');
    $('.button_selected .innerItemButton').css('vertical-align', radio.val());
});

$('input[name="border_group"]:radio').change(function() {
    var radio = $('input[name="border_group"]:checked');
    $('.button_selected').css('border-style', radio.val());
});

$('.font').click(function() {
    var font=$(this).html();
    $('.button_selected .innerItemButton').css('font-family', font);
});

/** Initialize all toolbar checkboxes **/
$('#italic').toggleSwitch({target: '.button_selected .innerItemButton', css: 'font-style', css_on_val: 'italic', css_off_val: 'normal'});
$('#bold').toggleSwitch({target: '.button_selected .innerItemButton', css: 'font-weight', css_on_val: 'bold', css_off_val: 'normal'});
$('#underline').toggleSwitch({target: '.button_selected .innerItemButton', css: 'text-decoration', css_on_val: 'underline', css_off_val: 'none'});

/** Initialize all toolbar spinners **/
$('#font_size').spinner({target: '.button_selected .innerItemButton', css: 'font-size', unit: 'pt'} );
$('#border_size').spinner({target: '.button_selected', css: 'borderWidth', unit: 'px'});
$('#border_radius').spinner({target: '.button_selected', css: 'border-radius', unit: 'px'});

/*******************************************************************************
Initialize all toolbar color pickers
*/
var color = {
    boxWidth: '14px',
    boxHeight: '14px',
    cellWidth: 16,
    cellHeight: 16,
    displayCSS: {
        'margin-left': '7px',
    },
    onSelect: function(color, e) {
        var c = $(this);
        var target = c[0].target;
        var css = c[0].css;
        $(target).css(css, '#'+color);
    }
};

color.target='.button_selected .innerItemButton';
//color.target='.button_selected div:first-child';

color.css='color';
$('#font_color').simpleColor(color);

color.target='.button_selected';
color.css='border-color';
$('#border_color input').simpleColor(color);

//color.target='#div_prev';
color.css='background-color';
$('#bg_color input').simpleColor(color);
/******************************************************************************/


$('#new_button_text').keyup(function() {
    $('.button_selected .innerItemButton').text($(this).val());
});

// What's this for?
$('#border_width').val( $('.button_selected .innerItemButton').css('width'));


$('#save_button').posButton({ text: 'Save' });
$('#insert_button').posButton({ text: 'Paste' });
$('#copy_button').posButton({ text: 'Copy' });
$('#delete_button').posButton({ text: 'Delete' });

$('#dlg_no_menu').dialog({
	autoOpen: false,
    modal: true,
    title: 'No Menu Selected!'
});
                        
$('.prev_button').resizable();

$('#btn_noImage').click(function() {
    $('.button_selected').css('background-image', '');
    //current_image_id = 0;
});

$('#bgTransparent').click(function() {
    $('.button_selected').css('background-color', 'transparent');
});

}); // End Document Ready()