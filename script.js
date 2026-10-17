
"use strict";

// ======================================
// CONFIGURACIÓN DE LA INVITACIÓN DE MAIA
// ======================================

const MODO_EDICION_INICIAL = false;
const FECHA_EVENTO = new Date("2026-12-04T21:00:00-03:00").getTime();

const invitacion = document.querySelector(".invitacion");

// Elementos que vamos a poder mover y ajustar.
const elementos = [
   
{
    id: "contador",
    pantalla: "bienvenida",
    etiqueta: "Contador regresivo",
    left: 10.3488,
    top: 83.968,
    width: 80,
    height: 12
},

    {
    id: "boton-maps",
    pantalla: "ubicacion",
    etiqueta: "Abrir Google Maps",
    left: 18.4884,
    top: 80.8933,
    width: 63.7209,
    height: 8.30962,
    enlace: "https://www.google.com/maps/place/ESPACIO+OESTE/@-34.6431,-58.8171436,17z/data=!3m1!4b1!4m6!3m5!1s0x95bc9567cf03cde5:0xef568be0ee2cd839!8m2!3d-34.6431044!4d-58.8145687!16s%2Fg%2F11h7gflk92"
},
    {
    id: "boton-confirmacion",
    pantalla: "confirmacion",
    etiqueta: "Confirmar asistencia",
    left: 15,
    top: 67.4087,
    width: 70.4651,
    height: 11.581,
   enlace: "https://wa.me/5491133000284?text=" +
    encodeURIComponent(
        "¡Hola! \uD83D\uDC95 Quiero confirmar mi asistencia a los XV de Maia el 4 de diciembre de 2026. \uD83C\uDF39\u2728\n\n" +
        "Nombre o nombres de quienes asistiremos: __________\n\n" +
        "¡Muchas gracias por la invitación! \u2764\uFE0F"
    )
    
    },
    


{
    id: "boton-subir",
    pantalla: "recuerdos",
    etiqueta: "Subir fotos",
    left: 12,
    top: 45.9953,
    width: 76.9302,
    height: 11.9265,
    enlace: "https://photos.app.goo.gl/kmM6nVVBr8Nc2vMK9"
},
{
    id: "boton-galeria",
    pantalla: "recuerdos",
    etiqueta: "Ver galería",
    left: 12.2325,
    top: 59.0321,
    width: 75.7675,
    height: 13.628,
    enlace: "https://photos.app.goo.gl/kmM6nVVBr8Nc2vMK9"
}



];

let modoEdicion = MODO_EDICION_INICIAL;
const elementosDOM = {};

// ======================================
// CREAR LOS ELEMENTOS
// ======================================

elementos.forEach(elemento => {
    const pantalla = document.getElementById(elemento.pantalla);

    if (!pantalla) {
        console.warn("No se encontró la pantalla:", elemento.pantalla);
        return;
    }

    let boton = document.getElementById(elemento.id);

    if (!boton) {
        boton = document.createElement("a");
        boton.id = elemento.id;
        boton.className = "boton-invisible";
        boton.setAttribute("aria-label", elemento.etiqueta);
        boton.dataset.etiqueta = elemento.etiqueta;
        pantalla.appendChild(boton);
    }
if (elemento.enlace) {
    boton.href = elemento.enlace;
    boton.target = "_blank";
    boton.rel = "noopener noreferrer";
} else {
    boton.removeAttribute("href");
}
    boton.style.left = elemento.left + "%";
    boton.style.top = elemento.top + "%";
    boton.style.width = elemento.width + "%";
    boton.style.height = elemento.height + "%";

    elementosDOM[elemento.id] = { boton, elemento };
});

// ======================================
// CONTADOR REGRESIVO
// ======================================

const contador = document.createElement("div");
contador.id = "contador-regresivo";
contador.innerHTML = `
    <span><strong id="dias">00</strong><small>DÍAS</small></span>
    <span><strong id="horas">00</strong><small>HORAS</small></span>
    <span><strong id="minutos">00</strong><small>MINUTOS</small></span>
    <span><strong id="segundos">00</strong><small>SEGUNDOS</small></span>
`;

contador.style.cssText = `
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 4px;
    color: #9C681F;
    font-family: Georgia, serif;
    text-align: center;
    line-height: 1.2;
    pointer-events: none;
`;

