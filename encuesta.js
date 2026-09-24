// ==========================================
// PREGUNTAS DE LA ENCUESTA
// ==========================================

const preguntas = [
    {
        id: "pregunta1",
        texto: "¿Cada cuánto revisás el patio o los alrededores de tu casa para ver si quedó agua acumulada?",
        opciones: [
            { texto: "Lo reviso seguido", valor: 2 },
            { texto: "Lo reviso algunas veces", valor: 1 },
            { texto: "Casi nunca lo reviso", valor: 0 },
            { texto: "No tengo patio ni espacio exterior", valor: "na" }
        ]
    },
    {
        id: "pregunta2",
        texto: "Cuando llueve, ¿qué hacés con las cosas que pueden juntar agua?",
        opciones: [
            { texto: "Las tapo, las guardo o las doy vuelta", valor: 2 },
            { texto: "Algunas quedan afuera", valor: 1 },
            { texto: "Las dejo afuera", valor: 0 },
            { texto: "No tengo cosas de este tipo", valor: "na" }
        ]
    },
    {
        id: "pregunta3",
        texto: "Si tenés mascotas, ¿cada cuánto cambiás el agua de sus recipientes?",
        opciones: [
            { texto: "La cambio seguido y limpio el recipiente", valor: 2 },
            { texto: "La cambio algunas veces", valor: 1 },
            { texto: "Casi nunca la cambio", valor: 0 },
            { texto: "No tengo mascotas", valor: "na" }
        ]
    },
    {
        id: "pregunta4",
        texto: "Si guardás agua en tu casa, ¿cómo mantenés los recipientes?",
        opciones: [
            { texto: "Están todos bien tapados", valor: 2 },
            { texto: "Algunos están tapados", valor: 1 },
            { texto: "Quedan destapados", valor: 0 },
            { texto: "No guardo agua", valor: "na" }
        ]
    },
    {
        id: "pregunta5",
        texto: "¿Qué hacés con las cosas que ya no usás y pueden juntar agua?",
        opciones: [
            { texto: "Las guardo, las tiro o las dejo dadas vuelta", valor: 2 },
            { texto: "Algunas quedan afuera", valor: 1 },
            { texto: "Las dejo afuera", valor: 0 },
            { texto: "No tengo cosas de este tipo", valor: "na" }
        ]
    },
    {
        id: "pregunta6",
        texto: "Si tenés un tanque o algún recipiente grande con agua, ¿cómo lo tenés?",
        opciones: [
            { texto: "Está bien tapado", valor: 2 },
            { texto: "A veces queda un poco destapado", valor: 1 },
            { texto: "Está destapado", valor: 0 },
            { texto: "No tengo ninguno", valor: "na" }
        ]
    },
    {
        id: "pregunta7",
        texto: "¿Revisás las canaletas y desagües para ver si tienen agua o están tapados?",
        opciones: [
            { texto: "Sí, los reviso y los mantengo limpios", valor: 2 },
            { texto: "Los reviso algunas veces", valor: 1 },
            { texto: "Casi nunca los reviso", valor: 0 },
            { texto: "No tengo canaletas ni desagües de ese tipo", valor: "na" }
        ]
    },
    {
        id: "pregunta8",
        texto: "Si encontrás agua acumulada en algún lugar de tu casa o patio, ¿qué hacés?",
        opciones: [
            { texto: "La tiro y limpio el lugar", valor: 2 },
            { texto: "La saco algunas veces", valor: 1 },
            { texto: "Generalmente la dejo ahí", valor: 0 },
            { texto: "No suelo encontrar agua acumulada", valor: "na" }
        ]
    },
    {
        id: "pregunta9",
        texto: "Después de que llueve, ¿revisás el patio o los alrededores de tu casa?",
        opciones: [
            { texto: "Sí, reviso y tiro el agua que haya quedado", valor: 2 },
            { texto: "Lo hago algunas veces", valor: 1 },
            { texto: "Casi nunca lo hago", valor: 0 },
            { texto: "No tengo espacios exteriores para revisar", valor: "na" }
        ]
    },
    {
        id: "pregunta10",
        texto: "¿Tratás de mantener limpio y ordenado el patio o los lugares donde podría juntarse agua?",
        opciones: [
            { texto: "Sí, trato de mantenerlos limpios y ordenados", valor: 2 },
            { texto: "Generalmente sí, aunque a veces quedan cosas afuera", valor: 1 },
            { texto: "No suelo revisar ni ordenar esos lugares", valor: 0 },
            { texto: "No tengo lugares de este tipo", valor: "na" }
        ]
    }
];

