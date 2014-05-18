<?php

require_once 'db_connect.php';
$x=0;
foreach(json_decode($_POST['buttons'], true) as &$button) {
	$item_index = $button['other']['item_button_id'];
	$other['menu_id'] = $button['other']['menu_id'];
	$other['text'] = $button['other']['text'];
	
    //$arr = array_merge($button['innerCss'], $button['outerCss'], $button['other']);
	$arr = array_merge($button['innerCss'], $button['outerCss'], $other);
    //DB::update('item_buttons_tbl', $arr, "item_button_id=%d", $button['item_index']);
    DB::update('item_buttons_tbl', $arr, "item_button_id=%d", $item_index);
    $x++;
}
echo "Changed Buttons: $x <br>";
?>
