<?php
/* pass menu_id of menu button to delete from db */
require_once 'db_connect.php';
DB::delete('menus', 'menu_id=%d', $_POST['id']);
?>