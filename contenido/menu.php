        <nav>
          <ul class="nav nav-justified">
            <?php if($sistema == 1){ ?>

                <li class="active"><a href="perfil.php">Inicio</a></li>

            <?php }else{ ?>

                <li><a href="perfil.php">Inicio</a></li>

            <?php } ?>

          <?php if($sistema == 3){ ?>

              <li class="active"><a href="registrarpedido.php">Registrar Pedido</a></li>

          <?php }else{ ?>

              <li><a href="registrarpedido.php">Registrar Pedido</a></li>

          <?php } ?>

          <?php if($sistema == 2){ ?>

              <li class="active"><a href="gestionarpedido.php">Gestionar Pedidos</a></li>

          <?php }else{ ?>

              <li><a href="gestionarpedido.php">Gestionar Pedidos</a></li>

          <?php } ?>

          <?php if($sistema == 4){ ?>

              <li class="active"><a href="clientes.php">Listado de Clientes</a></li>

          <?php }else{ ?>

              <li><a href="clientes.php">Listado de Clientes</a></li>

          <?php } ?>

          <?php if($sistema == 5){ ?>

              <li class="active"><a href="productos.php">Listado de Productos</a></li>

          <?php }else{ ?>

              <li><a href="productos.php">Listado de Productos</a></li>

          <?php } ?>
            
          </ul>
        </nav>