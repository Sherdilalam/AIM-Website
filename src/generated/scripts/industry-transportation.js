;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={"en": {"eb": "Transportation", "h1": "Data-driven transportation and logistics.", "lead": "Technology that keeps fleets moving, supply chains visible, and operations efficient, from business intelligence and IoT to modern applications and integrated platforms.", "cta1": "Connect with us", "cta2": "Explore capabilities", "intro.h": "Turning movement into measurable insight.", "intro.p1": "Transportation and logistics run on tight margins and complex, real-time coordination. The organizations that win are those that turn operational data into visibility, efficiency, and better decisions.", "intro.p2": "AIM helps transportation organizations modernize systems, connect fleets and assets, and apply analytics and AI, transforming fleet operations through business intelligence and data engineering.", "cap.eb": "What we do for transportation & logistics", "cap.h": "From fleet operations to supply chain visibility.", "band.eb": "Built for operations", "band.h": "Real-time, reliable, and resilient.", "band.p": "Transportation systems cannot afford downtime. We build resilient, integrated platforms with real-time data pipelines and monitoring, so operations stay visible and dependable around the clock.", "out.eb": "Outcomes", "out.h": "Outcomes for transportation and logistics.", "end.eb": "Ready to get started?", "end.h": "Ready to move operations forward?", "end.p": "Partner with AIM to connect your fleet, unify your data, and turn transportation operations into a competitive advantage.", "end.b2": "Explore our services"}, "fr": {"eb": "Transport", "h1": "Le transport et la logistique axés sur les données.", "lead": "Une technologie qui maintient les flottes en mouvement et les chaînes d’approvisionnement visibles.", "cta1": "Contactez-nous", "cta2": "Explorer les capacités", "intro.h": "Transformer le mouvement en insight mesurable.", "intro.p1": "Transportation and logistics run on tight margins and complex, real-time coordination. The organizations that win are those that turn operational data into visibility, efficiency, and better decisions.", "intro.p2": "AIM helps transportation organizations modernize systems, connect fleets and assets, and apply analytics and AI, transforming fleet operations through business intelligence and data engineering.", "cap.eb": "Ce que nous faisons", "cap.h": "Des opérations de flotte à la visibilité de la chaîne.", "band.eb": "Built for operations", "band.h": "Temps réel, fiable et résilient.", "band.p": "Transportation systems cannot afford downtime. We build resilient, integrated platforms with real-time data pipelines and monitoring, so operations stay visible and dependable around the clock.", "out.eb": "Résultats", "out.h": "Des résultats pour le transport et la logistique.", "end.eb": "Prêt à commencer?", "end.h": "Prêt à faire avancer vos opérations?", "end.p": "Partner with AIM to connect your fleet, unify your data, and turn transportation operations into a competitive advantage.", "end.b2": "Explorer nos services"}};
  var MAP=[['eb','.ind-hero .eyebrow'],['h1','.ind-hero .h1'],['lead','.ind-hero .lead'],['cta1','.ind-hero .btn-primary'],['cta2','.ind-hero .btn-ghost'],['intro.h','#ind-intro-h'],['intro.p1','#ind-intro-p1'],['intro.p2','#ind-intro-p2'],['cap.eb','#ind-cap-head .eyebrow'],['cap.h','#ind-cap-head .heading'],['band.eb','#ind-band-eb'],['band.h','#ind-band-h'],['band.p','#ind-band-p'],['out.eb','#ind-out-head .eyebrow'],['out.h','#ind-out-head .heading'],['end.eb','.ind-cta .eyebrow'],['end.h','.ind-cta .heading'],['end.p','.ind-cta p'],['end.b2','.ind-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.15});
    tl.from('.ind-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.ind-hero .h1',{opacity:0,y:30,duration:.8,ease:'power3.out'},'-=.25')
      .from('.ind-hero .lead',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.35')
      .from('.ind-hero .btn-row',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.3');
    gsap.fromTo('.ind-intro > div',{opacity:0,y:28},{opacity:1,y:0,duration:.7,stagger:.15,ease:'power3.out',scrollTrigger:{trigger:'.ind-intro',start:'top 85%',once:true}});
    d.querySelectorAll('.ind-cap').forEach(function(c,i){gsap.fromTo(c,{opacity:0,y:24},{opacity:1,y:0,duration:.5,delay:(i%3)*.09,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 90%',once:true}});});
    d.querySelectorAll('.ind-chip').forEach(function(c,i){gsap.fromTo(c,{opacity:0,y:16},{opacity:1,y:0,duration:.45,delay:(i%2)*.08,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 92%',once:true}});});
    d.querySelectorAll('.ind-out').forEach(function(o,i){gsap.fromTo(o,{opacity:0,y:20},{opacity:1,y:0,duration:.45,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:o,start:'top 92%',once:true}});});
    gsap.fromTo('.ind-cta',{opacity:0,y:30,scale:.98},{opacity:1,y:0,scale:1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.ind-cta',start:'top 88%',once:true}});
    setTimeout(function(){try{ScrollTrigger.refresh();}catch(e){}},400);
  } else {
    ['.ind-cap','.ind-chip','.ind-out','.ind-cta','.ind-intro > div'].forEach(function(sel){d.querySelectorAll(sel).forEach(function(el){el.style.opacity='1';el.style.transform='none';});});
  }
  bind(d.querySelectorAll('.ind-cap,.ind-chip,.ind-out,a'));
  mag(d.querySelectorAll('.btn'));
});

})();