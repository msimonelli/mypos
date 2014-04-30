<?php

require_once "db_connect.php";

DB::update('menus', array(
	'order' => $_POST['pos1']
), "menu_id=%d", $_POST['menu1']);

DB::update('menus', array(
	'order' => $_POST['pos2']
), "menu_id=%d", $_POST['menu2']);

?>