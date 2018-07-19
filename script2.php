<?php 
	$cmd="sudo python temp.py";
	exec($cmd,$out);
	echo $out[0];
?>