// Código digitado no hero, brilho dos cards, copiar e-mail.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Hero: Python digitado com realce de sintaxe ----
  var source = [
    'from fastapi import FastAPI',
    '',
    'app = FastAPI()',
    '',
    '@app.get("/alan")',
    'def alan():',
    '    return {',
    '        "nome": "Alan do Amaral",',
    '        "idade": 21,',
    '        "cidade": "Brasília",',
    '        "curso": "Engenharia de Software",',
    '        "foco": "Backend com Python",',
    '    }'
  ].join('\n');

  var codeEl = document.getElementById('code'), resp = document.getElementById('resp');
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function highlight(text) {
    return esc(text).replace(
      /("[^"]*"|@\w+(?:\.\w+)*|\b(?:from|import|def|return)\b|\b\d+\b|\b[A-Za-z_]\w*(?=\())/g,
      function (m) {
        var c = m[0] === '"' ? 's' : m[0] === '@' ? 'd' : /^\d/.test(m) ? 'n' : /^(from|import|def|return)$/.test(m) ? 'k' : 'f';
        return '<span class="t-' + c + '">' + m + '</span>';
      });
  }
  if (reduce) {
    codeEl.innerHTML = highlight(source); resp.classList.add('show');
  } else {
    var i = 0;
    (function type() {
      i++;
      codeEl.innerHTML = highlight(source.slice(0, i)) + '<span class="blink">▍</span>';
      if (i < source.length) setTimeout(type, source[i - 1] === '\n' ? 140 : 24);
      else { resp.classList.add('show'); codeEl.innerHTML = highlight(source) + '<span class="blink">▍</span>'; }
    })();
  }

  // ---- Cards: brilho que acompanha o cursor ----
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // ---- Entrada suave dos cards ----
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); setTimeout(function () { en.target.style.transitionDelay = ''; }, 1200); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.card, .dict').forEach(function (el, n) {
      el.classList.add('reveal'); el.style.transitionDelay = (n % 3) * 80 + 'ms'; io.observe(el);
    });
  }

  // ---- Copiar e-mail ----
  var copy = document.getElementById('copy');
  copy.addEventListener('click', function () {
    var done = function () { copy.textContent = 'E-mail copiado'; setTimeout(function () { copy.textContent = 'Copiar e-mail'; }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText('alanamarallaf@gmail.com').then(done, done); else done();
  });

  document.querySelectorAll('.year').forEach(function (y) { y.textContent = new Date().getFullYear(); });
})();
