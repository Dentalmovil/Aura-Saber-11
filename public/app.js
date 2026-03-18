// public/app.js

const enunciadoTxt = document.getElementById('txt');
const opcionesContainer = document.getElementById('opts');

// Función para cargar una nueva pregunta desde la API
async function obtenerPregunta() {
    try {
        enunciadoTxt.innerText = "Cargando pregunta...";
        opcionesContainer.innerHTML = '';

        const respuesta = await fetch('/api/pregunta');
        const data = await respuesta.json();

        if (!data || !data.enunciado) {
            enunciadoTxt.innerText = "No hay preguntas disponibles.";
            return;
        }

        enunciadoTxt.innerText = data.enunciado;

        // Crear botones para cada opción
        data.opciones.forEach(opt => {
            const boton = document.createElement('button');
            boton.className = 'btn';
            boton.innerText = opt.texto_opcion;
            
            // Evento al hacer click en la opción
            boton.onclick = () => verificarRespuesta(opt.id_opcion, boton);
            
            opcionesContainer.appendChild(boton);
        });
    } catch (error) {
        console.error("Error al obtener la pregunta:", error);
        enunciadoTxt.innerText = "Error de conexión con el servidor.";
    }
}

// Función para enviar la respuesta al servidor y validar
async function verificarRespuesta(idOpcion, botonSeleccionado) {
    // Deshabilitar todos los botones para evitar múltiples clics
    const botones = document.querySelectorAll('.btn');
    botones.forEach(b => b.disabled = true);

    try {
        const respuesta = await fetch('/api/verificar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_opcion: idOpcion })
        });
        
        const resultado = await respuesta.json();

        if (resultado.es_correcta) {
            botonSeleccionado.style.backgroundColor = "#22c55e"; // Verde éxito
            botonSeleccionado.style.color = "white";
        } else {
            botonSeleccionado.style.backgroundColor = "#ef4444"; // Rojo error
            botonSeleccionado.style.color = "white";
        }

        // Esperar 1.5 segundos y cargar la siguiente pregunta
        setTimeout(obtenerPregunta, 1500);

    } catch (error) {
        console.error("Error al verificar:", error);
        alert("Hubo un problema al validar tu respuesta.");
    }
}

// Iniciar la primera pregunta al cargar la página
document.addEventListener('DOMContentLoaded', obtenerPregunta);
