<?php
require_once 'db_connect.php';
$result = DB::query($_POST['query']);
echo json_encode($result);
?>
