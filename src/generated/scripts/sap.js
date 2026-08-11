;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={"en": {"lead": "SAP is the digital core of the enterprise. AIM helps you integrate, extend, and modernize SAP - connecting it to your data, cloud, and AI so the core drives the whole business forward.", "cta1": "Talk to our team", "cta2": "See what we do", "cap.eb": "What SAP unlocks", "cap.h2": "One platform, end to end.", "off.h2": "How AIM delivers on SAP", "end.eb": "Let's talk", "end.h2": "Get more from SAP.", "end.p": "AIM connects and modernizes SAP so your digital core powers data, cloud, and AI across the business.", "end.b2": "Explore App Development"}, "fr": {"lead": "SAP est le cœur numérique de l’entreprise. AIM intègre, étend et modernise SAP en le connectant à vos données, au cloud et à l’IA.", "cta1": "Parler à notre équipe", "cta2": "Voir nos services", "cap.eb": "Ce que SAP permet", "cap.h2": "Une plateforme, de bout en bout.", "off.h2": "How AIM delivers on SAP", "end.eb": "Parlons-en", "end.h2": "Tirez plus de SAP.", "end.p": "AIM connects and modernizes SAP so your digital core powers data, cloud, and AI across the business.", "end.b2": "Explore App Development"}};
  var MAP=[['lead','.pf-hero .lead'],['cta1','.pf-hero .btn-primary'],['cta2','.pf-hero .btn-ghost'],['cap.eb','#pf-cap-head .eyebrow'],['cap.h2','#pf-cap-head .heading'],['off.h2','.pf-off h2'],['end.eb','.pf-cta .eyebrow'],['end.h2','.pf-cta .heading'],['end.p','.pf-cta p'],['end.b2','.pf-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var t0=gsap.timeline({delay:.15});
    t0.from('.pf-logo-chip',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.pf-hero .h1',{opacity:0,y:30,duration:.8,ease:'power3.out'},'-=.2')
      .from('.pf-hero .lead',{opacity:0,y:18,duration:.55,ease:'power3.out'},'-=.35')
      .from('.pf-partner',{opacity:0,y:14,duration:.45,ease:'power3.out'},'-=.3')
      .from('.pf-hero .btn-row',{opacity:0,y:14,duration:.45,ease:'power3.out'},'-=.25')
      .from('.pf-tile',{opacity:0,y:24,stagger:.12,duration:.6,ease:'power3.out'},'-=.5');
    d.querySelectorAll('.pf-cap').forEach(function(c,i){gsap.fromTo(c,{opacity:0,y:24},{opacity:1,y:0,duration:.5,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 92%',once:true}});});
    gsap.fromTo('.pf-off',{opacity:0,y:26},{opacity:1,y:0,duration:.6,ease:'power3.out',scrollTrigger:{trigger:'.pf-off',start:'top 85%',once:true}});
    d.querySelectorAll('.pf-m').forEach(function(m,i){gsap.fromTo(m,{opacity:0,y:18},{opacity:1,y:0,duration:.5,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:m,start:'top 92%',once:true}});});
    gsap.fromTo('.pf-cta',{opacity:0,y:30,scale:.98},{opacity:1,y:0,scale:1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.pf-cta',start:'top 88%',once:true}});
    setTimeout(function(){try{ScrollTrigger.refresh();}catch(e){}},400);
  } else {
    ['.pf-cap','.pf-off','.pf-m','.pf-cta','.pf-tile'].forEach(function(sel){d.querySelectorAll(sel).forEach(function(el){el.style.opacity='1';el.style.transform='none';});});
  }
  bind(d.querySelectorAll('.pf-cap,.pf-off-media,.pf-m,.pf-tile,a'));
  mag(d.querySelectorAll('.btn'));
});

})();