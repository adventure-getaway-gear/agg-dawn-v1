/**
 * Pro AGG Hero Slider  Step 7
 * Simple autoplay logic + sparkle intensity application.
 */
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.pro-agg-slider');
  sliders.forEach(root => {
    const slides = Array.from(root.querySelectorAll('.pro-agg-slide'));
    if (!slides.length) return;

    let index = 0;
    const autoplay = String(root.dataset.autoplay).toLowerCase() === 'true';
    const speed = Math.max(2000, Math.min(9000, parseInt(root.dataset.speed || '5000', 10)));

    // Sparkle intensity mapping (simple opacity scaling)
    const sparkle = root.querySelector('.pro-agg-sparkle');
    if (sparkle && String(root.dataset.sparkle).toLowerCase() === 'true') {
      const intensity = Math.max(0, Math.min(100, parseInt(root.dataset.sparkleIntensity || '12', 10)));
      sparkle.style.opacity = (0.02 + intensity / 300).toFixed(2); // gentle
    }

    function showSlide(i) {
      slides.forEach((s, idx) => s.classList.toggle('is-active', idx === i));
    }
    showSlide(index);

    let timer;
    function start() {
      if (!autoplay) return;
      stop();
      timer = setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
      }, speed);
    }
    function stop() { if (timer) clearInterval(timer); }

    // Pause on visibility change to be respectful
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop(); else start();
    });

    start();
  });
});
