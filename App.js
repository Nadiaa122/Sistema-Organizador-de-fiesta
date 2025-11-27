// --- Cargar fiestas al iniciar ---
document.addEventListener("DOMContentLoaded", cargarFiestas);

const form = document.getElementById("formFiesta");

// --- Guardar fiesta ---
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const fiesta = {
            nombre: document.getElementById("nombre").value,
            fecha: document.getElementById("fecha").value,
            ubicacion: document.getElementById("ubicacion").value,
            descripcion: document.getElementById("descripcion").value
        };

        // Validación rápida
        if (fiesta.nombre.trim() === "") {
            alert("El nombre no puede quedar vacío.");
            return;
        }

        guardarFiesta(fiesta);
        cargarFiestas();
        form.reset();
    });
}

function guardarFiesta(fiesta) {
    let fiestas = JSON.parse(localStorage.getItem("fiestas")) || [];
    fiestas.push(fiesta);
    localStorage.setItem("fiestas", JSON.stringify(fiestas));
}

// --- Mostrar fiestas ---
function cargarFiestas() {
    const lista = document.getElementById("listaFiestas");
    if (!lista) return;

    let fiestas = JSON.parse(localStorage.getItem("fiestas")) || [];
    lista.innerHTML = "";

    fiestas.forEach((fiesta, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${fiesta.nombre}</strong>
            <br>📅 ${fiesta.fecha}
            <br>📍 ${fiesta.ubicacion}
            <br>${fiesta.descripcion ? "📝 " + fiesta.descripcion : ""}
            <br>
            <button class="btn-eliminar" onclick="eliminarFiesta(${index})">Eliminar</button>
        `;

        lista.appendChild(li);
    });
}

// --- Eliminar fiesta ---
function eliminarFiesta(i) {
    let fiestas = JSON.parse(localStorage.getItem("fiestas")) || [];
    fiestas.splice(i, 1);
    localStorage.setItem("fiestas", JSON.stringify(fiestas));
    cargarFiestas();
}
