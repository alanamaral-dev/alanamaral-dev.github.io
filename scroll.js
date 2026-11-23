// Rolagem fluida com inércia (a página desliza em vez de pular).
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (matchMedia('(pointer: coarse)').matches) return; // toque já tem inércia nativa

  var root = document.documentElement;
  var current = window.scrollY, target = current, ease = 0.085, running = false;
  var max = function () { return root.scrollHeight - innerHeight; };
  var clamp = function (v) { return Math.max(0, Math.min(v, max())); };

  function loop() {
    current += (target - current) * ease;
    if (Math.abs(target - current) < 0.4) { current = target; running = false; }
    window.scrollTo(0, current);
    if (running) requestAnimationFrame(loop);
  }
  function go() { if (!running) { running = true; requestAnimationFrame(loop); } }

  // Deixa o terminal rolar sozinho quando ele tem conteúdo a mais.
  function nativeArea(e) {
    var el = e.target.closest && e.target.closest('[data-native-scroll]');
    if (!el || el.scrollHeight <= el.clientHeight) return false;
    var top = el.scrollTop <= 0 && e.deltaY < 0;
    var bottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1 && e.deltaY > 0;
    return !(top || bottom);
  }

  addEventListener('wheel', function (e) {
    if (e.ctrlKey || nativeArea(e)) return;
    e.preventDefault();
    var d = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY;
    target = clamp(target + d);
    go();
  }, { passive: false });

  // Sincroniza quando a rolagem muda por teclado, barra ou outro meio.
  addEventListener('scroll', function () {
    if (!running && Math.abs(window.scrollY - current) > 2) current = target = window.scrollY;
  }, { passive: true });
  addEventListener('resize', function () { target = clamp(target); });

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      target = clamp(el.getBoundingClientRect().top + window.scrollY - 70);
      go();
    });
  });
})();
