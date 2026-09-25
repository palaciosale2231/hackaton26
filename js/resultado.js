const porcentaje = Number(localStorage.getItem("porcentajePrevencion"));

const recomendaciones =
  JSON.parse(localStorage.getItem("recomendaciones")) || [];

const porcentajeElemento = document.getElementById("porcentaje");
const mensajeElemento = document.getElementById("mensaje");
const resultadoElemento = document.getElementById("resultado");
const recomendacionesElemento =
  document.getElementById("recomendaciones");

porcentajeElemento.textContent = porcentaje + "%";

if (porcentaje >= 80) {
  resultadoElemento.classList.add("bg-success", "text-white");

  mensajeElemento.textContent =
    "¡Vas por buen camino! Seguí manteniendo tus hábitos preventivos.";
} else if (porcentaje >= 60) {
  resultadoElemento.classList.add("bg-warning");

  mensajeElemento.textContent =
    "Tu nivel de prevención es moderado. Hay algunas medidas que podrías mejorar.";
} else {
  resultadoElemento.classList.add("bg-danger", "text-white");

  mensajeElemento.textContent =
    "Hay algunas medidas de prevención que podrías mejorar.";
}

if (recomendaciones.length === 0) {
  recomendacionesElemento.innerHTML = `
    <div class="alert alert-success">
      No se detectaron medidas preventivas que requieran atención.
      ¡Seguí manteniendo estos hábitos!
    </div>
  `;
} else {
  // Botón para ver todas las recomendaciones que necesita mejorar
  const botonTodas = document.createElement("a");

  botonTodas.href =
    `prevencion.html?preguntas=${recomendaciones.join(",")}`;

  botonTodas.textContent = "Ver todas mis recomendaciones →";

  botonTodas.classList.add("btn", "btn-success", "mb-4");

  recomendacionesElemento.appendChild(botonTodas);

  // Mostrar cada recomendación individual
  recomendaciones.forEach(function (nombrePregunta) {
    const recomendacion =
      recomendacionesPrevencion[nombrePregunta];

    if (!recomendacion) {
      return;
    }

    const tarjeta = document.createElement("div");

    tarjeta.classList.add("alert", "alert-danger", "mb-3");

    const titulo = document.createElement("h5");
    titulo.textContent = recomendacion.titulo;

    const texto = document.createElement("p");
    texto.textContent = recomendacion.descripcion;

    const link = document.createElement("a");

    link.href =
      `prevencion.html?preguntas=${nombrePregunta}`;

    link.textContent =
      "Conocé cómo prevenir esta situación →";

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(texto);
    tarjeta.appendChild(link);

    recomendacionesElemento.appendChild(tarjeta);
  });
}