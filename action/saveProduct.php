<?php



//header('Access-Control-Allow-Origin: *');

//header("Content-Type: application/json",true);



//include('../../db.php');

include('db.php');



$db = new db();



$id_pedido = $_REQUEST['id_pedido'];

$id_producto = $_REQUEST['id_producto'];

$cantidad = $_REQUEST['cantidad'];

$precio = $_REQUEST['precio'];


$descuentoA = $_REQUEST['descuentoA'];
$descuentoB = $_REQUEST['descuentoB'];
$descuentoC = $_REQUEST['descuentoC'];
$descuentoD = $_REQUEST['descuentoD'];

$parcial = $_REQUEST['parcial'];

	

	$sql = 'INSERT INTO `bz_detallepedido`(`id`, `id_pedido`, `id_producto`, `cantidad`, `precio`, `descuentoA`, `descuentoB`, `descuentoC`, `descuentoD`, `parcial`) VALUES (null,"'.$id_pedido.'","'.$id_producto.'","'.$cantidad.'","'.$precio.'","'.$descuentoA.'","'.$descuentoB.'","'.$descuentoC.'","'.$descuentoD.'","'.$parcial.'")';

	$result = $db->INSERT($sql);

//var_dump($result);



echo $result;

		



?>