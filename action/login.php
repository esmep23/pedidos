<?php



//header('Access-Control-Allow-Origin: *');

//header("Content-Type: application/json",true);



//include('../../db.php');

include('db.php');
include('utf8ize.php');


$db = new db();



$total = 0;

$user = $_REQUEST['user'];

//$pass = md5($_REQUEST['pass']);

$pass = $_REQUEST['pass'];

//$tipo = $_REQUEST['tipo'];


	$sql = 'SELECT * FROM `bz_usuario` WHERE usuario = "'.$user.'" AND pass = "'.$pass.'"' ;

	$result = $db->Select($sql);

$lista = array();
$i=1;
	foreach($result as $row) {
		array_push($lista,array("id"=>$row['id'],"id_vendedor"=>$row['id_vendedor'],"name"=>$row['name'],"email"=>$row['email'],"pass"=>$row['pass'],"pic"=>$row['pic']));
		$i++;
	}
//var_dump($lista);
echo json_encode(utf8ize($lista));
		



?>