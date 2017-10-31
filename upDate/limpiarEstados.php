<?php

include('../action/db.php');

$db = new db();


	$pim="TRUNCATE `bz_estados`";
	$db->Select($pim);
	?>