<?php
    //if ($dh = opendir("../images/item_buttons")) {
	if ($dh = opendir("../images/backgrounds/seamless")) {
        while (($file = readdir($dh)) !== false) {
        	if( ($file != ".") && ($file != "..") ) {
            	//$file = "images/item_buttons/" . $file;
        		$file = "images/backgrounds/seamless/" . $file;
            	echo "<img class='bg_select' src='$file'></img>";
            	//echo "<br>";
        	}
        }
        closedir($dh);
    }
?>