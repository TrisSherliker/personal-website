// Ornaments an article with feathers chosen at random from window.FEATHERS,
// grouped { small, medium, large } by intended size (folders under
// src/assets/feathers/<bucket>/).
//
// Two very different layouts by viewport:
//  - Desktop (> BREAKPOINT): every h1/h2 gets a near-vertical feather hanging
//    in the LEFT margin (the sidenote-free gutter), sizes bumped 15%.
//  - Mobile (<= BREAKPOINT): no per-heading feathers. Instead one centred
//    feather on its own line under the page title and one at the end of the
//    article, near-horizontal — each on its own line so it can never touch text.
(function () {
  var GROUPS = window.FEATHERS || {};

  // ---- Tunable config ------------------------------------------------------
  var CONFIG = {
    small:  { size: [6.75, 8.55] },
    medium: { size: [10.8, 15.3] },
    large:  { size: [16.2, 22.05] }
  };
  var BREAKPOINT = 760;
  var DESKTOP_SCALE = 1.15;                      // desktop feathers 15% larger
  var DESKTOP_ANGLE = [-10, 10];                 // random within this range
  var MOBILE_ANGLES = [83, 86, 89, 92, 95, 98];  // random from this set
  var MARGIN_GAP_REM = 1.5;  // desktop: space from column edge into left margin
  // --------------------------------------------------------------------------

  var pool = [];
  Object.keys(CONFIG).forEach(function (bucket) {
    (GROUPS[bucket] || []).forEach(function (src) {
      pool.push({ src: src, bucket: bucket });
    });
  });
  if (!pool.length) return;

  var ROOT_REM = parseFloat(getComputedStyle(document.documentElement).fontSize) || 15;
  var recentMobile = [];
  var recentSrc = [];
  var builtMode = null;

  var XL = 1200;         // px: wide enough for a third left-margin feather
  var NON_BLOG_SCALE = 1.5; // non-blog pages get larger feathers
  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function randRange(a, b) { return a + Math.random() * (b - a); }
  function isDesktop() { return window.innerWidth > BREAKPOINT; }
  function isHome() { return document.body.classList.contains('home'); }
  function isBlogPost() { return document.body.classList.contains('post'); }
  function pageScale() { return isBlogPost() ? 1 : NON_BLOG_SCALE; }
  var MIN_TOP = 4; // px: keep feathers from cropping off the top of the article

  // Pick a feather whose image differs from the previous two, so no image
  // repeats within any run of three.
  function pickFeather() {
    var choices = pool.filter(function (p) { return recentSrc.indexOf(p.src) === -1; });
    if (!choices.length) choices = pool;
    var choice = rand(choices);
    recentSrc.push(choice.src);
    if (recentSrc.length > 2) recentSrc.shift();
    return choice;
  }

  function pickMobileAngle() {
    var choices = MOBILE_ANGLES.filter(function (a) { return recentMobile.indexOf(a) === -1; });
    if (!choices.length) choices = MOBILE_ANGLES;
    var angle = rand(choices);
    recentMobile.push(angle);
    if (recentMobile.length > 2) recentMobile.shift();
    return angle;
  }

  // Rendered w/h (px) for a feather sized so its longest side == len.
  function rendered(img, len) {
    var nW = img.naturalWidth, nH = img.naturalHeight;
    if (!nW || !nH) return null;
    return nW >= nH ? { w: len, h: len * nH / nW } : { w: len * nW / nH, h: len };
  }

  function makeImg(bucket, src) {
    var img = document.createElement('img');
    img.className = 'heading-feather';
    img.setAttribute('aria-hidden', 'true');
    img.alt = '';
    img.src = src;
    return img;
  }

  // ---- Desktop: near-vertical feather in the left margin -------------------
  function desktopFeather(heading) {
    if (!heading.textContent.trim()) return;
    heading.classList.add('has-feather');
    var choice = pickFeather();
    var len = randRange(CONFIG[choice.bucket].size[0], CONFIG[choice.bucket].size[1])
      * DESKTOP_SCALE * pageScale() * ROOT_REM;
    var angle = randRange(DESKTOP_ANGLE[0], DESKTOP_ANGLE[1]);

    var img = makeImg(choice.bucket, choice.src);
    img.style.maxWidth = len + 'px';
    img.style.maxHeight = len + 'px';
    img.style.top = '50%';
    img.style.transformOrigin = 'center center';
    img.style.transform = 'translateY(-50%) rotate(' + angle + 'deg)';

    function place() {
      var r = rendered(img, len);
      if (!r) return;
      var rad = angle * Math.PI / 180;
      var bboxW = Math.abs(r.w * Math.cos(rad)) + Math.abs(r.h * Math.sin(rad));
      var bboxH = Math.abs(r.w * Math.sin(rad)) + Math.abs(r.h * Math.cos(rad));
      // Sit the whole rotated box in the left margin, right edge just before
      // the heading's left edge (x = 0).
      var gap = MARGIN_GAP_REM * ROOT_REM;
      img.style.left = -(gap + r.w / 2 + bboxW / 2) + 'px';

      // Clamp so the feather never crops off the top of the article.
      var article = heading.closest('article');
      var top = heading.offsetHeight / 2; // centred on the heading (with translateY -50%)
      if (article) {
        var centerDoc = heading.getBoundingClientRect().top + window.scrollY + heading.offsetHeight / 2;
        var articleTopDoc = article.getBoundingClientRect().top + window.scrollY;
        var overshoot = (articleTopDoc + MIN_TOP) - (centerDoc - bboxH / 2);
        if (overshoot > 0) top += overshoot;
      }
      img.style.top = top + 'px';
    }
    img.addEventListener('load', place);
    heading.appendChild(img);
    place();
  }

  // ---- Mobile: one centred feather on its own line ------------------------
  function mobileBlock() {
    var choice = pickFeather();
    var len = randRange(CONFIG[choice.bucket].size[0], CONFIG[choice.bucket].size[1]) * pageScale() * ROOT_REM;
    var angle = pickMobileAngle();

    var block = document.createElement('div');
    block.className = 'feather-block';
    var img = makeImg(choice.bucket, choice.src);
    img.style.maxWidth = len + 'px';
    img.style.maxHeight = len + 'px';
    img.style.transformOrigin = 'center center';
    img.style.transform = 'rotate(' + angle + 'deg)';
    block.appendChild(img);

    function place() {
      var r = rendered(img, len);
      if (!r) return;
      var rad = angle * Math.PI / 180;
      var bboxH = Math.abs(r.w * Math.sin(rad)) + Math.abs(r.h * Math.cos(rad));
      block.style.height = bboxH + 'px';
    }
    img.addEventListener('load', place);
    place();
    return block;
  }

  // ---- Homepage: feathers scattered in the margins ------------------------
  // On wide displays, 4-5 feathers spread down both the left and right
  // margins; on narrower desktops, fewer and only on the left.
  function scatterFeather(article, side, band, count) {
    var choice = pickFeather();
    var len = randRange(CONFIG[choice.bucket].size[0], CONFIG[choice.bucket].size[1])
      * DESKTOP_SCALE * pageScale() * ROOT_REM;
    var angle = randRange(DESKTOP_ANGLE[0], DESKTOP_ANGLE[1]);

    var img = makeImg(choice.bucket, choice.src);
    img.style.maxWidth = len + 'px';
    img.style.maxHeight = len + 'px';
    img.style.transformOrigin = 'center center';
    img.style.transform = 'rotate(' + angle + 'deg)';

    function place() {
      var r = rendered(img, len);
      if (!r) return;
      var rad = angle * Math.PI / 180;
      var bboxW = Math.abs(r.w * Math.cos(rad)) + Math.abs(r.h * Math.sin(rad));
      var bboxH = Math.abs(r.w * Math.sin(rad)) + Math.abs(r.h * Math.cos(rad));
      var W = article.clientWidth, H = article.offsetHeight;
      var gap = MARGIN_GAP_REM * ROOT_REM;

      // Horizontal: left margin uses negative x; right margin uses the empty
      // space to the right of the 55% text column.
      var cx = side === 'left'
        ? -(gap + bboxW / 2)
        : W * 0.55 + gap + bboxW / 2;
      img.style.left = (cx - r.w / 2) + 'px';

      // Vertical: one feather per band, spread down the article, kept fully
      // inside it (so never cropped top or bottom).
      var cy = (band + 0.5) / count * H;
      cy = Math.min(Math.max(cy, MIN_TOP + bboxH / 2), H - bboxH / 2);
      img.style.top = (cy - r.h / 2) + 'px';
    }
    img.addEventListener('load', place);
    article.appendChild(img);
    place();
  }

  function scatterHome(article) {
    article.classList.add('has-feather');
    // Right margin is used on any desktop (non-mobile) view; an extra
    // left-margin feather is added on very wide screens.
    var leftCount = window.innerWidth > XL ? 3 : 2;
    var rightCount = 2;
    var i;
    for (i = 0; i < leftCount; i++) scatterFeather(article, 'left', i, leftCount);
    for (i = 0; i < rightCount; i++) scatterFeather(article, 'right', i, rightCount);
  }

  // ---- Build / teardown ---------------------------------------------------
  function teardown() {
    document.querySelectorAll('.heading-feather').forEach(function (el) { el.remove(); });
    document.querySelectorAll('.feather-block').forEach(function (el) { el.remove(); });
    document.querySelectorAll('.has-feather').forEach(function (el) { el.classList.remove('has-feather'); });
  }

  function build() {
    // Signature captures everything that changes the layout, so we only
    // rebuild when it actually changes (e.g. crossing a width threshold).
    var mode = isDesktop() ? 'desktop' : 'mobile';
    var signature = mode;
    if (mode === 'desktop' && isHome()) signature = 'home-' + (window.innerWidth > XL ? 'xl' : 'wide');
    if (signature === builtMode) return;
    teardown();
    recentMobile = [];
    recentSrc = [];
    var article = document.querySelector('article');
    if (!article) return;

    if (mode === 'mobile') {
      var h1 = article.querySelector('h1');
      if (h1 && h1.parentNode) h1.parentNode.insertBefore(mobileBlock(), h1.nextSibling);
      article.appendChild(mobileBlock());
    } else if (isHome()) {
      scatterHome(article);
    } else {
      article.querySelectorAll('h1, h2').forEach(desktopFeather);
    }
    builtMode = signature;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }

  var t;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(build, 150);
  });
})();
