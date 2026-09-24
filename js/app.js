document.addEventListener("DOMContentLoaded", () => {
  let edadSeleccionada = "adulto";

  // 1. Cargar las Cards del ciclo
  const contenedorCiclo = document.getElementById("contenedor-ciclo");
  if (contenedorCiclo) {
    contenedorCiclo.innerHTML = CICLO_MOSQUITO.map(
      (item) => `
      <div class="card">
        <div>
          <div class="card-header">
            <span class="badge-fase ${item.badgeClass}">${item.etapa}</span>
            <span class="duracion">⏱ ${item.duracion}</span>
          </div>
          <div class="card-body">
            <h4>¿Dónde se encuentra?</h4>
            <p>${item.donde}</p>
          </div>
        </div>
        <div class="card-footer">
          <strong>💡 Control / Prevención:</strong>
          <p>${item.accion}</p>
        </div>
      </div>
    `,
    ).join("");
  }

  // 2. Cargar Checkboxes de Síntomas
  const contenedorSintomas = document.getElementById("contenedor-sintomas");
  if (contenedorSintomas) {
    contenedorSintomas.innerHTML = SINTOMAS_LIST.map(
      (s) => `
      <label class="checkbox-label">
        <input type="checkbox" value="${s.id}" class="sintoma-check">
        <span>${s.label}</span>
      </label>
    `,
    ).join("");
  }

  // 3. Botones de Selección de Edad
  const btnsEdad = document.querySelectorAll(".btn-edad");
  btnsEdad.forEach((btn) => {
    btn.addEventListener("click", () => {
      btnsEdad.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      edadSeleccionada = btn.getAttribute("data-edad");
    });
  });

  // 4. Evaluar Triage
  const formTriage = document.getElementById("form-triage");
  const cajaResultado = document.getElementById("caja-resultado");

  formTriage.addEventListener("submit", (e) => {
    e.preventDefault();
    const seleccionados = document.querySelectorAll(".sintoma-check:checked");

    if (seleccionados.length === 0) {
      cajaResultado.className = "resultado-box alerta-amarillo";
      cajaResultado.innerHTML = `
        <h4>⚠️ Selección requerida</h4>
        <p>Por favor marca al menos un síntoma presente para evaluar.</p>
      `;
    } else if (edadSeleccionada === "bebe") {
      cajaResultado.className = "resultado-box alerta-rojo";
      cajaResultado.innerHTML = `
        <h4>🚨 Atención Prioritaria - Lactantes / Bebés</h4>
        <p>En bebés y niños pequeños, la presencia de fiebre o irritabilidad requiere <strong>consulta médica presencial inmediata</strong>.</p>
        <p style="margin-top: 0.5rem;">⛔ <strong>NO automedicar</strong> (evitar ibuprofeno o aspirinas).</p>
      `;
    } else {
      cajaResultado.className = "resultado-box alerta-verde";
      cajaResultado.innerHTML = `
        <h4>📋 Pautas de Orientación General</h4>
        <p>Guardar reposo absoluto y mantener hidratación abundante con agua.</p>
        <p style="margin-top: 0.5rem;">Acudir a la guardia médica ante dolor abdominal intenso o vómitos continuos.</p>
      `;
    }
  });

  // 5. Formulario Reporte
  const formReporte = document.getElementById("form-reporte");
  const msgExito = document.getElementById("msg-reporte-exito");
  const btnReporte = document.getElementById("btn-reporte");

  formReporte.addEventListener("submit", (e) => {
    e.preventDefault();
    btnReporte.textContent = "Registrando...";

    setTimeout(() => {
      btnReporte.textContent = "Enviar Reporte";
      msgExito.classList.remove("hidden");
      document.getElementById("rep-direccion").value = "";
      document.getElementById("rep-desc").value = "";

      setTimeout(() => {
        msgExito.classList.add("hidden");
      }, 4000);
    }, 1000);
  });
});
