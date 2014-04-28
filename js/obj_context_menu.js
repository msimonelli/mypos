/**
 * Context menu when right clicking on a button in the menu editor
 */

var obj_context_menu = {
    'Font' : {
        name: 'Font',
        icon: 'page_font',
        items: {
            'FontFamily': {
                name: 'Family',
                icon: 'font',
                items: {
                    // build from DB in future
                    'Times_New_Roman' : {
                        name: 'Times New Roman'
                    },
                    'Verdana' : {
                        name: 'Verdana'
                    }
                }
            },
            'FontSize' : {
                name: 'Font Size',
                icon: 'font_size',
                type: 'html',
                html: '<span style="margin-right:8px">Size</span><input id="menu_font_size" class="menu_spinner" type="text"/>'
            },
            'Seperator5' : '-----',
            'Left': {
                name: 'Left',
                type: 'radio',
                radio: 'halign',
                events : {
                    click : function(e) {
                        current_button_inner.css('text-align', 'left');
                    }
                }
            },
            'Right': {
                name: 'Right',
                type: 'radio',
                radio: 'halign',
                events : {
                    click : function(e) {
                        current_button_inner.css('text-align', 'right');
                    }
                }
            },
            'Center': {
                name: 'Center',
                type: 'radio',
                radio: 'halign',
                events : {
                    click : function(e) {
                        current_button_inner.css('text-align', 'center');
                    }
                }
            },
            Separator: '-----',
            'Top' : {
                name: 'Top',
                type: 'radio',
                radio: 'valign',
                events : {
                    click : function(e) {
                        current_button_inner.css('vertical-align', 'top');
                    }
                }
            },
            'Middle' : {
                name: 'Middle',
                type: 'radio',
                radio: 'valign',
                events : {
                    click : function(e) {
                        current_button_inner.css('vertical-align', 'middle');
                    }
                }
            },
            'Bottom' : {
                name: 'Bottom',
                type: 'radio',
                radio: 'valign',
                events : {
                    click : function(e) {
                        current_button_inner.css('vertical-align', 'bottom');
                    }
                }
            },
            'Seperator4' : '-----',
            'Bold' : {
                name: 'Bold',
                type: 'checkbox'
            },
            'Italic' : {
                name: 'Italic',
                type: 'checkbox'
            },
            'Underline' : {
                name: 'Underline',
                type: 'checkbox',
            },
            'Color' : {
                name: 'Color',
                type: 'html',
                icon: 'color',
                html: '<input id="font_color_picker" class="menu_color_picker" type="text">'
            }
        } //Font
    },
    
    'Border' : {
        name: 'Border',
        icon: 'border_outer',
        items: {
            'None': {
                name: 'None',
                type: 'radio',
                radio: 'borderstyle',
                events : {
                    click : function(e) {
                        current_button_inner.css('border-style', 'none');
                    }
                }
            },
            'Solid': {
                name: 'Solid',
                type: 'radio',
                radio: 'borderstyle',
                events : {
                    click : function(e) {
                        current_button_inner.css('border-style', 'solid');
                    }
                }
            },
            'Dashed': {
                name: 'Dashed',
                type: 'radio',
                radio: 'borderstyle',
                events : {
                    click : function(e) {
                        current_button_inner.css('border-style', 'dashed');
                    }
                }
            },
            'Dotted': {
                name: 'Dotted',
                type: 'radio',
                radio: 'borderstyle',
                events : {
                    click : function(e) {
                        current_button_inner.css('border-style', 'dotted');
                    }
                }
            },
            'Groove': {
                name: 'Groove',
                type: 'radio',
                radio: 'borderstyle',
                events : {
                    click : function(e) {
                        current_button_inner.css('border-style', 'groove');
                    }
                }
            },
            'Double': {
                name: 'Double',
                type: 'radio',
                radio: 'borderstyle',
                events : {
                    click : function(e) {
                        current_button_inner.css('border-style', 'double');
                    }
                }
            },
            'Ridge' : {
                name: 'Ridge',
                type: 'radio',
                radio: 'borderstyle',
                events : {
                    click : function(e) {
                        current_button_inner.css('border-style', 'ridge');
                    }
                }
            },
            'Inset' : {
                name: 'Inset',
                type: 'radio',
                radio: 'borderstyle',
                events : {
                    click : function(e) {
                        current_button_inner.css('border-style', 'inset');
                    }
                }
            },
            'Outset' : {
                name: 'Outset',
                type: 'radio',
                radio: 'borderstyle',
                events : {
                    click : function(e) {
                        current_button_inner.css('border-style', 'outset');
                    }
                }
            },
            'Seperator' : '-----',
            'BorderWidth' : {
                name: 'Border Size',
                icon: 'border_size',
                type: 'html',
                html: '<span style="margin-right: 8px">Size</span><input id="menu_border_size" class="menu_spinner" type="text"/>'
            },
            'Seperator1' : '-----',
            'BorderRadius' : {
                name: 'Corner Radius',
                icon: 'border_radius',
                type: 'html',
                html: '<span style="margin-right: 8px">Radius</span><input id="radius_size" class="menu_spinner" type="text"/>'
            },
            'Seperator2' : '-----',
            'Bordercolor' : {
                name: 'Border Color',
                icon: 'color',
                type: 'html',
                html: '<input id="menu_border_color" name="border_color" class="menu_color_picker" type="text"/>'
            }
        } // Borderstyle

    },
    'Background' : {
        name: 'Background',
        icon: 'paintcan_red',
        items: {
            'Image' : {
                name: 'Image',
                items : {
                    'None' : { 
                        name: 'None'
                    }
                }
            },
            'Seperator3' : '-----',
            'Transparent' : {
                name: 'Transparent'
            },
            'BackgroundColor' : {
                name: 'Color',
                icon: 'color',
                type: 'html',
                html: '<input id="background_color_picker" class="menu_color_picker" type="text">'
            }
        }
    },
    'Seperator5' : '-----',
    'Delete' : {
        name: 'Delete',
        icon: 'delete',
        callback: function(key, opt) {
            if( !($(opt.$trigger).hasClass('new_button') ) )
            {
                //alert('adding class');
                $(opt.$trigger).addClass('deleted_button');
            }
            $(opt.$trigger).removeClass('new_button');
            $(opt.$trigger).removeClass('changed_button');

            $(opt.$trigger).css('display', 'none');
        }
    }
};