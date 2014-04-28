<?php
function posDebug($message, $level)
{
	setLocale(LC_ALL, NULL);

	$str = strftime("[%Y-%m-%d] [%H:%M:%S]");
	$file = fopen('debug.log', 'a');

	$class = ' "log_level_' . $level . '"';
	fwrite($file, '<tr><td>' . $str . '</td><td class="dbg_msg">' . $message . '</td><td class=' . $class . '>' . $level . '</td></tr>');
	fclose($file);
}

?>