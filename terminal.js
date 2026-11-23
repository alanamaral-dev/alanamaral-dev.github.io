// Terminal interativo do portfólio.
(function () {
  var out = document.getElementById('term-out'), input = document.getElementById('term-in'), body = document.getElementById('term-body');
  if (!out) return;

  var EMAIL = 'alanamarallaf@gmail.com', GH = 'https://github.com/alanamaral-dev';
  var esc = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
  var a = function (u, t) { return '<a href="' + u + '" target="_blank" rel="noopener">' + (t || u) + '</a>'; };
  var c = function (cls, t) { return '<span class="' + cls + '">' + t + '</span>'; };
  var hist = [], hi = 0;

  function print(html) {
    var d = document.createElement('div'); d.className = 'ln'; d.innerHTML = html || '&nbsp;';
    out.appendChild(d); body.scrollTop = body.scrollHeight;
  }

  var cmds = {
    help: function () { return [
      'Comandos disponíveis:',
      c('t-f', 'sobre') + '      quem sou eu',
      c('t-f', 'foco') + '       o que quero fazer',
      c('t-f', 'formacao') + '   onde estudo',
      c('t-f', 'projetos') + '   o que já construí',
      c('t-f', 'github') + '     meu perfil de código',
      c('t-f', 'contato') + '    como falar comigo',
      c('t-f', 'tema') + '       alternar claro e escuro',
      c('t-f', 'clear') + '      limpar a tela'
    ]; },
    sobre: function () { return [
      c('t-d', 'Alan do Amaral') + ', 21 anos, nascido em Brasília.',
      'Estudante de Engenharia de Software na UDF.',
      'Quero atuar com ' + c('t-s', 'backend em Python') + '.'
    ]; },
    foco: function () { return [
      c('t-k', 'for') + ' area ' + c('t-k', 'in') + ' [' + c('t-s', '"Python"') + ', ' + c('t-s', '"APIs REST"') + ', ' + c('t-s', '"Bancos de dados"') + ',',
      '             ' + c('t-s', '"Arquitetura"') + ', ' + c('t-s', '"Testes e Git"') + ', ' + c('t-s', '"Segurança"') + ']:',
      '    ' + c('t-f', 'estudar') + '(area)'
    ]; },
    formacao: function () { return ['Engenharia de Software, UDF (Brasília, DF)']; },
    projetos: function () { return [
      '1. ' + a(GH + '/controleFinanceiro', 'controleFinanceiro') + '  controle financeiro em Python',
      '2. ' + a(GH + '/estoque-py', 'estoque-py') + '  controle de estoque em Python'
    ]; },
    github: function () { return [a(GH)]; },
    contato: function () { return ['E-mail: ' + a('mailto:' + EMAIL, EMAIL), 'GitHub: ' + a(GH)]; },
    whoami: function () { return ['alan']; },
    ls: function () { return ['sobre.txt   foco.py   projetos/   contato.md']; },
    date: function () { return [new Date().toLocaleString('pt-BR')]; },
    python: function () { return [c('t-n', '>>> ') + 'import this', 'Bonito é melhor que feio.', 'Explícito é melhor que implícito.', 'Simples é melhor que complexo.'] ; },
    sudo: function () { return ['alan não está no arquivo sudoers. Este incidente será relatado. (brincadeira)']; },
    tema: function () { document.getElementById('theme-toggle').click(); return ['Tema alternado.']; },
    clear: function () { out.innerHTML = ''; return []; }
  };
  var aliases = { skills: 'foco', 'cat sobre.txt': 'sobre', 'cat foco.py': 'foco', 'cat contato.md': 'contato', email: 'contato', ajuda: 'help', formação: 'formacao' };

  function run(raw) {
    var cmd = raw.trim().toLowerCase();
    print(c('p', 'alan@portfolio') + c('d', ':~$') + ' ' + esc(raw));
    if (!cmd) return;
    hist.push(raw); hi = hist.length;
    var fn = cmds[aliases[cmd] || cmd];
    if (!fn) { print(c('t-r', 'comando não encontrado: ' + esc(cmd)) + '. Digite ' + c('t-f', 'help') + '.'); return; }
    fn().forEach(print);
  }

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { run(input.value); input.value = ''; }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (hi > 0) input.value = hist[--hi]; }
    else if (e.key === 'ArrowDown') { e.preventDefault(); input.value = hi < hist.length - 1 ? hist[++hi] : (hi = hist.length, ''); }
    else if (e.key === 'Tab') {
      e.preventDefault();
      var m = Object.keys(cmds).filter(function (k) { return k.indexOf(input.value.toLowerCase()) === 0; });
      if (input.value && m.length === 1) input.value = m[0];
    }
  });
  body.addEventListener('click', function () { if (!getSelection().toString()) input.focus(); });
  document.querySelectorAll('[data-cmd]').forEach(function (b) {
    b.addEventListener('click', function () { run(b.dataset.cmd); });
  });

  print(c('t-d', 'Bem-vindo ao portfólio do Alan.'));
  print('Digite ' + c('t-f', 'help') + ' para ver os comandos.');
})();
