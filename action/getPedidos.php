<?php

//header('Access-Control-Allow-Origin: *');
//header("Content-Type: application/json",true);

//include('../../db.php');
include('db.php');
include('utf8ize.php');
$db = new db();

$idVendedor = $_REQUEST['id_vendedor'];
$sql = 'SELECT * FROM bz_pedido where id_vendedor = "'. $idVendedor .'" order by id DESC' ;
$result = $db->Select($sql);
//var_dump($result);


//name de Cliente


//Estado de Pedido.
//A - Enviado NO EDITA
//B - Guardado Edita
//C - Borrador Edita Guarda Mensaje Recordatorio que no se ha guardado
//D - Error de Ingreso - Verficar

$lista = array();
$i=1;
	foreach($result as $row) {

		$cliente = 'SELECT nombre FROM  `bz_clientes` where codigo = "'. $row['cod_cliente'] .'" ' ;
		$nameCliente = $db->SelectUnico($cliente);

		$sqlEstados = 'SELECT estado FROM bz_estados where id_pedido = "'. $row['id'] .'" ' ;
		$Estado = $db->SelectUnico($sqlEstados);

		array_push($lista,array("id"=>$row['id'],"id_vendedor"=>$row['id_vendedor'], "cod_cliente"=>$row['cod_cliente'], "nombre_cliente"=> $nameCliente, "secuencial"=>$row['secuencial'], "estado"=>$Estado, "plazo"=>$row['plazo'], "transporte"=>$row['transporte'], "tipoPedido"=>$row['tipoPedido'], "parcial"=>$row['parcial'], "descuento1"=>$row['descuento1'], "descuento2"=>$row['descuento2'], "subtotal"=>$row['subtotal'], "iva"=>$row['iva'], "total"=>$row['total'], "fecha"=>$row['fecha']));
		$i++;
	}

echo json_encode(utf8ize($lista));
		

?>