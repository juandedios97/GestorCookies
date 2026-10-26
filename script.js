
const formulario = document.getElementById("formCookie");
const nombreInput = document.getElementById("nombre");
const valorInput = document.getElementById("valor");
const mensaje = document.getElementById("mensaje");
const listaCookies = document.getElementById("listaCookies");

// Crear una cookie durante 7 días
function crearCookie(nombre, valor) {
    const fecha = new Date();
    fecha.setTime(
        fecha.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    document.cookie =
        `${encodeURIComponent(nombre)}=${encodeURIComponent(valor)}; expires=${fecha.toUTCString()}; path=/; SameSite=Lax`;
}

// Leer todas las cookies
function leerCookies() {
    listaCookies.innerHTML = "";

    const cookies = document.cookie
        ? document.cookie.split("; ")
        : [];

    if (cookies.length === 0) {
        listaCookies.textContent = "No hay cookies visibles.";
        return;
    }

    cookies.forEach(function(cookie) {
        const posicion = cookie.indexOf("=");
        const nombre = decodeURIComponent(
            cookie.substring(0, posicion)
        );
        const valor = decodeURIComponent(
            cookie.substring(posicion + 1)
        );

        const elemento = document.createElement("li");
        elemento.textContent = `${nombre}: ${valor}`;
        listaCookies.appendChild(elemento);
    });
}

// Comprobar si existe una cookie por su nombre
function existeCookie(nombre) {
    const prefijo = encodeURIComponent(nombre) + "=";

    return document.cookie
        .split("; ")
        .some(cookie => cookie.startsWith(prefijo));
}

// Crear una cookie desde el formulario
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = nombreInput.value.trim();
    const valor = valorInput.value.trim();

    if (!nombre || !valor) {
        mensaje.textContent =
            "Introduce un nombre y un valor.";
        return;
    }

    if (nombre.includes(";") || nombre.includes("=")) {
        mensaje.textContent = "El nombre no es válido.";
        return;
    }

    crearCookie(nombre, valor);
    mensaje.textContent = "Cookie creada correctamente.";
    leerCookies();
});

// Modificar una cookie existente
document.getElementById("btnModificar")
    .addEventListener("click", function() {
        const nombre = nombreInput.value.trim();
        const valor = valorInput.value.trim();

        if (!nombre || !valor) {
            mensaje.textContent =
                "Introduce el nombre y el nuevo valor.";
            return;
        }

        if (nombre.includes(";") || nombre.includes("=")) {
            mensaje.textContent = "El nombre no es válido.";
            return;
        }

        if (!existeCookie(nombre)) {
            mensaje.textContent =
                "La cookie no existe.";
            return;
        }

        crearCookie(nombre, valor);
        mensaje.textContent =
            "Cookie modificada correctamente.";
        leerCookies();
    });

// Eliminar una cookie
document.getElementById("btnEliminar")
    .addEventListener("click", function() {
        const nombre = nombreInput.value.trim();

        if (!nombre) {
            mensaje.textContent =
                "Introduce el nombre de la cookie.";
            return;
        }

        if (!existeCookie(nombre)) {
            mensaje.textContent =
                "La cookie no existe.";
            return;
        }

        document.cookie =
            `${encodeURIComponent(nombre)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;

        mensaje.textContent =
            "Cookie eliminada.";
        leerCookies();
    });

// Actualizar la lista al pulsar el botón
document.getElementById("btnLeer")
    .addEventListener("click", leerCookies);

// Mostrar las cookies al abrir la página
leerCookies();
