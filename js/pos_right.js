/**
 * Experimental ticket creation, for now
 */
$(document).ready(function() {
	$('#ticket_area').posShopCart();
	$('#ticket_area').posShopCart('addItem');
	$('#ticket_area').posShopCart('addItem');
	
	$('#ticket_area').posShopCart('editSize', 'Large', '$7.99');
	//$('#ticket_area').posShopCart('editQty', 5);
});
