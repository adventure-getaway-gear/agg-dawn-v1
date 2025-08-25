/* pro_agg_hero.js  safe baseline */
(function() {
  function init(root) {
    if (!root) return;

    // Sync content position & overlay opacity to CSS classes/styles
    var position = root.getAttribute('data-position') || 'middle-center';
    root.classList.add('pos-' + position);

    var overlay = root.querySelector('.pro-agg-hero__overlay');
    var overlaySetting = parseInt(root.getAttribute('data-overlay') || '20', 10);
    if (overlay) overlay.style.opacity = String(Math.min(Math.max(overlaySetting, 0), 90) / 100);

    var slides = Array.prototype.slice.call(root.querySelectorAll('.pro-agg-hero__slide'));
    if (!slides.length) return;

    var idx = Math.max(slides.findIndex(function(s){ return s.classList.contains('is-active'); }), 0);
    function show(i) {
      slides.forEach(function(s, k){
        if (k === i) s.classList.add('is-active'); else s.classList.remove('is-active');
      });
      idx = i;
      updateDots();
    }
    function next(){ show((idx + 1) % slides.length); }
    function prev(){ show((idx - 1 + slides.length) % slides.length); }

    // Arrows
    var prevBtn = root.querySelector('.pro-agg-hero__arrow.prev');
    var nextBtn = root.querySelector('.pro-agg-hero__arrow.next');
    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Dots
    var dotsWrap = root.querySelector('.pro-agg-hero__dots');
    var dots = [];
    if (dotsWrap && slides.length > 1) {
      dots = slides.map(function(_, i){
        var b = document.createElement('button');
        b.setAttribute('type', 'button');
        b.addEventListener('click', function(){ show(i); });
        dotsWrap.appendChild(b);
        return b;
      });
    }
    function updateDots() {
      if (!dots.length) return;
      dots.forEach(function(b, i){ b.classList.toggle('is-active', i === idx); });
    }
    updateDots();

    // Autoplay
    var autoplay = (root.getAttribute('data-autoplay') === 'true');
    var speed = parseInt(root.getAttribute('data-speed') || '4000', 10);
    if (autoplay && slides.length > 1) {
      speed = Math.min(Math.max(speed, 1000), 9000);
      var timer = setInterval(next, speed);
      root.addEventListener('mouseenter', function(){ clearInterval(timer); });
      root.addEventListener('mouseleave', function(){ timer = setInterval(next, speed); });
    }
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function(){
    var roots = document.querySelectorAll('.pro-agg-hero');
    Array.prototype.forEach.call(roots, init);
  });
})();
