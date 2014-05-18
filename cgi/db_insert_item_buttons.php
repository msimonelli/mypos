<?php

require_once 'db_connect.php';
$x = 0;
foreach(json_decode($_POST['buttons'], true) as &$button) {
    $arr = array_merge($button['innerCss'], $button['outerCss'], $button['other']);
    DB::insert('item_buttons_tbl', $arr);
    $x++;
}

echo "New Buttons: $x <br>";
?>
