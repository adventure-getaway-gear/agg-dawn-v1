// pro_agg_hero.js  Hotfix slider logic (autoplay + controls)
(function() {
  var sections = document.querySelectorAll(".pro-agg-hero-slider");
  sections.forEach(function(root) {
    var slides = root.querySelectorAll(".pro-agg-slide");
    if (!slides.length) return;

    // Fixed height control
    var heightMode = "{{ section.settings.height_mode }}";
    if (heightMode === "fixed") {
      root.dataset.height = "fixed";
      root.style.setProperty("--pro-agg-fixed-height", "{{ section.settings.fixed_height }}px");
    }

    var idx = 0;
    var speed = parseInt(root.getAttribute("data-speed") || "4000", 10);
    var autoplay = root.getAttribute("data-autoplay") === "true";
    var timer;

    function show(i) {
      slides.forEach(function(s){ s.classList.remove("is-active"); });
      slides[i].classList.add("is-active");
      idx = i;
    }
    function next() { show((idx + 1) % slides.length); }
    function prev() { show((idx - 1 + slides.length) % slides.length); }

    var nextBtn = root.querySelector(".pro-agg-next");
    var prevBtn = root.querySelector(".pro-agg-prev");
    if (nextBtn) nextBtn.addEventListener("click", function() { next(); reset(); });
    if (prevBtn) prevBtn.addEventListener("click", function() { prev(); reset(); });

    function start() { if (autoplay && slides.length > 1) timer = setInterval(next, speed); }
    function stop() { if (timer) clearInterval(timer); }
    function reset() { stop(); start(); }

    show(0); start();

    // Pause on hover (desktop)
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
  });
})();
