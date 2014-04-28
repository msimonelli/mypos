/**
 * 
 */

$(document).ready(function() {
	
	$('#pos_quantity').click(function() {
		var qty = prompt('How many?');
		$('#ticket_area').posShopCart('editQty', qty);
	});
		
});
