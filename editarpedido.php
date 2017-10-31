<?php 
$sistema = 3;
include('contenido/header.php'); 

include('action/db.php');

$db = new db();

$idPedido = $_REQUEST['pedido'];
$sql = 'SELECT * FROM bz_pedido where id = "'. $idPedido .'" order by id DESC' ;
$result = $db->Select($sql);


foreach($result as $row) {

  $cliente = 'SELECT * FROM  `bz_clientes` where codigo = "'. $row['cod_cliente'] .'" ' ;
  $datosCliente = $db->Select($cliente);

?>
<div class="row">
  <div class="col-lg-10">
      <h3>Registro de Pedidos</h3>
      <h4>Datos de Cliente</h4>
  </div>
  <div class="col-lg-2">
      <div class="referencia"><strong>Ref. No.</strong> #000<?php echo $row['id'] ?></div>
  </div>
</div>

<hr/>

<div class="observaciones"></div>
      
      <?php
      foreach($datosCliente as $cliente) {
      ?>
        <div class="row perfilCliente">
          <!--<div class="col-lg-1 col-sm-1 col-xs-1">
            <button id="consulta_cliente" type="button" class="btn btn-default" data-toggle="modal" data-target="#consultarCliente" aria-label="Left Align"><span class="glyphicon glyphicon-search"></span></button>
          </div>-->
          <div class="col-lg-3 col-sm-11 col-xs-11">
            <input type="text" class="form-control" id="inputCodigo" placeholder="#CODIGO" value="<?php echo $cliente['codigo'] ?>" disabled>
          </div>
          <div class="col-lg-7 col-sm-6 col-xs-6">
            <input type="text" class="form-control" id="inputCliente" placeholder="Cliente" value="<?php echo $cliente['nombre'] ?>" disabled>
          </div>
          <div class="col-lg-2 col-sm-6 col-xs-6">
            <input type="text" class="form-control" id="inputCiudad" placeholder="#CIUDAD" value="<?php echo $cliente['ciudad'] ?>">
          </div>
        </div>
      <?php } ?>

        <div class="row perfilCliente">
          <div class="col-lg-2 col-sm-4 col-xs-4">
            <select id="inputPlazo" class="input-large form-control">
              <?php if( $row['plazo'] == '1' ){ ?> 
                <option value="1" selected="selected">30 dias</option>
              <?php } ?>
              <?php if( $row['plazo'] == '2' ){ ?> 
                <option value="2" selected="selected">60 dias</option>
              <?php } ?>
              <?php if( $row['plazo'] == '3' ){ ?> 
                <option value="3" selected="selected">90 dias</option>
              <?php } ?>
            </select>
          </div>
          <div class="col-lg-2 col-sm-4 col-xs-4">
              <input type="text" class="form-control" id="inputTransporte" value="<?php echo $row['transporte'] ?>" placeholder="Transporte">
          </div>
          <div class="col-lg-2 col-sm-4 col-xs-4" >
            <select id="inputPedido" class="input-large form-control">
              <?php if( $row['tipoPedido'] == '1' ){ ?> 
                <option value="1" selected="selected">N/Venta</option>
              <?php }  ?>
              <?php if( $row['tipoPedido'] == '2' ){ ?> 
                <option value="2" selected="selected">Factura</option>
              <?php }  ?>
            </select>
          </div>
          <div class="col-lg-2 col-sm-4 col-xs-4">
            <div class="input-group">
              <div class="input-group-addon">Cupo: $</div>
              <input type="text" class="form-control" id="inputCupo" value="<?php echo $row['cupo'] ?>" placeholder="0" disabled>
            </div>
          </div>
          <div class="col-lg-2 col-sm-4 col-xs-4">
            <div class="input-group">
              <div class="input-group-addon">Saldo: $</div>
              <input type="text" class="form-control" id="inputSaldo" value="<?php echo $row['saldo'] ?>" placeholder="0" disabled>
            </div>
          </div>
          <div class="col-lg-2 col-sm-4 col-xs-4">
            <div class="input-group">
              <div class="input-group-addon">Dias: </div>
              <input type="text" class="form-control" id="inputdias" value="<?php echo $row['dias'] ?>" placeholder="0" disabled>
            </div>
          </div>

        </div>
        
        <!-- -->
        <hr/>
        <!-- -->
        <div class="row mensaje"></div>


        <div id="compras" class="form-group">
          <table class="table table-hover table-bordered">
            <thead>
              <tr class="info">
                <td class="col-lg-1 text-left"><h4>Codigo</h4></td>
                <td class="col-lg-8 text-left"><h4>Descripcion del Producto</h4></td>
                <td class="col-lg-1 text-right"><h4>Cant.</h4></td>
                <td class="col-lg-1 text-right"><h4>Precio</h4></td>
                <td class="col-lg-1 text-right"><h4>-%</h4></td>
                <td class="col-lg-1 text-right"><h4>Parcial</h4></td>
              </tr>
            </thead>
            <tbody>
            <?php
            $sql = 'SELECT detalle.id, detalle.id_pedido, detalle.id_producto, detalle.cantidad, detalle.precio, detalle.descuento, detalle.parcial  FROM bz_detallepedido detalle  INNER JOIN bz_pedido pedido ON detalle.id_pedido = pedido.id WHERE pedido.id = ' . $idPedido ;
            $datos = $db->Select($sql);


            foreach($datos as $detalle) { 
               $product = 'SELECT nombre FROM  `bz_productos` where codigo = "'. $detalle['id_producto'] .'" ' ;
               $nameProduct = $db->SelectUnico($product);
                ?>
              <tr id="product-'<?php echo $detalle['id'] ?>">
                <td class="codigo"><?php echo $detalle['id_producto'] ?></td>
                <td class="nombre"><?php echo $nameProduct ?></td>
                <td class="text-right"><input type="text" class="stock form-control text-right" value="<?php echo $detalle['cantidad'] ?>"></td>
                <td class="precio text-right"><input type="text" class="precio form-control text-right"  value="<?php echo $detalle['precio'] ?>"></td>
                <td class="text-right"><input type="text" class="descuento form-control text-right" value="<?php echo $detalle['descuento'] ?>"></td>
                <td class="subtotal text-right"><?php echo $detalle['parcial'] ?></td>
              </tr>                 
            <?php
              }
            ?>
            </tbody>
          </table>
                  
        </div>


        <center><button id="consulta_producto" type="button" class="btn btn-info" aria-label="Left Align">AGREGAR PRODUCTOS</button></center>

        <hr/>

        <div class="row">
          <div class="col-lg-9">
            <textarea class="form-control observacion" rows="3" placeholder="observacion"></textarea>
          </div>
          <div class="col-lg-3">
            <div class="row">
              <div class="col-lg-12">
                <div class="input-group">
                  <div class="input-group-addon">Parcial: $</div>
                  <input type="text" class="parcialpedido form-control text-right" value="<?php echo $row['parcial'] ?>" disabled>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="input-group">
                  <div class="input-group-addon">% Sugerido</div>
                  <input type="text" class="descuento_sugerido form-control text-right" value="0">
                </div>
              </div>
              <div class="col-lg-12">
                <div class="input-group">
                  <div class="input-group-addon">%</div>
                  <input type="text" class="descuento1 form-control text-right" value="<?php echo $row['descuento1'] ?>">
                </div>
              </div>
               <div class="col-lg-12">
                <div class="input-group">
                  <div class="input-group-addon">%</div>
                  <input type="text" class="descuento2 form-control text-right" value="<?php echo $row['descuento2'] ?>">
                </div>
              </div>
              <div class="col-lg-12">
                <div class="input-group">
                  <div class="input-group-addon">Subtotal</div>
                  <input type="text" class="master-subtotal form-control text-right" value="<?php echo $row['subtotal'] ?>" disabled>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="input-group">
                  <div class="input-group-addon">IVA 14%</div>
                  <input type="text" class="ivaPorcentaje form-control text-right" value="<?php echo $row['iva'] ?>" disabled>
                </div>
              </div>
            </div>
            <div class="row">
              <label for="inputParcial" class="col-lg-6 control-label"><h4><strong>TOTAL</strong></h4></label>
              <label for="inputParcial" class="totalapagar col-lg-6 control-label"><h4><strong><?php echo $row['total'] ?></strong></h4></label>
            </div>
          </div>
        </div>

        <!--<div class="row">
          <div class="col-lg-2">
            <div type="submit" class="btn btn-primary" onclick="actualizar()">Actualizar Pedido</div>
          </div>
        </div>-->
<?php        
  }
