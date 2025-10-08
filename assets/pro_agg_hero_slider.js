/**
 * PRO-AGG Hero Slider Component
 * Custom Web Component for Adventure Getaway Gear hero slider
 */

class ProAggHeroSlider extends HTMLElement {
  constructor() {
    super();
    
    // Configuration
    this.currentSlide = 0;
    this.autoplayTimer = null;
    this.isAutoplayPaused = false;
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.dragThreshold = 50;
    
    // Get settings from data attributes
    this.autoplay = this.dataset.autoplay === 'true';
    this.autoplaySpeed = parseInt(this.dataset.autoplaySpeed || '5', 10) * 1000;
    this.pauseOnHover = this.dataset.pauseOnHover === 'true';
    this.transitionType = this.dataset.transition || 'slide';
    this.contentAnimation = this.dataset.contentAnimation || 'fade';
    this.slideCount = parseInt(this.dataset.slideCount || '1', 10);
    
    // Check for reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Elements
    this.track = null;
    this.slides = [];
    this.prevButton = null;
    this.nextButton = null;
    this.dots = [];
    this.playPauseButton = null;
  }

  connectedCallback() {
    this.initElements();
    this.initEventListeners();
    this.initAccessibility();
    
    // Start autoplay if enabled
    if (this.autoplay && !this.prefersReducedMotion) {
      this.startAutoplay();
    }
    
    // Handle theme editor
    if (window.Shopify && window.Shopify.designMode) {
      this.handleThemeEditor();
    }
  }

  disconnectedCallback() {
    this.stopAutoplay();
    this.removeEventListeners();
  }

  initElements() {
    this.track = this.querySelector('.pro_agg_slider__track');
    this.slides = Array.from(this.querySelectorAll('.pro_agg_slide'));
    this.prevButton = this.querySelector('.pro_agg_slider__button--prev');
    this.nextButton = this.querySelector('.pro_agg_slider__button--next');
    this.dots = Array.from(this.querySelectorAll('.pro_agg_slider__dot'));
    this.playPauseButton = this.querySelector('.pro_agg_slider__play_pause');
  }

