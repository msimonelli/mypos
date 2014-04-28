<?php
require_once 'db_connect.php';

$_POST['image'] = addslashes($_POST['image']);
DB::insert('menus', $_POST);
?>