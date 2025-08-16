/* AGG • pro_agg_hero_slider.js
 * Accessible, performant hero slider with swipe, keyboard, autoplay, reduced motion support.
 * Prefix: pro_agg_
 */

(function () {
  'use strict';

  const SELECTOR = '[data-pro_agg-component="hero-slider"]';

  // Utilities
  const prefersReduced = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clamp = (n, min, max) => Math.max(min, Math.min(n, max));

  // Parse "w:h" (e.g., "16:9")
  const parseAspect = (str) => {
    if (!str || typeof str !== 'string' || !str.includes(':')) return [16, 9];
    const [w, h] = str.split(':').map(v => parseFloat(v));
    return (isFinite(w) && isFinite(h) && w > 0 && h > 0) ? [w, h] : [16, 9];
  };

  class ProAggHeroSlider {
    constructor(root) {
      this.root = root;
      this.viewport = root.querySelector('.pro_agg_hero-slider__viewport');
      this.track = root.querySelector('.pro_agg_hero-slider__track');
      this.slides = Array.from(root.querySelectorAll('.pro_agg_hero-slide'));
      this.prevBtn = root.querySelector('.pro_agg_nav--prev');
      this.nextBtn = root.querySelector('.pro_agg_nav--next');
      this.playPause = root.querySelector('.pro_agg_play-pause');
      this.dots = Array.from(root.querySelectorAll('.pro_agg_dot'));
      this.status = root.querySelector('[data-pro_agg-role="status"]');

      // Options
      this.autoplay = root.dataset.autoplay === 'true';
      this.interval = parseInt(root.dataset.interval || '6000', 10);
      this.loop = root.dataset.loop === 'true';
      this.enableSwipe = root.dataset.swipe === 'true';
      this.enableKeyboard = root.dataset.keyboard === 'true';
      this.reducePolicy = root.dataset.reduceMotionPolicy || 'respect'; // respect | force_off | ignore

      // State
      this.index = 0;
      this.timer = null;
      this.isHover = false;
      this.isFocus = false;
      this.isIntersecting = true;
      this.pointer = {startX: 0, deltaX: 0, isDown: false};

      // Init
      this._setupHeights();
      this._bind();
      this._update(true);
      this._maybeAutoplay();

      // Observe visibility to pause off-screen
      this._observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          this.isIntersecting = e.isIntersecting;
          if (!this.isIntersecting) this._stopAutoplay();
          else this._maybeAutoplay();
        });
      }, {threshold: 0.2});
      this._observer.observe(this.root);
    }

    _setupHeights() {
      const mode = this.root.dataset.heightMode;
      if (mode === 'fixed') {
        const px = parseInt(this.root.dataset.fixedHeight || '620', 10);
        this.viewport.style.height = `${px}px`;
        this.viewport.style.removeProperty('aspect-ratio');
      } else if (mode === 'aspect') {
        const [w, h] = parseAspect(this.root.dataset.aspectRatio);
        this.viewport.style.aspectRatio = `${w} / ${h}`;
        this.viewport.style.removeProperty('height');
      } else {
        // viewport (default)
        this.viewport.style.removeProperty('height');
        this.viewport.style.removeProperty('aspect-ratio');
      }
    }

    _bind() {
      // Arrows
      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

      // Dots
      if (this.dots.length) {
        this.dots.forEach((dot, i) => {
          dot.addEventListener('click', () => this.go(i));
        });
      }

      // Play/Pause
      if (this.playPause) {
        this.playPause.addEventListener('click', () => {
          if (this.autoplay) {
            this._stopAutoplay(true);
          } else {
            this.autoplay = true;
            this.playPause.setAttribute('aria-pressed', 'false');
            this._maybeAutoplay(true);
          }
        });
      }

      // Hover/focus pause
      this.root.addEventListener('mouseenter', () => { this.isHover = true; this._stopAutoplay(); });
      this.root.addEventListener('mouseleave', () => { this.isHover = false; this._maybeAutoplay(); });
      this.root.addEventListener('focusin',   () => { this.isFocus = true; this._stopAutoplay(); });
      this.root.addEventListener('focusout',  () => { this.isFocus = false; this._maybeAutoplay(); });

      // Keyboard
      if (this.enableKeyboard) {
        this.root.addEventListener('keydown', (e) => {
          const key = e.key;
          if (key === 'ArrowLeft') { e.preventDefault(); this.prev(); }
          if (key === 'ArrowRight') { e.preventDefault(); this.next(); }
          if (key === 'Home') { e.preventDefault(); this.go(0); }
          if (key === 'End') { e.preventDefault(); this.go(this.slides.length - 1); }
        });
      }

      // Swipe
      if (this.enableSwipe) {
        const el = this.viewport;
        el.addEventListener('pointerdown', this._onPointerDown);
        el.addEventListener('pointermove', this._onPointerMove);
        el.addEventListener('pointerup', this._onPointerUp);
        el.addEventListener('pointercancel', this._onPointerUp);
        el.addEventListener('pointerleave', this._onPointerUp);
      }

      // Theme editor re-render
      document.addEventListener('shopify:section:load', (ev) => {
        if (!ev || !ev.detail) return;
        const container = ev.target || ev.detail.sectionId && document.getElementById(`pro_agg_hero_slider-${ev.detail.sectionId}`);
        if (container && container === this.root) {
          this._setupHeights();
          this._update(true);
        }
      });
      window.addEventListener('resize', () => this._onResize());
    }

    _onResize() {
      // Prevent drift on resize, re-apply transform
      this._translateTo(this.index, false);
    }

    _onPointerDown = (e) => {
      e.stopPropagation();
      this.pointer.isDown = true;
      this.pointer.startX = e.clientX;
      this.pointer.deltaX = 0;
      this.track.style.transition = 'none';
    }
    _onPointerMove = (e) => {
      if (!this.pointer.isDown) return;
      this.pointer.deltaX = e.clientX - this.pointer.startX;
      const base = -this.index * this.viewport.clientWidth;
      this.track.style.transform = `translate3d(${base + this.pointer.deltaX}px,0,0)`;
    }
    _onPointerUp = () => {
      if (!this.pointer.isDown) return;
      this.pointer.isDown = false;
      const dx = this.pointer.deltaX;
      this.track.style.transition = ''; // restore
      if (Math.abs(dx) > Math.min(140, this.viewport.clientWidth / 4)) {
        dx > 0 ? this.prev() : this.next();
      } else {
        this._translateTo(this.index, true);
      }
    }

    _announce(index) {
      if (!this.status) return;
      this.status.textContent = `Slide ${index + 1} of ${this.slides.length}`;
    }

    _translateTo(index, animate = true) {
      if (!animate) this.track.style.transition = 'none';
      const x = -index * this.viewport.clientWidth;
      this.track.style.transform = `translate3d(${x}px,0,0)`;
      if (!animate) {
        // Force reflow to re-enable transitions cleanly
        // eslint-disable-next-line no-unused-expressions
        this.track.offsetHeight;
        this.track.style.transition = '';
      }
    }

    _update(animate = true) {
      // Clamp index
      this.index = clamp(this.index, 0, this.slides.length - 1);

      // Update classes & aria
      this.slides.forEach((slide, i) => {
        const active = i === this.index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
        if (active) slide.removeAttribute('tabindex'); else slide.setAttribute('tabindex', '-1');
      });

      // Update dots
      if (this.dots.length) {
        this.dots.forEach((dot, i) => {
          const active = i === this.index;
          dot.classList.toggle('is-active', active);
          dot.setAttribute('aria-selected', String(active));
        });
      }

      // Move track
      this._translateTo(this.index, animate);

      // Announce slide change
      this._announce(this.index);
    }

    _maybeAutoplay(force = false) {
      const reduced = prefersReduced();
      const respect = this.reducePolicy === 'respect';
      const forceOff = this.reducePolicy === 'force_off';
      const ignore = this.reducePolicy === 'ignore';

      const allow = ignore ? true : (forceOff ? false : !reduced);
      if (!allow) {
        this._stopAutoplay();
        return;
      }
      if ((this.autoplay || force) && !this.isHover && !this.isFocus && this.isIntersecting && this.slides.length > 1) {
        this._stopAutoplay(); // reset
        this.timer = setInterval(() => this.next(), this.interval);
        if (this.playPause) {
          this.playPause.setAttribute('aria-pressed', 'false');
          this.playPause.setAttribute('aria-label', 'Pause slideshow');
        }
      }
    }

    _stopAutoplay(userInitiated = false) {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      if (userInitiated) {
        this.autoplay = false;
        if (this.playPause) {
          this.playPause.setAttribute('aria-pressed', 'true');
          this.playPause.setAttribute('aria-label', 'Play slideshow');
        }
      }
    }

    go(i) {
      const len = this.slides.length;
      const target = clamp(i, 0, len - 1);
      this.index = target;
      this._update();
      this._maybeAutoplay();
    }

    next() {
      const len = this.slides.length;
      const last = len - 1;
      if (this.index < last) {
        this.index += 1;
      } else if (this.loop) {
        this.index = 0;
      } else {
        return;
      }
      this._update();
    }

    prev() {
      if (this.index > 0) {
        this.index -= 1;
      } else if (this.loop) {
        this.index = this.slides.length - 1;
      } else {
        return;
      }
      this._update();
    }
  }

  function initAll(root = document) {
    root.querySelectorAll(SELECTOR).forEach((el) => {
      if (!el.__proAgg) el.__proAgg = new ProAggHeroSlider(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll());
  } else {
    initAll();
  }

  // For Theme Editor dynamic loads
  document.addEventListener('shopify:section:load', (e) => {
    initAll(e.target || document);
  });
})();

