
var iTemxPedido = 1;
var misProductos = new Array();
var listCompras = new Array();

function plazosTiempos(){
	OPprecio = $("#inputPlazo").val();
}

function cargoDatosUsuario(argumento){
  $('#consultaCliente').modal('hide');
  var parametros = {
    "codigo" : argumento
  };
  $.ajax({
      url: direccion+'getconsultaCliente.php',
      type: "POST",
      cache: false,
      dataType: "json",
      data:  parametros,
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 

                id = value.id;
                codigo = value.codigo;
                nombre = value.nombre;
                ciudad = value.ciudad;
                cupo = value.cupo;
                descuento = value.descuento;
                saldo = value.saldo;
                dias = value.dias;

	            $('.perfilCliente #inputCodigo').val(codigo);
	            $('.perfilCliente #inputCliente').val(nombre);
	            $('.perfilCliente #inputCiudad').val(ciudad);
	            $('.perfilCliente #inputCupo').val(cupo);
	            $('.descuento_sugerido').val(descuento);
	            $('.perfilCliente #inputSaldo').val(saldo);
	            $('.perfilCliente #inputDias').val(dias);

	            if(dias > 75){
	            	if (confirm('Este cliente tiene mas de 75 dias vencido. No se pueden registrar pedidos para este usuario. ')) {
					    // Save it!
					    document.location.href = 'perfil.php';
					  } else {
					    // Do nothing!
					    document.location.href = 'perfil.php';
					  }
	            	
	            }
            
            });
        }              
      },
      complete : function(data){
        
        console.log(data);
        
      },
      error : function(error){     
        console.log(error);
      }
    });   

}

function cargoProducto(argumento){

  if(iTemxPedido >= 23){
    alert('Maximo solo 22 items por pedido');
  }else{

    console.log(iTemxPedido);

    var idP;
    //alert(argumento);
    $('#consultaProducto').modal('hide');
    var stock;
    var parametros = {
        "codigo" : argumento
      };  
    $.ajax({
        url: direccion+'getconsultaProducto.php',
        type: "POST",
        cache: false,
        dataType: "json",
        data:  parametros,
        success: function(response){  
          console.log(response);
          if(response!=null && response!='' && response!='[]'){ 
            $.each(response,function(key,value){ 

                  id = value.id;
                  codigo = value.codigo;
                  nombre = value.nombre;
                  stock = value.stock;
                  precioA = value.precioA;
                  precioB = value.precioB;
                  precioC = value.precioC;

                  idP = value.id;

                  codigo = $.trim( codigo );
                  var existe = misProductos.indexOf(codigo);
                  if( existe == '0' ){
                    alert('Ya ingresaste este articulo en tus pedidos');
                  }else{

                      misProductos.push(codigo);
                      console.log(misProductos);

                      if(OPprecio == 0){
                        alert('Seleccione un Plazo');
                      }

                      if(OPprecio == 1){
                      $('#compras table tbody').append('<tr id="product-'+id+'"><td class="codigo">(#'+iTemxPedido+')<br/><div class="cod">'+codigo+'</div></td> <td class="nombre">'+nombre+'</td> <td class="text-right"><input type="text" class="stock form-control text-right" placeholder="'+stock+'"></td> <td class="precio text-right"><input type="text" class="precio form-control text-right" value="'+precioA+'" ></td> <td class="text-right"><input type="text" class="descuentoA descuento form-control text-right" value="0"><input type="text" class="descuentoB descuento form-control text-right" value="0"><input type="text" class="descuentoC descuento form-control text-right" value="0"><input type="text" class="descuentoD descuento form-control text-right" value="0"></td> <td class="subtotal text-right">0</td><td><div onclick="deleteRow(this, '+id+')"><i class="fa fa-times" aria-hidden="true"></i></div></td></tr>');
                      }
                      if(OPprecio == 2){
                      $('#compras table tbody').append('<tr id="product-'+id+'"><td class="codigo">(#'+iTemxPedido+')<br/><div class="cod">'+codigo+'</div></td> <td class="nombre">'+nombre+'</td> <td class="text-right"><input type="text" class="stock form-control text-right" placeholder="'+stock+'"></td> <td class="precio text-right"><input type="text" class="precio form-control text-right" value="'+precioB+'" ></td> <td class="text-right"><input type="text" class="descuentoA descuento form-control text-right" value="0"><input type="text" class="descuentoB descuento form-control text-right" value="0"><input type="text" class="descuentoC descuento form-control text-right" value="0"><input type="text" class="descuentoD descuento form-control text-right" value="0"></td> <td class="subtotal text-right">0</td><td><div onclick="deleteRow(this, '+id+')"><i class="fa fa-times" aria-hidden="true"></i></div></td></tr>');  
                      }
                      if(OPprecio == 3){
                        $('#compras table tbody').append('<tr id="product-'+id+'"><td class="codigo">(#'+iTemxPedido+')<br/><div class="cod">'+codigo+'</div></td> <td class="nombre">'+nombre+'</td> <td class="text-right"><input type="text" class="stock form-control text-right" placeholder="'+stock+'"></td> <td class="precio text-right"><input type="text" class="precio form-control text-right" value="'+precioC+'" ></td> <td class="text-right"><input type="text" class="descuentoA descuento form-control text-right" value="0"><input type="text" class="descuentoB descuento form-control text-right" value="0"><input type="text" class="descuentoC descuento form-control text-right" value="0"><input type="text" class="descuentoD descuento form-control text-right" value="0"></td> <td class="subtotal text-right">0</td><td><div onclick="deleteRow(this, '+id+')"><i class="fa fa-times" aria-hidden="true"></i></div></td></tr>');
                      }

                      iTemxPedido++;

                  } // end existe


            });
            listCompras.push(response);
            console.log(listCompras);
          }              
        },
        complete : function(data){
          
          console.log(data);
          $("#compras table tbody input.precio").on("keypress", function(e) {
            padre = $(e.target).parent().parent().attr('id');            
            calculoItem(padre);
          });
          
          $("#compras table tbody input.stock").on("keypress", function(e) {
            padre = $(e.target).parent().parent().attr('id');
            calculoItem(padre);
          });

          $("#compras table tbody input.descuentoA, #compras table tbody input.descuentoB, #compras table tbody input.descuentoC, #compras table tbody input.descuentoD").on("keypress", function(e) {
            padre = $(e.target).parent().parent().attr('id');
  			calculoItem(padre);
  		  });
          
        },
        error : function(error){     
          console.log(error);
        }
      });

  } // else iTemxPedido

}
