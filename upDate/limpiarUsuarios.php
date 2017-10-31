<?php

include('../action/db.php');

$db = new db();


	$pim="TRUNCATE `bz_usuario`";
	$db->Select($pim);

	?>