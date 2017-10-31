<?php
set_time_limit(300);
include('../action/db.php');
$db = new db();

$fila = 1;
if (($gestor = fopen("Usuarios.csv", "r")) !== FALSE) {
    while (($datos = fgetcsv($gestor, 1000, "\t")) !== FALSE) {
        $numero = count($datos);
       	echo "<p> procesado... $fila: <br /></p>\n";
        $fila++;
        for ($c=0; $c < $numero; $c++) {

      
			$binn =  explode(",", $datos[$c]);
				//echo utf8_decode($binn[0]);
				//echo utf8_decode($binn[1]);
				//echo utf8_decode($binn[2]);
				//echo utf8_decode($binn[3]);
				//echo utf8_decode($binn[4]);
				//echo utf8_decode($binn[5]);
				//echo utf8_decode($binn[6]);
				//echo utf8_decode($binn[7]);
					
				
				$sqlRegistro="INSERT INTO `bz_usuario`(
					`id`,
					`id_vendedor`,
					`usuario`,
					`name`,
					`email`,
					`pass`,
					`pic`) VALUES (
					null,
					'$binn[0]',
					'$binn[2]',
					'$binn[1]',
					'ff@ll.com',
					'$binn[3]',
					'image.png'
					);";

				$db->Insert($sqlRegistro);
				
        }
    }
    fclose($gestor);
}
?>