/* Scrollytelling de la sección "historia": el panel de la izquierda cambia
   segun el paso que este mas cerca del centro de la pantalla.
   Sin este archivo la pagina sigue funcionando: el primer panel queda visible. */
(function () {
  "use strict";

  function list(nodes) {
    return Array.prototype.slice.call(nodes);
  }

  function setup(root) {
    var steps = list(root.querySelectorAll(".scrolly-step"));
    var panels = list(root.querySelectorAll(".scrolly__panel"));
    if (!steps.length) return;

    var actual = -1;
    var ticking = false;

    function activate(index) {
      if (index === actual) return;
      actual = index;
      for (var i = 0; i < steps.length; i++) {
        steps[i].classList.toggle("is-active", i === index);
      }
      for (var p = 0; p < panels.length; p++) {
        panels[p].classList.toggle("is-active", p === index);
      }
    }

    function update() {
      ticking = false;
      var medio = window.innerHeight * 0.5;
      var mejor = 0;
      var menor = Infinity;

      for (var i = 0; i < steps.length; i++) {
        var caja = steps[i].getBoundingClientRect();
        var centro = caja.top + caja.height / 2;
        var distancia = Math.abs(centro - medio);
        if (distancia < menor) {
          menor = distancia;
          mejor = i;
        }
      }

      activate(mejor);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  function init() {
    var roots = list(document.querySelectorAll("[data-scrolly]"));
    for (var i = 0; i < roots.length; i++) setup(roots[i]);
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
