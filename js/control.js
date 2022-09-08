const juegonuevo = document.getElementById('juegonuevo');
const juegonuevo2 = document.getElementById('juegonuevo2');
const agregarpalabra = document.getElementById('agregarpalabra');
const div_canvas = document.getElementById('div_canvas');
const div_palabra = document.getElementById('div_palabra');
const input_teclado = document.getElementById('input_teclado');
const desistir = document.getElementById('desistir');
const ap_cancelar = document.getElementById('ap_cancelar');

var ABECEDARIO = "^[a-zA-Z\u00F1\u00D1]+$";
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
var WIDTH = screen.width;
var HEIGHT = 420;
var COLOR = "#309694";
var gamemode = false;
var ERRORES = 0;
var PALABRA = "";

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

function juegoNuevo() {
    ERRORES = 0;
    div_botones.style.display = "none";
    div_canvas.style.display = "block";
    div_palabra.style.display = "none";
    gamemode = true;

    limpiarPantalla();
    //TODO Palabra aleatoria
    PALABRA = "AEIOUAEI"
    dibujaGuionesPalabra(HEIGHT / 2 + 80);

    // dibujaLetrasAciertos(HEIGHT / 2 + 65);
    // dibujaLetrasErrores(HEIGHT / 2 + 150);

    dibujaAhorcado(WIDTH / 2 - 50, HEIGHT / 2);
}

juegonuevo.addEventListener('click', function handleClick() {
    juegoNuevo();
});

juegonuevo2.addEventListener('click', function handleClick() {
    juegoNuevo();
});

function pantallaInicial() {
    div_botones.style.display = "block";
    div_canvas.style.display = "none";
    div_palabra.style.display = "none";
}

desistir.addEventListener('click', function handleClick() {
    pantallaInicial();
});

ap_cancelar.addEventListener('click', function handleClick() {
    pantallaInicial();
});


agregarpalabra.addEventListener('click', function handleClick() {
    div_botones.style.display = "none";
    div_canvas.style.display = "none";
    div_palabra.style.display = "block";
    gamemode = false;
});


document.addEventListener('keyup', e => {
    if (e.repeat) {
        e.preventDefault();
        return;
    }
    if (gamemode) {
        let letra = String.fromCharCode(e.which || e.keyCode).toUpperCase();
        if (e.keyCode == 192) {
            letra = "Ñ";
        }
        if (input_teclado.value.length > 0)
            letra = input_teclado.value.charAt(0).toUpperCase();
        console.log('keypress ' + letra);

        //Se introduce letra
        if (!letra.match(ABECEDARIO)) {
            console.log("NO ES UNA LETRA " + letra.match(ABECEDARIO))
            input_teclado.value = "";
            return;
        }

        switch (letra) {
            case "A":
            case "E":
            case "I":
            case "O":
            case "U":
                console.log("Presionaste una vocal");
                break;
            default:
                ERRORES += 1;
                console.log("Presionaste otra letra que no es vocal | ERRORES: " + ERRORES);
        }
        input_teclado.value = "";
        dibujaAhorcado(WIDTH / 2 - 50, HEIGHT / 2);
    }
});


