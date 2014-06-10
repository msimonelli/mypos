<?php
require_once 'db_connect.php';
$result = DB::query("SELECT * FROM fonts");

foreach($result as &$value) {	
	$css .= $value['url'];
	$fonts[] = $value['font_name'];
}

$arr = array(
	"css" => $css,
	"fonts" => $fonts
);

echo json_encode($arr);
?>
