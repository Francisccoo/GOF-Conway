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


var rojo = '#F00';
var azul = '#00F';
var verde = '#0F0';

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

	//Método que añade los vecinos al objeto actual
	this.addVecinos = function() {
		var xVecino;
		var yVecino;

		for (i = -1; i < 2; i++) {
			for (j = -1; j < 0; j++) {
				
				xVecino = (this.x + j + columnas) % columnas;
				yVecino = (this.y + i + filas) % filas;


				//descartamos el agente actual (yo no puedo ser mi propio vecino)
				if(i!=0 || j!=0) {
					this.vecinos.push(tablero[yVecino][xVecino]);
				}
			}
		}
	}

	this.dibuja = function(){

		var color;

		if(this.estado == 1) {

			color = blanco;
		}
		else {
			color = negro;
		}

		ctx.fillStyle = color;
		ctx.fillRect(this.x * tileX, this.y * tileY, tileX, tileY);
	}


	//Programamos las leyes de Conway
	this.nuevoCiclo = function() {
		var suma = 0;

		//calculamos la cantidad de vecinos vivos
		for (i = 0; i < this.vecinos.length; i++) {
			suma += this.vecinos[i].estado;
		}

		//Aplicamos las normas
		this.estadoProx = this.estado; //por defecto se queda igual


		//MUERTE: tiene menos de dos o más de tres
		if(suma < 2 || suma > 3) {
			this.estadoProx = 0;
		}

		//VIDA / REPRODUCCIÓN: tiene exactamente tres vecinos
		if(suma == 3) {
			this.estadoProx = 1;
		}
	}

	this.mutacion = function(){
		this.estado = this.estadoProx;
	}

}



function inicializaTablero(obj) {

	var estado;

	for (var y = 0; y < filas; y++) {
		for (var x = 0; x < columnas; x++) {
			estado = Math.floor(Math.random()*2);
			obj[y][x] = new Agente(x, y, estado);
		}
	}


	for (var y = 0; y < filas; y++) {
		for (var x = 0; x < columnas; x++) {
			obj[y][x].addVecinos();
		}
	}

}

//Inicializamos todos los valores correspondientes al canvas
function inicializa() {

	//Asociamos el canvas
	canvas = document.getElementById('pantalla');
	ctx = canvas.getContext('2d'); //Estamos indicando que vamos a trabajar con un canvas en dos dimensiones


	//Ajustamos el tamaño del canvas
	canvas.width = canvasX;
	canvas.height = canvasY;

	//Calculamos tamaño tiles
	tileX = Math.floor(canvasX/filas);
	tileY = Math.floor(canvasY/columnas);

	//Creamos el tablero
	tablero = creaArray2D(filas, columnas);

	//Lo inicializamos
	inicializaTablero(tablero);

	//Ejecutamos el bucle principal cada 33,33 milisegundos
	setInterval(function(){principal();}, 1000/fps);

	
}


function dibujaTablero(obj) {


	//Dibuja los agentes
	for (y = 0; y < filas ; y++) {
		for (x = 0; x < columnas ; x++) {
			obj[y][x].dibuja();
		}
	}

	//Calcula el siguiente ciclo
	for (y = 0; y < filas ; y++) {
		for (x = 0; x < columnas ; x++) {
			obj[y][x].nuevoCiclo();
		}
	}


	//Aplica la mutacion
	for (y = 0; y < filas ; y++) {
		for (x = 0; x < columnas ; x++) {
			obj[y][x].mutacion();
		}
	}
}

function borraCanvas() {
	canvas.width = canvas.width;
	canvas.height = canvas.height;
}

function principal() {
	borraCanvas();
	dibujaTablero(tablero);
}


	
//Cambiar colores

function negroArojo() {

	negro = rojo;

}

function negroAazul() {

	negro = azul;

}


function negroAverde() {

	negro = verde;

}