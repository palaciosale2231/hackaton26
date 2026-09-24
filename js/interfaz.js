document.addEventListener("DOMContentLoaded", () => {
  console.log("Módulo de Introducción cargado correctamente.");

  // Animación suave al hacer clic en enlaces internos
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
