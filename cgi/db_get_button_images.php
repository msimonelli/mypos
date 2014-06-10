<?php
    //if ($dh = opendir("../images/item_buttons")) {
	if ($dh = opendir("../images/backgrounds")) {
        while (($file = readdir($dh)) !== false) {
        	if( ($file != ".") && ($file != "..") ) {
            	//$file = "images/item_buttons/" . $file;
        		$file = "images/backgrounds/" . $file;
            	echo "<img class='image_select' src='$file'></img>";
            	//echo "<br>";
        	}
        }
        closedir($dh);
    }
    // var str="<img id='" + id + "' class='image_select' src='" + arr[x].img + "' width=45 height=45>";
?>