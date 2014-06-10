/**
 *  Mostly all the tool bar and controls to create new buttons and modify
 *  existing ones
 */

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
// Neatly did it all in the PHP script.
$.post('cgi/db_get_button_images.php', function(result) {
	$('#div_image_select').append(result);
});

/*******************************************************************************
Set preview button as selected when clicked on
/******************************************************************************/
$('.ib_prev').click(function() {
	$('.button_selected').removeClass('button_selected');
	$(this).addClass('button_selected');
});

/*******************************************************************************
Process click on button image and set to background of preview
*******************************************************************************/
$('#div_image_select').on('click', '.image_select', function() {
    var $this = $(this);
	var image = $this.attr('src');
    $('.button_selected .ib_wrapper').css('background-image', 'url("' + image + '")');
    $('.selected_image').removeClass('selected_image');
    $this.addClass('selected_image');
});
/*******************************************************************************
Process Paste - clone object, set some stuff up, and append to middle area
*******************************************************************************/
$('#insert_button').click(function() {
	try {
		current_menu_id = parseInt($('.menu_button_selected').attr('id').replace('menu_button', ''));
	}
	catch(err) {
		tonySays('You must first select a menu from the left or create a new one before you can insert a button.');
		return;
	}
	
    var $prev = $('.ib_prev');
    
    $prev.resizable('destroy');

    $button = $prev.clone();
    $button.removeClass('ib_prev').
    	addClass('new_button').
    	addClass('item_button').
    	appendTo( $('#ui_menu_editor_middle')).
    	css('top', '0px').
    	css('left', '0px').
    	css('position', 'absolute').
    	draggable({ containment: 'parent' }).
    	resizable({ containment: 'parent' });
    $button.itemButton('setMenu', current_menu_id)
    
    $prev.resizable();

});
/*******************************************************************************
Process Copy - Copy selected button to preview area
*******************************************************************************/
$('#copy_button').click(function() {
	var $ib_prev = $('.ib_prev');
	var $ib = $('.button_selected');
	
	if($ib_prev == $ib)
		return;
	
	var json = $ib.itemButton('getJSON');
	$ib_prev.css('width', json.outerCss.width);
	$ib_prev.css('height', json.outerCss.height);
	
	delete json.outerCss.top;
	delete json.outerCss.left;
	delete json.outerCss.width;
	delete json.outerCss.height;
	
	$ib_prev.find('.ib_wrapper').css(json.outerCss);
	$ib_prev.find('.ib_table').css(json.innerCss);
	$ib_prev.find('span').css(json.innerCss);
});

/*******************************************************************************
Delete - delete ITEM BUTTONS from database
*******************************************************************************/
$('#delete_button').click(function() {
	var $button = $('.button_selected');
	if($button.hasClass('ib_prev'))
		return;
	$button.addClass('button_deleted');
});

/******************************************************************************/
// Horizontal Align
$('input[name="halign_group"]:radio').change(function() {
    var radio = $('input[name="halign_group"]:checked');
    $('.button_selected').itemButton('css', 'textAlign', radio.val());
});
// Vertical Align
$('input[name="valign_group"]:radio').change(function() {
    var radio = $('input[name="valign_group"]:checked');
    $('.button_selected').itemButton('css', 'verticalAlign', radio.val());
});
// Border Style
$('input[name="border_group"]:radio').change(function() {
    var radio = $('input[name="border_group"]:checked');
    $('.button_selected').itemButton('css', 'borderStyle', radio.val());
});
// Font
$('.font').click(function() {
    var font=$(this).html();
    $('.button_selected').itemButton('css', 'fontFamily', font);
});

/** TODO: ALTHOUGH FASTER THIS WAY, THESE CHECK BOXES AND SPINNERS SHOULD BE
 *  REDONE TO USE itemButton METHODS TO CHANGE THE VALUES.
 */
// Initialize all tool bar check boxes
$('#italic').toggleSwitch({target: '.button_selected span', css: 'font-style', css_on_val: 'italic', css_off_val: 'normal'});
$('#bold').toggleSwitch({target: '.button_selected span', css: 'font-weight', css_on_val: 'bold', css_off_val: 'normal'});
$('#underline').toggleSwitch({target: '.button_selected span', css: 'text-decoration', css_on_val: 'underline', css_off_val: 'none'});

// Initialize all tool bar spinners
$('#font_size').spinner({target: '.button_selected span', css: 'font-size', unit: 'pt'} );
$('#border_size').spinner({target: '.button_selected .ib_wrapper', css: 'borderWidth', unit: 'px'});
$('#border_radius').spinner({target: '.button_selected .ib_wrapper', css: 'border-radius', unit: 'px'});

// Initialize all tool bar color pickers
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

color.target='.button_selected span';

color.css='color';
$('#font_color').simpleColor(color);

color.target='.button_selected .ib_wrapper';
color.css='border-color';
$('#border_color input').simpleColor(color);

color.css='background-color';
$('#bg_color input').simpleColor(color);
/******************************************************************************/

$('#new_button_text').keyup(function() {
    $('.button_selected').itemButton('setText', $(this).val());
});

$('#insert_button').posButton({ text: 'Paste' });
$('#copy_button').posButton({ text: 'Copy' });
$('#delete_button').posButton({ text: 'Delete' });

$('#dlg_no_menu').dialog({
	autoOpen: false,
    modal: true,
    title: 'No Menu Selected!'
});

$ib_prev = $('.ib_prev');
$ib_prev.itemButton();
$ib_prev.resizable();

$('#btn_noImage').click(function() {
    $('.button_selected').itemButton('css', 'backgroundImage', '');
});

$('#bgTransparent').click(function() {
    $('.button_selected').itemButton('css', 'backgroundColor', 'transparent');
});

}); // End Document Ready()