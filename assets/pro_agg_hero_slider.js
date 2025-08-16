(() => {
  function initSlider(section) {
    const slider = section.querySelector('[data-slides]');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.agg-hero__slide'));
    const dots = Array.from(section.querySelectorAll('.agg-hero__dot'));
    const prevBtn = section.querySelector('.agg-hero__prev');
    const nextBtn = section.querySelector('.agg-hero__next');
    const pauseBtn = section.querySelector('.agg-hero__pause');

    let index = 0;
    let timer = null;
    const autoplay = section.dataset.autoplay === 'true';
    const intervalS = parseInt(section.dataset.interval || '5', 10);
    const intervalMs = Math.max(1, intervalS) * 1000;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function clamp(i) { const len = slides.length; return ((i % len) + len) % len; }

    function updateUI() {
      dots.forEach((d, di) => {
        const active = di === index;
        d.classList.toggle('is-active', active);
        d.setAttribute('aria-selected', active ? 'true' : 'false');
      });
    }

    function goTo(i, behavior = 'smooth') {
      index = clamp(i);
      const x = index * slider.clientWidth;
      slider.scrollTo({ left: x, behavior });
      updateUI();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function start() {
      if (!autoplay || reduced || slides.length <= 1) return;
      stop();
      timer = setInterval(next, intervalMs);
      if (pauseBtn) {
        pauseBtn.hidden = false;
        pauseBtn.setAttribute('aria-pressed', 'false');
        pauseBtn.textContent = 'Pause';
      }
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
      if (pauseBtn) {
        pauseBtn.setAttribute('aria-pressed', 'true');
        pauseBtn.textContent = 'Play';
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { stop(); prev(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stop(); next(); });
    dots.forEach((d, di) => d.addEventListener('click', () => { stop(); goTo(di); }));

    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { stop(); next(); }
      if (e.key === 'ArrowLeft')  { stop(); prev(); }
    });

    let raf;
    slider.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = Math.round(slider.scrollLeft / slider.clientWidth);
        if (i !== index) { index = clamp(i); updateUI(); }
      });
    }, { passive: true });

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => { if (timer) stop(); else start(); });
    }

    slider.addEventListener('pointerdown', () => stop(), { passive: true });
    slider.addEventListener('mouseenter', () => stop());
    slider.addEventListener('focusin',   () => stop());
    window.addEventListener('resize', () => { goTo(index, 'auto'); });

    updateUI();
    start();
  }

  function initAll() { document.querySelectorAll('.agg-hero').forEach(initSlider); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
