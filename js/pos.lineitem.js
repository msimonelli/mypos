
(function ( $ )
{
    $.fn.posLineItem = function( options )
    {
        options = $.extend({
            size: 'images/Item Buttons/round_button_green2.png'
        }, options );
        
        msg = 'This is a driver alert message.  Go to the back door.  Accept Cash Only';
        
        str  = '<div class="posLineItemContainer">'
        str += '<table class="posLineItem">';
        str += '<input type="text" value="hello" hidden />';
        
        str += '<tr>';
        str += '  <td> 1 </td>';
        str += '  <td class="posLineItemDesc"> LARGE </td>';
        str += '  <td> </td>';
        str += '  <td align="right"> $9.99 </td>';
        str += '</tr>';
        
        str += '<tr>';
        str += '  <td> </td>';
        str += '  <td class="posLineItemStyle">Deep Dish</td>';
        str += '  <td> </td>';
        str += '  <td align="right"> $2.00 </td>';
        str += '  <td> </td>';
        str += '</tr>';
        
        str += '<tbody id="tbody_test">';
        str += '<tr>';
        str += '  <td> </td>';
        str += '  <td> Peperoni </td>';
        str += '  <td align="right"> 1x </td>';
        str += '  <td align="right"> $0.00 </td>';
        str += '</tr>';

        str += '<tr>';
        str += '  <td> </td>';
        str += '  <td> Mushrooms </td>';
        str += '  <td align="right"> 1x </td>';
        str += '  <td align="right"> $1.49 </td>';
        str += '</tr>';
        str += '</tbody>';
        
        str += '<tr>';
        str += '  <td> </td>';
        str += '  <td class="posLineItemCoupon"> Large 2 Topping $12.99 </td>';
        str += '  <td align="right"> </td>';
        str += '  <td align="right"> $-4.00 </td>';
        str += '</tr>';

        str += '</table>';
        
        str += '<span class="posLineItemMsg">' + msg + '</span>';
        str += '<hr />';
        str += '</div>';
        
        //$(this).css('background-color', 'white');
        $(this).css('border-radius', '25px');
        $(this).append(str);

    };

}( jQuery ));

