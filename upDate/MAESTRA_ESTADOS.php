<?php
set_time_limit(300);
include('../action/db.php');
$db = new db();


$fila = 1;
if (($gestor = fopen("Estados.csv", "r")) !== FALSE) {
    while (($datos = fgetcsv($gestor, 1000, "\t")) !== FALSE) {
        $numero = count($datos);
       	echo "<p> procesado... $fila: <br /></p>\n";
        $fila++;
        
        if($datos[0] != ''){

        for ($c=0; $c < $numero; $c++) {
      
			$binn =  explode(",", $datos[$c]);
				echo $A = utf8_decode(trim($binn[0]));
				echo $B = utf8_decode(trim($binn[1]));
				echo $C = trim($binn[2]);
					
				
				$sqlRegistro="INSERT INTO `bz_estados`(
					`id`,
					`id_pedido`,
					`estado`,
					`fecha`) VALUES (
					null,
					'$A',
					'$B',
					'$C'
					);";

			$db->Insert($sqlRegistro);
				
        }

        }
    }
    fclose($gestor);
}
?>