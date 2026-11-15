/* Navegacion, progreso de lectura y arranque de la pagina del caso de estudio.
   No depende de nada: si este archivo no carga, la pagina sigue funcionando. */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    /* Enlaces opcionales: si nadie les puso URL, no se muestran.
       Al publicar, reemplazar href="#" por la URL real del repositorio. */
    var repos = document.querySelectorAll("[data-repo]");
    for (var i = 0; i < repos.length; i++) {
      var href = repos[i].getAttribute("href");
      if (href && href !== "#") repos[i].removeAttribute("hidden");
    }

    /* Carga diferida: solo las imagenes que estan dentro de <main>.
       Las del hero se cargan de entrada, que es lo unico que se ve al abrir. */
    var imgs = document.querySelectorAll("main img");
    for (var j = 0; j < imgs.length; j++) {
      if (!imgs[j].hasAttribute("loading")) imgs[j].setAttribute("loading", "lazy");
      imgs[j].setAttribute("decoding", "async");
    }

    var bar = document.getElementById("readProgress");
    var links = Array.prototype.slice.call(document.querySelectorAll("#navLinks a"));
    var targets = links
      .map(function (a) {
        return document.getElementById(a.getAttribute("href").slice(1));
      })
      .filter(Boolean);

    var ticking = false;

    function update() {
      ticking = false;

      var doc = document.documentElement;
      var total = doc.scrollHeight - window.innerHeight;
      var pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      if (bar) bar.style.width = Math.max(0, Math.min(100, pct)) + "%";

      var activo = null;
      for (var k = 0; k < targets.length; k++) {
        if (targets[k].getBoundingClientRect().top <= 96) activo = targets[k];
      }

      for (var m = 0; m < links.length; m++) {
        var on = activo !== null && links[m].getAttribute("href") === "#" + activo.id;
        links[m].classList.toggle("is-active", on);
        if (on) links[m].setAttribute("aria-current", "true");
        else links[m].removeAttribute("aria-current");
      }
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
  });
})();
