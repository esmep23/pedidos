<?php
//header('Access-Control-Allow-Origin: *');
//header("Content-Type: application/json",true);

//include('../../db.php');
include('db.php');

$db = new db();

	/*$sqlPedido = 'DELETE FROM pedido, detalle USING bz_pedido AS pedido INNER JOIN bz_detallepedido AS detalle WHERE pedido.id = detalle.id_pedido AND pedido.id LIKE "'. $_REQUEST['id_pedido'].'"';
	echo $db->Update($sqlPedido);*/

	$sqlPedido = 'DELETE FROM pedido, detalle USING bz_pedido AS pedido INNER JOIN bz_detallepedido AS detalle
	WHERE pedido.id=detalle.id_pedido AND pedido.id LIKE "'. $_REQUEST['id_pedido'].'"';
	echo $db->Update($sqlPedido);

	


?>

