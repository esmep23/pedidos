$( document ).ready(function() {
	$("#login").click(function () {
		loginUsuario();
	})
});

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
		  $.each(response,function(key,value){ 
			localStorage.setItem('userCode', value.id_vendedor);
			localStorage.setItem('namePerfil', value.name);
			localStorage.setItem('imagen', value.pic);
		   });
		  document.location = 'perfil.html';
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