var ctx; //Contexto
var fps = 30; //Frames por segundo


//Variables del tablero y tiles
var canvasX = 500; //pixeles ancho
var canvasY  = 500; //pixeles alto
var tileX, tileY;

//Variables relacionadas con el tablero de juego
var tablero;
var filas = 100;
var columnas = 100;

var blanco = '#FFF';
var negro = '#000';

function creaArray2D(f, c) {
	var obj = new Array(f);
	for (y = 0; y < f ; y++) {
		obj[y] = new Array(c);
	}

	return obj;
}

//Objeto AGENTE o TURMITA (pequeña máquina de Turing)
var Agente = function(x, y, estado) {

	this.x = x;
	this.y = y;
	this.estado = estado; //vivo = 1, muerto = 2

	this.estadoProx = this.estado //estado que tendrá el siguiente ciclo

	this.vecinos = []; //guardamos el listado de sus vecinos
}

//Inicializamos todos los valores correspondientes al canvas
function inicializa() {

	//Asociamos el canvas
	canvas = document.getElementById('pantalla');
	ctx = canvas.getContext('2D'); //Estamos indicando que vamos a trabajar con un canvas en dos dimensiones


	//Ajustamos el tamaño del canvas
	canvas.width = canvasX;
	canvas.height = canvasY;

	//Calculamos tamaño tiles
	tileX = Math.floor(canvasX/filas);
	tileY = Math.floor(canvasY/columnas);

	//Creamos el tablero
	tablero = creaArray2D(filas, columnas);

	//Ejecutamos el bucle principal cada 33,33 milisegundos
	setInterval(function(){principal();}, 1000/fps);
}

function borraCanvas() {
	canvas.width = canvas.width;
	canvas.height = canvas.height;
}

function principal() {
	console.log('fotograma');
	borraCanvas();
}