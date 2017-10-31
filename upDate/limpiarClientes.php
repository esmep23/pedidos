<?php

include('../action/db.php');

$db = new db();


	$pim="TRUNCATE `bz_clientes`";
	$db->Select($pim);

	?>