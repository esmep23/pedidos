  
  //variables.
  var miSubtotal=0;
  var perfilVendedorID = '1';
  var miPedido = 0;
  var OPprecio = 0;
  var misProductos = new Array()
  var iTemxPedido = 1;
  var cs = 0;
  var eliminado = 0;
  var direccion = 'http://138.197.154.196/sistemaPedidos/';

 var listCompras = new Array();

  $( document ).ready(function() {

      getClientes();
      getProducto();

      cargoListado();

      $("#login").click(function () {
        loginUsuario();
      })

      $(".descuento1, .descuento2").on("focusout", function(e) {
        completoCalculo();
      });

      $("form").keypress(function(e) {
          if (e.which == 13) {
              $(this).next().focus();
              //return false;
          }
          if (e.which == 27) return false;
      });

      $('#inputPedido').change(function(){
        if($(this).find("option:selected").attr('value') == '1'){

        }else{
        	//IVA
        	cs = 1;
        }
      });

  });

  function plazosTiempos(){
    //alert($("#inputPlazo").val());
    OPprecio = $("#inputPlazo").val();
  }

  function loginUsuario() {
    var parametros = {
      "user" : $('#inputMail3').val(),
      "pass" : $('#inputClave3').val()
    }
    $.ajax({
      url: direccion+'login.php',
      type: "POST",
      cache: false,
      dataType: "json",
      data:  parametros,
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
          //alert(response);

           $.each(response,function(key,value){ 

            localStorage.setItem('userCode', value.id_vendedor);
            localStorage.setItem('namePerfil', value.name);
            localStorage.setItem('imagen', value.pic);

           });

            
            document.location = 'perfil.php';

            
          
        }else{

            $('.mensajeLogin').append('<div class="alert alert-warning alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>ERROR!</strong> Usuario / Contraseña Invalida. </div>');
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

  function getClientes() {
    console.log('cargoClientes');
    var parametros = {
      "vendedor" : localStorage.getItem('userCode')
    }
    $.ajax({
      url: direccion+'getCliente.php',
      type: "POST",
      cache: false,
      dataType: "json",
      data:  parametros,
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 
              
                id = value.id;
                vendedor = value.vendedor;
                codigo = value.codigo;
                nombre = value.nombre;
                ciudad = value.ciudad;
                cupo = value.cupo;
                saldo = value.saldo;
                disponible = value.disponible;

            
            $('.buscarcliente').append('<tr onclick="cargoDatosUsuario('+codigo+')"><th>'+codigo+'</th><th>'+nombre+'</th></tr>');
            $('.clientes').append('<tr><th>'+codigo+'</th><th>'+nombre+'</th></tr>');
            console.log('- - cargoClientes - -');
            });


            //search




        }              
      },
      complete : function(data){
        
        //console.log(data);
        console.log('aqui cargo lista de clientes');

        $(".search").keyup(function () {
            var searchTerm = $(".search").val();
            var listItem = $('.results tbody').children('tr');
            var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
            
          $.extend($.expr[':'], {'containsi': function(elem, i, match, array){
                return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
            }
          });
            
          $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
            $(this).attr('visible','false');
          });

          $(".results tbody tr:containsi('" + searchSplit + "')").each(function(e){
            $(this).attr('visible','true');
          });

        });

      },
      error : function(error){     
        console.log(error);
      }
    });     
  }

  function getProducto() {
    console.log('cargoClientes');

    $.ajax({
      url: direccion+'getProducto.php',
      type: "POST",
      cache: false,
      dataType: "json",
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 

                id = value.id;
                codigo = value.codigo;
                nombre = value.nombre;
                stock = value.stock;
                precioA = value.precioA;
                precioB = value.precioB;
                precioC = value.precioC;
                
                  $('.buscarproducto').append('<tr  onclick="cargoProducto(\'' +codigo+'\');"><th>'+codigo+'</th><th>'+nombre+'</th><th>'+stock+'</th><th>'+precioA+'</th><th>'+precioB+'</th><th>'+precioC+'</th></tr>');  
                  $('.actualizarproducto').append('<tr  onclick="actualizarProducto(\'' +codigo+'\');"><th>'+codigo+'</th><th>'+nombre+'</th><th>'+stock+'</th><th>'+precioA+'</th><th>'+precioB+'</th><th>'+precioC+'</th></tr>');  
                  $('.productos').append('<tr><th>'+codigo+'</th><th>'+nombre+'</th><th>'+stock+'</th></tr>');  
                
                
            
            });
        }              
      },
      complete : function(data){
        
        console.log(data);

        $(".search2").keyup(function () {
            var searchTerm = $(".search2").val();
            var listItem = $('.results2 tbody').children('tr');
            var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
            
          $.extend($.expr[':'], {'containsi': function(elem, i, match, array){
                return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
            }
          });
            
          $(".results2 tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
            $(this).attr('visible','false');
          });

          $(".results2 tbody tr:containsi('" + searchSplit + "')").each(function(e){
            $(this).attr('visible','true');
          });

        });
        
      },
      error : function(error){     
        console.log(error);
      }
    });     
  }