?>


  <!-- Modal -->
  <div class="modal fade" id="" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content modal-lg">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Buscar Cliente</h4>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <span class="input-group-addon">Buscar</span>
            <input id="filtrar" type="text" class="form-control search" placeholder="Ingresa el nombre del cliente...">
          </div>
          
          <hr/>
          <table class="table table-hover table-bordered results">
           <thead>
            <tr>
             <th>Cod. Usuario</th>
             <th>Nombre</th>
            </tr>
           </thead>
           <tbody class="buscarcliente">
             <!-- aqui va buscar -->
           </tbody>
          </table>
        </div>
        
      </div>
    </div>
  </div>


    <div class="modal fade" id="consultaProducto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content modal-lg">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Buscar Producto</h4>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <span class="input-group-addon">Buscar</span>
            <input id="filtrar" type="text" class="form-control search2" placeholder="Ingresa el nombre del cliente...">
          </div>
          
          <hr/>
          <table class="table table-hover results2">
           <thead>
            <tr>
             <th>Cod. Producto</th>
             <th>Nombre</th>
             <th>stock</th>
             <th>precioA</th>
             <th>precioB</th>
             <th>precioC</th>
            </tr>
           </thead>
           <tbody class="buscarproducto">
             
           </tbody>
          </table>
        </div>
        
      </div>
    </div>
  </div>

<?php include('contenido/footer.php'); ?>
<script type="text/javascript">
    $( document ).ready(function() {
      /*$( "#consulta_cliente" ).click(function() {
        $('#consultaCliente').modal('show');
      });*/
    

     /*(function ($) {*/

        $('#filtrar').keyup(function () {

          var rex = new RegExp($(this).val(), 'i');
          $('.buscar tr').hide();
          $('.buscar tr').filter(function () {
              return rex.test($(this).text());
          }).show();

        })

        $( "#consulta_cliente" ).click(function() {
          $('#consultaCliente').modal('show');
        });

        $( "#consulta_producto" ).click(function() {
          $('#consultaProducto').modal('show');
        });







      /*}(jQuery));*/
      });
  </script>