$( document ).ready(function() {
	getClientes();
	getProducto();
});

function getClientes() {
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
            	
            });
        }              
      },
      complete : function(data){

        console.log('aqui cargo lista de clientes');

        $(".search").keyup(function () {
            var searchTerm = $(".search").val();
            var listItem = $('.results-client tbody').children('tr');
            var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
            
          $.extend($.expr[':'], {'containsi': function(elem, i, match, array){
                return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
            }
          });
            
          $(".results-client tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
            $(this).attr('visible','false');
          });

          $(".results-client tbody tr:containsi('" + searchSplit + "')").each(function(e){
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
                  $('.productos').append('<tr><th>'+codigo+'</th><th>'+nombre+'</th><th>'+stock+'</th><th>'+precioA+'</th><th>'+precioB+'</th><th>'+precioC+'</th></tr>');  
                
                
            
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
