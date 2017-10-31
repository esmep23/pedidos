<?php
include('../../../config.php');
$table2 = 'bz_detallepedido';
$pr=1;
$link = mysql_connect($host, $user, $pass) or die("Can not connect." . mysql_error());
mysql_select_db($db) or die("Can not connect.");
 
$result = mysql_query("SHOW COLUMNS FROM ".$table2."");
if (mysql_num_rows($result) > 0) {
 while ($row = mysql_fetch_assoc($result)) {
  $csv_output .= $row['Field'].", ";
  $i++;
 }
}
$csv_output .= "\n";
 
$values = mysql_query("SELECT * FROM ".$table2."");
while ($rowr = mysql_fetch_row($values)) {
 echo "ORDER " .$pr . ".   ..   ...   ....  .....     ";
 for ($j=0;$j<$i;$j++) {
 	echo $rowr[$j]. "\n";
   $csv_output .= $rowr[$j].", ";
 }
 $csv_output .= "\n";
 echo " <br/>";
 $pr++;
}
/*
$filename = "detalle-pedidos_".$file."_".date("Y-m-d_H-i",time());
header("Content-type: application/vnd.ms-excel");
header("Content-disposition: csv" . date("Y-m-d") . ".csv");
header("Content-disposition: filename=".$filename.".csv");
print $csv_output;
*/
//echo $csv_output;
$csv_handler = fopen ('detalle-pedido.csv','w');
fwrite ($csv_handler,$csv_output);
fclose ($csv_handler);
exit;

?>