contador.querySelectorAll("span").forEach(bloque => {
    bloque.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 0;
    `;
});

contador.querySelectorAll("strong").forEach(numero => {
    numero.style.fontFamily = "'Bodoni Moda', Georgia, serif";
    numero.style.fontSize = "clamp(32px, 9vw, 42px)";
    numero.style.fontWeight = "500";
    numero.style.fontStyle = "italic";
    numero.style.color = "#651B2A";
    numero.style.textShadow = "none";
    numero.style.webkitTextStroke = "0.35px #651B2A";
});

contador.querySelectorAll("small").forEach(texto => {
    texto.style.fontFamily = "Georgia, serif";
    texto.style.fontSize = "clamp(9px, 2.4vw, 11px)";
    texto.style.fontWeight = "400";
    texto.style.fontStyle = "normal";
    texto.style.color = "#651B2A";
    texto.style.letterSpacing = "0.3px";
});

const recuadroContador = document.getElementById("contador");

if (recuadroContador) {
    recuadroContador.appendChild(contador);
}

function actualizarContador() {
    const diferencia = FECHA_EVENTO - Date.now();

    if (diferencia <= 0) {
        contador.textContent = "¡Llegó el gran día!";
        return;
    }

    const dias = Math.floor(diferencia / 86400000);
    const horas = Math.floor((diferencia % 86400000) / 3600000);
    const minutos = Math.floor((diferencia % 3600000) / 60000);
    const segundos = Math.floor((diferencia % 60000) / 1000);

    document.getElementById("dias").textContent = String(dias).padStart(2, "0");
    document.getElementById("horas").textContent = String(horas).padStart(2, "0");
    document.getElementById("minutos").textContent = String(minutos).padStart(2, "0");
    document.getElementById("segundos").textContent = String(segundos).padStart(2, "0");
}

actualizarContador();
setInterval(actualizarContador, 1000);

// ======================================
// PANEL DE MODO EDICIÓN
// ======================================

const panel = document.createElement("div");
panel.className = "panel-edicion";
panel.innerHTML = `
    <strong>Edición · Maia</strong>
    <p>Activá la edición para mover los botones con el mouse.</p>
    <button type="button" id="alternar-edicion"></button>
    <button type="button" id="guardar-posiciones">Ver posiciones</button>
`;

document.body.appendChild(panel);

const botonAlternar = document.getElementById("alternar-edicion");

function actualizarModoEdicion() {
    document.body.classList.toggle("modo-edicion", modoEdicion);
    botonAlternar.textContent = modoEdicion ? "Desactivar edición" : "Activar edición";
    panel.style.display = modoEdicion ? "flex" : "none";
}

botonAlternar.addEventListener("click", () => {
    modoEdicion = !modoEdicion;
    actualizarModoEdicion();
});

document.getElementById("guardar-posiciones").addEventListener("click", () => {
    const posiciones = {};

    Object.entries(elementosDOM).forEach(([id, datos]) => {
        const boton = datos.boton;

        posiciones[id] = {
            left: boton.style.left,
            top: boton.style.top,
            width: boton.style.width,
            height: boton.style.height
        };
    });

    console.log("Copiá estas posiciones desde la consola:", posiciones);
    alert("Las posiciones están en la consola del navegador (F12). Copialas para incorporarlas al código.");
});

// ======================================
// MOVER BOTONES CON EL MOUSE
// ======================================

Object.values(elementosDOM).forEach(({ boton }) => {

    let accion = null;
    let inicioX = 0;
    let inicioY = 0;

    let leftInicial = 0;
    let topInicial = 0;
    let widthInicial = 0;
    let heightInicial = 0;

    boton.addEventListener("pointerdown", evento => {
        if (!modoEdicion) return;

        evento.preventDefault();

        const rect = boton.getBoundingClientRect();

        // Detectar si tocamos la esquina inferior derecha
        const redimensionar =
            evento.clientX >= rect.right - 20 &&
            evento.clientY >= rect.bottom - 20;

        accion = redimensionar ? "redimensionar" : "mover";

        inicioX = evento.clientX;
        inicioY = evento.clientY;

        leftInicial = parseFloat(boton.style.left);
        topInicial = parseFloat(boton.style.top);
        widthInicial = parseFloat(boton.style.width);
        heightInicial = parseFloat(boton.style.height);

        boton.setPointerCapture(evento.pointerId);
    });

    boton.addEventListener("pointermove", evento => {
        if (!accion || !modoEdicion) return;

        const pantalla = boton.parentElement;
        const rect = pantalla.getBoundingClientRect();

        const dx = (evento.clientX - inicioX) / rect.width * 100;
        const dy = (evento.clientY - inicioY) / rect.height * 100;

        if (accion === "mover") {

            boton.style.left =
                Math.max(0, Math.min(100 - widthInicial, leftInicial + dx)) + "%";

            boton.style.top =
                Math.max(0, Math.min(100 - heightInicial, topInicial + dy)) + "%";

        } else if (accion === "redimensionar") {

            boton.style.width =
                Math.max(5, Math.min(100 - leftInicial, widthInicial + dx)) + "%";

            boton.style.height =
                Math.max(3, Math.min(100 - topInicial, heightInicial + dy)) + "%";
        }
    });

    boton.addEventListener("pointerup", () => {
        accion = null;
    });

    boton.addEventListener("pointercancel", () => {
        accion = null;
    });

    boton.addEventListener("click", evento => {
        if (modoEdicion) {
            evento.preventDefault();
        }
    });
});

actualizarModoEdicion();

/* FLECHITAS ENTRE PANTALLAS - MAIA */

document.querySelectorAll(".pantalla:not(:last-child)")
    .forEach(pantalla => {

        const indicador = document.createElement("div");
        indicador.className = "scroll-indicator";
        indicador.setAttribute("aria-hidden", "true");

        for (let i = 0; i < 3; i++) {
            indicador.appendChild(document.createElement("span"));
        }

        pantalla.appendChild(indicador);
    });
