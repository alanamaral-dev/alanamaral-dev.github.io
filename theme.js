// Tema claro (Alucard) e escuro (Dracula). Roda no <head> para evitar piscada.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('tema'); } catch (e) {}
  var dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', dark ? 'dark' : 'light');

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('theme-toggle').addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('tema', next); } catch (e) {}
    });
  });
})();
