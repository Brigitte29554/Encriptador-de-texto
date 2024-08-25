// Selección de elementos del DOM
let textoEntrada = document.querySelector("#textoEntrada");
let contenedorTarjetas = document.querySelector(".contenedor-tarjetas");

let botonEncriptar = document.querySelector("#botonEncriptar");
let botonDesencriptar = document.querySelector("#botonDesencriptar");

// Evento para encriptar el texto
function encriptarTexto(){
    let texto = textoEntrada.value;
    if (texto === "") {
        alert("El campo de texto no puede estar vacío");
        return;
    }
    
    // Validación para que solo acepte letras minúsculas sin caracteres especiales
    if (!/^[a-z\s]+$/.test(texto)) {
        alert("Por favor, ingresa solo letras minúsculas sin acentos ni caracteres especiales.");
        return;
    }

    let textoEncriptado = encriptar(texto);

    // Mostrar el texto encriptado en una tarjeta
    mostrarResultado(textoEncriptado);
}

// Evento para desencriptar el texto
function desencriptarTexto(){
    let texto = textoEntrada.value;
    if (texto === "") {
        alert("El campo de texto no puede estar vacío");
        return;
    }

    let textoDesencriptado = desencriptar(texto);

    // Mostrar el texto desencriptado en una tarjeta
    mostrarResultado(textoDesencriptado);
}

// Función para encriptar el texto
function encriptar(texto) {
    let llaves = {
        "e": "enter",
        "i": "imes",
        "a": "ai",
        "o": "ober",
        "u": "ufat"
    };

    return texto.split('').map(letra => llaves[letra] || letra).join('');
}

// Función para desencriptar el texto
function desencriptar(texto) {
    let llaves = {
        "enter": "e",
        "imes": "i",
        "ai": "a",
        "ober": "o",
        "ufat": "u"
    };

    // Reemplazar las llaves en orden inverso para evitar conflictos
    for (let llave in llaves) {
        texto = texto.replaceAll(llave, llaves[llave]);
    }

    return texto;
}

// Función para mostrar el resultado en una tarjeta
function mostrarResultado(texto) {
    contenedorTarjetas.innerHTML = "";
    let tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML = `
        <div class="tarjeta-cuerpo">
            <p class="tarjeta-texto">${texto}</p>
        </div>
        <div class="tarjeta-pie">
            <button class="boton-secundario boton-copiar">Copiar</button>
        </div>
    `;
    textoEntrada.value = "";
    contenedorTarjetas.appendChild(tarjeta);

    // Funcionalidad para copiar el texto
    tarjeta.querySelector(".boton-copiar").addEventListener("click", () => {
        let textoACopiar = tarjeta.querySelector(".tarjeta-texto").innerText;
        navigator.clipboard.writeText(textoACopiar).then(() => {
            alert("Texto copiado al portapapeles");
        }).catch(err => {
            console.error("Error al copiar el texto: ", err);
        });
    });
}
    