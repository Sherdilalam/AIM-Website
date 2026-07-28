;(function(){

/* ---- PREVIEW theme toggle (chrome only) ---- */
(function(){
  var b=document.body,t=document.getElementById('pvToggle');
  if(t){t.addEventListener('click',function(){
    var dark=b.classList.toggle('t-dark');
    b.classList.toggle('t-light',!dark);
    t.textContent=dark?'Light mode':'Dark mode';
  });}
})();
/* ---- PAGE script (this block ships in the embed) ---- */
(function(){
  var hasGSAP = window.gsap && window.ScrollTrigger;
  if(hasGSAP){ gsap.registerPlugin(ScrollTrigger); }
  // reveal: fromTo with explicit visible end-state, plus fail-safe
  var items = Array.prototype.slice.call(document.querySelectorAll('.tt-page .rv'));
  if(hasGSAP){
    items.forEach(function(el){
      gsap.fromTo(el,{opacity:0,y:44},{opacity:1,y:0,duration:.8,ease:'power2.out',
        scrollTrigger:{trigger:el,start:'top 88%'}});
    });
    gsap.fromTo('.tt-hero .hero-copy > *',{opacity:0,y:30},
      {opacity:1,y:0,duration:.9,stagger:.12,ease:'power3.out'});
    setTimeout(function(){ ScrollTrigger.refresh(); },400);
  } else {
    // fail-safe: never leave content invisible
    items.forEach(function(el){ el.style.opacity=1; });
  }
  // stat counters
  var counters = document.querySelectorAll('.tt-stat b[data-c]');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        var el=e.target, end=parseInt(el.getAttribute('data-c'),10), n=0;
        var step=Math.max(1,Math.round(end/24));
        var iv=setInterval(function(){ n+=step; if(n>=end){n=end;clearInterval(iv);} el.textContent=n; },28);
        io.unobserve(el);
      });
    },{threshold:.6});
    counters.forEach(function(c){ io.observe(c); });
  } else {
    counters.forEach(function(c){ c.textContent=c.getAttribute('data-c'); });
  }
  // FAQ accordion
  document.querySelectorAll('.tt-q button').forEach(function(btn){
    btn.addEventListener('click',function(){
      var q=btn.parentElement, a=q.querySelector('.a'), open=q.classList.toggle('open');
      a.style.maxHeight = open ? a.scrollHeight+'px' : 0;
    });
  });
})();

})();