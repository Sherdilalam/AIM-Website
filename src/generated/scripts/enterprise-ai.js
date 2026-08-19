;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.15});
    tl.from('.sa-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.sa-hero .h1',{opacity:0,y:28,duration:.75,ease:'power3.out'},'-=.25')
      .from('.sa-hero .lead',{opacity:0,y:18,duration:.55,ease:'power3.out'},'-=.3')
      .from('.sa-stat',{opacity:0,y:16,stagger:.1,duration:.45,ease:'power3.out'},'-=.25')
      .from('.sa-hero .btn-row',{opacity:0,y:14,duration:.45,ease:'power3.out'},'-=.2')
      .from('.sa-visual',{opacity:0,x:50,duration:.85,ease:'power3.out'},'-=.7');
    d.querySelectorAll('.sa-pillar').forEach(function(p,i){gsap.from(p,{opacity:0,y:26,duration:.5,delay:(i%3)*.1,ease:'power3.out',scrollTrigger:{trigger:p,start:'top 88%',once:true}});});
    d.querySelectorAll('.sa-why-card').forEach(function(c,i){gsap.from(c,{opacity:0,y:22,duration:.5,delay:(i%2)*.1,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}});});
    d.querySelectorAll('.sa-step').forEach(function(s,i){gsap.from(s,{opacity:0,y:24,duration:.5,delay:(i%4)*.09,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 90%',once:true}});});
    d.querySelectorAll('.sv-sub').forEach(function(s,i){gsap.from(s,{opacity:0,y:24,duration:.5,delay:(i%4)*.09,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 90%',once:true}});});
    gsap.from('.sa-cta',{opacity:0,y:28,scale:.985,duration:.65,ease:'power3.out',scrollTrigger:{trigger:'.sa-cta',start:'top 85%',once:true}});
  }
  bind(d.querySelectorAll('.sa-pillar,.sa-why-card,.sa-step,.sv-sub,a'));
  mag(d.querySelectorAll('.btn'));
});

})();