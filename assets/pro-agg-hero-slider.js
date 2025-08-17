class ProAggHeroSlider {
  constructor(container) {
    this.container = container;
    this.slides = Array.from(container.querySelectorAll('.pro-agg-hero-slider__slide'));
    this.track = container.querySelector('.pro-agg-hero-slider__slides');
    this.dots = Array.from(container.querySelectorAll('.pro-agg-hero-slider__dot'));
    this.prevButton = container.querySelector('.pro-agg-hero-slider__arrow--prev');
    this.nextButton = container.querySelector('.pro-agg-hero-slider__arrow--next');
    this.current = 0;
    this.autoplay = container.dataset.autoplay === 'true';
    this.speed = parseInt(container.dataset.speed, 10) || 5000;
    this.transition = container.dataset.transition;
    this.interval = null;

    this.prevButton.addEventListener('click', () => this.prev());
    this.nextButton.addEventListener('click', () => this.next());
    this.dots.forEach((dot, i) => dot.addEventListener('click', () => this.show(i)));
    container.addEventListener('mouseenter', () => this.pause());
    container.addEventListener('mouseleave', () => this.play());

    this.show(0);
    this.play();
  }

  show(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
    this.dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    if (this.transition === 'slide') {
      const offset = index * -100;
      this.track.style.transform = `translateX(${offset}%)`;
    }
    this.current = index;
  }

  next() {
    const index = (this.current + 1) % this.slides.length;
    this.show(index);
  }

  prev() {
    const index = (this.current - 1 + this.slides.length) % this.slides.length;
    this.show(index);
  }

  play() {
    if (this.autoplay) {
      this.interval = setInterval(() => this.next(), this.speed);
    }
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pro-agg-hero-slider').forEach((slider) => new ProAggHeroSlider(slider));
});
