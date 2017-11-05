var proyecto 			= 'Nombre del Cliente';
var colorFondoIndex 	= '#777';
var colorTextIndex 		= 'white';
var direccion 			= 'http://138.197.154.196/sistemaPedidos/';
$( document ).ready(function() {

	$('header').load('../contenido/header.html');
	$('footer').load('../contenido/footer.html');

	document.title = proyecto;
	$('#Ctb').css('background-color', colorFondoIndex);
	$('#Ctb').css('color', colorTextIndex);
	$('.title-head').html(proyecto);
	$('.footer p .cliente').html(proyecto);

	$('.jumbotron h1').html(localStorage.getItem('namePerfil'));

});