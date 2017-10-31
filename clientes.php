<?php 
$sistema = 4;
include('contenido/header.php'); ?>
<h3>Listado de Clientes</h3>
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
  <tbody class="clientes">
  </tbody>
</table>

<?php include('contenido/footer.php'); ?>