const juegonuevo = document.getElementById('juegonuevo');
const agregarpalabra = document.getElementById('agregarpalabra');
const div_canvas = document.getElementById('div_canvas');
const div_palabra = document.getElementById('div_palabra');
const input_teclado = document.getElementById('input_teclado');

var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
var WIDTH = screen.width;
var HEIGHT = 500;
var COLOR = "#309694";
const body = document.getElementById('body');
var gamemode = false;
var errores = 0;

//start
scrrsz();

function scrrsz() {
    WIDTH = screen.width;
    pantalla.width = WIDTH;
    pantalla.height = HEIGHT;

    console.log("Width: " + WIDTH);
    console.log("Height: " + HEIGHT);

    if (WIDTH < 500) {
        input_teclado.style.display = "block";
    }

    limpiarPantalla();
    dibujaAhorcado(WIDTH / 2 - 50, HEIGHT / 2);
}

juegonuevo.addEventListener('click', function handleClick() {
    div_canvas.style.display = "block";
    div_palabra.style.display = "none";
    gamemode = true;
    dibujaAhorcado(WIDTH / 2 - 50, HEIGHT / 2);
});

agregarpalabra.addEventListener('click', function handleClick() {
    div_canvas.style.display = "none";
    div_palabra.style.display = "block";
    gamemode = false;
});


document.addEventListener('keydown', e => {
    if (e.repeat) {
        e.preventDefault();
        return;
    }
    if (gamemode) {
        let letra = String.fromCharCode(e.which || e.keyCode).toUpperCase();
        console.log('keypress ' + letra);

        switch (letra) {
            case "A":
            case "E":
            case "I":
            case "O":
            case "U":
                console.log("Presionaste una vocal");
                break;
            default:
                errores += 1;
                console.log("Presionaste otra letra que no es vocal | errores: " + errores);
        }
        dibujaAhorcado(WIDTH / 2 - 50, HEIGHT / 2);
    }
});


function dibujaAhorcado(x, y) {
    console.log("x: " + x);
    console.log("y: " + y);

    pincel.fillStyle = "black";
    pincel.lineWidth = 10;

    if (errores > 0) {
        //0 base
        pincel.moveTo(x - 50, y);
        pincel.lineTo(x + 150, y);
        pincel.stroke();

    }

    if (errores > 1) {
        //1 poste
        pincel.moveTo(x, y);
        pincel.lineTo(x, y - 200);
        pincel.stroke();

    }

    if (errores > 2) {
        //2 barra
        pincel.moveTo(x - 5, y - 200);
        pincel.lineTo(x + 100, y - 200);
        pincel.stroke();

    }

    if (errores > 3) {
        //3 cuerda
        pincel.moveTo(x + 100, y - 200 - 5);
        pincel.lineTo(x + 100, y - 160);
        pincel.stroke();

    }

    if (errores > 4) {
        //4 cabeza
        pincel.beginPath();
        pincel.arc(x + 100, y - 160 + 20, 20, 0, 2 * Math.PI);
        pincel.stroke();

    }

    if (errores > 5) {
        //5 tronco
        pincel.moveTo(x + 100, y - 120);
        pincel.lineTo(x + 100, y - 50);
        pincel.stroke();

    }

    if (errores > 6) {
        //6 brazo izq
        pincel.moveTo(x + 100, y - 120);
        pincel.lineTo(x + 70, y - 120 + 30);
        pincel.stroke();

    }

    if (errores > 7) {
        //7 brazo der
        pincel.moveTo(x + 100, y - 120);
        pincel.lineTo(x + 130, y - 120 + 30);
        pincel.stroke();

    }

    if (errores > 8) {
        //8 pie izq
        pincel.moveTo(x + 100, y - 50 - 5);
        pincel.lineTo(x + 70, y - 50 + 30);
        pincel.stroke();

    }

    if (errores > 9) {
        //9 pie der
        pincel.moveTo(x + 100, y - 50 - 5);
        pincel.lineTo(x + 130, y - 50 + 30);
        pincel.stroke();

    }

    // pincel.font = `${RADIO}px Georgia`;
    // pincel.fillStyle = "black";
    // pincel.fillText("8", x - (radio / 3), y + (radio / 3));
}

function limpiarPantalla() {
    pincel.clearRect(0, 0, WIDTH, HEIGHT);
    pincel.fillStyle = COLOR;
    pincel.fillRect(0, 0, WIDTH, HEIGHT);
}