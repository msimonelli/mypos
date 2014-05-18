<?php
require_once "db_connect.php";
$x=0;
//echo "start";
foreach(json_decode($_POST['buttons'], true) as &$id) {
	DB::delete('item_buttons_tbl', 'item_button_id=%d', $id);
	//echo "ID: $id";
	$x++;
}
echo "Deleted Buttons: $x";
?>