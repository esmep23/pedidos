<?php
set_time_limit(300);
include('../action/db.php');
$db = new db();

$fila = 1;
if (($gestor = fopen("Clientes.csv", "r")) !== FALSE) {
    while (($datos = fgetcsv($gestor, 1000, "\t")) !== FALSE) {
        $numero = count($datos);
       	echo "<p> procesado... $fila: <br /></p>\n";
        $fila++;
        for ($c=0; $c < $numero; $c++) {
      
			$binn =  explode(",", $datos[$c]);
				echo utf8_decode($binn[0]);
				echo utf8_decode($binn[1]);
				echo utf8_decode($binn[2]);
				echo utf8_decode($binn[3]);
				echo utf8_decode($binn[4]);
				echo utf8_decode($binn[5]);
				echo utf8_decode($binn[6]);
				echo utf8_decode($binn[7]);
					
				
				$sqlRegistro="INSERT INTO `bz_clientes`(
					`id`,
					`vendedor`,
					`codigo`,
					`nombre`,
					`ciudad`,
					`cupo`,
					`descuento`,
					`saldo`,
					`dias`) VALUES (
					null,
					'$binn[0]',
					'$binn[1]',
					'$binn[2]',
					'$binn[3]',
					'$binn[4]',
					'$binn[5]',
					'$binn[6]',
					'$binn[7]'
					);";

				$db->Insert($sqlRegistro);
				
        }
    }
    fclose($gestor);
}
?>