// ==========================================
// VARIABLES
// ==========================================

let preguntaActual = 0;
const respuestas = new Array(preguntas.length).fill(null);

// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

const textoPregunta = document.getElementById("textoPregunta");
const opcionesContainer = document.getElementById("opciones");
const numeroPregunta = document.getElementById("numeroPregunta");
const preguntasRestantes = document.getElementById("preguntasRestantes");
const barraProgreso = document.getElementById("barraProgreso");
const btnAnterior = document.getElementById("btnAnterior");

// ==========================================
// MOSTRAR PREGUNTA
// ==========================================

function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    const totalPreguntas = preguntas.length;

    // Progreso
    numeroPregunta.textContent = `Pregunta ${preguntaActual + 1} de ${totalPreguntas}`;
    const restantes = totalPreguntas - preguntaActual - 1;
    preguntasRestantes.textContent = restantes === 1 ? "Te falta 1" : `Te faltan ${restantes}`;

    // Barra de progreso
    const progreso = (preguntaActual / totalPreguntas) * 100;
    barraProgreso.style.width = `${progreso}%`;

    // Texto de la pregunta
    textoPregunta.textContent = pregunta.texto;

    // Limpiar opciones
    opcionesContainer.innerHTML = "";

    // Ocultar botón Anterior si es la primera pregunta
    btnAnterior.hidden = (preguntaActual === 0);

    // Crear botones de las opciones
    pregunta.opciones.forEach((opcion, indice) => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.classList.add("opcion");
        boton.textContent = opcion.texto;

        if (respuestas[preguntaActual] === indice) {
            boton.classList.add("seleccionada");
        }

        // AUTO-AVANCE AL HACER CLIC
        boton.addEventListener("click", () => {
            respuestas[preguntaActual] = indice;

            // Bloquear botones para evitar doble clic
            document.querySelectorAll(".opcion").forEach(b => b.disabled = true);
            boton.classList.add("seleccionada");

            // Pasar automáticamente a la siguiente pregunta
            setTimeout(() => {
                if (preguntaActual === totalPreguntas - 1) {
                    calcularResultado();
                    return;
                }
                preguntaActual++;
                mostrarPregunta();
            }, 250);
        });

        opcionesContainer.appendChild(boton);
    });
}

// ==========================================
// BOTÓN ANTERIOR
// ==========================================

btnAnterior.addEventListener("click", () => {
    if (preguntaActual > 0) {
        preguntaActual--;
        mostrarPregunta();
    }
});

// ==========================================
// CALCULAR RESULTADO
// ==========================================

function calcularResultado() {
    let puntosObtenidos = 0;
    let puntosMaximos = 0;
    const recomendaciones = [];

    preguntas.forEach((pregunta, indice) => {
        const respuestaIndice = respuestas[indice];
        if (respuestaIndice === null) return;

        const respuesta = pregunta.opciones[respuestaIndice];
        if (respuesta.valor === "na") return;

        puntosMaximos += 2;
        puntosObtenidos += respuesta.valor;

        if (respuesta.valor < 2) {
            recomendaciones.push(pregunta.id);
        }
    });

    let porcentaje = 0;
    if (puntosMaximos > 0) {
        porcentaje = Math.round((puntosObtenidos / puntosMaximos) * 100);
    }

    localStorage.setItem("porcentajePrevencion", porcentaje);
    localStorage.setItem("recomendaciones", JSON.stringify(recomendaciones));
    localStorage.setItem("respuestasPrevencion", JSON.stringify(respuestas));

    window.location.href = "resultado.html";
}

// ==========================================
// INICIALIZACIÓN AL CARGAR EL DOM
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    mostrarPregunta();
});