function cargoDatosUsuario(argumento){
  //alert(argumento);
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
					    document.location.href = 'http://bazarchina.com.ec/sistemaPedidos/perfil.php';
					  } else {
					      // Do nothing!
					    document.location.href = 'http://bazarchina.com.ec/sistemaPedidos/perfil.php';
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

/*
function cargoProducto(argumento){

  var idP;
  alert('1'+argumento);
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
                if(OPprecio == 0){
                  alert('Seleccione un Plazo');
                }

                if(OPprecio == 1){
                $('#compras table tbody').append('<tr id="product-'+id+'"> <td class="codigo">'+codigo+'</td> <td class="nombre">'+nombre+'</td> <td class="text-right"><input type="text" class="stock form-control text-right" placeholder="'+stock+'"></td> <td class="precio text-right"><input type="text" class="precio form-control text-right" value="'+precioA+'"></td> <td class="text-right"><input type="text" class="descuento form-control text-right" value="0"></td> <td class="subtotal text-right">0</td> dfsdf</tr>');
                }
                if(OPprecio == 2){
                $('#compras table tbody').append('<tr id="product-'+id+'"> <td class="codigo">'+codigo+'</td> <td class="nombre">'+nombre+'</td> <td class="text-right"><input type="text" class="stock form-control text-right" placeholder="'+stock+'"></td> <td class="precio text-right"><input type="text" class="precio form-control text-right" value="'+precioB+'"></td> <td class="text-right"><input type="text" class="descuento form-control text-right" value="0"></td> <td class="subtotal text-right">0</td> sdfdf</tr>');  
                }
                if(OPprecio == 3){
                  $('#compras table tbody').append('<tr id="product-'+id+'"> <td class="codigo">'+codigo+'</td> <td class="nombre">'+nombre+'</td> <td class="text-right"><input type="text" class="stock form-control text-right" placeholder="'+stock+'"></td> <td class="precio text-right"><input type="text" class="precio form-control text-right" value="'+precioC+'"></td> <td class="text-right"><input type="text" class="descuento form-control text-right" value="0"></td> <td class="subtotal text-right">0</td>sdfsdfsdfsd </tr>');
                }


          });
          listCompras.push(response);
          console.log(listCompras);
        }              
      },
      complete : function(data){
        
        console.log(data);
        $("#compras table tbody input.stock").on("focusout", function(e) {

          padre = $(e.target).parent().parent().attr('id');
          //cantidad
          //precio
          //descuento
          //parcial
          
          calculoItem(padre);

          
          

        });

        $("#compras table tbody input.descuento").on("focusout", function(e) {
          
          padre = $(e.target).parent().parent().attr('id');
          //cantidad
          //precio
          //descuento
          //parcial
          
          calculoItem(padre);


        });
        
      },
      error : function(error){     
        console.log(error);
      }
    });
}*/

function actualizarProducto(){
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
                if(OPprecio == 0){
                  alert('Seleccione un Plazo');
                }

                if(OPprecio == 1){
                $('#compras table tbody').append('<tr id="product-'+id+'"> <td class="codigo">'+codigo+'</td> <td class="nombre">'+nombre+'</td> <td class="text-right"><input type="text" class="stock form-control text-right" placeholder="'+stock+'"></td> <td class="precio text-right"><input type="text" class="precio form-control text-right" value="'+precioA+'"></td> <td class="text-right"><input type="text" class="descuento form-control text-right" value="0"></td> <td class="subtotal text-right">0</td> <td>sdfs</td></tr>');
                }
                if(OPprecio == 2){
                $('#compras table tbody').append('<tr id="product-'+id+'"> <td class="codigo">'+codigo+'</td> <td class="nombre">'+nombre+'</td> <td class="text-right"><input type="text" class="stock form-control text-right" placeholder="'+stock+'"></td> <td class="precio text-right"><input type="text" class="precio form-control text-right" value="'+precioB+'"></td> <td class="text-right"><input type="text" class="descuento form-control text-right" value="0"></td> <td class="subtotal text-right">0</td> <td>sdfs</td></tr>');  
                }
                if(OPprecio == 3){
                  $('#compras table tbody').append('<tr id="product-'+id+'"> <td class="codigo">'+codigo+'</td> <td class="nombre">'+nombre+'</td> <td class="text-right"><input type="text" class="stock form-control text-right" placeholder="'+stock+'"></td> <td class="precio text-right"><input type="text" class="precio form-control text-right" value="'+precioC+'"></td> <td class="text-right"><input type="text" class="descuento form-control text-right" value="0"></td> <td class="subtotal text-right">0</td><td>sdfs</td> </tr>');
                }


          });
          listCompras.push(response);
          console.log(listCompras);
        }              
      },
      complete : function(data){
        
        console.log(data);
        $("#compras table tbody input.precio").on("keypress", function(e) {

          padre = $(e.target).parent().parent().attr('id');
          //cantidad
          //precio
          //descuento
          //parcial
          
          calculoItem(padre);

        });

        $("#compras table tbody input.stock").on("keypress", function(e) {

          padre = $(e.target).parent().parent().attr('id');
          //cantidad
          //precio
          //descuento
          //parcial
          
          calculoItem(padre);

          
          

        });

        $("#compras table tbody input.descuento").on("keypress", function(e) {
          
          padre = $(e.target).parent().parent().attr('id');
          //cantidad
          //precio
          //descuento
          //parcial
          
          calculoItem(padre);


        });
        
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
            //cantidad
            //precio
            //descuento
            //parcial
            
            calculoItem(padre);

            
            

          });
          
          $("#compras table tbody input.stock").on("keypress", function(e) {
            padre = $(e.target).parent().parent().attr('id');
            //cantidad
            //precio
            //descuento
            //parcial
            
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

function calculoItem(productoID){

  var cantidad = $('#'+padre+' input.stock').val();
  var precio = $('#'+padre+' input.precio').val();
  var descuentoA = $('#'+padre+' input.descuentoA').val();
  var descuentoB = $('#'+padre+' input.descuentoB').val();
  var descuentoC = $('#'+padre+' input.descuentoC').val();
  var descuentoD = $('#'+padre+' input.descuentoD').val();
  var parcial = $('#'+padre+' .subtotal').text();
  
      precio = precio.replace(",", ".");

      parcial = (cantidad * precio);
      //console.log('descuento total:'+descuento);
      console.log('----DESCUENTO A--------------------------------------------------------');
      descuentoA = (parcial * descuentoA)/100;
      saldoA = parcial - descuentoA;
      console.log('Descuento A:'+saldoA);
      console.log('----DESCUENTO B--------------------------------------------------------');
      descuentoB = (saldoA * descuentoB)/100;
      saldoB = saldoA - descuentoB;
      console.log('Descuento B:'+saldoB);
      console.log('----DESCUENTO C--------------------------------------------------------');
      descuentoC = (saldoB * descuentoC)/100;
      saldoC = saldoB - descuentoC;
      console.log('Descuento C:'+saldoC);
      console.log('----DESCUENTO D--------------------------------------------------------');
      descuentoD = (saldoC * descuentoD)/100;
      saldoD = saldoC - descuentoD;
      console.log('Descuento D:'+saldoD);
      descuento = (descuentoA + descuentoB + descuentoC + descuentoD);
      //totalproduct = parcial - descuento;
      console.log('parcial: ('+cantidad+' * '+ precio +')'+parcial);
      $('#'+padre+' .subtotal').html(saldoD.toFixed(3));

      completoCalculo();

}

function completoCalculo(){
    var campo6;
    var subPedido = 0;
   $("#compras tbody tr").each(function (index){
            $(this).children("td.subtotal").each(function (index2) 
            {
                subtotalLinea = Number($(this).text());
            })
                subPedido += subtotalLinea;
    })
            //alert(subPedido);
            $('.parcialpedido').val(subPedido.toFixed(3));
            //descuento1
            descuento1 = $('.descuento1').val();
            descuento1 = (subPedido * descuento1) / 100;
            console.log('descuento1 -> '+descuento1);
            
            minSubtotal1 = subPedido - descuento1;
            
            //descuento2
            descuento2 = $('.descuento2').val();
            descuento2 = (minSubtotal1 * descuento2) / 100;
            console.log('descuento2 -> '+descuento2);

            minSubtotal = minSubtotal1 - descuento2;
            /*minSubtotal = subPedido - descuento1 - descuento2;*/


            $('.master-subtotal').val(minSubtotal.toFixed(3));
            //iva
            if(cs==0){
             iva =0;
             $('.ivaPorcentaje').val(iva.toFixed(3));
             total= minSubtotal + iva;
             $('.totalapagar').text(total.toFixed(2));
            }else{
             iva = (minSubtotal * 14) / 100;
             $('.ivaPorcentaje').val(iva.toFixed(3));
             total= minSubtotal + iva;
             $('.totalapagar').text(total.toFixed(2));
            }
            

            
}



function calculoTotal(){
  $('.parcial').val(miSubtotal.toFixed(3));
  //descuento1
  //descuento2
  var descuento1 = $('.descuento1').val();
  var descuento2 = $('.descuento2').val();

  var masTSubtotal = miSubtotal - descuento1 - descuento2;

  $('.master-subtotal').val(masTSubtotal.toFixed(3));
  //calculoIVA 14%
  if(cs=0){
    var iva = 0;
  }else{
    var iva = (masTSubtotal*14)/100;
  }
  
  $('.iva').val(iva.toFixed(3));

  var calculoTOTALAPAGAR = masTSubtotal + iva;
  alert(calculoTOTALAPAGAR);
  $('.totalapagar h4 strong').html(calculoTOTALAPAGAR.toFixed(2));

  //if(calculoTOTALAPAGAR)

}

function guardo(){
  //datos del pedido
  //alert('Guardo borrador');

  if (confirm('Esta seguro de querer guardar este Pedido??? ')) {
    // Save it!
		  var parametros = {
		    'id_vendedor': perfilVendedorID,
		    'cod_cliente': $('#inputCodigo').val(),
		    'estado': 'C',
		    'plazo': $('#inputPlazo').val(),
		    'transporte': $('#inputTransporte').val(),
		    'tipoPedido': $('#inputPedido').val(),
		    'parcial': $('.parcialpedido').val(),
		    'descuento1': $('.descuento1').val(),
		    'descuento2': $('.descuento2').val(),
		    'subtotal': $('.master-subtotal').val(),
		    'iva': $('.ivaPorcentaje').val(),
		    'observacion': $("textarea.observacion").val(),
		    'total': $('.totalapagar').text()
		  };
		  $.ajax({
		      url: direccion+'saveFdraft.php',
		      type: "POST",
		      cache: false,
		      dataType: "json",
		      data:  parametros,
		      success: function(response){  
		        if(response!=null && response!='' && response!='[]'){ 
		          console.log(response);
		          miPedido = response;
		          $('.referencia').html('<strong>Ref. No.</strong> #00'+miPedido);
		          guardarProductos(miPedido);

		        }              
		      },
		      complete : function(data){
		        
		        console.log(data);
		        
		      },
		      error : function(error){     
		        console.log(error);
		      }
		    });
    
  } else {
      // Do nothing!
  }

}

function actualizar(){

}

function guardarProductos(miPedido){

    $('.guardo_mipedido').prop('disabled', true);
      $("#compras tbody tr").each(function (index) 
        {
            var campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9;
            $(this).children("td").each(function (index2) 
            {
                switch (index2) 
                {
                    case 0: campo1 = $(this).find('div.cod').text();
                            break;
                    case 1: campo2 = $(this).text();
                            break;
                    case 2: campo3 = $(this).find('input.stock').val();
                            break;
                    case 3: campo4 = $(this).find('input.precio').val();
                            break;
                    case 4: campo5 = $(this).find('input.descuentoA').val();
                            campo6 = $(this).find('input.descuentoB').val();
                            campo7 = $(this).find('input.descuentoC').val();
                            campo8 = $(this).find('input.descuentoD').val();
                            break;
                    case 5: campo9 = $(this).text();
                            break;
                }
                $(this).css("background-color", "#ECF8E0");
            })
            //alert(campo1 + ' - ' + campo2 + ' - ' + campo3 + ' - ' + campo4 + ' - ' + campo5 + ' - ' + campo6);
            var parametros = {
              'id_pedido': miPedido,
              'id_producto': campo1,
              'cantidad': campo3,
              'precio': campo4.replace(",", "."),
              'descuentoA': campo5,
              'descuentoB': campo6,
              'descuentoC': campo7,
              'descuentoD': campo8,
              'parcial': campo9
            };
            $.ajax({
                url: direccion+'saveProduct.php',
                type: "POST",
                cache: false,
                dataType: "json",
                data:  parametros,
                success: function(response){  
                  if(response!=null && response!='' && response!='[]'){ 
                    console.log(response);
                  }              
                },
                complete : function(data){
                  
                  console.log(data);/*
                  $('.observaciones').html('<div class="alert alert-warning" role="alert"> <a href="#" class="alert-link">Actualizado</a> </div>'); setTimeout(function(){ $('.observaciones').empty(); }, 3000);
                  setInterval(function(){
                    $('.observaciones').empty();
                  }, 23000);*/

                  alert('Pedido Guardado');
                  document.location = 'gestionarpedido.php';
                  
                },
                error : function(error){     
                  console.log(error);
                }
              });
      })
}

function cargoListado(){
  var parametros = {
    'id_vendedor': perfilVendedorID
  };
  $.ajax({
      url: direccion+'getPedidos.php',
      type: "POST",
      cache: false,
      dataType: "json",
      data:  parametros,
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
          console.log(response);
          $.each(response,function(key,value){ 
          id = value.id;
          id_vendedor = value.id_vendedor;
          clienteName= value.nombre_cliente;
          secuencial = value.secuencial;
          estado = value.estado;
          plazo = value.plazo;
          transporte = value.transporte;
          tipoPedido = value.tipoPedido;
          parcial = value.parcial;
          descuento1 = value.descuento1;
          descuento2 = value.descuento2;
          subtotal = value.subtotal;
          iva = value.iva;
          total = value.total;
          fecha = value.fecha;

          switch(estado){
            case "C":
            // Creado
            $('#listoPedidos tbody').append('<tr><td><span>'+id+'</span></td> <td><span>'+clienteName+'</span></td> <td><span>'+fecha+'</span></td> <td><span>'+total+'</span></td> <td><span>'+estado+'</span></td> <td class="text-center"> <div class="btn btn-default" onclick="editarPedido('+id+')">Ver</div><div class="btn btn-default" onclick="eliminarPedido('+id+')">Eliminar</div>  </td> </tr>');
            break;
            case "F":
            // Facturado
            $('#listoPedidos tbody').append('<tr style="background-color: #eee;"><td><span>'+id+'</span></td> <td><span>'+clienteName+'</span></td> <td><span>'+fecha+'</span></td> <td><span>'+total+'</span></td> <td><span>'+estado+'</span></td> <td class="text-center"> <div class="btn btn-default" onclick="editarPedido('+id+')">Ver</div>  </td> </tr>');
            break;
            case "R":
            // Recibido
            $('#listoPedidos tbody').append('<tr style="background-color: #c7c7c7;"><td><span>'+id+'</span></td> <td><span>'+clienteName+'</span></td> <td><span>'+fecha+'</span></td> <td><span>'+total+'</span></td> <td><span>'+estado+'</span></td> <td class="text-center"> <div class="btn btn-default" onclick="editarPedido('+id+')">Ver</div></td> </tr>');
            break;
          }

          if(estado == 'F'){
          } else {
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
/*
function verPedido(argumento, argumento2){
  //alert(argumento);

  OPprecio = argumento2;
  //abrir pantalla
  location.replace("editarpedido.php?pedido="+argumento);
  
}*/

function editarPedido(argumento){
  //alert(argumento);
  $('#ModalEditPedido').modal('show');
  var parametros = {
    'id_pedido': argumento
  };
  $.ajax({
      url: direccion+'getPedido.php',
      type: "POST",
      cache: false,
      dataType: "json",
      data:  parametros,
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
          //console.log(response);
          $.each(response,function(key,value){ 
          id = value.id;
          id_vendedor = value.id_vendedor;
          clienteName= value.nombre_cliente;
          secuencial = value.secuencial;
          estado = value.estado;
          plazo = value.plazo;
          transporte = value.transporte;
          tipoPedido = value.tipoPedido;
          parcial = value.parcial;
          descuento1 = value.descuento1;
          descuento2 = value.descuento2;
          subtotal = value.subtotal;
          iva = value.iva;
          total = value.total;
          fecha = value.fecha;
          observacion = value.observacion;
          if(plazo == 1){
            vPlazo = '30 dias';
          }
          if(plazo == 2){
            vPlazo = '60 dias';
          }
          if(plazo == 3){
            vPlazo = '90 dias';
          }

          if(tipoPedido == 1){
            vtipoPedido = 'N/Venta';
          }
          if(tipoPedido == 2){
            vtipoPedido = 'Factura';
          }

              $('#ModalEditPedido .modal-title').html('Pedido #000'+id);
              $('#ModalEditPedido .modal-body .cliente').html(clienteName);
              $('#ModalEditPedido .modal-body .plazo').html('<strong>Plazo</strong>: '+vPlazo);
              $('#ModalEditPedido .modal-body .transporte').html('<strong>transporte</strong>: '+transporte);
              $('#ModalEditPedido .modal-body .tipoPedido').html('<strong>Tipo de Pedido</strong>: '+vtipoPedido);
              $('#ModalEditPedido .modal-footer .parcial').html('<strong>Parcial</strong>: <div class="barraInferior">'+parcial+'</div>');
              $('#ModalEditPedido .modal-footer .descuento1').html('<strong>Descuento1</strong>: <div class="barraInferior">'+descuento1+'</div>');
              $('#ModalEditPedido .modal-footer .descuento2').html('<strong>Descuento2</strong>: <div class="barraInferior">'+descuento2+'</div>');
              $('#ModalEditPedido .modal-footer .iva').html('<strong>IVA</strong>: <div class="barraInferior">'+iva+'</div>');
              $('#ModalEditPedido .modal-footer .total').html('<strong>Total</strong>: <div class="barraInferior">'+total+'</div>');
              $('#ModalEditPedido .modal-footer .observacion').html('<strong>Observación</strong>: <div >'+observacion+'</div>');

          });
        }
      },
      complete : function(data){
        
        console.log(data);

        listarPedido(argumento);
        
      },
      error : function(error){     
        console.log(error);
      }
    });
}

function listarPedido(argumento){
  $('#listEdita tbody').empty();
var parametros = {
    'id_pedido': argumento
  };
  $.ajax({
      url: direccion+'getDetallePedido.php',
      type: "POST",
      cache: false,
      dataType: "json",
      data:  parametros,
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
          console.log(response);
          $.each(response,function(key,value){ 
            id_producto = value.id_producto;
            cantidad = value.cantidad;
            nombre = value.nombre;
            precio = value.precio;
            descuentoA = value.descuentoA;
            descuentoB = value.descuentoB;
            descuentoC = value.descuentoC;
            descuentoD = value.descuentoD;
            parcial = value.parcial;

            $('#listEdita').append('<tr><td>'+id_producto+'</td><td>'+nombre+'</td><td>'+cantidad+'</td><td>'+precio+'</td><td>'+descuentoA+', '+descuentoB+', '+descuentoC+', '+descuentoD+'</td><td>'+parcial+'</td></tr>');
          });
        }   
      },
      complete : function(data){
        
        console.log(data);

        //listarPedido(argumento);
        
      },
      error : function(error){     
        console.log(error);
      }
    });
}

function eliminarPedido(argumento){
  //alert(argumento);
  if (confirm('Esta seguro de querer eliminar este Pedido??? ')) {
    // Save it!
    //alert('Eliminar');
    var parametros = {
    'id_pedido': argumento
    };
    $.ajax({
        url: direccion+'delPedido.php',
        type: "POST",
        data:  parametros,
        success: function(response){
            alert('Eliminado');
            document.location = 'gestionarpedido.php';
        },

        error : function(error){     
          console.log(error);
        }
    });
  } else {
      // Do nothing!
  }
}

function deleteRow(btn, id) {
  var row = btn.parentNode.parentNode;

  eliminado = $('#product-'+id+' .subtotal').text();
  var subtotal = $('.parcialpedido').val();
  miSubtotal = subtotal - eliminado;
  $('.parcialpedido').val(miSubtotal.toFixed(3));
  $('.totalapagar').val(miSubtotal.toFixed(3));
  //alert('eliminado=>'+eliminado+'   subtotal=>'+subtotal+'   miSubtotal=>'+miSubtotal);
  if(cs=0){
    var iva = 0;
  }else{
    var iva = (miSubtotal*14)/100;
    $('.iva').val(iva.toFixed(3));
  }
  
  row.parentNode.removeChild(row);

}

function closeOut(){
  localStorage.clear();
  document.location = 'index.php';

}