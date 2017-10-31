<?php 
$sistema = 2;
include('contenido/header.php'); ?>

<table id="listoPedidos" class="table table-hover">
  <thead>
  <tr class="info">
    <td><h4># de Pedido</h4></td>
    <td><h4>Cliente</h4></td>
    <td><h4>Fecha</h4></td>
    <td><h4>Total</h4></td>
    <td><h4>Estado</h4></td>
    <td></td>
  </tr>
  </thead>
  <tbody>
              
  </tbody>
</table>

<!-- Modal -->
<div class="modal fade bs-example-modal-lg" id="ModalEditPedido" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog  modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h5 class="modal-title" id="myModalLabel"> ... </h5>
      </div>
      <div class="modal-body">
        <h3 class="cliente"></h3>
        <div class="plazo"></div>
        <div class="transporte"></div>
        <div class="tipoPedido"></div>

        <hr/>

        <table id="listEdita" class="table table-hover">
          <thead>
          <tr class="info">

            <td>Codigo</td>
            <td>Nombre</td>
            <td>Cantidad</td>
            <td>Precio</td>
            <td>Descuentos</td>
            <td>Parcial</td>
            
          </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <div class="observacion"></div>
        <div class="parcial"></div>
        <div class="descuento1"></div>
        <div class="descuento2"></div>
        <div class="iva"></div>
        <div class="total"></div>
      </div>
    </div>
  </div>
</div>

     
<?php include('contenido/footer.php'); ?>