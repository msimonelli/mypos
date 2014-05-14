<?php

require_once 'db_connect.php';
    
foreach(json_decode($_POST['buttons'], true) as &$button) {
    $arr = array_merge($button['innerCSS'], $button['CSS'], $button['other']);
    DB::update('item_buttons_tbl', $arr, "item_button_id=%d", $button['item_index']);
}

?>
