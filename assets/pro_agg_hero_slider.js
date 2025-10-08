// PRO-AGG Hero Slider JS
document.addEventListener('DOMContentLoaded', function() {
  var slider = document.querySelector('.pro-agg-hero-slider');
  if (!slider) return;

  var slides = slider.querySelectorAll('.pro-agg-hero-slider__slide');
  var dots = slider.querySelectorAll('.pro-agg-hero-slider__dot');
  var prevBtn = slider.querySelector('.pro-agg-hero-slider__arrow--prev');
  var nextBtn = slider.querySelector('.pro-agg-hero-slider__arrow--next');
  var autoplay = slider.dataset.autoplay === 'true';
  var speed = parseInt(slider.dataset.speed, 10) * 1000 || 5000;
  var current = 0;
  var timer = null;

  function showSlide(idx) {
    slides.forEach(function(slide, i) {
      slide.classList.toggle('is-active', i === idx);
    });
    if (dots.length) {
      dots.forEach(function(dot, i) {
