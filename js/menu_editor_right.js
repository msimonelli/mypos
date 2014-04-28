/**
 * 
 */

var new_button_count = 0;
var current_image_id = 0;

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
/*******************************************************************************
Process click on button image and set to background of preview
*******************************************************************************/
$('#div_image_select').on('click', '.image_select', function() {
    var image = $(this).attr('src');
    $('#div_prev').css('background-image', 'url("' + image + '")');
    $('#div_prev').css('background-size', '100% 100%');
    $('#div_prev').css('background-repeat', 'no-repeat');
    
    current_image_id = this.id.replace('btn_img_id_', '');
});

/*******************************************************************************
Process Insert - clone object, set some stuff up, and append to middle area
*******************************************************************************/
$('#insert_button').click(function() {
    if(current_menu_id == null)
    {
        //$('#dlg_no_menu').dialog('open');
    	tonySays('You must first select a menu from the left or create a new one before you can insert a button.');
        return;
    }

    var prev = $('#div_button_container');
    var button = [];
    
    prev.resizable('destroy')
    var button = prev.clone();

    //button.attr('id', 'id_new_button'+new_button_count);
    button.attr('id', 'id_button_container_'+next_button_id);
    button.children('div :first-child').attr('id', 'id_item_button_'+next_button_id);
    
    $('#id_item_button_'+next_button_id).addClass('item_btn_inner');   
    button.itemButton();
    button.itemButton('setImage', current_image_id);
    button.itemButton('setMenu', current_menu_id);
    button.itemButton('setItem', 0);
    
    button.addClass('new_button');
    button.addClass('item_button');
    button.addClass('edit');
    
    button.children('div :first-child').css('background-size', '100% 100%');
    button.appendTo($('#ui_menu_editor_middle'));
    button.css('top', '0px');
    button.css('left', '0px');
    button.css('position', 'absolute');

    button.draggable( {containment: 'parent' } );
    button.resizable();
    button.children('div :first-child').editable( {
        type: 'text',
        pk: 1,
        toggle: 'dblclick',
        title: 'Enter Text'
    });
    
    prev.resizable();
    
    button.css('z-index', '500');

    new_button_count++; // deprecated. May not be used anymore
    next_button_id++;
    
});

/*******************************************************************************
Save -
*******************************************************************************/
$('#save_button').click(function() {
    var buttons = [];
    // New Buttons
    $('.new_button').each(function(i, obj) {
        buttons[buttons.length] =  $(obj).itemButton('getJSON');
        $(obj).removeClass('new_button');
    });
    var json = JSON.stringify(buttons).replace(/px/g, '');
    json = json.replace(/'/g, '');
    
    if(buttons.length > 0) {
        $.ajax( {   type: 'POST',
                url: 'db_insert_item_buttons.php',
                data: {'buttons' : json }, //JSON.stringify(buttons).replace(/px/g,'') },
                dataType: 'json',
                async: false,
                success: function(res) {
                    alert(res);
                }
            }
        );
    }
    
    // Changed buttons
    buttons = [];
    $('.changed_button').each(function(i, obj) {
        //alert('change');
        buttons[buttons.length] = $(obj).itemButton('getJSON');
        buttons[buttons.length-1].item_index = $(obj).attr('id').replace('item_button_container_', '');
        $(obj).removeClass('changed_button');
    });
    json = JSON.stringify(buttons).replace(/px/g, '');
    json = json.replace(/'/g, '');
    if(buttons.length > 0) {
        $.ajax( {   type: 'POST',
                url: 'db_update_item_buttons.php',
                data: {'buttons' : json }, //JSON.stringify(buttons).replace(/px/g,'') },
                dataType: 'json',
                async: false,
                success: function(res) {
                    alert(res);
                }
            }
        );
    }
    
    // Deleted buttons
    buttons = [];
    $('.deleted_button').each(function(i, obj) {
        //alert('adding to array');
        buttons[buttons.length] = $(obj).attr('id').replace('item_button_container_', '');
    });
    json = JSON.stringify(buttons);
    if(buttons.length > 0) {
        //alert('posting');
        $.ajax( {   type: 'POST',
                url: 'db_delete_item_buttons.php',
                data: {'buttons' : json }, //JSON.stringify(buttons).replace(/px/g,'') },
                dataType: 'json',
                async: false,
                success: function(res) {
                    alert(res);
                }
            }
        );
    }
});

/******************************************************************************/

$('input[name="halign_group"]:radio').change(function() {
    var radio = $('input[name="halign_group"]:checked');
    $('#div_prev').css('text-align', radio.val());
});

$('input[name="valign_group"]:radio').change(function() {
    var radio = $('input[name="valign_group"]:checked');
    $('#div_prev').css('vertical-align', radio.val());
});

$('input[name="border_group"]:radio').change(function() {
    var radio = $('input[name="border_group"]:checked');
    $('#div_prev').css('border-style', radio.val());
});

$('.font').click(function() {
    var font=$(this).html();
    $('#div_prev').css('font-family', font);
});

/** Initialize all toolbar checkboxes **/
$('#italic').toggleSwitch({target: '#div_prev', css: 'font-style', css_on_val: 'italic', css_off_val: 'normal'});
$('#bold').toggleSwitch({target: '#div_prev', css: 'font-weight', css_on_val: 'bold', css_off_val: 'normal'});
$('#underline').toggleSwitch({target: '#div_prev', css: 'text-decoration', css_on_val: 'underline', css_off_val: 'none'});

/** Initialize all toolbar spinners **/
$('#font_size').spinner({target: '#div_prev', css: 'font-size', unit: 'pt'} );
$('#border_size').spinner({target: '#div_prev', css: 'borderWidth', unit: 'px'});
$('#border_radius').spinner({target: '#div_prev', css: 'border-radius', unit: 'px'});

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

color.target='#div_prev';
color.css='color';
$('#font_color').simpleColor(color);

color.target='#div_prev';
color.css='border-color';
$('#border_color input').simpleColor(color);

color.target='#div_prev';
color.css='background-color';
$('#bg_color input').simpleColor(color);
/******************************************************************************/


$('#new_button_text').keyup(function() {
    $('#div_prev').html($(this).val());
});

$('#border_width').val( $('#div_prev').css('width'));


$('#save_button').posButton( { text: 'Save' } );
$('#insert_button').posButton( { text: 'Insert' } );


$('#dlg_no_menu').dialog( { autoOpen: false,
                            modal: true,
                            title: 'No Menu Selected!'
                        } );
                        
$('#div_button_container').resizable();

$('#btn_noImage').click(function() {
    $('#div_prev').css('background-image', '');
    current_image_id = 0;
});

$('#bgTransparent').click(function() {
    $('#div_prev').css('background-color', 'transparent');
});

}); // End Document Ready()