  initEventListeners() {
    // Previous button
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.goToPrevSlide());
    }

    // Next button
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.goToNextSlide());
    }

    // Dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Play/Pause button
    if (this.playPauseButton) {
      this.playPauseButton.addEventListener('click', () => this.toggleAutoplay());
    }

    // Pause on hover
    if (this.pauseOnHover && this.autoplay) {
      this.addEventListener('mouseenter', () => this.pauseAutoplay());
      this.addEventListener('mouseleave', () => this.resumeAutoplay());
    }

    // Touch/drag support
    this.initTouchSupport();

    // Keyboard navigation
    this.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Reduced motion changes
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionQuery.addEventListener('change', () => {
      this.prefersReducedMotion = reducedMotionQuery.matches;
      if (this.prefersReducedMotion) {
        this.stopAutoplay();
      }
    });
  }

  removeEventListeners() {
    // Clean up event listeners when component is removed
    if (this.prevButton) {
      this.prevButton.removeEventListener('click', () => this.goToPrevSlide());
    }
    if (this.nextButton) {
      this.nextButton.removeEventListener('click', () => this.goToNextSlide());
    }
  }

  initAccessibility() {
    // Set initial ARIA attributes
    this.slides.forEach((slide, index) => {
      slide.setAttribute('aria-hidden', index !== this.currentSlide ? 'true' : 'false');
      slide.setAttribute('tabindex', index === this.currentSlide ? '0' : '-1');
    });

    // Make component focusable
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }

  initTouchSupport() {
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
      this.pauseAutoplay();
    }, { passive: true });

    this.track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = startX - currentX;
      const diffY = startY - currentY;

      // Only handle horizontal swipes
      if (Math.abs(diffX) > Math.abs(diffY)) {
        e.preventDefault();
      }
    }, { passive: false });

    this.track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > this.dragThreshold) {
        if (diff > 0) {
          this.goToNextSlide();
        } else {
          this.goToPrevSlide();
        }
      }

      isDragging = false;
      this.resumeAutoplay();
    });
  }

  handleKeyboard(e) {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.goToPrevSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.goToNextSlide();
        break;
      case 'Home':
        e.preventDefault();
        this.goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        this.goToSlide(this.slides.length - 1);
        break;
    }
  }

  goToSlide(index, userInitiated = true) {
    if (index < 0 || index >= this.slides.length) return;
    if (index === this.currentSlide) return;

    // Stop autoplay if user initiated
    if (userInitiated && this.autoplay) {
      this.stopAutoplay();
      this.isAutoplayPaused = true;
    }

    const previousSlide = this.currentSlide;
    this.currentSlide = index;

    // Update slides
    this.updateSlides(previousSlide);

    // Update controls
    this.updateControls();

    // Update accessibility
    this.updateAccessibility();

    // Announce to screen readers
    this.announceSlideChange();
  }

  goToNextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex, true);
  }

  goToPrevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex, true);
  }

  updateSlides(previousIndex) {
    if (this.transitionType === 'fade') {
      // Fade transition
      this.slides.forEach((slide, index) => {
        slide.classList.toggle('pro_agg_slide--active', index === this.currentSlide);
      });
    } else {
      // Slide transition
      const offset = -this.currentSlide * 100;
      this.track.style.transform = `translateX(${offset}%)`;
      
      this.slides.forEach((slide, index) => {
        slide.classList.toggle('pro_agg_slide--active', index === this.currentSlide);
      });
    }
  }

  updateControls() {
    // Update dots
    this.dots.forEach((dot, index) => {
      const isActive = index === this.currentSlide;
      dot.classList.toggle('pro_agg_slider__dot--active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update navigation buttons (disabled state for single slide)
    if (this.slides.length === 1) {
      if (this.prevButton) this.prevButton.disabled = true;
      if (this.nextButton) this.nextButton.disabled = true;
    }
  }

  updateAccessibility() {
    this.slides.forEach((slide, index) => {
      const isActive = index === this.currentSlide;
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      slide.setAttribute('tabindex', isActive ? '0' : '-1');
    });
  }

  announceSlideChange() {
    // Create a live region announcement for screen readers
    const announcement = `Slide ${this.currentSlide + 1} of ${this.slides.length}`;
    const liveRegion = this.querySelector('[aria-live]') || this.createLiveRegion();
    liveRegion.textContent = announcement;
  }

  createLiveRegion() {
    const region = document.createElement('div');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'visually-hidden';
    this.appendChild(region);
    return region;
  }

  startAutoplay() {
    if (this.slides.length <= 1) return;
    
    this.stopAutoplay(); // Clear any existing timer
    this.autoplayTimer = setInterval(() => {
      this.goToSlide((this.currentSlide + 1) % this.slides.length, false);
    }, this.autoplaySpeed);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  pauseAutoplay() {
    if (this.autoplay && !this.isAutoplayPaused) {
      this.stopAutoplay();
    }
  }

  resumeAutoplay() {
    if (this.autoplay && !this.isAutoplayPaused && !this.prefersReducedMotion) {
      this.startAutoplay();
    }
  }

  toggleAutoplay() {
    if (!this.playPauseButton) return;

    this.isAutoplayPaused = !this.isAutoplayPaused;

    if (this.isAutoplayPaused) {
      this.stopAutoplay();
      this.playPauseButton.setAttribute('data-state', 'paused');
      this.playPauseButton.setAttribute('aria-label', 'Play slideshow');
    } else {
      this.startAutoplay();
      this.playPauseButton.setAttribute('data-state', 'playing');
      this.playPauseButton.setAttribute('aria-label', 'Pause slideshow');
    }
  }

  handleThemeEditor() {
    // Handle Shopify theme editor events
    document.addEventListener('shopify:block:select', (event) => {
      if (!this.contains(event.target)) return;
      
      const slideIndex = Array.from(this.slides).indexOf(event.target);
      if (slideIndex !== -1) {
        this.goToSlide(slideIndex, false);
        this.stopAutoplay();
      }
    });

    document.addEventListener('shopify:block:deselect', (event) => {
      if (!this.contains(event.target)) return;
      
      if (this.autoplay && !this.isAutoplayPaused) {
        this.startAutoplay();
      }
    });
  }
}

// Register the custom element
if (!customElements.get('pro-agg-hero-slider')) {
  customElements.define('pro-agg-hero-slider', ProAggHeroSlider);
}