function dibujaAhorcado(x, y) {
    // console.log("x: " + x);
    // console.log("y: " + y);

    pincel.fillStyle = "black";
    pincel.lineWidth = 10;
    pincel.beginPath();

    if (ERRORES > 0) {
        //0 base
        pincel.moveTo(x - 50, y);
        pincel.lineTo(x + 150, y);
        pincel.stroke();

    }

    if (ERRORES > 1) {
        //1 poste
        pincel.moveTo(x, y);
        pincel.lineTo(x, y - 200);
        pincel.stroke();
        console.log("Entro aqui cuando hay 2 errores");
    }

    if (ERRORES > 2) {
        //2 barra
        pincel.moveTo(x - 5, y - 200);
        pincel.lineTo(x + 100, y - 200);
        pincel.stroke();

    }

    if (ERRORES > 3) {
        //3 cuerda
        pincel.moveTo(x + 100, y - 200 - 5);
        pincel.lineTo(x + 100, y - 160);
        pincel.stroke();

    }

    if (ERRORES > 4) {
        //4 cabeza
        pincel.beginPath();
        pincel.arc(x + 100, y - 160 + 20, 20, 0, 2 * Math.PI);
        pincel.stroke();

    }

    if (ERRORES > 5) {
        //5 tronco
        pincel.moveTo(x + 100, y - 120);
        pincel.lineTo(x + 100, y - 50);
        pincel.stroke();

    }

    if (ERRORES > 6) {
        //6 brazo izq
        pincel.moveTo(x + 100, y - 120);
        pincel.lineTo(x + 70, y - 120 + 30);
        pincel.stroke();

    }

    if (ERRORES > 7) {
        //7 brazo der
        pincel.moveTo(x + 100, y - 120);
        pincel.lineTo(x + 130, y - 120 + 30);
        pincel.stroke();

    }

    if (ERRORES > 8) {
        //8 pie izq
        pincel.moveTo(x + 100, y - 50 - 5);
        pincel.lineTo(x + 70, y - 50 + 30);
        pincel.stroke();

    }

    if (ERRORES > 9) {
        //9 pie der
        pincel.moveTo(x + 100, y - 50 - 5);
        pincel.lineTo(x + 130, y - 50 + 30);
        pincel.stroke();

    }
}

function dibujaLetrasAciertos(y) {
    pincel.fillStyle = "black";
    pincel.lineWidth = 5;
    const font_size = 48;
    pincel.font = `${font_size}px Georgia`;

    pincel.beginPath();

    const padding = 20;
    const espacios = 10;
    let leng_guiones = (WIDTH - (2 * padding) - espacios * (PALABRA.length - 1)) / PALABRA.length;
    // console.log("longitud espacios: " + leng_guiones);
    x = 0;

    for (let index = 0; index < PALABRA.length; index++) {
        if (index == 0) x += padding;
        else x += espacios;


        const pm = x + leng_guiones / 2 - font_size / 2 + espacios;

        console.log("pm: " + pm);
        console.log("y: " + y);

        x += leng_guiones;

        pincel.fillText("8", pm, y);
    }

}

function dibujaLetrasErrores(y) {
    pincel.fillStyle = "red";
    pincel.lineWidth = 5;
    const font_size = 36;
    pincel.font = `${font_size}px Georgia`;

    pincel.beginPath();

    const padding = 20;
    const espacios = 10;
    let leng_guiones = (WIDTH - (2 * padding) - espacios * (PALABRA.length - 1)) / PALABRA.length;
    console.log("longitud espacios: " + leng_guiones);
    x = 0;

    for (let index = 0; index < PALABRA.length; index++) {
        if (index == 0) x += padding;
        else x += espacios;


        const pm = x + leng_guiones / 2 - font_size / 2 + espacios;

        console.log("pm: " + pm);
        console.log("y: " + y);

        x += leng_guiones;

        pincel.fillText("8", pm, y);
    }
}


function dibujaGuionesPalabra(y) {
    pincel.fillStyle = "black";
    pincel.lineWidth = 5;
    pincel.beginPath();

    const padding = 20;
    const espacios = 10;
    let leng_guiones = (WIDTH - (2 * padding) - espacios * (PALABRA.length - 1)) / PALABRA.length;
    // console.log("longitud espacios: " + leng_guiones);
    x = 0;

    for (let index = 0; index < PALABRA.length; index++) {
        if (index == 0) x += padding;
        else x += espacios;

        // console.log("x: " + x + "x2: " + (x + leng_guiones));
        // console.log("y: " + y);

        pincel.moveTo(x, y);
        x += leng_guiones;
        pincel.lineTo(x, y);
        pincel.stroke();
    }
}

function limpiarPantalla() {
    pincel.clearRect(0, 0, WIDTH, HEIGHT);
    pincel.fillStyle = COLOR;
    pincel.fillRect(0, 0, WIDTH, HEIGHT);

}