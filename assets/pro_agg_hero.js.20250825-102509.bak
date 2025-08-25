// assets/pro_agg_hero.js
(function(){
  function init(section){
    const track = section.querySelector('.pro-agg-hero__track');
    const slides = Array.from(section.querySelectorAll('.pro-agg-hero__slide'));
    if(!track || slides.length === 0) return;
    let index = 0, timer = null;

    const dotsHost = section.querySelector('.pro-agg-hero__dots');
    const showDots = section.dataset.showDots === 'true' && dotsHost;
    let dots = [];

    function go(i){
      index = (i + slides.length) % slides.length;
      const x = -index * 100;
      track.style.transform = `translateX(${x}%)`;
      if (showDots){
        dots.forEach((d,di)=>d.setAttribute('aria-selected', di===index ? 'true' : 'false'));
      }
    }

    function next(){ go(index+1); }
    function prev(){ go(index-1); }

    // Dots
    if (showDots){
      dotsHost.innerHTML='';
      dots = slides.map((_,i)=>{
        const b=document.createElement('button');
        b.type='button';
        b.setAttribute('role','tab');
        b.setAttribute('aria-selected', i===0 ? 'true' : 'false');
        b.addEventListener('click', ()=>go(i));
        dotsHost.appendChild(b);
        return b;
      });
    }

    // Arrows
    const prevBtn = section.querySelector('.pro-agg-hero__nav--prev');
    const nextBtn = section.querySelector('.pro-agg-hero__nav--next');
    prevBtn && prevBtn.addEventListener('click', prev);
    nextBtn && nextBtn.addEventListener('click', next);

    // Autoplay
    const autoplay = section.dataset.autoplay === 'true';
    const speed = parseInt(section.dataset.speed || '5500', 10);
    const start = ()=>{ if(autoplay){ stop(); timer = setInterval(next, speed); } };
    const stop = ()=>{ if(timer){ clearInterval(timer); timer=null; } };
    section.addEventListener('mouseenter', stop);
    section.addEventListener('mouseleave', start);
    start();

    // Basic swipe
    let startX=0, delta=0;
    section.addEventListener('touchstart', e=>{ startX = e.touches[0].clientX; delta=0; }, {passive:true});
    section.addEventListener('touchmove', e=>{ delta = e.touches[0].clientX - startX; }, {passive:true});
    section.addEventListener('touchend', ()=>{ if(Math.abs(delta) > 40){ delta<0 ? next() : prev(); } });

    // Responsive reflow safety
    new ResizeObserver(()=>go(index)).observe(section);

    go(0);
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.pro-agg-hero__viewport').forEach(init);
  });
})();
