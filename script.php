<?php 
	$pin=$_POST['pin'];
	$cmd="python on_off.py ";
	$cmd=$cmd.$pin;
	$out=system($cmd);
	
?>