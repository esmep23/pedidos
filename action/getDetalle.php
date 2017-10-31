:'(<?php



//header('Access-Control-Allow-Origin: *');

//header("Content-Type: application/json",true);



//include('../../db.php');

include('db.php');
include('utf8ize.php');


$db = new db();





/*$sql = 'SELECT detalle.id_producto FROM bz_pedido pedido INNER JOIN bz_detallepedido detalle ON detalle.id_pedido = pedido.id INNER JOIN bz_productos producto ON detalle.id_producto = producto.codigo' ;*/

$sql = 'SELECT producto.codigo, producto.nombre, producto.stock, producto.precio, detalle.cantidad  FROM bz_detallepedido detalle  INNER JOIN bz_productos producto ON detalle.id_producto = producto.codigo' ;

$result = $db->Select($sql);

//var_dump($result);



$lista = array();

$i=1;

	foreach($result as $row) {

		array_push($lista,array("codigo"=>$row['codigo'],"nombre"=>$row['nombre'], "stock"=>$row['stock'], "precio"=>$row['precio'], "cantidad"=>$row['cantidad']));

		$i++;

	}



echo json_encode(utf8ize($lista));

	



?>