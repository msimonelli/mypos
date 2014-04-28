/**
 * Homegrown shopping cart
 */

(function ( $ )
{
	var selected_item = 0;
	var lineItems = [];
	
	function lineItem(parent) {
		this.qty = 0;
		this.size = 'Small';
		this.table = 0;
		this.id = 'lineItem_' + lineItems.length;
		
		this.getHtml = function() {
			
			var str  = '<table id="'+this.id+'" class="posShopCart newItem">';
				str += '  <tr>';
				str += '    <td class="lineItemQty">' + this.qty + '</td>';
				str += '  </tr>';
				str += '  <tr>';
				str += '    <td class="lineItemSize">' + this.size + '</td>';
				str += '    <td class="lineItemSizePrice"> $0.00 </td>';
				str += '  </tr>';
				str += '  <tr>';
				str += '    <td>Original</td>';
				str += '    <td class="lineItemUDPrice"> $0.00 </td>';
				str += '  </tr>';
				str += '</table>';
			return str;
		}
		
		this.appendTo = function ( parent ) {
			parent.append( this.getHtml () );
			// I don't like the way we are getting this and setting the table object.
			var table = parent.children('.newItem');
			table.removeClass('newItem');
			this.table = table;
		}
		
		this.css = function (css, value)
		{
			this.table.css(css, value);
		}
		
		this.editQty = function ( data ) {
			this.qty = data;
			this.table.find('.lineItemQty').html(data);
		}
		
		this.editSize = function(size, upcharge) {
			this.size = size;
			this. sizeUpcharge = upcharge;
			this.table.find('.lineItemSize').html(size);
			this.table.find('.lineItemSizePrice').html(upcharge);
		}
		
		this.appendTo(parent);
	}
	
    $.fn.posShopCart = function( options, data, more_data )
    {
		switch(options) {
		case 'addItem' :
			//alert('add item');
			var item = new lineItem(this);
			lineItems.push(item);
			break;
		case 'editQty' :
			//lineItems[0].editQty(data);
			if(selected_item == 0) {
				tonySays('You must first select an item in the ticket before you can edit it.');
				return;
			}
			selected_item.editQty(data);
			break;
		case 'editSize' :
			if(selected_item == 0) {
				tonySays('You must first select an item in the ticket before you can edit it.');
				return
			}
			// Here we should probably just create a new line item if a size is edited with nothing selected
			selected_item.editSize(data, more_data)
			break;
		default:
			selected_item = 0;
			lineItems = [];
			$(this).delegate('.posShopCart', 'click', function() {
				for(var x=0; x<lineItems.length; x++) {
					if(lineItems[x].id == $(this).attr('id')) {
						selected_item = lineItems[x];
						$('.posShopCart').css('background-color', 'transparent');
						selected_item.css('background-color', 'yellow');
						break;
					}
				}
			});
    		break;
		} // switch
    }
    
}( jQuery ));