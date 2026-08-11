;(function(){

window.addEventListener('load',function(){
  var d=document;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  bind(d.querySelectorAll('a,.cs-stat,.cs-step,.cs-cap,.cs-out div,.cs-rel a'));
  mag(d.querySelectorAll('.btn'));
  if(window.gsap&&window.ScrollTrigger&&!window.matchMedia('(prefers-reduced-motion:reduce)').matches){
    gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.1});
    tl.from('.cs-hero .eyebrow',{opacity:0,y:12,duration:.5,ease:'power3.out'})
      .from('.cs-hero h1',{opacity:0,y:24,duration:.7,ease:'power3.out'},'-=.25')
      .from('.cs-hero .lead',{opacity:0,y:18,duration:.6,ease:'power3.out'},'-=.3')
      .from('.cs-hero .btn-row',{opacity:0,y:14,duration:.5,ease:'power3.out'},'-=.3');
    gsap.utils.toArray('.cs-stat').forEach(function(el,i){gsap.from(el,{opacity:0,y:20,duration:.5,delay:i*.08,ease:'power3.out',scrollTrigger:{trigger:'.cs-stats',start:'top 90%',once:true}});});
    gsap.utils.toArray('.cs-glance div').forEach(function(el,i){gsap.from(el,{opacity:0,y:14,duration:.4,delay:i*.06,ease:'power3.out',scrollTrigger:{trigger:'.cs-glance',start:'top 92%',once:true}});});
    gsap.utils.toArray('.cs-split,.cs-head').forEach(function(el){gsap.from(el,{opacity:0,y:22,duration:.6,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}});});
    gsap.utils.toArray('.cs-step,.cs-cap').forEach(function(el,i){gsap.from(el,{opacity:0,y:24,duration:.5,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}});});
    gsap.utils.toArray('.cs-impact div,.cs-rel a').forEach(function(el,i){gsap.from(el,{opacity:0,y:20,duration:.5,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}});});
    gsap.from('.cs-cta',{opacity:0,y:28,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.cs-cta',start:'top 85%',once:true}});
  }
});

})();