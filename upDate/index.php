<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sistema - UPDATE</title>

    <!-- Bootstrap -->
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  </head>
  <body>
    <div class="container">
      <center>
      <p><img src="../img/logo.png" /></p>


      
      <section >
      <h3>Actualizar BD en servidor web</h3>


      <div id="loading"></div>

        <br/>
          <br/>

      <!--<button id="boton1" type="button" class="btn btn-default" aria-label="Left Align" onclick="actualizoProveedores()">
        <span class="glyphicon glyphicon-import" aria-hidden="true"></span>ACTUALIZAR BD PROVEEDORES
      </button>

      <br/>  <br/>

      <button id="boton2" type="button" class="btn btn-default" aria-label="Left Align" onclick="actualizoClientes()">
        <span class="glyphicon glyphicon-import" aria-hidden="true"></span>ACTUALIZAR BD CLIENTE
      </button>

      <br/>  <br/>-->


       <button id="boton4" type="button" class="btn btn-default" aria-label="Left Align" onclick="limpioClientes()">
        <span class="glyphicon glyphicon-import" aria-hidden="true"></span>LIMPIAR BD CLientes
      </button>

      <button id="boton3" type="button" class="btn btn-default" aria-label="Left Align" onclick="actualizoClientes()">
        <span class="glyphicon glyphicon-import" aria-hidden="true"></span>ACTUALIZAR BD Clientes
      </button>

      <br/><br/>


      <button id="boton4" type="button" class="btn btn-default" aria-label="Left Align" onclick="limpioUsuario()">
        <span class="glyphicon glyphicon-import" aria-hidden="true"></span>LIMPIAR BD Usuarios
      </button>

      <button id="boton3" type="button" class="btn btn-default" aria-label="Left Align" onclick="actualizoUsuario()">
        <span class="glyphicon glyphicon-import" aria-hidden="true"></span>ACTUALIZAR BD Usuarios
      </button>

      <br/><br/>


      <button id="boton4" type="button" class="btn btn-default" aria-label="Left Align" onclick="limpioProductos()">
        <span class="glyphicon glyphicon-import" aria-hidden="true"></span>LIMPIAR BD Productos
      </button>

      <button id="boton3" type="button" class="btn btn-default" aria-label="Left Align" onclick="actualizoProductos()">
        <span class="glyphicon glyphicon-import" aria-hidden="true"></span>ACTUALIZAR BD Productos
      </button>

      <br/><br/>

      <button id="boton4" type="button" class="btn btn-default" aria-label="Left Align" onclick="limpioListados()">
        <span class="glyphicon glyphicon-import" aria-hidden="true"></span>LIMPIAR BD Estados
      </button>

      <button id="boton3" type="button" class="btn btn-default" aria-label="Left Align" onclick="actualizoListados()">
        <span class="glyphicon glyphicon-import" aria-hidden="true"></span>ACTUALIZAR BD Estados
      </button>
      

      <h1> -- DESCARGO BD Pedidos--</h1>


      <a href="http://bazarchina.com.ec/sistemaPedidos/upDate/cabecerapedidos.php">Actualizar Cabecera</a>

      <a href="http://bazarchina.com.ec/sistemaPedidos/upDate/detallepedidos.php">Actualizar Detalle</a>
      
        

    
       
      </section>
      </center>
    </div> <!-- /container -->
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script type="text/javascript">
    //usuario
      function limpioUsuario(){
         if (confirm('Esta seguro de vaciar la BD Usuarios ')) {
            // Save it!
            $.ajax({
              url: 'limpiarUsuarios.php',
              type: "POST",
              cache: false,
              success: function(response){  
                    alert('BD Vacia'); 
              },
              error : function(error){     
                console.log(error);
              }
            });
          } else {
              // Do nothing!
          }
      }
      function actualizoUsuario(){
        $.ajax({
              url: 'MAESTRA_USUARIOS.php',
              type: "POST",
              cache: false,
              success: function(response){  
                    alert('Actualizado Exitosamente'); 
              },
              error : function(error){     
                console.log(error);
              }
            });

      }
    //clientes
      function limpioClientes(){
         if (confirm('Esta seguro de vaciar la BD Clientes ')) {
            // Save it!
            $.ajax({
              url: 'limpiarClientes.php',
              type: "POST",
              cache: false,
              success: function(response){  
                   alert('BD Vacia'); 
              },
              error : function(error){     
                console.log(error);
              }
            });
          } else {
              // Do nothing!
          }
      }
      function actualizoClientes(){
        $.ajax({
              url: 'MAESTRA_CLIENTES.php',
              type: "POST",
              cache: false,
              success: function(response){  
                    alert('Actualizado Exitosamente'); 
              },
              error : function(error){     
                console.log(error);
              }
            });
      }
    //productos
      function limpioProductos(){
         if (confirm('Esta seguro de vaciar la BD Productos ')) {
            // Save it!
            $.ajax({
              url: 'limpiarProductos.php',
              type: "POST",
              cache: false,
              success: function(response){  
                    alert('BD Vacia'); 
              },
              error : function(error){     
                console.log(error);
              }
            });
          } else {
              // Do nothing!
          }
      }
      function actualizoProductos(){
         $.ajax({
              url: 'MAESTRA_PRODUCTOS.php',
              type: "POST",
              cache: false,
              success: function(response){  
                    alert('Actualizado Exitosamente'); 
              },
              error : function(error){     
                console.log(error);
              }
            });
      }
      function limpioListados(){
        if (confirm('Esta seguro de vaciar la BD Estados ')) {
            // Save it!
            $.ajax({
              url: 'limpiarEstados.php',
              type: "POST",
              cache: false,
              success: function(response){  
                    alert('BD Vacia'); 
              },
              error : function(error){     
                console.log(error);
              }
            });
          } else {
              // Do nothing!
          }
      }
      function actualizoListados(){
          $.ajax({
              url: 'MAESTRA_ESTADOS.php',
              type: "POST",
              cache: false,
              success: function(response){  
                    alert('Actualizado Exitosamente'); 
              },
              error : function(error){     
                console.log(error);
              }
            });
      }
    </script>
  </body>
</html>