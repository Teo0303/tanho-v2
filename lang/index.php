<?php	
header('Content-Type: text/plain');
		$file = file_get_contents('./rus.json', true);
			echo $file;
?>