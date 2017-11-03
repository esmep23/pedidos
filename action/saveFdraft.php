<?php



//header('Access-Control-Allow-Origin: *');

//header("Content-Type: application/json",true);



//include('../../db.php');

include('db.php');



$db = new db();



$id_vendedor = $_REQUEST['id_vendedor'];

$cod_cliente = $_REQUEST['cod_cliente'];

$estado = $_REQUEST['estado'];

$plazo = $_REQUEST['plazo'];

$transporte = $_REQUEST['transporte'];

$tipoPedido = $_REQUEST['tipoPedido'];

$parcial = $_REQUEST['parcial'];

$descuento1 = $_REQUEST['descuento1'];

$descuento2 = $_REQUEST['descuento2'];

$subtotal = $_REQUEST['subtotal'];

$iva = $_REQUEST['iva'];

$observacion = $_REQUEST['observacion'];

$total = $_REQUEST['total'];

	

	$sql = 'INSERT INTO `bz_pedido`(`id`, `id_vendedor`, `cod_cliente`, `secuencial`, `estado`, `plazo`, `transporte`, `tipoPedido`, `parcial`, `descuento1`, `descuento2`, `subtotal`, `iva`, `observacion`, `total`) VALUES 

	(null,"'.$id_vendedor.'","'.$cod_cliente.'","00","'.$estado.'","'.$plazo.'","'.$transporte.'","'.$tipoPedido.'","'.$parcial.'","'.$descuento1.'","'.$descuento2 .'","'.$subtotal.'","'.$iva.'","'.$observacion.'","'.$total.'")';

	$result = $db->INSERT($sql);

//var_dump($result);



echo $result;

	$sqlEstado = 'INSERT INTO `bz_estados`(`id_pedido`, `estado`) VALUES ("'.$result.'","C")';
    $result_estado = $db->INSERT($sqlEstado);


?>