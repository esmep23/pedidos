	<?php

include('../action/db.php');

$db = new db();


	$pim="TRUNCATE `bz_productos`";
	$db->Select($pim);

	?>