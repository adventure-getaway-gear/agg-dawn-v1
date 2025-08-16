/* ==========================================================================
   AGG • Hero Slider — JS (Dawn-compatible)
   - SR status updates; keyboard (Left/Right, Home/End); pause toggle aria-pressed
   - Autoplay with pause on hover/focus/off-screen; swipe with pointer events
   - Reduced-motion handling; loop support; init guard
   ========================================================================== */

(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initSlider(root) {
    if (!root || root.dataset.init === 'true') return;
    root.dataset.init = 'true';

    const track = root.querySelector('.agg-hero__track');
    const slides = Array.from(root.querySelectorAll('.agg-slide'));
    if (!track || !slides.length) return;

    const prevBtn = root.querySelector('.agg-ctrl--prev');
    const nextBtn = root.querySelector('.agg-ctrl--next');
    const pauseBtn = root.querySelector('.agg-ctrl--pause');
    const dotsWrap = root.querySelector('.agg-hero__dots');
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.agg-dot')) : [];
    const status = root.querySelector(`#${root.id}-status`);

    let idx = 0;
    const count = slides.length;

    const autoplayEnabled = root.getAttribute('data-autoplay') === 'true' && !prefersReduced;
    const intervalMs = parseInt(root.getAttribute('data-interval'), 10) || 5000;
    const loop = root.getAttribute('data-loop') === 'true';

    let timer = null;
    let isPaused = !autoplayEnabled;

    function announce() {
      if (status) status.textContent = `Slide ${idx + 1} of ${count}`;
    }

    function updateARIA() {
      slides.forEach((s, i) => s.setAttribute('aria-hidden', i === idx ? 'false' : 'true'));
      if (dots.length) dots.forEach((d, i) => d.setAttribute('aria-selected', i === idx ? 'true' : 'false'));
    }

    function updateTransform() {
      track.style.transform = `translate3d(${-100 * idx}%, 0, 0)`;
      announce();
      updateARIA();
    }

    function goTo(newIdx, fromUser = false) {
      if (!loop) {
        newIdx = Math.max(0, Math.min(count - 1, newIdx));
      } else {
        if (newIdx < 0) newIdx = count - 1;
        if (newIdx >= count) newIdx = 0;
      }
      if (newIdx === idx) return;
      idx = newIdx;
      updateTransform();
      if (fromUser) resetAutoplay();
    }

    function next(fromUser = false) { goTo(idx + 1, fromUser); }
    function prev(fromUser = false) { goTo(idx - 1, fromUser); }

    function startAutoplay() {
      if (timer || isPaused) return;
      timer = setInterval(next, intervalMs);
      if (pauseBtn) pauseBtn.setAttribute('aria-pressed', 'false');
    }
    function stopAutoplay() {
      if (timer) { clearInterval(timer); timer = null; }
      if (pauseBtn) pauseBtn.setAttribute('aria-pressed', 'true');
    }
    function resetAutoplay() {
      if (!autoplayEnabled) return;
      stopAutoplay();
      isPaused = false;
      startAutoplay();
    }

    // Controls
    prevBtn && prevBtn.addEventListener('click', () => prev(true));
    nextBtn && nextBtn.addEventListener('click', () => next(true));
    pauseBtn && pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      if (isPaused) stopAutoplay(); else startAutoplay();
    });

    // Dots
    if (dots.length) {
      dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i, true)));
    }

    // Keyboard
    root.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key === 'ArrowLeft') { e.preventDefault(); prev(true); }
      else if (key === 'ArrowRight') { e.preventDefault(); next(true); }
      else if (key === 'Home') { e.preventDefault(); goTo(0, true); }
      else if (key === 'End') { e.preventDefault(); goTo(count - 1, true); }
    });

    // Pause on hover/focus
    root.addEventListener('mouseenter', () => { isPaused = true; stopAutoplay(); });
    root.addEventListener('mouseleave', () => { isPaused = false; if (autoplayEnabled) startAutoplay(); });
    root.addEventListener('focusin', () => { isPaused = true; stopAutoplay(); });
    root.addEventListener('focusout', () => { isPaused = false; if (autoplayEnabled) startAutoplay(); });

    // Pause when off-screen
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isPaused && autoplayEnabled) startAutoplay();
        } else {
          stopAutoplay();
        }
      });
    }, { threshold: 0.1 });
    io.observe(root);

    // Swipe (pointer events)
    let startX = 0, dx = 0, isSwiping = false, pointerId = null;
    root.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      isSwiping = true;
      startX = e.clientX;
      dx = 0;
      pointerId = e.pointerId;
      root.setPointerCapture(pointerId);
    });
    root.addEventListener('pointermove', (e) => {
      if (!isSwiping) return;
      dx = e.clientX - startX;
    });
    function endSwipe(e) {
      if (!isSwiping) return;
      isSwiping = false;
      const threshold = Math.min(80, root.clientWidth * 0.15);
      if (dx > threshold) prev(true);
      else if (dx < -threshold) next(true);
      if (pointerId != null) {
        try { root.releasePointerCapture(pointerId); } catch (_) {}
        pointerId = null;
      }
    }
    root.addEventListener('pointerup', endSwipe);
    root.addEventListener('pointercancel', endSwipe);

    // Initialize
    updateTransform();
    if (autoplayEnabled && !isPaused) startAutoplay();
  }

  function initAll() {
    document.querySelectorAll('.agg-hero').forEach(initSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll, { once: true });
  } else {
    initAll();
  }
})();
