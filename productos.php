<?php 
$sistema = 5;
include('contenido/header.php'); ?>
<h3>Listado de Productos</h3>
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
    </tr>
  </thead>
  <tbody class="productos">
  </tbody>
</table>

<?php include('contenido/footer.php'); ?>