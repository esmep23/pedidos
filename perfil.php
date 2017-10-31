<?php 
$sistema = 1;

include('contenido/header.php'); ?>

      <!-- Jumbotron -->
      <div class="jumbotron">
        <h1></h1>
        <p class="lead">Vendedor</p>
        <p><a class="btn btn-lg btn-success" href="registrarpedido.php" role="button">Nuevo Pedido</a></p>
      </div>

  <script type="text/javascript">

    $( document ).ready(function() {
      $('.jumbotron h1').html(localStorage.getItem('namePerfil'));
    });
    
  </script>

<?php include('contenido/footer.php'); ?>