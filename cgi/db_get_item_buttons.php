<?php
include 'db_connect.php';
//$query = "SELECT * FROM item_buttons_tbl B LEFT JOIN button_images_tbl I on B.image_id = I.button_img_idx WHERE menu_id = %d";
$query = "SELECT * FROM item_buttons_tbl WHERE menu_id = %d";
$result = DB::query($query, $_POST['menu_id']);

$buttons = null;

foreach($result as &$value) {
	$outerCss = array(
		"width"  => $value["width"] . 'px',
		"height" => $value["height"] . 'px',
		"top"    => $value["top"] . 'px',
		"left"   => $value["left"] . 'px',
		//"backgroundImage"	=> "url('$img')",
		"backgroundImage"	=> $value["backgroundImage"],
		"backgroundColor"	=> $value["backgroundColor"],
		"borderStyle"		=> $value["borderStyle"],
		"borderWidth"		=> $value["borderWidth"] . 'px',
		"borderRadius"		=> $value["borderRadius"] . 'px',
		"borderColor"		=> $value["borderColor"],
	);
	$innerCss = array(
		"fontFamily" 		=> $value["fontFamily"],
		"fontSize"   		=> $value["fontSize"] . 'px',
		"fontWeight" 		=> $value["fontWeight"],
		"fontStyle"  		=> $value["fontStyle"],
		"textDecoration"	=> $value["textDecoration"],
		"textAlign"			=> $value["textAlign"],
		"verticalAlign"		=> $value["verticalAlign"],
		"color"				=> $value["color"],
		//"borderStyle"		=> $value["borderStyle"],
		//"borderWidth"		=> $value["borderWidth"] . 'px',
		//"borderRadius"		=> $value["borderRadius"] . 'px',
		//"borderColor"		=> $value["borderColor"],
		//"backgroundColor"	=> $value["backgroundColor"],
		//"backgroundImage"	=> "url('$img')",
	);
	$other = array(
		"item_button_id"	=> $value["item_button_id"],
		"item_id"			=> $value["item_id"],
		//"image_id"			=> $value["image_id"],
		"menu_id"			=> $value["menu_id"],
		"text"				=> $value["text"],
	);
	$arr = array(
		"outerCss"		=> $outerCss,
		"innerCss"		=> $innerCss,
		"other"			=> $other,
	);
	$buttons[] = $arr;
}

echo json_encode($buttons);
?>
