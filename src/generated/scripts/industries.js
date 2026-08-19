;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.1});
    tl.from('.pt-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.pt-hero .h1',{opacity:0,y:28,duration:.75,ease:'power3.out'},'-=.25')
      .from('.pt-hero .lead',{opacity:0,y:18,duration:.55,ease:'power3.out'},'-=.3');
    d.querySelectorAll('.ind-card').forEach(function(c,i){gsap.from(c,{opacity:0,y:26,duration:.5,delay:(i%3)*.1,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}});});
    gsap.from('.sa-cta',{opacity:0,y:28,scale:.985,duration:.65,ease:'power3.out',scrollTrigger:{trigger:'.sa-cta',start:'top 85%',once:true}});
  }
  bind(d.querySelectorAll('.ind-card,a'));
  mag(d.querySelectorAll('.btn'));
});

})();