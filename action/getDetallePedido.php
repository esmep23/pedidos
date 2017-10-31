<?php



//header('Access-Control-Allow-Origin: *');

//header("Content-Type: application/json",true);



//include('../../db.php');

include('db.php');
include('utf8ize.php');


$db = new db();


$idPedido = $_REQUEST['id_pedido'];


/*$sql = 'SELECT detalle.id_producto FROM bz_pedido pedido INNER JOIN bz_detallepedido detalle ON detalle.id_pedido = pedido.id INNER JOIN bz_productos producto ON detalle.id_producto = producto.codigo' ;*/

$sql = 'SELECT detalle.id_pedido, detalle.id_producto, detalle.cantidad, detalle.precio, detalle.descuentoA, detalle.descuentoB, detalle.descuentoC, detalle.descuentoD, detalle.parcial  FROM bz_detallepedido detalle  INNER JOIN bz_pedido pedido ON detalle.id_pedido = pedido.id WHERE pedido.id = ' . $idPedido ;

$result = $db->Select($sql);

//var_dump($result);



$lista = array();

$i=1;

	foreach($result as $row) {

		$nombreProducto = 'SELECT nombre FROM  `bz_productos` where codigo = "'. $row['id_producto'] .'" ' ;
		$nameProducto = $db->SelectUnico($nombreProducto);

		array_push($lista,array("id_pedido"=>$row['id_pedido'],"id_producto"=>$row['id_producto'],"nombre"=>$nameProducto, "cantidad"=>$row['cantidad'], "precio"=>$row['precio'], "descuentoA"=>$row['descuentoA'], "descuentoB"=>$row['descuentoB'], "descuentoC"=>$row['descuentoC'], "descuentoD"=>$row['descuentoD'], "parcial"=>$row['parcial']));

		$i++;

	}



echo json_encode(utf8ize($lista));

	



?>