const juegonuevo = document.getElementById('juegonuevo');
const agregarpalabra = document.getElementById('agregarpalabra');
const div_canvas = document.getElementById('div_canvas');
const div_palabra = document.getElementById('div_palabra');
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
var WIDTH = window.innerWidth;
var HEIGHT = 500;
var COLOR = "#048434";
var RADIO = 100;
scrrsz();

function scrrsz() {
    WIDTH = window.innerWidth;
    pantalla.width = WIDTH;
    pantalla.height = HEIGHT;

    console.log("Width: " + WIDTH);
    limpiarPantalla();
    dibujaAhorcado(WIDTH / 2, HEIGHT / 2);
}

juegonuevo.addEventListener('click', function handleClick() {
    div_canvas.style.display = "block";
    div_palabra.style.display = "none";
    dibujaAhorcado(WIDTH / 2, HEIGHT / 2);
});

agregarpalabra.addEventListener('click', function handleClick() {
    div_canvas.style.display = "none";
    div_palabra.style.display = "block";
});


function dibujaAhorcado(x, y) {
    console.log("x: " + x);
    pincel.fillStyle = "black";
    pincel.beginPath();
    pincel.arc(x, y, RADIO, 0, 2 * Math.PI);
    pincel.fill();

    pincel.fillStyle = "red";
    pincel.beginPath();
    pincel.arc(x, y, 10, 0, 2 * Math.PI);
    pincel.fill();

    // pincel.font = `${RADIO}px Georgia`;
    // pincel.fillStyle = "black";
    // pincel.fillText("8", x - (radio / 3), y + (radio / 3));
}

function limpiarPantalla() {
    pincel.clearRect(0, 0, WIDTH, HEIGHT);
    pincel.fillStyle = COLOR;
    pincel.fillRect(0, 0, WIDTH, HEIGHT);
}