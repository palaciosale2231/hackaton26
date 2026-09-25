const contenedor = document.getElementById("todas-recomendaciones");
const titulo = document.getElementById("titulo-recomendaciones");

const parametros = new URLSearchParams(window.location.search);
const preguntas = parametros.get("preguntas");


// ============================================================
// IMÁGENES DE CADA RECOMENDACIÓN
// ============================================================

const imagenesPrevencion = {
  pregunta1: "assets/img/primera.jpg",
  pregunta2: "assets/img/segunda.jpg",
  pregunta3: "assets/img/tres.jpeg",
  pregunta4: "assets/img/cuatro.webp",
  pregunta5: "assets/img/cinco.webp",
  pregunta6: "assets/img/seis.webp",
  pregunta7: "assets/img/seven.webp",
  pregunta8: "assets/img/ocho.webp",
  pregunta9: "assets/img/nueve.jpg",
  pregunta10: "assets/img/diez.webp",
  pregunta11: "assets/img/once.png",
  pregunta12: "assets/img/doce.webp",
  pregunta13: "assets/img/trece.webp",
  pregunta14: "assets/img/catorce.webp",
  pregunta15: "assets/img/quince.webp",
};


// ============================================================
// DETERMINAR QUÉ RECOMENDACIONES MOSTRAR
// ============================================================

let recomendacionesAMostrar = [];

if (preguntas) {
  const preguntasSeleccionadas = preguntas.split(",");

  recomendacionesAMostrar = preguntasSeleccionadas
    .map(function (nombrePregunta) {
      return {
        nombre: nombrePregunta,
        recomendacion: recomendacionesPrevencion[nombrePregunta],
      };
    })
    .filter(function (item) {
      return item.recomendacion;
    });

  titulo.innerHTML = `
    <h2>Recomendaciones para vos</h2>

    <p>
      Según tus respuestas en la evaluación, estas son las medidas que más
      te conviene tener en cuenta.
    </p>
  `;
} else {
  recomendacionesAMostrar = Object.entries(
    recomendacionesPrevencion
  ).map(function ([nombre, recomendacion]) {
    return {
      nombre: nombre,
      recomendacion: recomendacion,
    };
  });

  titulo.innerHTML = `
    <h2>Todas las recomendaciones</h2>

    <p>
      Acá podés encontrar distintas formas sencillas de prevenir y cuidarte.
    </p>
  `;
}


// ============================================================
// MOSTRAR LAS CARDS
// ============================================================

if (recomendacionesAMostrar.length === 0) {
  contenedor.innerHTML = `
    <div class="col-12">
      <div class="alert alert-success">
        No hay recomendaciones para mostrar.
      </div>
    </div>
  `;
} else {
  recomendacionesAMostrar.forEach(function (item) {
    const nombrePregunta = item.nombre;
    const recomendacion = item.recomendacion;

    const tarjeta = document.createElement("div");

    // Bootstrap:
    // Celular = 1 card
    // Tablet = 2 cards
    // PC = 3 cards
    tarjeta.classList.add(
      "col-12",
      "col-md-6",
      "col-lg-4"
    );

    const imagen = imagenesPrevencion[nombrePregunta];

    tarjeta.innerHTML = `
      <div class="card h-100 shadow-sm">

        <img
          src="${imagen}"
          class="card-img-top"
          style="height: 210px; object-fit: cover;"
          alt="${recomendacion.titulo}"
        />

        <div class="card-body d-flex flex-column">

          <span class="badge text-bg-success align-self-start mb-2">
            ${recomendacion.categoria}
          </span>

          <h3 class="card-title fs-4">
            ${recomendacion.titulo}
          </h3>

          <p class="card-text">
            ${recomendacion.descripcion}
          </p>

        </div>

      </div>
    `;

    contenedor.appendChild(tarjeta);
  });
}