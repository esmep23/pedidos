<?php
//header('Access-Control-Allow-Origin: *');
//header("Content-Type: application/json",true);

//include('../../db.php');
include('db.php');
include('utf8ize.php');

$db = new db();

	 $sql = 'SELECT * FROM bz_clientes WHERE vendedor = "'.trim($_REQUEST['vendedor']).'" order by id DESC';
	$result = $db->Select($sql);
//var_dump($result);

$lista = array();
$i=1;
	foreach($result as $row) {
		array_push($lista,array("id"=>$row['id'],"codigo"=>$row['codigo'],"nombre"=>$row['nombre'],"ciudad"=>$row['ciudad'],"cupo"=>$row['cupo'],"descuento"=>$row['descuento'],"saldo"=>$row['saldo'],"dias"=>$row['dias']));
		$i++;
	}
//var_dump($lista);
echo json_encode(utf8ize($lista));
		

?>