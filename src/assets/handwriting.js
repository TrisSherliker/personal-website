/* Resolve handwriting spans in a post.
 *
 * The Markdown holds [word]{data-ink=id data-adv=1.234}, which is Pandoc's bracketed
 * span syntax. This site renders Markdown with @tufte-markdown/parser, which knows
 * nothing about it and passes the brackets through as literal text — so they are
 * resolved here instead, in the browser.
 *
 * Each span becomes a word-sized box holding the ink for that word, fetched once from
 * the post's own ink/ directory and inlined. Inlining matters: an <img> could not be
 * recoloured by CSS, and colour is meant to be tunable. The word itself stays in the
 * DOM as text so selection, find-in-page and screen readers keep working.
 */
(function () {
  var PATTERN = /\[([^\]\n]*)\]\{data-ink=([A-Za-z0-9_]+)(?:\s+data-adv=([0-9.]+))?\}/g;

  function inkBase() {
    // the post's own directory, so a post is self-contained and movable
    var p = window.location.pathname;
    return (p.endsWith('/') ? p : p + '/') + 'ink/';
  }

  var cache = {};
  function loadInk(id) {
    if (!cache[id]) {
      cache[id] = fetch(inkBase() + id + '.svg')
        .then(function (r) { return r.ok ? r.text() : null; })
        .catch(function () { return null; });
    }
    return cache[id];
  }

  function buildSpan(text, id, adv, doc) {
    var span = doc.createElement('span');
    span.className = 'hw-w';
    span.dataset.ink = id;
    span.style.setProperty('--hw-adv', adv || 1);
    var label = doc.createElement('span');
    label.className = 'hw-t';
    label.textContent = text;
    span.appendChild(label);
    return span;
  }

  function resolve(root) {
    var doc = root.ownerDocument || document;
    var walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var targets = [], n;
    while ((n = walker.nextNode())) {
      if (n.nodeValue.indexOf('data-ink=') !== -1) targets.push(n);
    }

    var pending = [];
    targets.forEach(function (node) {
      var frag = doc.createDocumentFragment();
      var last = 0, m;
      PATTERN.lastIndex = 0;
      while ((m = PATTERN.exec(node.nodeValue))) {
        if (m.index > last) {
          frag.appendChild(doc.createTextNode(node.nodeValue.slice(last, m.index)));
        }
        var span = buildSpan(m[1], m[2], m[3], doc);
        frag.appendChild(span);
        pending.push(span);
        last = m.index + m[0].length;
      }
      if (!pending.length && last === 0) return;
      if (last < node.nodeValue.length) {
        frag.appendChild(doc.createTextNode(node.nodeValue.slice(last)));
      }
      node.parentNode.replaceChild(frag, node);
    });

    // Height and baseline come from the container's data attributes. They are written
    // UNITLESS: the stylesheet multiplies them by the scale and by 1rem, and a value
    // carrying 'em' makes that calc invalid, which collapses every word to nothing.
    var asc = parseFloat(root.dataset.hwAscent), desc = parseFloat(root.dataset.hwDescent),
        em = parseFloat(root.dataset.hwEm);
    if (asc && desc && em) {
      root.style.setProperty('--hw-height', ((asc + desc) / em).toFixed(3));
      root.style.setProperty('--hw-baseline', (-desc / em).toFixed(3));
    }

    pending.forEach(function (span) {
      loadInk(span.dataset.ink).then(function (svgText) {
        if (!svgText) return;                 // no ink: the text label shows instead
        var holder = doc.createElement('div');
        holder.innerHTML = svgText;
        var svg = holder.querySelector('svg');
        if (!svg) return;
        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        span.insertBefore(svg, span.firstChild);
        span.classList.add('hw-ready');
      });
    });
    return pending.length;
  }

  var INKS = [
    ['black',      '#111111'],
    ['blue-black', '#1b2a4a'],
    ['oxblood',    '#8f2027'],
    ['sepia',      '#6b4a2b']
  ];

  /* Each slider sits centrally at its default, with a minus and plus either side for
   * fine adjustment. Weight is the exception in kind rather than layout: it centres on
   * zero, meaning the pen's own weight, and runs negative to thin as well as positive
   * to thicken. */
  function slider(root, label, opts) {
    var wrap = document.createElement('label');
    var name = document.createElement('span');
    name.textContent = label;

    var minus = document.createElement('button');
    minus.type = 'button'; minus.className = 'hw-step'; minus.textContent = '\u2212';
    minus.setAttribute('aria-label', 'decrease ' + label);

    var input = document.createElement('input');
    input.type = 'range';
    input.min = opts.min; input.max = opts.max; input.step = opts.step;
    input.value = opts.value;

    var plus = document.createElement('button');
    plus.type = 'button'; plus.className = 'hw-step'; plus.textContent = '+';
    plus.setAttribute('aria-label', 'increase ' + label);

    var out = document.createElement('span');
    out.className = 'hw-val';

    function apply() {
      var v = parseFloat(input.value);
      (opts.set || function (val) {
        root.style.setProperty(opts.prop, val + (opts.unit || ''));
      })(v);
      out.textContent = opts.fmt ? opts.fmt(v) : v;
    }
    function nudge(dir) {
      input.value = Math.min(opts.max, Math.max(opts.min,
        parseFloat(input.value) + dir * parseFloat(opts.step)));
      apply();
    }
    input.addEventListener('input', apply);
    minus.addEventListener('click', function () { nudge(-1); });
    plus.addEventListener('click', function () { nudge(1); });
    apply();

    wrap.appendChild(name); wrap.appendChild(minus); wrap.appendChild(input);
    wrap.appendChild(plus); wrap.appendChild(out);
    return wrap;
  }

  function addControls(root) {
    var bar = document.createElement('div');
    bar.className = 'hw-controls';

    var typed = document.createElement('button');
    typed.type = 'button';
    typed.textContent = 'Show as typed text';
    typed.addEventListener('click', function () {
      var on = root.classList.toggle('hw-typed');
      typed.textContent = on ? 'Show the handwriting' : 'Show as typed text';
    });
    var cell = document.createElement('div');
    cell.appendChild(typed);
    bar.appendChild(cell);

    bar.appendChild(slider(root, 'size', {
      prop: '--hw-scale', min: 0.5, max: 3.5, step: 0.1, value: 2,
      fmt: function (v) { return v.toFixed(1) + '\u00d7'; } }));

    bar.appendChild(slider(root, 'word space', {
      prop: '--hw-space', min: 0, max: 1.2, step: 0.05, value: 0.2,
      fmt: function (v) { return v.toFixed(2); } }));

    bar.appendChild(slider(root, 'stroke', {
      min: -14, max: 14, step: 1, value: 5,
      set: function (v) {
        // negative paints paper over the edge of the mark, thinning it; positive
        // paints ink around it, thickening. Zero leaves the pen's own weight.
        root.style.setProperty('--hw-stroke-width', Math.abs(v) * 2);
        root.style.setProperty('--hw-stroke-colour',
          v < 0 ? 'var(--hw-paper)' : 'currentColor');
        root.style.setProperty('--hw-paint-order', v < 0 ? 'fill stroke' : 'stroke fill');
      },
      fmt: function (v) { return (v > 0 ? '+' : '') + v; } }));

    var inks = document.createElement('div');
    inks.className = 'hw-inks';
    var lab = document.createElement('span');
    lab.textContent = 'ink';
    lab.style.opacity = '.75';
    inks.appendChild(lab);
    INKS.forEach(function (pair, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.title = pair[0];
      b.setAttribute('aria-label', pair[0] + ' ink');
      b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      b.style.background = pair[1];
      b.addEventListener('click', function () {
        root.style.setProperty('--hw-ink', pair[1]);
        inks.querySelectorAll('button').forEach(function (o) {
          o.setAttribute('aria-pressed', o === b ? 'true' : 'false');
        });
      });
      inks.appendChild(b);
    });
    bar.appendChild(inks);

    root.parentNode.insertBefore(bar, root);
  }

  function init() {
    document.querySelectorAll('.handwriting').forEach(function (root) {
      if (resolve(root)) addControls(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
