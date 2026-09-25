const botonModoOscuro = document.getElementById("modoOscuro");

if (botonModoOscuro) {
  const modoOscuroActivo = localStorage.getItem("modo") === "oscuro";
  document.body.classList.toggle("dark-mode", modoOscuroActivo);
  botonModoOscuro.textContent = modoOscuroActivo ? "☀️" : "🌙";

  botonModoOscuro.addEventListener("click", () => {
    const modoOscuro = document.body.classList.toggle("dark-mode");
    localStorage.setItem("modo", modoOscuro ? "oscuro" : "claro");
    botonModoOscuro.textContent = modoOscuro ? "☀️" : "🌙";
  });
}