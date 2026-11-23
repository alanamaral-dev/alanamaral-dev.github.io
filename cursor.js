// Rastro de código Python que segue o cursor e vai desaparecendo.
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (matchMedia('(pointer: coarse)').matches) return;

  var canvas = document.getElementById('trail'), ctx = canvas.getContext('2d');
  var dpr = Math.min(devicePixelRatio || 1, 2), W, H;
  function resize() {
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize(); addEventListener('resize', resize);

  var snippets = ['def', 'async def', 'await', 'import', 'return', 'yield', 'class', 'lambda',
    '@app.get', 'self', '-> dict', 'try:', 'except', 'with open', 'for i in', 'if __name__',
    'FastAPI()', 'SELECT', 'JOIN', 'pip install', '{ }', '[ ]', '==', '"ok"', 'None', 'True', 'print()'];
  var vars = ['--cyan', '--green', '--orange', '--pink', '--purple', '--yellow'];
  var parts = [], last = { x: -999, y: -999 }, mouse = { x: -999, y: -999 }, caret = { x: -999, y: -999 };

  addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    mouse.x = e.clientX; mouse.y = e.clientY;
    if (caret.x < 0) { caret.x = mouse.x; caret.y = mouse.y; }
    var dx = mouse.x - last.x, dy = mouse.y - last.y;
    if (dx * dx + dy * dy > 900) {
      last.x = mouse.x; last.y = mouse.y;
      var css = getComputedStyle(document.documentElement);
      parts.push({
        x: mouse.x + 12, y: mouse.y + 12,
        vx: (Math.random() - 0.5) * 0.5, vy: 0.25 + Math.random() * 0.45,
        text: snippets[(Math.random() * snippets.length) | 0],
        color: css.getPropertyValue(vars[(Math.random() * vars.length) | 0]).trim(),
        size: 12 + Math.random() * 5, life: 1
      });
      if (parts.length > 70) parts.shift();
    }
  });

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i];
      p.life -= 0.014; p.x += p.vx; p.y += p.vy;
      if (p.life <= 0) { parts.splice(i, 1); continue; }
      ctx.globalAlpha = p.life * 0.9;
      ctx.fillStyle = p.color;
      ctx.font = '500 ' + p.size + 'px "JetBrains Mono", monospace';
      ctx.fillText(p.text, p.x, p.y);
    }
    // Cursor em bloco, como no editor, com atraso suave.
    if (caret.x > 0) {
      caret.x += (mouse.x - caret.x) * 0.22; caret.y += (mouse.y - caret.y) * 0.22;
      ctx.globalAlpha = 0.55 + 0.35 * Math.sin(Date.now() / 220);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--pink').trim();
      ctx.fillRect(caret.x - 1, caret.y - 9, 9, 18);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  frame();
})();
